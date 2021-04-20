var firebaseConfig = {
    apiKey: "AIzaSyCW4Mr59FznlQ4MeuEFZ8uJJQ3qfitUPYY",
    authDomain: "nodeiot-fe34a.firebaseapp.com",
    databaseURL: "https://nodeiot-fe34a.firebaseio.com",
    projectId: "nodeiot-fe34a",
    storageBucket: "nodeiot-fe34a.appspot.com",
    messagingSenderId: "375353888759",
    appId: "1:375353888759:web:ef4b364b7b3354a41e68f2",
    measurementId: "G-67HPF8WZLX"
};


//#define FIREBASE_HOST "nodeiot-fe34a.firebaseio.com"
//#define FIREBASE_AUTH "5TIwMMUF5tWMGNdonQ1531n30c4tayeCa0oGuJI3"




// #define FIREBASE_HOST "witlive-c7061.firebaseio.com"
// #define FIREBASE_AUTH "87HqALKSNk8lVIZDjcdTpFCoLgHTIe7qtR9ePg4h"
/*
var firebaseConfig = {
    apiKey: "AIzaSyA-osx2Zh6R8NLJj6kQLbHwnpiexFE9mnk",
    authDomain: "witlive-c7061.firebaseapp.com",
    databaseURL: "https://witlive-c7061.firebaseio.com",
    projectId: "witlive-c7061",
    storageBucket: "witlive-c7061.appspot.com",
    messagingSenderId: "305936087358",
    appId: "1:305936087358:web:826f8e56454b37d8fad46f"
  };
*/

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.database();

function id(a) {
    return (document.getElementById(a));
}

function create(a) {
    return (document.createElement(a));
}