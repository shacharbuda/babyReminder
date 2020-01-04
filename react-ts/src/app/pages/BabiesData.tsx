import React from 'react';
import { BabyWithRemindersObj } from '../interfaces';
import { BabyDataRow } from '../components/BabyDataRow';

interface Props {
	babies: BabyWithRemindersObj[];
};

export class BabiesData extends React.Component<Props, {}> {
	
	render() {
		return (
		<table className="table-bordered table-hover col-12 text-right" style={{fontSize: "50px"}}>
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
		);
	}
}