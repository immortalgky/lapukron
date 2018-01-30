import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDxAYWRdoIZHd8DU7MVvt5sdfF4DAVllcM",
    authDomain: "lapukron.firebaseapp.com",
    databaseURL: "https://lapukron.firebaseio.com",
    projectId: "lapukron",
    storageBucket: "lapukron.appspot.com",
    messagingSenderId: "566927406118"
};

firebase.initializeApp(config)

export default firebase
