const babies = localStorage.getObj(LOCAL_STORAGE_CODES.BABIES).map((b) => ({...b, birthdate
	: new Date(b.birthdate)}));
const reminders = localStorage.getObj(LOCAL_STORAGE_CODES.REMINDERS);

$(document).ready(function() {
	const tblRows = [];

	babies.forEach((baby, babyId) => {
		const ageInMonths = getAgeInMonths(baby.birthdate);
		const reminder = getReminderForAge(ageInMonths);
		const reminderId = reminder ? reminders.findIndex((r) => r === reminder) : '';

		const isReminderSeen = baby.seenReminders.includes(reminderId);

		const tblRow = $(`<tr id="baby_${babyId}" data-id="${baby.id}">
			<td class="name_td">${baby.name}</td>
			<td class="birth_td">${baby.birthdate.toDateString()}</td>
			<td class="reminder_td ${isReminderSeen ? 'seen' : ''}" data-id="${reminderId}">${reminder ? reminder.name : '-'}</td>
		</tr>`);

		$(tblRow).children(`td.reminder_td`).click(function() {
			if (reminderId !== 0  && !reminderId) {
				return alert('אין כאן תזכורת הניתנת לעריכה :)');
			}
			const formUrl = 'editBabyReminder.html';
			const params = {
				reminderId,
				babyId
			};

			const paramsStr = paramsObjToUrl(params);
		
			window.location.href = `${formUrl}?${paramsStr}`;
		});

		tblRows.push(tblRow);
	});

	$('table tbody').append(tblRows);
});

const getAgeInMonths = (birthday) => {
	const today = new Date();

	const years = today.getFullYear() - birthday.getFullYear();
	const months = today.getMonth() - birthday.getMonth();

	const ageInMonths = years * 12 + months;

	return (ageInMonths);
}

const getReminderForAge = (ageInMonths) => {
	let indexOfSmallestRangeReminder = -1;

	reminders.reduce((accum, currReminder, i) => {
		// Notice we want to get the min range from future reminders.
		// At this point, we don't care about past reminders.
		const smallestRange = Math.min(accum, currReminder.months - ageInMonths);
		if (smallestRange >= 0 && smallestRange < accum) {
			indexOfSmallestRangeReminder = i;
			return (smallestRange);
		}

		return (accum)

	}, Math.min());

	if (indexOfSmallestRangeReminder < 0) {
		// Can't found future event
		return (null)
	}

	return reminders[indexOfSmallestRangeReminder];
}