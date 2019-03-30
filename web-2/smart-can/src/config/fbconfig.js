import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBVpYtaMtpbmnH4NGtwdv4xAoYknoSYFYY",
    authDomain: "smart-can-dc74d.firebaseapp.com",
    databaseURL: "https://smart-can-dc74d.firebaseio.com",
    projectId: "smart-can-dc74d",
    storageBucket: "smart-can-dc74d.appspot.com",
    messagingSenderId: "746929297231"
};

firebase.initializeApp(config);

export default firebase;