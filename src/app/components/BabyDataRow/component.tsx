import React from 'react';
import { Baby } from '../../interfaces';
import util from '../../utils/util';
import { ReminderCol } from '../ReminderCol';
import { TableRow, TableCell, withStyles, Theme, WithStyles, Fab } from '@material-ui/core';
import { Reminder } from '../../interfaces';
import { Delete as RemoveIcon } from '@material-ui/icons';

interface Props extends WithStyles<typeof styles> {
	baby: Baby;
	reminders: Reminder[];
	onReminderClick: (reminderId: number, babyId: number) => void;
	removeBaby: (id: number) => void;
	// TODO: del
	isMess: boolean;
};


class BabyDataRowComponent extends React.Component<Props, {}> {

	onRemoveClick = () => {
		const { baby, removeBaby } = this.props;
		const isToRemove = window.confirm(`האם את בטוחה שברצונך למחוק את התינוק ${baby.name}`);

		if (!isToRemove) return;

		removeBaby(baby.id);
	}

	render() {
			// TODO: del
		const { baby, onReminderClick, classes, reminders, isMess } = this.props;
		const { id: babyId } = baby;
		const ageInMonths = util.getAgeInMonths(baby.birthdate);
		const nextReminder = util.getBabyNextReminder(baby.seenReminders, reminders);
		const isReminderUrgent = nextReminder && nextReminder.months <= ageInMonths;

		return (
			<TableRow style={isMess ? {backgroundColor: 'red'} : {}} className={classes.tableRow} hover key={babyId}>
				<TableCell align="center" component="th" scope="row">{baby.name}</TableCell>
				<TableCell align="center">{util.dateToStr(baby.birthdate)} - {ageInMonths} חודשים</TableCell>
				<TableCell align="center">{baby.garden}</TableCell>
				<ReminderCol className="reminder_col" reminder={nextReminder} isUrgent={isReminderUrgent} onClick={() => onReminderClick(nextReminder.id, babyId)} />
				<TableCell align="center">
					<Fab color="secondary" variant="extended" size="small" onClick={this.onRemoveClick}>
						<RemoveIcon />
					</Fab>
				</TableCell>
			</TableRow>
		);
	}
}

const styles = (theme: Theme) => ({
	tableRow: {
			'&:hover': {
				'& .reminder_col': {
					fontWeight: 'bold'
				}
			},
			'& .reminder_col': {
				transition: 'transform 0.3s'
			},
			// Take care of table cell padding
			'& .MuiTableCell-root': {
				padding: '7px 4px 7px 0'
			}
		}
});

export const BabyDataRow = withStyles(styles)(BabyDataRowComponent);

