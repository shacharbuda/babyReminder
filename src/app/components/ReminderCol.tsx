import React from 'react';
import { Reminder } from '../interfaces';

interface Props {
	reminder: Reminder;
	isSeen: boolean;
	babyId: number;
	onClick: (ev: any) => void
};

export class ReminderCol extends React.Component<Props, {}> {

	render() {
		const {reminder, isSeen, onClick} = this.props;
		const isReminder = !!reminder;

		return (
			isReminder ? 
			<td onClick={onClick} className={`reminder_td ${isSeen ? 'seen' : ''}`} data-id={reminder.id}>
				{reminder.name}
			</td> :
			<td onClick={() => alert('אין כאן תזכורת הניתנת לעריכה :)')}>
				-
			</td>
		);
	}
}