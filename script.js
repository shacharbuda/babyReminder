$(document).ready(function() {
	console.log( "ready!" );

	const babies = localStorage.getObj('babies').map((b) => ({...b, birthdate: new Date(b.birthdate)}));

	const tblRows = [];

	babies.forEach((baby, i) => {
		const tblRow = $(`<tr id="row_${i}">
			<td class="name_td">${baby.name}</td>
			<td class="birth_td">${baby.birthdate.toDateString()}</td>
			<td class="reminder_td">###TODO###</td>
		</tr>`);
		tblRows.push(tblRow);
	});

	$('table tbody').append(tblRows)
});