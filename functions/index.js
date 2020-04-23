const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  // TODO: Man how do i get dev or prod?
  credential: admin.credential.cert(require('./keys/firebase-admin-dev.json'))
});
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {
  console.log('helloWorld()');
  const message = 'Hi there this is a test';

  try {
    const { docs } = await db.collection(`users`).get();
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

    response.send("Hello from Firebase!");

  } catch(err) {
    console.error('error ?', err);
    response.status(500);
    return response.send(err);
  }
});


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}