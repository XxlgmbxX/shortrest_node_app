// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKMT_HrY1vno021lumeEkH2xETmKYkhjc",
  authDomain: "shortrest-vtt-game.firebaseapp.com",
  projectId: "shortrest-vtt-game",
  storageBucket: "shortrest-vtt-game.appspot.com",
  messagingSenderId: "721900426301",
  appId: "1:721900426301:web:990538c91f17a33fb60654",
  measurementId: "G-DEQ599JX5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Inicializa a autenticação
const auth = getAuth(app);


//exportando a autenticação
module.exports = { auth };