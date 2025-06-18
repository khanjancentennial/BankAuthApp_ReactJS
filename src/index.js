// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { Provider } from 'react-redux';
// import { store } from './App/store'; // Adjust the import path as necessary

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );


// login-mf/src/index.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './App/store';
import ReactDOMClient from 'react-dom/client'; // Use createRoot for React 18
import App from './App'; // Your main React component (the Login form)
import reportWebVitals from './reportWebVitals'; // Keep if desired

let root = null; // Declare a variable to hold the React root

// Single-SPA lifecycle functions
export async function bootstrap() {
  console.log('Login MF: bootstrapping');
}

export async function mount(props) {
  console.log('Login MF: mounting', props);
  // Single-SPA typically passes a `domElement` property in `props`
  // This is the DOM element where this microfrontend should render.
  const container = props.domElement || document.getElementById('root'); // Fallback to 'root' for standalone mode
  if (!container) {
    console.error('Login MF: Mount container not found!');
    return;
  }
  // Create root only once and reuse it across mounts/unmounts
  if (!root) {
    root = ReactDOMClient.createRoot(container);
  }
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export async function unmount(props) {
  console.log('Login MF: unmounting');
  if (root) {
    root.unmount(); // Unmount the React component tree
    root = null; // Clear the root reference
  }
}

// For standalone development:
// If the `window.singleSpaNavigate` property is not defined, it means Single-SPA is not orchestrating
// this application, so we can assume it's running in standalone development mode.
if (!window.singleSpaNavigate) {
  console.log('Login MF: Running in standalone mode.');
  const standaloneRoot = ReactDOMClient.createRoot(document.getElementById('root'));
  standaloneRoot.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  reportWebVitals(); // Call reportWebVitals for standalone mode
}