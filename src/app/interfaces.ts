export interface Reminder {
	name: string;
	months: number;
	id: number;
};


export interface BabyNew {
	firstName: string;
	lastName: string;
	birthdate: Date;
	garden: string;
	seenReminders: number[];
	comments: string;
}
export interface Baby extends Omit<BabyNew, 'birthdate'> {
	id: number;
	birthdate: firebase.firestore.Timestamp
};