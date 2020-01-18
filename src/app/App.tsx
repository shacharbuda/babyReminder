import React from 'react';
import './App.css';
import BabiesDataTableContainer from './components/BabiesDataTable';
import { Baby } from './interfaces';
import persistence from './utils/persistence';
import RTL from './RTL';

class App extends React.Component<{}, {}> {
	// No need of state as static.
	babies: Baby[] = []

	constructor(props: {}) {
		super(props);
		this.babies = persistence.getBabies();
	}

  render() {
		return (
			<RTL>
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
					<footer className="ltr text-center blockquote-footer">
						Made by Waffle
					</footer>
				</div>
			</RTL>
  	);
	}
}

export default App;
