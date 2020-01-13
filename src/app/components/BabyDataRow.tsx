import React from 'react';
import { Reminder, Baby } from '../interfaces';
import { getReminderForAge, getAgeInMonths } from '../utils/util';
import { ReminderCol } from './ReminderCol';

interface Props {
	baby: Baby;
	id: number;
	onReminderClick: (reminderId: number, babyId: number) => void
};


export class BabyDataRow extends React.Component<Props, {}> {

	render() {
		const { baby, id: babyId, onReminderClick } = this.props;
		const ageInMonths = getAgeInMonths(baby.birthdate);
		const nextReminder = getReminderForAge(ageInMonths) as Reminder;
		const isReminderSeen = nextReminder ? baby.seenReminders.includes(nextReminder.id) : false;
		const isReminderUrgent = nextReminder && !isReminderSeen && nextReminder.months === ageInMonths;

		return (
			<tr id={`baby_${babyId}`} data-id={babyId}>
				<td className="name_td">{baby.name}</td>
				<td className="birth_td">{baby.birthdate.toDateString()}</td>
				<ReminderCol reminder={nextReminder} isUrgent={isReminderUrgent} babyId={babyId} onClick={() => onReminderClick(nextReminder.id, babyId)} />
			</tr>
		);
	}
}