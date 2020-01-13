import React from 'react';
import { Reminder, Baby } from '../interfaces';
import { getReminderForAge, getAgeInMonths } from '../utils/util';
import { ReminderCol } from './ReminderCol';
import { TableRow, TableCell, withStyles, Theme, WithStyles } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
	baby: Baby;
	id: number;
	onReminderClick: (reminderId: number, babyId: number) => void
};


class BabyDataRowComponent extends React.Component<Props, {}> {

	render() {
		const { baby, id: babyId, onReminderClick, classes } = this.props;
		const ageInMonths = getAgeInMonths(baby.birthdate);
		const nextReminder = getReminderForAge(ageInMonths) as Reminder;
		const isReminderSeen = nextReminder ? baby.seenReminders.includes(nextReminder.id) : false;
		const isReminderUrgent = nextReminder && !isReminderSeen && nextReminder.months === ageInMonths;

		return (
			<TableRow className={classes.tableRow} hover key={babyId}>
				<TableCell align="center" component="th" scope="row">{baby.name}</TableCell>
				<TableCell align="center">{baby.birthdate.toDateString()}</TableCell>
				<ReminderCol className="reminder_col" reminder={nextReminder} isUrgent={isReminderUrgent} babyId={babyId} onClick={() => onReminderClick(nextReminder.id, babyId)} />
			</TableRow>
		);
	}
}

const styles = (theme: Theme) => ({
	tableRow: {
			'&:hover': {
				'& .reminder_col': {
					transform: 'scale(1.5)'
				}
			},
			'& .reminder_col': {
				transition: 'transform 0.3s'
			}
		}
});

export const BabyDataRow = withStyles(styles)(BabyDataRowComponent);

