import React from 'react';
import './App.css';
import BabiesDataTableContainer from './components/BabiesDataTable';
import RTL from './RTL';
import consts from './utils/constants';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import firebase, { analytics, authUser } from '../config/fbConfig';
import LoginComponent from './components/LoginComponent';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';
import util from './utils/util';

interface Props {
	isLoggedIn: boolean;
	isLoading: boolean;
	displayName: string;
}

class App extends React.Component<Props, {}> {
	componentDidMount() {
		analytics('APP_MOUNTED');
	}

	componentDidUpdate(prevProps: Props) {
		const { isLoggedIn, isLoading } = this.props; 
		
		// Nothing to do here if still loading..
		if (isLoading) return;

		// If login changed to logged out - log in!
		if (!isLoggedIn) {
			authUser();
		}
	}

  render() {
		const { isLoading, isLoggedIn, displayName } = this.props;

		if (isLoading) {
			return (		
					<LoginComponent/>
			)
		}

		return (
			<RTL>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<div className="App">
						<header className="container d-flex justify-content-between">
							<h1 className="m-auto text-center">תינוק תזכורת</h1>
							<h5 className="m-auto text-center">{util.getTimeInDayGreet()}<br />{displayName}!</h5>
						</header>
						<div className="container d-flex align-items-center body-content">
								{
									isLoggedIn ?
									<BabiesDataTableContainer />
									:
									<p>
										משתמש לא מחובר למערכת...
										אתה מופנה להתחברות.
									</p>
								}
						</div>
						<footer onClick={() => analytics('CLICK_ON_FOOTER')} className="ltr text-center blockquote-footer">
							Made by Waffle (v{consts.APP_VERSION})
						</footer>
						{
							isLoggedIn &&
							<div
								style={{ position: 'fixed', bottom: '1em', right: '1em'}}
							>
								<Fab onClick={() => firebase.auth().signOut()} color="secondary" aria-label="edit">
									<LogoutIcon />
								</Fab>
							</div>
						}
					</div>
				</MuiPickersUtilsProvider>
			</RTL>
  	);
	}
}

const mapStateToProps = (state: any) => ({
	isLoading: !state.firebase.auth.isLoaded,
	isLoggedIn: !state.firebase.auth.isEmpty,
	displayName: state.firebase.auth.displayName
})

export default connect(mapStateToProps)(App);
