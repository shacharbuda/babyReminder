import React from 'react';
import { Baby } from '../interfaces';
import util from '../utils/util';
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
		const ageInMonths = util.getAgeInMonths(baby.birthdate);
		const nextReminder = util.getBabyNextReminder(baby.seenReminders, util.getAllReminders());
		const isReminderUrgent = nextReminder && nextReminder.months <= ageInMonths;

		return (
			<TableRow className={classes.tableRow} hover key={babyId}>
				<TableCell align="center" component="th" scope="row">{baby.name}</TableCell>
				<TableCell align="center">{util.dateToStr(baby.birthdate)} - {ageInMonths} חודשים</TableCell>
				<TableCell align="center">{baby.garden}</TableCell>
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

