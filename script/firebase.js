//Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCsodUGJNVXc-tkE9Ff3XFyxDvgxpKozGY',
  authDomain: 'estacionamiento-2e54d.firebaseapp.com',
  projectId: 'estacionamiento-2e54d',
  storageBucket: 'estacionamiento-2e54d.appspot.com',
  messagingSenderId: '577804760353',
  appId: '1:577804760353:web:aca66f09f64435b7c9ba60',
});

const db = firebase.firestore();

export default db;
