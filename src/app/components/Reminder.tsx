import React from 'react';
import { Reminder } from '../interfaces';
import { paramsObjToUrl } from '../utils/util';
import { EDIT_FORM_URL } from '../utils/constants';

interface Props {
	reminder: Reminder;
	isSeen: boolean;
	babyId: number;
};

export class ReminderCol extends React.Component<Props, {}> {
	onReminderClick = () => {
		const params = {
			reminderId: this.props.reminder.id,
			babyId: this.props.babyId
		};
	
		const paramsStr = paramsObjToUrl(params);
	
		window.location.href = `${EDIT_FORM_URL}?${paramsStr}`;
	}

	render() {
		const {reminder, isSeen} = this.props;
		const isReminder = !!reminder;

		return (
			isReminder ? 
			<td onClick={this.onReminderClick} className={`reminder_td ${isSeen ? 'seen' : ''}`} data-id={reminder.id}>
				{reminder.name}
			</td> :
			<td onClick={() => alert('אין כאן תזכורת הניתנת לעריכה :)')}>
				-
			</td>
		);
	}
}