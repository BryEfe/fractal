import { initializeApp } from "firebase/app"
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, getDoc, doc } from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: process.env.REACT_APP_API_KEY,
 authDomain: process.env.REACT_APP_AUTH_DOMAN,
 projectId: process.env.REACT_APP_projectId,
 storageBucket: process.env.REACT_APP_storageBucket,
 messagingSenderId: process.env.REACT_APP_messagingSenderId,
 appId: process.env.REACT_APP_appId,
 measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const collectionF = collection;

export const onSnapshotF = onSnapshot;

export const addDocF = addDoc;

export const serverTimestampF = serverTimestamp;

export const deleteDocF = deleteDoc;

export const getDocF = getDoc;

export const docF = doc;



