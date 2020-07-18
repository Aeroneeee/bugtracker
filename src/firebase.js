import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
	apiKey: "AIzaSyB0vYfkynt9W7ftNaKh64l9SyDRsplhPHk",
	authDomain: "bugtracking-app.firebaseapp.com",
	databaseURL: "https://bugtracking-app.firebaseio.com",
	projectId: "bugtracking-app",
	storageBucket: "bugtracking-app.appspot.com",
	messagingSenderId: "389285403516",
	appId: "1:389285403516:web:8dda343bf4eaeb804562f9",
	measurementId: "G-PPDCSEWTP4",
});

const firestore = app.firestore();
const auth = app.auth();
const storage = app.storage();

export { firestore, auth, storage };

//firebase.firestore()
//firebase.auth()
