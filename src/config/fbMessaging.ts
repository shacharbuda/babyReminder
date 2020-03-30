import { FirebaseMessaging } from '@firebase/messaging-types'

async function initMessaging(firebase) {
  const messaging: FirebaseMessaging = firebase.messaging();

  try {
    await Notification.requestPermission();
    const token = await messaging.getToken();
    console.log('token ?', token);
    alert(token)

    messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
      const { title, ...options } = payload.notification;
      console.log('options ?', options);
      alert('msg: ' + title)
    }, err => console.log('err ?', err));
  } catch(e) {
    console.log('No Permission ?', e);
    alert(e)
  }

}

export default initMessaging;