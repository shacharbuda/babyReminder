$(document).ready(() => {
	let params;
	try {	
		params = getJsonFromUrl();
		if (Object.keys(params).length < LOCAL_STORAGE_CODES.length) {
			throw new Error('not enough params');
		}
	} catch (e) {
		alert('יש כאן באג\nאתה מוחזר לעמוד הקודם\n\n' + e);
		window.history.back();
	}

	const { reminderId, babyId } = params;
	
	const reminder = localStorage.getObj(LOCAL_STORAGE_CODES.REMINDERS)[reminderId];
	const baby = localStorage.getObj(LOCAL_STORAGE_CODES.BABIES)[babyId];
	const {seenReminders} = baby;

	$('#reminder-name-header').text(reminder.name);

	$('form .form-group > input[type=text]').each(function() {
		const id = $(this).attr('id');

		const objName = id.split('-')[0];
		const objProp = id.split('-')[1];

		let objVal;
		switch (objName) {
			case 'baby': 
				objVal = baby[objProp];
				
				break;
			case 'reminder':
				objVal = reminder[objProp];
				
				break;
			default:
				throw new Error('wrong type');
		}

		$(this).val(objVal)
	})

	const babyBirthday = new Date(baby.birthdate).toISOString().slice(0,10);
	$('form .form-group > input#baby-birthday').val(babyBirthday);

	const isSeen = seenReminders.includes(reminderId);
	$('form .form-group > input#reminder-seen').prop('checked', isSeen);

	$('#submit-btm').click(function() {
		const currBabyData = localStorage.getObj(LOCAL_STORAGE_CODES.BABIES);
		const isSeenChecked = $('form .form-group > input#reminder-seen').prop('checked');
		const currSeenReminders = currBabyData[babyId].seenReminders;

		// Update by isSeenChecked
		if (isSeenChecked) {
			// Add to seenReminders
			currSeenReminders.push(reminderId);
		} else {
			// Remove from seenReminders
			const indexInSeenReminders = currSeenReminders.findIndex((r) => r === reminderId);
			// Only remove if found..
			if (indexInSeenReminders > -1) {
				// Remove only this one element
				seenReminders.splice(indexInSeenReminders, 1);
			}
		}

		// Note: even though arr updated on data, we still have to call setObj as
		// localStorage is basically string-based!!
		localStorage.setObj(LOCAL_STORAGE_CODES.BABIES, currBabyData);
		// Return to index.html
		window.location.href = 'index.html';		
	});
})