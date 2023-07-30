import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBZODNRAFD7GJxp0nInMbwC_7NVr5EDxo",
  authDomain: "crud-react-d585f.firebaseapp.com",
  projectId: "crud-react-d585f",
  storageBucket: "crud-react-d585f.appspot.com",
  messagingSenderId: "390394583142",
  appId: "1:390394583142:web:22bcbf0cfa1579baa1f5a7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // Exporta la instancia de Firestore