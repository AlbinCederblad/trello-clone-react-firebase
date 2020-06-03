import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    // add code here
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
