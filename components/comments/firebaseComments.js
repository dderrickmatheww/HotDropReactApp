import * as firebase from 'firebase';

const config2 = {
    apiKey: "AIzaSyAmHvnWBuXY5SM6u8iw992av8ggO7ueVoA",
    authDomain: "hot-drop-fa9ff.firebaseapp.com",
    databaseURL: "https://hot-drop-fa9ff.firebaseio.com",
    projectId: "hot-drop-fa9ff",
    storageBucket: "hot-drop-fa9ff.appspot.com",
    messagingSenderId: "91907967407"
};

export default class FirebaseComments {

    static comments = {
        authorName: '',
        comment: ''
    }
    static init() {
      firebase.initializeApp(config2);
      FirebaseComments.database.ref = firebase.database().ref;
      FirebaseComments.gameRef = firebase.database().ref(`game`);
    }

}