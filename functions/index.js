const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
  console.log('context.after.data() ?', context.after.data());
  const message = 'Hi there this is a test';

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

    console.log("Hello from Firebase!");
  } catch(err) {
    console.error('error ?', err);
    return;
  }
}));


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}