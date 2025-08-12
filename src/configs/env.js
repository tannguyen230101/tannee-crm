/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    notifyEmail: process.env.NOTIFY_EMAIL,
    notifyEmailPass: process.env.NOTIFY_EMAIL_PASS,
    firebaseApiKey: process.env.FIREBASE_API_KEY,
}