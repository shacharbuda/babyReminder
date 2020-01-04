import React from 'react';
import { BabyWithRemindersObj } from '../interfaces';

interface Props {
	baby: BabyWithRemindersObj;
};


export class BabyDataRow extends React.Component<Props, {}> {
	// // babies.forEach((baby, babyId) => {
		// 	const ageInMonths = getAgeInMonths(baby.birthdate);
		// 	const reminder = getReminderForAge(ageInMonths);
		// 	const reminderId = reminder ? reminders.findIndex((r) => r === reminder) : '';
	
		// 	const isReminderSeen = baby.seenReminders.includes(reminderId);
	
		// 	const tblRow = $(`<tr id="baby_${babyId}" data-id="${baby.id}">
		// 		<td class="name_td">${baby.name}</td>
		// 		<td class="birth_td">${baby.birthdate.toDateString()}</td>
		// 		<td class="reminder_td ${isReminderSeen ? 'seen' : ''}" data-id="${reminderId}">${reminder ? reminder.name : '-'}</td>
		// 	</tr>`);
	
		// 	$(tblRow).children(`td.reminder_td`).click(function() {
		// 		if (reminderId !== 0  && !reminderId) {
		// 			return alert('אין כאן תזכורת הניתנת לעריכה :)');
		// 		}
		// 		const formUrl = 'editBabyReminder.html';
		// 		const params = {
		// 			reminderId,
		// 			babyId
		// 		};
	
		// 		const paramsStr = paramsObjToUrl(params);
			
		// 		window.location.href = `${formUrl}?${paramsStr}`;
		// 	});
	
		// 	tblRows.push(tblRow);
	render() {
		return (
		<p>Baby row Data With Baby {this.props.baby.name}</p>
		);
	}
}