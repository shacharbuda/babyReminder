export default function createFbAuthUserFunc(firebase) {
  const authProvider = new firebase.auth.GoogleAuthProvider();
  authProvider.setCustomParameters({
    prompt: 'select_account'
  });
  const authUserFunc = () => firebase.auth().signInWithRedirect(authProvider)

  return authUserFunc;
}