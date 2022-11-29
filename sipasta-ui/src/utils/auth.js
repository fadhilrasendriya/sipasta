import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    projectId: `${process.env.PROJECT_ID}`,
    authDomain: `${process.env.AUTH_DOMAIN}`,
    apiKey: `${process.env.API_KEY}`,
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const idTokenKey = "idToken"

export async function signIn() {
    await signInWithPopup(auth, provider);
    const token = await auth.currentUser.getIdToken();
    localStorage.setItem(idTokenKey, token);
}

export function signOut() {
    localStorage.removeItem(idTokenKey);
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(idTokenKey);
    }
    return null;
}