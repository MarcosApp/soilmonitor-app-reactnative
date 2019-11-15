import * as Firebase from "firebase";
var config = {
    apiKey: "AIzaSyBhjhSU6ntlb_6JMrjdVLcj0wXLJAS8agY",
    authDomain: "soilmonitor-c8855.firebaseapp.com",
    databaseURL: "https://soilmonitor-c8855.firebaseio.com",
    projectId: "soilmonitor-c8855",
    storageBucket: "soilmonitor-c8855.appspot.com",
    messagingSenderId: "308286865258",
    appId: "1:308286865258:web:93f627f076fd571afc2f13",
    measurementId: "G-41ZCFHYEYS"
};

let app = Firebase.initializeApp(config);
export const authentication = app.auth();
export const database = app.database();
