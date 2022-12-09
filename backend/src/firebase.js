var admin = require("firebase-admin");
const { getAuth } = require('firebase-admin/auth');
require('dotenv').config()

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // replace `\` and `n` character pairs w/ single `\n` character
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  })
});

const getUserId = async (userToken) => {
  if (userToken === undefined) {
    return null;
  }

  try {
    return await getAuth().verifyIdToken(userToken);
  } catch(err) {
    return null;
  }
}

module.exports = {
  getUserId,
}