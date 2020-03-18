import { Reminder, ReminderRef } from "../interfaces";
import _ from 'lodash';

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

const getBabyNextReminder = (babySeenReminders: ReminderRef[], reminders: Reminder[]) : Reminder => {
	// Notice we count of reminders to be sorted from earliest to latest
	// find returns first object who doesn't includes in babySeenReminders
	const babySeenRemindersIds = babySeenReminders.map(r => r.id);
	return _.find(reminders, r => !babySeenRemindersIds.includes(r.id));
}

const stringToDate = (str: string, sep: string = '.'): Date => {
	const parts = str.split(sep);
	const day = parseInt(parts[1]).toFixed(2);
	const month = parseInt(parts[1]).toFixed(2);
	const year = '20' + parts[2];

	return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

const dateToStr = (date: Date): string => `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;

const getTimeInDayGreet = (currentTime = new Date()) => {
  const currentHour = currentTime.getHours()
  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return 'צהריים טובים';
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return 'ערב טוב';
  }
  // Between dawn and noon
  return 'בוקר טוב';
}


export default {
	getJsonFromUrl,
	paramsObjToUrl,
	getAgeInMonths,
	stringToDate,
	dateToStr,
	getBabyNextReminder,
	getTimeInDayGreet
}