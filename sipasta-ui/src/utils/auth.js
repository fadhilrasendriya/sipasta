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

export const accessTokenKey = "accessToken"

export async function signIn() {
    const res = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    localStorage.setItem(accessTokenKey, token);
}

export function signOut() {
    localStorage.removeItem(accessTokenKey);
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(accessTokenKey);
    }
    return null;
}