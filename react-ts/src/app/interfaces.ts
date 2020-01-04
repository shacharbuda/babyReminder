export interface Reminder {
	name: String;
	months: number;
};

export interface Baby {
	name: String;
	birthdate: Date;
	seenReminders: String[];
};

export interface BabyWithRemindersObj {
	name: String;
	birthdate: Date;
	seenReminders: Reminder[];
}