import { initializeApp } from "firebase/app"
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, setDoc, getDoc, query, where } from "@firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: process.env.REACT_APP_API_KEY,
 authDomain: process.env.REACT_APP_AUTH_DOMAIN,
 projectId: process.env.REACT_APP_projectId,
 storageBucket: process.env.REACT_APP_storageBucket,
 messagingSenderId: process.env.REACT_APP_messagingSenderId,
 appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const collectionF = collection;

export const onSnapshotF = onSnapshot;

export const addDocF = addDoc;

export const serverTimestampF = serverTimestamp;

export const deleteDocF = deleteDoc;

export const docF = doc;

export const getStorageF = getStorage;

export const sRef = ref;

export const uploadBytesResumableF = uploadBytesResumable;

export const getDownloadURLF = getDownloadURL;

export const createUserWithEmailAndPasswordF = createUserWithEmailAndPassword;

export const signInWithEmailAndPasswordF = signInWithEmailAndPassword;

export const onAuthStateChangedF = onAuthStateChanged;

export const signOutF = signOut;

export const auth = getAuth(app);

export const updateProfileF = updateProfile;

export const setDocF = setDoc;

export const getDocF = getDoc;

export const queryF = query;

export const whereF = where;




