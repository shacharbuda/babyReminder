const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');

const TIME_ZONE = 'Asia/Jerusalem';

admin.initializeApp({
  // TODO: Man how do i get dev or prod?
  credential: admin.credential.cert(require('./keys/firebase-admin-dev.json'))
});
const dbAdmin = admin.firestore();
const db = functions.firestore;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = db.document('users/{userId}')
  .onWrite((async (change, context) => {
  console.log('helloWorld()');
  // console.log('context.after.data() ?', context.after.data());
  await sendMessageToAllUsers();

  console.log('DONE helloWorld()');
}));

const sendMessageToAllUsers = async (message="test message") => {
  try {
    const { docs } = await dbAdmin.collection(`users`).get();
    const payload = {
      notification: {
          title: (new Date()).getDate().toString(),
          body: message,
          icon: '/favicon.ico'
      }
    };

    await asyncForEach(docs, async (doc) => {

      const token = doc.get('token');
      
      await admin.messaging().sendToDevice(token, payload);
      console.log(`Successfully sent message to user ${doc.get('displayName')}`);
    });
  } catch(err) {
    console.error('error ?', err);
    return;
  }
}

// BIG PROBLEM - To execute a scheduled function, we need to enable Billing...
// exports.scheduledFunction = functions.pubsub.schedule('every day at 11:00am')
//   .timeZone(TIME_ZONE)
//   .onRun(async (context) => {
//     const now = moment().format('MMMM Do, h:mm:ss');
//     console.log('scheduledFunction() Running.. Time is ' + now);
//     // Here we'll write the function to check if there are reminders for the authenitacted user
//     // that aren't seen yet. If there are, we'll send a message to the user.
//     await sendMessageToAllUsers(now);
//     console.log('End of scheduledFunction()');
//     return null;
// });


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}