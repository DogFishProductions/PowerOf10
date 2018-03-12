import Rebase from "re-base";
import firebase from "firebase";

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDvcx7XjKawUJvYqeerYyZ_jEOQxLQmM58",
    authDomain: "power-of-10.firebaseapp.com",
    databaseURL: "https://power-of-10.firebaseio.com",
    projectId: "power-of-10",
    storageBucket: "power-of-10.appspot.com",
    messagingSenderId: "974809025799"
})

const base = Rebase.createClass(firebaseApp.database());

export default base;
