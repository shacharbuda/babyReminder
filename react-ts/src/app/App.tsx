import React from 'react';
import './App.css';
import { BabiesData } from './pages/BabiesData';
import {getBabiesWithRemindersObj} from './utils/util'
import { BabyWithRemindersObj } from './interfaces';

class App extends React.Component<{}, {}> {
	// No need of state as static.
	mappedBabbies: BabyWithRemindersObj[] = []

	constructor(props: {}) {
		super(props);
		this.mappedBabbies = getBabiesWithRemindersObj();
	}

  render() {
		return (
    <div className="App">
			<header>
				<h1 className="h1 text-center pt-5">תינוק תזכורת</h1>
			</header>
			<div className="container d-flex align-items-center">
				<BabiesData babies={this.mappedBabbies}/>
			</div>
			<footer className="text-center blockquote-footer" dir="ltr">
				Made by Waffle
			</footer>
    </div>
  	);
	}
}

export default App;
