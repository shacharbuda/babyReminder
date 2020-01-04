export interface Reminder {
	name: string;
	months: number;
	id: number;
};

export interface Baby {
	name: string;
	birthdate: Date;
	seenReminders: number[];
};

export interface BabyWithRemindersObj {
	name: string;
	birthdate: Date;
	seenReminders: Reminder[];
}