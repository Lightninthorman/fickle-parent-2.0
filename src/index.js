import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBCIQYbHhrZibWqU9lMuhc37gycTheGKok",
    authDomain: "fickle-parent.firebaseapp.com",
    databaseURL: "https://fickle-parent.firebaseio.com",
    projectId: "fickle-parent",
    storageBucket: "fickle-parent.appspot.com",
    messagingSenderId: "595729578549",
    appId: "1:595729578549:web:fe1a346f5c43c045a74f7c",
    measurementId: "G-QR4788VTNT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
