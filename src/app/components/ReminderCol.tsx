import React from 'react';
import { Reminder } from '../interfaces';
import { withStyles, WithStyles, TableCell, TableCellProps } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
	reminder: Reminder;
	isUrgent: boolean;
	babyId: number;
	onClick: (ev: any) => void
};

class ReminderColComponent extends React.Component<Props & TableCellProps, {}> {

	render() {
		const {reminder, isUrgent, onClick, classes, className} = this.props;
		const isReminder = !!reminder;

		return (
			isReminder ? 
			<TableCell align="center" onClick={onClick} className={`${className} ${classes.clickable} ${isUrgent ? classes.urgent : ''}`} data-id={reminder.id}>
				{reminder.name}
			</TableCell> :
			<TableCell align="center" className={`${className} ${classes.unclickable}`} onClick={() => alert('אין כאן תזכורת הניתנת לעריכה :)')}>
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
	unclickable: {
		cursor: 'not-allowed'
	},
  urgent: {
		color: 'red'
  },
};

export const ReminderCol = withStyles(styles)(ReminderColComponent)