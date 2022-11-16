import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const getUserId = (userToken) => {
  getAuth()
    .verifyIdToken(userToken)
    .then((decodedToken) => {
      return decodedToken.uid;
  })
  .catch((error) => {
    return null
  });
}

module.exports = {
  getUserId,
}