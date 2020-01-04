import React, { FormEvent } from 'react';
import util from '../utils/util';
import persistence, { PERSISTENCE_CODES, getReminders, getBabies } from '../utils/persistence';
import { Baby, Reminder } from '../interfaces';
import { HOME_URL } from '../utils/constants';

interface Props {
};

interface State {
	isSeen: boolean;
}

export class EditBabyPage extends React.Component<Props, State> {
	baby!: Baby;
	babyId!: number;
	reminder!: Reminder;

	constructor(props: Props) {
		super(props);

		let params: {
			reminderId: number;
			babyId: number;
		};

		try {	
			params = util.getJsonFromUrl();
			if (Object.keys(params).length < Object.keys(PERSISTENCE_CODES).length) {
				throw new Error('not enough params');
			}
		} catch (e) {
			alert('יש כאן באג\nאתה מוחזר לעמוד הקודם\n\n' + e);
			window.history.back();
			return;
		}

		const { reminderId , babyId } = params;
		
		this.reminder = getReminders()[reminderId];
		this.baby = getBabies()[babyId];
		this.babyId = babyId;
		const { seenReminders } = this.baby;

		this.state = {
			isSeen: seenReminders.includes(this.reminder.id)
		}
	}

	handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const currBabiesData: Baby[] = persistence.getObj(PERSISTENCE_CODES.BABIES) || [];
		const isSeenChecked = this.state.isSeen;
		const currSeenReminders = currBabiesData[this.babyId].seenReminders;
		const reminderId = this.reminder.id;
	
		const indexInSeenReminders = currSeenReminders.findIndex((r) => r === reminderId);
		const isReminderExistInCurrData =  indexInSeenReminders > -1;

		// Update by isSeenChecked
		if (isSeenChecked && !isReminderExistInCurrData) {
			// Add to seenReminders (only if not exists already).
			currSeenReminders.push(reminderId);
		} else if (!isSeenChecked && isReminderExistInCurrData) {
			// Remove from seenReminders (only if found). Remove only this one element
			currSeenReminders.splice(indexInSeenReminders, 1);
		}

		// Note: even though arr updated on data, we still have to call setObj as
		// localStorage is basically string-based!!
		localStorage.setObj(PERSISTENCE_CODES.BABIES, currBabiesData);
		// Return to home.
		this.goHome();
	}

	goHome() {
		window.location.href = HOME_URL;		
	}

	render() {
		const {baby, reminder } = this;

		return (
			<div className="mx-auto text-right">
				<form className="text-right mb-2" onSubmit={this.handleSubmit}>
					<div className="form-group text-right text-info">
						<label htmlFor="baby-name">שם תינוק</label>
						<input type="text" value={baby.name} readOnly className="form-control" id="baby-name"/>
					</div>
					<div className="form-group text-right text-info">
						<label htmlFor="baby-birthday">תאריך לידה</label>
						<input type="date" readOnly value={baby.birthdate.toISOString().slice(0,10)} className="form-control" id="baby-birthday"/>
					</div>
					<div className="form-group text-right text-info">
						<label htmlFor="reminder-months">גיל הופעת תזכורת (חודשים)</label>
						<input type="text" readOnly value={reminder.months} className="form-control" id="reminder-months" aria-describedby="reminder-months-help"/>
						<small id="reminder-months-help" className="form-text text-muted">בעתיד יהיה ניתן לערוך שדה זה.</small>
					</div>
					<div className="form-group text-right text-info">
						<label htmlFor="reminder-name">שם תזכורת</label>
						<input type="text" readOnly value={reminder.name} className="form-control" id="reminder-name"/>
					</div>
					<div className="form-check text-right text-info form-check">
						<input checked={this.state.isSeen} onChange={({target}) => this.setState({isSeen: target.checked})} type="checkbox" className="form-check-input" id="reminder-seen"/>
						<label className="form-check-label" htmlFor="reminder-seen">סיימתי עם התזכורת</label>
					</div>
					<button id="submit-btm" type="submit" className="btn btn-primary">עדכן</button>
				</form>
				<button className="btn btn-warning" onClick={this.goHome}>חזור לטבלה</button>
			</div>
		);
	}
}