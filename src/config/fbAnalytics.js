import { IS_DEV } from "../app/utils/constants";

export default function createFbAnalytics(firebase) {
	let analyticsVar;
	if (IS_DEV) {
		analyticsVar = (msg) => console.log(`Analytics event: ${msg}`)
	} else {
		analyticsVar = firebase.analytics().logEvent;
	}
	return analyticsVar;
}