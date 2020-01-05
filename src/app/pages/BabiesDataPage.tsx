import React from 'react';
import { Baby } from '../interfaces';
import { BabyDataRow } from '../components/BabyDataRow';

interface Props {
	babies: Baby[];
};

export class BabiesDataPage extends React.Component<Props, {}> {
	
	render() {
		return (
			<div id="babies-table-wrapper" className="h-100 overflow-auto col-12">
				<table className="table-bordered h-100 w-100 table-hover text-right" style={{fontSize: "30px"}}>
						<thead>
							<tr>
								<th>שם</th>
								<th>תאריך לידה</th>
								<th className="table-danger">תזכורת הבאה</th>
							</tr>
						</thead>
						<tbody>
							{this.props.babies.map((baby, babyId) => <BabyDataRow key={`BabyRow_${babyId}`} baby={baby} id={babyId} />)}
						</tbody>
					</table>
			</div>
		);
	}
}