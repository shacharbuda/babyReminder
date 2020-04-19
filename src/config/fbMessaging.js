export default function createFbMessaging(firebase) {
  const messaging = firebase.messaging();

	const initMessaging = async () => {
    // TODO: handle rejection better
    try {
      const granted = await Notification.requestPermission();
      if (granted === 'granted') {
        console.log('granted');
      } else if (granted === 'default') {
        throw new Error('no permission..');
      } else {
        throw new Error('blocked permission');
      }
    } catch(e) {
      console.error(e);
      return null;
    }
    const token = await messaging.getToken();
    return token;
  }

  return {
    initMessaging,
    onTokenRefresh: messaging.onTokenRefresh
  };
}