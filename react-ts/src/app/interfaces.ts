export interface Reminder {
	name: String;
	months: number;
	id: number;
};

export interface Baby {
	name: String;
	birthdate: Date;
	seenReminders: number[];
};

export interface BabyWithRemindersObj {
	name: String;
	birthdate: Date;
	seenReminders: Reminder[];
}