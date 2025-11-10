## MapUp Fleet Tracking Dashboard
This repository implements a comprehensive real-time fleet tracking dashboard for the MapUp Fleet Tracking Assessment.
It visualizes vehicle trips, ongoing status, animated location playback, and operational insights using realistic trip event datasets.

## Features:

Interactive map showing trip routes and vehicle movement (Leaflet)

Live playback controls, adjustable speed, and timeline scrubber

Fleet-wide metrics: moving, stopped, completed, cancelled trips, average progress

Individual trip details, progress %, status, speed, and timestamp

Responsive and polished dashboard UI

## Tech Stack For UI Development
React + LeafLet+ CSS

## Quick Start
Install dependencies :
npm install

## Run locally
npm start

To open in browser:
http://localhost:3000

## Codespaces Users (IMPORTANT)
If running in GitHub Codespaces, make sure to set your port 3000 as PUBLIC using the "Ports" tab or CLI (gp ports).
Otherwise, you might see "CORS" or network access issues—your browser must access the public Codespace port for the dashboard to load and update correctly.

## Assignment & Deployment
Meets all MapUp assignment criteria for real-time, multi-trip fleet tracking, and event insight visualization.

Uses Create React App, public trip data from fallback files, and Leaflet for mapping.

Automated .gitignore prevents node_modules, build, and environment files from being committed.

Ready to deploy with npm run build to Vercel, Netlify, or GitHub Pages.

## Live URL- Hosted on Vercel
https://fleet-tracking-dashboard-graces-projects-4579bbab.vercel.app/

## Reviewer Access
The following MapUp reviewer emails have been added as repository collaborators:
- vedantp@mapup.ai
- ajayap@mapup.ai
- asijitp@mapup.ai
- atharvd@mapup.ai
- karkuvelpandip@mapup.ai

## Data & Event File Structure
The dashboard expects trip event JSON files in src/assessment-fallback-data/, structured per assignment instructions.

## Known Issues / Limitations
- Only fallback/sample data is provided unless custom data is generated.
- Codespaces must have public port for dashboard to work.
- For questions, please check README or contact project author.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
