$(document).ready(() => {
	let params;
	try {	
		params = getJsonFromUrl();
		if (Object.keys(params).length < 3) {
			throw new Error('not enough params');
		}
	} catch (e) {
		alert('יש כאן באג\nאתה מוחזר לעמוד הקודם\n\n' + e);
		window.history.back();
	}
	let { reminderId, babyId, babyReminderId } = params;
	
	const reminder = localStorage.getObj('reminders')[reminderId];
	const baby = localStorage.getObj('babies')[babyId];
	const babyReminders = localStorage.getObj('babyReminders')[babyReminderId];
	const { seenRemindersId } = babyReminders;

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

	const isSeen = seenRemindersId.includes(reminderId);
	$('form .form-group > input#reminder-seen').prop('checked', isSeen);

	$('#submit-btm').click(function() {
		const currData = localStorage.getObj('babyReminders');
		const isSeenChecked = $('form .form-group > input#reminder-seen').prop('checked');
		if (isSeenChecked) {
			currData[babyReminderId].seenRemindersId.push(reminderId);
		}

		localStorage.setObj('babyReminders', currData);
		// Return to index.html
		window.location.href = 'index.html';		
	});
})