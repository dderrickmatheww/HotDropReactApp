import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAij5cJMyfiiwCGa8DptFJVgx2mNkR0rrE",
    authDomain: "hotdropauth.firebaseapp.com",
    databaseURL: "https://hotdropauth.firebaseio.com",
    projectId: "hotdropauth",
    storageBucket: "hotdropauth.appspot.com",
    messagingSenderId: "1053617876000"
  }

  export default class Firebase {
      static auth;

      static loginInfo = {
        username: "",
        password: "",
      }

    static signupInfo = {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
      }

      static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
      }
  }