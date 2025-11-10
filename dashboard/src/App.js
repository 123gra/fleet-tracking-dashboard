import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";

import trip1 from "./assessment-fallback-data/trip_1_cross_country.json";
import trip2 from "./assessment-fallback-data/trip_2_urban_dense.json";
import trip3 from "./assessment-fallback-data/trip_3_mountain_cancelled.json";
import trip4 from "./assessment-fallback-data/trip_4_southern_technical.json";
import trip5 from "./assessment-fallback-data/trip_5_regional_logistics.json";

const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7439/7439688.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const TRIPS = [
  { name: "Cross Country Long Haul", data: trip1 },
  { name: "Urban Dense Delivery", data: trip2 },
  { name: "Mountain Route Cancelled", data: trip3 },
  { name: "Southern Technical Issues", data: trip4 },
  { name: "Regional Logistics", data: trip5 },
];

function getTripEvents(tripData) {
  return tripData.filter(
    (e) =>
      e.event_type === "location_ping" &&
      e.location &&
      typeof e.location.lat === "number" &&
      typeof e.location.lng === "number"
  );
}

function isTripCancelled(tripData) {
  if (!Array.isArray(tripData) || tripData.length === 0) return false;
  const endEvent = tripData[tripData.length - 1];
  return (
    endEvent &&
    (
      (endEvent.event_type && /cancel|problem|issue|cancelled/i.test(endEvent.event_type)) ||
      (endEvent.status && /cancel|problem|issue/i.test(endEvent.status)) ||
      (endEvent.reason && /cancel|problem|issue/i.test(endEvent.reason))
    )
  );
}

function fleetMetrics(trips, selectedTrip, playIndexes) {
  let moving = 0, stopped = 0, completed = 0, cancelled = 0, inProgress = 0, fleetProgressSum = 0;

  trips.forEach((trip, idx) => {
    const events = getTripEvents(trip.data);
    const totalSteps = events.length;
    if (totalSteps === 0) return;

    let tripPlayIndex = selectedTrip && selectedTrip.name === trip.name && playIndexes ? playIndexes[idx] : 0;
    const tripIsCancelled = isTripCancelled(trip.data);

    if (tripIsCancelled) {
      cancelled++;
      return;
    } else if (tripPlayIndex >= totalSteps - 1) {
      completed++;
    } else {
      const curEvent = events[tripPlayIndex];
      if (curEvent && curEvent.movement && curEvent.movement.moving === false) stopped++;
      else moving++;
      inProgress++;
    }

    const tripPercent = totalSteps > 1 ? Math.round(((tripPlayIndex + 1) / totalSteps) * 100) : 0;
    fleetProgressSum += tripPercent;
  });

  const nonCancelledTrips = trips.length - cancelled;
  const avg = nonCancelledTrips > 0 ? Math.round(fleetProgressSum / nonCancelledTrips) : 0;
  return { moving, stopped, completed, cancelled, inProgress, fleetProgressAvg: avg, totalTrips: trips.length };
}

function App() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [playIndex, setPlayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(800);

  const playIndexes = TRIPS.map((trip) =>
    selectedTrip && selectedTrip.name === trip.name ? playIndex : 0
  );

  useEffect(() => {
    if (!selectedTrip) return;
    const coords = getTripEvents(selectedTrip.data).map((e) => [e.location.lat, e.location.lng]);
    setCoordinates(coords);
    setPlayIndex(0);
    if (isTripCancelled(selectedTrip.data)) setIsPlaying(false);
    else setIsPlaying(true);
  }, [selectedTrip]);

  useEffect(() => {
    if (!isPlaying || coordinates.length <= 1) return;
    const interval = setInterval(() => {
      setPlayIndex((i) => (i < coordinates.length - 1 ? i + 1 : 0));
    }, speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed, coordinates]);

  let currentEvent = null;
  if (
    selectedTrip &&
    Array.isArray(selectedTrip.data) &&
    playIndex >= 0
  ) {
    let count = -1;
    for (let i = 0; i < selectedTrip.data.length; i++) {
      const e = selectedTrip.data[i];
      if (
        (e.event_type === "location_ping") &&
        e.location &&
        typeof e.location.lat === "number" &&
        typeof e.location.lng === "number"
      ) {
        count++;
        if (count === playIndex) {
          currentEvent = e;
          break;
        }
      }
    }
  }

  const progress = coordinates.length > 1 ? Math.round(((playIndex + 1) / coordinates.length) * 100) : 0;
  const fleet = fleetMetrics(TRIPS, selectedTrip, playIndexes);

  const tripIsCancelled = selectedTrip ? isTripCancelled(selectedTrip.data) : false;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Fleet Trips</h2>
        {/* FLEET PANEL */}
        <div className="sidebar-card">
          <b>Fleet Summary</b>
          <div>Total trips: {fleet.totalTrips}</div>
          <div>Moving: {fleet.moving}</div>
          <div>Stopped: {fleet.stopped}</div>
          <div>Completed: {fleet.completed}</div>
          <div>Cancelled: {fleet.cancelled}</div>
          <div>In Progress: {fleet.inProgress}</div>
          <div>Fleet Progress: {fleet.fleetProgressAvg}%</div>
        </div>
        <ul className="trip-list">
          {TRIPS.map(trip => (
            <li
              className={`trip-list-item${selectedTrip?.name === trip.name ? " selected" : ""}`}
              key={trip.name}
              onClick={() => setSelectedTrip(trip)}
            >
              {trip.name}
            </li>
          ))}
        </ul>
        {coordinates.length > 1 && (
          <>
            <hr />
            {/* Trip Metrics Card */}
            {currentEvent && (
              <div className="sidebar-card">
                <div><span className="metrics-label">Trip Name:</span> {selectedTrip.name}</div>
                {tripIsCancelled ? (
                  <div className="cancelled-status">Trip status: Cancelled/Problem Detected</div>
                ) : (
                  <>
                    <div><span className="metrics-label">Current Lat:</span> {currentEvent.location.lat.toFixed(4)}</div>
                    <div><span className="metrics-label">Current Lng:</span> {currentEvent.location.lng.toFixed(4)}</div>
                    <div><span className="metrics-label">Speed:</span> {(currentEvent.movement?.speed_kmh ?? "N/A")} km/h</div>
                    <div><span className="metrics-label">Status:</span> {currentEvent.movement?.moving === false ? "Stopped" : "Moving"}</div>
                    <div><span className="metrics-label">Timestamp:</span> {new Date(currentEvent.timestamp).toLocaleString()}</div>
                    <div><span className="metrics-label">Progress:</span> {progress}%</div>
                  </>
                )}
              </div>
            )}

            {/* Timeline slider (hide if cancelled) */}
            {!tripIsCancelled && (
              <div className="timeline-slider">
                <label><b>Trip Timeline:</b></label>
                <input
                  type="range"
                  min={0}
                  max={coordinates.length - 1}
                  value={playIndex}
                  onChange={e => {
                    setPlayIndex(Number(e.target.value));
                    setIsPlaying(false);
                  }}
                  style={{ width: "100%" }}
                />
                <div className="timeline-event-label">
                  Event: {playIndex + 1} / {coordinates.length}
                </div>
              </div>
            )}

            {!tripIsCancelled && (
              <>
                <button
                  style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                  onClick={() => setIsPlaying((p) => !p)}
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <label style={{ display: "block", marginTop: "10px" }}>
                  Speed:
                </label>
                <select
                  value={speed}
                  onChange={e => setSpeed(Number(e.target.value))}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value={1200}>Slow</option>
                  <option value={800}>Normal</option>
                  <option value={400}>Fast</option>
                  <option value={120}>Very Fast</option>
                </select>
              </>
            )}
          </>
        )}
      </div>
      {/* Map */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={coordinates.length ? coordinates[0] : [39.5, -98.35]}
          zoom={4}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {!tripIsCancelled && coordinates.length > 1 && (
            <>
              <Polyline positions={coordinates} />
              <Marker
                position={coordinates[playIndex]}
                icon={truckIcon}
              >
                <Popup>Vehicle in motion</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
