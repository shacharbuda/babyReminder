import React from 'react';
import { Baby } from '../../interfaces';
import util from '../../utils/util';
import { ReminderCol } from '../ReminderCol';
import { TableRow, TableCell, withStyles, Theme, WithStyles } from '@material-ui/core';
import { Reminder } from '../../interfaces';

interface Props extends WithStyles<typeof styles> {
	baby: Baby;
	reminders: Reminder[];
	onReminderClick: (reminderId: number, babyId: number) => void;
	removeBaby: (id: number) => void;
};


class BabyDataRowComponent extends React.Component<Props, {}> {

	onRemoveClick = () => {
		const { baby, removeBaby } = this.props;
		const isToRemove = window.confirm(`האם את בטוחה שברצונך למחוק את התינוק ${baby.name}`);

		if (!isToRemove) return;

		removeBaby(baby.id);
	}

	render() {
		const { baby, onReminderClick, classes, reminders } = this.props;
		const { id: babyId } = baby;
		const ageInMonths = util.getAgeInMonths(baby.birthdate);
		const nextReminder = util.getBabyNextReminder(baby.seenReminders, reminders);
		const isReminderUrgent = nextReminder && nextReminder.months <= ageInMonths;

		return (
			<TableRow className={classes.tableRow} hover key={babyId}>
				<TableCell align="center" component="th" scope="row">{baby.name}</TableCell>
				<TableCell align="center">{util.dateToStr(baby.birthdate)} - {ageInMonths} חודשים</TableCell>
				<TableCell align="center">{baby.garden}</TableCell>
				<ReminderCol className="reminder_col" reminder={nextReminder} isUrgent={isReminderUrgent} onClick={() => onReminderClick(nextReminder.id, babyId)} />
				<TableCell align="center" onClick={this.onRemoveClick}>click</TableCell>
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

