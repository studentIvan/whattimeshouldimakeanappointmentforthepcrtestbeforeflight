import { h } from 'preact';
import { Router } from 'preact-router';
// Code-splitting is automated for `routes` directory
import Calc from '../routes/calc';

const App = () => (
	<div id="app">
		<Router>
      <Calc path="/" lang="en" defaultLang />
			<Calc path="/:lang" />
		</Router>
	</div>
)

export default App;
