import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    projectId: "sipasta",
    authDomain: "sipasta.firebaseapp.com",
    apiKey: "AIzaSyA6_Q_OLEFzirQ9QvyA0saGbw7uDth83lw",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const accessTokenKey = "accessToken"

export function signIn() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            localStorage.setItem(accessTokenKey, token);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function signOut() {
    signOut(auth)
        .then(() => {
            localStorage.removeItem(accessTokenKey);
        })
        .catch((error) => {});
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(accessTokenKey);
    }
    return null;
}