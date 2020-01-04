import React from 'react';
import './App.css';
import persistence from './utils/persistence';
import { BabiesData } from './pages/BabiesData';

class App extends React.Component<{}, {}> {
	constructor(props: {}) {
		super(props);
		persistence();
	}

  render() {
		return (
    <div className="App">
			<header>
				<h1 className="h1 text-center pt-5">תינוק תזכורת</h1>
			</header>
			<div className="container d-flex align-items-center">
				<BabiesData babies={[]}/>
			</div>
			<footer className="text-center blockquote-footer" dir="ltr">
				Made by Waffle
			</footer>
    </div>
  	);
	}
}

export default App;
