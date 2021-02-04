import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCzbbsRBkuk1MOGHU1OBdvrw__jWWbkLjg",
    authDomain: "react-netflix-challenge.firebaseapp.com",
    projectId: "react-netflix-challenge",
    storageBucket: "react-netflix-challenge.appspot.com",
    messagingSenderId: "698993273939",
    appId: "1:698993273939:web:4d66acb7deaa03d7446aa6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth }
export default db