export interface Reminder {
	name: string;
	months: number;
	id: number;
};


export interface BabyNew {
	name: string;
	birthdate: Date;
	garden: string;
	seenReminders: number[];
	comments: string;
}
export interface Baby extends BabyNew {
	id: number;
};