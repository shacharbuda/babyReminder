import React from 'react';
import './App.css';
import { BabiesData } from './pages/BabiesData';
import {getBabiesWithRemindersObj} from './utils/util'
import { BabyWithRemindersObj } from './interfaces';
import { EDIT_FORM_URL } from './utils/constants';

class App extends React.Component<{}, {isEditForm: boolean}> {
	// No need of state as static.
	mappedBabbies: BabyWithRemindersObj[] = []
	isEditForm: boolean;

	constructor(props: {}) {
		super(props);
		this.mappedBabbies = getBabiesWithRemindersObj();
		this.isEditForm = window.location.pathname.includes(EDIT_FORM_URL);
	}

  render() {
		console.log('window.location.pathname.includes(EDIT_FORM_URL) :', window.location.pathname.includes(EDIT_FORM_URL));
		return (
    <div className="App">
			<header>
				<h1 className="h1 text-center pt-5">תינוק תזכורת</h1>
			</header>
			<div className="container d-flex align-items-center">
				{
					this.isEditForm ?
					<p>Thats edit form here</p> :
				<BabiesData babies={this.mappedBabbies}/>
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
