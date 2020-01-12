import React from 'react';
import { Baby } from '../../interfaces';
import { BabyDataRow } from '../BabyDataRow';
import EditBabyContainer from '../EditBaby';

interface Props {
	babies: Baby[];
};

interface State {
	pickedBabyReminder: {
		babyId: number,
		reminderId: number
	} | null
}

export class BabiesDataTableComponent extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			pickedBabyReminder: null
		};
	}

	onReminderChoose = (reminderId: number, babyId: number) => {
		this.setState({pickedBabyReminder: {
			reminderId,
			babyId
		}});
	}
	
	render() {
		return (
			<div className="h-100 w-100">
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
								{this.props.babies.map((baby, babyId) => <BabyDataRow key={`BabyRow_${babyId}`} baby={baby} id={babyId} onReminderClick={this.onReminderChoose} />)}
							</tbody>
						</table>
				</div>
				{this.state.pickedBabyReminder &&
				<EditBabyContainer isOpen={!!this.state.pickedBabyReminder} onClose={() => this.setState({pickedBabyReminder: null})} pickedBabyReminder={this.state.pickedBabyReminder} />}
			</div>
		);
	}
}