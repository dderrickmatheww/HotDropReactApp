import * as firebase from 'firebase';

const config1 = {
    apiKey: "AIzaSyAij5cJMyfiiwCGa8DptFJVgx2mNkR0rrE",
    authDomain: "hotdropauth.firebaseapp.com",
    databaseURL: "https://hotdropauth.firebaseio.com",
    projectId: "hotdropauth",
    storageBucket: "hotdropauth.appspot.com",
    messagingSenderId: "1053617876000"
};

export default class Firebase {
    static auth;
    static loginInfo = {
      email: "",
      password: "",
      userName: ""
    }

    static signupInfo = {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          platform: "",
          gender: "",
          imageURL: ""
      }
      static comments = {
        authorName: '',
        comment: '',
        rating: 0
    }
    static init() {
     
      firebase.initializeApp(config1);
      Firebase.auth = firebase.auth();
      Firebase.database = firebase.database();
      Firebase.gameRef = firebase.database().ref(`game`);
    }
}