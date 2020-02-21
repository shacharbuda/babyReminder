export interface Reminder {
	name: string;
	months: number;
	id: string;
};

export type ReminderRef = firebase.firestore.DocumentReference<Reminder>;

export interface BabyNew {
	firstName: string;
	lastName: string;
	birthdate: Date;
	garden: string;
	seenReminders: ReminderRef[];
	comments: string;
}
export interface Baby extends Omit<BabyNew, 'birthdate'> {
	id: string;
	birthdate: firebase.firestore.Timestamp
};

export interface BabyReminder {
	babyId: number;
	reminderId: number;
}