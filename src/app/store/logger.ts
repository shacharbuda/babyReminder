const getReduxLogger = () => {
	// Use require for loading only if func is called
	const { createLogger } = require(`redux-logger`);

	// Make sure firebase data updates remain collpased as it contains many unused data..
	const logger = createLogger({
		collapsed: (getState, action) => action.type.startsWith('@@reduxFirestore') || action.type.startsWith('@@reactReduxFirebase')
	});

	return logger;
}

export default getReduxLogger;