import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDKjxjTPmQgtsej5Jcth8wkkBoBzYMkuT8",
    authDomain: "login-5ea5d.firebaseapp.com",
    projectId: "login-5ea5d",
    storageBucket: "login-5ea5d.appspot.com",
    messagingSenderId: "1067485819089",
    appId: "1:1067485819089:web:046ace6b55735f03e515f0"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;