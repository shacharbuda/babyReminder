import { Reminder, Baby, BabyWithRemindersObj } from "../interfaces";
import _ from 'lodash';
import persistence from "./persistence";
import store from '../store';

export function getJsonFromUrl(url?: string) {
  if(!url) url = window.location.search;
  var query = url.substr(1);
  var result: any = {};
  query.split("&").forEach(function(part: string) {
		var item = part.split("=");
		const nextURIComponent = decodeURIComponent(item[1]);
		// Try to parse to int.
		try {
			result[item[0]] = parseInt(nextURIComponent);
			if (isNaN(result[item[0]])) throw new TypeError('NaN');
		} catch(e) {
			result[item[0]] = nextURIComponent;
		}
  });
  return result;
}

export function paramsObjToUrl(params: any) {
	return (Object.keys(params).map((paramKey) => `${paramKey}=${params[paramKey]}`).join('&'));
}

export const getAgeInMonths = (birthday: Date) => {
	const today = new Date();

	const years = today.getFullYear() - birthday.getFullYear();
	const months = today.getMonth() - birthday.getMonth();

	const ageInMonths = years * 12 + months;

	return (ageInMonths);
}

const getAllReminders = (): Reminder[] => {
	return store.getState().reminder as Reminder[];
}

/**
 * @deprecated use getBabyNextReminder instead
 * @param reminders 
 * @param ageInMonths 
 */
const getReminderForAge = (reminders: Reminder[], ageInMonths: number) => {
	let indexOfSmallestRangeReminder = -1;

	reminders.reduce((accum, currReminder: Reminder, i) => {
		// Notice we want to get the min range from future reminders.
		// At this point, we don't care about past reminders.
		const smallestRange = Math.min(accum, currReminder.months - ageInMonths);
		if (smallestRange >= 0 && smallestRange < accum) {
			indexOfSmallestRangeReminder = i;
			return (smallestRange);
		}

		return (accum)

	}, Math.min());

	if (indexOfSmallestRangeReminder < 0) {
		// Can't found future event
		return (null)
	}

	return reminders[indexOfSmallestRangeReminder];
}

const getBabyNextReminder = (babySeenReminders: number[], reminders: Reminder[]) : Reminder => {
	// find returns first object who doesn't includes in babySeenReminders
	return _.find(reminders, r => !babySeenReminders.includes(r.id));
}

export function getBabiesWithRemindersObj(): BabyWithRemindersObj[] {
	const babies: Baby[] = persistence.getBabies();
	const reminders: Reminder[] = persistence.getReminders();

	if (!babies || !babies.length) {
		return [];
	}

	return babies.map(baby => ({
		...baby,
		seenReminders: baby.seenReminders.map(reminderId => reminders[reminderId])
	}));
}

const stringToDate = (str: string, sep: string = '.'): Date => {
	const parts = str.split(sep);
	const day = parseInt(parts[1]).toFixed(2);
	const month = parseInt(parts[1]).toFixed(2);
	const year = '20' + parts[2];

	return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

const dateToStr = (date: Date): string => `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;


export default {
	getJsonFromUrl,
	paramsObjToUrl,
	getAgeInMonths,
	getAllReminders,
	getBabiesWithRemindersObj,
	stringToDate,
	dateToStr,
	getBabyNextReminder
}