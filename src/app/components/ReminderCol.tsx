import React from 'react';
import { Reminder } from '../interfaces';
import { withStyles, WithStyles, TableCell } from '@material-ui/core';

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
			<TableCell onClick={onClick} className={`${classes.clickable} ${isUrgent ? classes.urgent : ''}`} data-id={reminder.id}>
				{reminder.name}
			</TableCell> :
			<TableCell onClick={() => alert('אין כאן תזכורת הניתנת לעריכה :)')}>
				-
			</TableCell>
		);
	}
}

const styles = {
	clickable: {
		color: '#007bff',
		textDecoration: 'underline',
		cursor: 'pointer',
		fontWeight: 600
	},
  urgent: {
		color: 'red'
  },
};

export const ReminderCol = withStyles(styles)(ReminderColComponent)