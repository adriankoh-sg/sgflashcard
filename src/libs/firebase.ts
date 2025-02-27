// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDuctRqRuGDAVcoeVx1mcTTqcS9HjfiWyo',
  authDomain: 'sgflashcard-869ee.firebaseapp.com',
  projectId: 'sgflashcard-869ee',
  storageBucket: 'sgflashcard-869ee.firebasestorage.app',
  messagingSenderId: '69125252541',
  appId: '1:69125252541:web:498421c665f43589b41ed4',
  measurementId: 'G-YWR4NF1FMF',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
// const analytics = getAnalytics(app);
