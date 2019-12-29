import React from 'react';
import './App.css';

class App extends React.Component<{}, {}> {

  render() {
		return (
    <div className="App">
      
		<header>
			<h1 className="h1 text-center pt-5">תינוק תזכורת</h1>
		</header>
		<div className="container d-flex align-items-center">
			<table className="table-bordered table-hover col-12 text-right" style={{fontSize: "50px"}}>
				<thead>

					<th>שם</th>
					<th>תאריך לידה</th>
					<th className="table-danger">תזכורת הבאה</th>
				</thead>
				<tbody>
					{/* Here we'll add rows by js */}
				</tbody>
			</table>
		</div>
		<footer className="text-center blockquote-footer" dir="ltr">
			Made by Waffle
		</footer>
  
    </div>
  	);
	}
}

export default App;
