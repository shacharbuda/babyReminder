import React from 'react';
import { Reminder, Baby } from '../interfaces';
import { getReminderForAge, getAgeInMonths } from '../utils/util';
import { ReminderCol } from '../components/Reminder';

interface Props {
	baby: Baby;
	id: number;
};


export class BabyDataRow extends React.Component<Props, {}> {

	render() {
		const { baby, id: babyId } = this.props;
		const ageInMonths = getAgeInMonths(baby.birthdate);
		const nextReminder = getReminderForAge(ageInMonths) as Reminder;
		const isReminderSeen = nextReminder ? baby.seenReminders.includes(nextReminder.id) : false;

		return (
			<tr id={`baby_${babyId}`} data-id={babyId}>
				<td className="name_td">{baby.name}</td>
				<td className="birth_td">{baby.birthdate.toDateString()}</td>
				<ReminderCol reminder={nextReminder} isSeen={isReminderSeen} babyId={babyId} />
			</tr>
		);
	}
}