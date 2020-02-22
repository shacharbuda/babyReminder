const getReduxLogger = () => {
	// Use require for loading only if func is called
	const { createLogger } = require(`redux-logger`);

	// Make sure reduxFirestore updates remain collpased as it contains many unused data..
	const logger = createLogger({
		collapsed: (getState, action) => action.type.startsWith('@@reduxFirestore')
	});

	return logger;
}

export default getReduxLogger;