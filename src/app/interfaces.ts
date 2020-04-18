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
	babyId: string;
	reminderId: string;
}

import { FirebaseFirestore } from '@firebase/firestore-types'
import { FirebaseApp } from '@firebase/app-types'

export interface Firebase extends FirebaseApp {};
export interface FireStore extends FirebaseFirestore {};

export type DBFunction = (firestore: FireStore, firebase: Firebase) => Promise<void>;