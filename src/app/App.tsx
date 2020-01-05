import React from 'react';
import './App.css';
import { BabiesDataPage } from './pages/BabiesDataPage';
import { EditBabyPage } from './pages/EditBabyPage';
import { Baby } from './interfaces';
import { EDIT_FORM_URL } from './utils/constants';
import persistence from './utils/persistence';

class App extends React.Component<{}, {isEditForm: boolean}> {
	// No need of state as static.
	babies: Baby[] = []
	isEditForm: boolean;

	constructor(props: {}) {
		super(props);
		persistence.initData();
		this.babies = persistence.getBabies();
		this.isEditForm = window.location.pathname.includes(EDIT_FORM_URL);
	}

  render() {
		return (
    <div className="App">
			<header>
				<h1 className="h1 text-center pt-5">תינוק תזכורת</h1>
			</header>
			<div className="container d-flex align-items-center body-content">
				{
					this.isEditForm ?
					<EditBabyPage /> :
					<BabiesDataPage babies={this.babies}/>
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
