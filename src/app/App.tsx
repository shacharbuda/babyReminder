import React from 'react';
import './App.css';
import BabiesDataTableContainer from './components/BabiesDataTable';
import { Baby } from './interfaces';
import persistence from './utils/persistence';
import RTL from './RTL';
import consts from './utils/constants';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
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
							Made by Waffle (v{consts.APP_VERSION})
						</footer>
					</div>
				</MuiPickersUtilsProvider>
			</RTL>
  	);
	}
}

export default App;
