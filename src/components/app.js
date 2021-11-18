import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Router } from 'preact-router';
import mixpanel from 'mixpanel-browser';
// Code-splitting is automated for `routes` directory
import Calc from '../routes/calc';

const App = () => {
  useEffect(() => {
    /** prevent the server-side rendering problems */
    if (typeof window !== 'undefined') {
      mixpanel.init('cc7fa2cc2257fe85766fb8f8fd259199', { debug: false });
      mixpanel.time_event('Choose flight datetime');
    }
  });

  return (
    <div id="app">
      <Router>
        <Calc path="/" lang="en" defaultLang />
        <Calc path="/:lang/" />
      </Router>
    </div>
  );
};

export default App;
