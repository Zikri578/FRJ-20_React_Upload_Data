// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// import { getFirestore } from "firebase/firestore"
// import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaqxDGbWSYYX60BajXoKxgyPs8YwyK4jg",
    authDomain: "upload-data-e0862.firebaseapp.com",
    projectId: "upload-data-e0862",
    storageBucket: "upload-data-e0862.appspot.com",
    messagingSenderId: "1060041625046",
    appId: "1:1060041625046:web:43fbfea2b2db4af4fde877"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// mendapatkan storage image 
export const storage = getStorage(app);

// mendapatkan firebase
// export const firestore = getFirestore(app);

// mendapatkan auth
// export const auth = getAuth(app);
