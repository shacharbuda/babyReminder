import React from 'react';
import { Reminder } from '../interfaces';
import { withStyles, WithStyles } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
	reminder: Reminder;
	isUrgent: boolean;
	babyId: number;
	onClick: (ev: any) => void
};

class ReminderColComponent extends React.Component<Props, {}> {

	render() {
		const {reminder, isUrgent, onClick, classes} = this.props;
		const isReminder = !!reminder;

		return (
			isReminder ? 
			<td onClick={onClick} className={isUrgent ? classes.urgent : ''} data-id={reminder.id}>
				{reminder.name}
			</td> :
			<td onClick={() => alert('אין כאן תזכורת הניתנת לעריכה :)')}>
				-
			</td>
		);
	}
}

const styles = {
  urgent: {
		color: 'red'
  },
};

export const ReminderCol = withStyles(styles)(ReminderColComponent)