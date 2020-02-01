export interface Reminder {
	name: string;
	months: number;
	id: number;
};

export interface Baby {
	// id: number;
	name: string;
	birthdate: Date;
	garden: string;
	seenReminders: number[];
	comments: string;
};