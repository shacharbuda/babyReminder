import React from 'react';
import { BabyWithRemindersObj } from '../interfaces';
import { BabyDataRow } from './BabyDataRow';

interface Props {
	babies: BabyWithRemindersObj[];
};

export class BabiesData extends React.Component<Props, {}> {
	
	render() {
		return (
		<table className="table-bordered table-hover col-12 text-right" style={{fontSize: "50px"}}>
						<thead>
							<th>שם</th>
							<th>תאריך לידה</th>
							<th className="table-danger">תזכורת הבאה</th>
						</thead>
						<tbody>
							{this.props.babies.map((baby) => {
								<BabyDataRow baby={baby} />
							})}
						</tbody>
					</table>
		);
	}
}