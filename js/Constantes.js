var firebaseConfig = {
    apiKey: "AIzaSyAAwhkaoP1hK33XoaYydamVuNUQEDotFCE",
    authDomain: "helpdesk-27e8d.firebaseapp.com",
    databaseURL: "https://helpdesk-27e8d.firebaseio.com",
    projectId: "helpdesk-27e8d",
    storageBucket: "helpdesk-27e8d.appspot.com",
    messagingSenderId: "333257103919",
    appId: "1:333257103919:web:fdd07ed66c28003a7c04da",
    measurementId: "G-GZFL64XTBL"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  
  const auth = firebase.auth();
  const db = firebase.firestore();

const salir = document.getElementById('salir');


