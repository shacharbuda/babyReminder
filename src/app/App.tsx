import React from 'react';
import './App.css';
import BabiesDataTableContainer from './components/BabiesDataTable';
import { Baby } from './interfaces';
import persistence from './utils/persistence';

class App extends React.Component<{}, {isEditForm: boolean}> {
	// No need of state as static.
	babies: Baby[] = []

	constructor(props: {}) {
		super(props);
		this.babies = persistence.getBabies();
	}

  render() {
		return (
    <div className="App">
			<header>
				<h1 className="h1 text-center pt-5">תינוק תזכורת</h1>
			</header>
			<div className="container d-flex align-items-center body-content">
				{
					// Placeholder for router...
					<BabiesDataTableContainer />
				}
			</div>
			<footer className="text-center blockquote-footer" dir="ltr">
				Made by Waffle
			</footer>
    </div>
  	);
	}
}

export default App;
