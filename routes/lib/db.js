// connect to firebase
var firebase = require("firebase");
var admin = require("firebase-admin");
var serviceAccount = require("../../jooyin-3c5d4-firebase-adminsdk-uovl6-eac3e52b16.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jooyin-3c5d4.firebaseio.com"
});

var firebaseConfig = {
    apiKey: "AIzaSyBO8bWyuJ1xiDB3eyiqVtbV8nzU6flOmIY",
    authDomain: "jooyin-3c5d4.firebaseapp.com",
    databaseURL: "https://jooyin-3c5d4.firebaseio.com",
    projectId: "jooyin-3c5d4",
    storageBucket: "jooyin-3c5d4.appspot.com",
    messagingSenderId: "702056218326",
    appId: "1:702056218326:web:126e210b2a7e3ecb721377",
    measurementId: "G-49VWJ49WL9"
};
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
module.exports = firebase.database();
