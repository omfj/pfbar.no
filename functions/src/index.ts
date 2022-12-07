import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const createUser = functions.auth.user().onCreate((user) => {
  // eslint-disable-next-line object-curly-spacing
  const { uid, email, displayName } = user;

  return admin.firestore().collection("users").doc(uid).set({
    email,
    displayName,
  });
});
