export interface Reminder {
	name: string;
	months: number;
	id: number;
};

export interface Baby {
	name: string;
	birthdate: Date;
	garden: string;
	seenReminders: number[];
	comments: string;
};

export interface BabyDB extends Baby {
	id: number;
}