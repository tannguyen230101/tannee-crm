const admin = require("firebase-admin");
const config = require('../../configs/env')
let firebaseApp;

function initFirebase() {
  if (!firebaseApp) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebaseProjectId,
        clientEmail: config.firebaseClientEmail,
        privateKey: config.firebasePrivateKey,
      }),
    });
    console.log("Firebase Admin initialized");
  }
  return firebaseApp;
}

function getAuth() {
  if (!firebaseApp) {
    initFirebase();
  }
  return admin.auth();
}

// initFirebase();

module.exports = { initFirebase, getAuth };
