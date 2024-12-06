// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getFirestore, doc, setDoc,
  collection,
  query, getDocs, where
} = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId
};

// Initialize Firebase
let app;
let firestoreDb;

const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore();
    return app;
  } catch (error) {
    console.error("Error occured while connecting to Firebase:", error);
  }
};

const fetchData = async (from, to) => {
  try {
    const collectionRef = collection(firestoreDb, "testing");
    const finalData = [];
    const qry = query(
      collectionRef,
      where("key2", ">=", 10)
    );

    const docSnap = await getDocs(qry);

    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });
    return finalData;
  } catch (error) {
    throw new Error("Error while fetching data: " + error);
  }
};

const insertProcessedData = async () => {
  const dataToUpload = {
    key1: "test",
    key2: 23,
    key3: new Date()
  };
  try {
    const document = doc(firestoreDb, "testing", "WoLxjgkIk66gyojo6zpq");
    let dataUpdated = await setDoc(document, dataToUpload);
    return dataUpdated;
  } catch (error) {
    throw new Error("Error occured while uploading data to Firestore: " + error);
  }
};

const getFirebaseApp = () => app;

module.exports = {
  initializeFirebaseApp, getFirebaseApp,
  fetchData, insertProcessedData
};