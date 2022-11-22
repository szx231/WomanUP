import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDXq2-DXJMsw1JmkAgn8kkkEmkoXFt7Hio',
  authDomain: 'todo-task-13470.firebaseapp.com',
  projectId: 'todo-task-13470',
  storageBucket: 'todo-task-13470.appspot.com',
  messagingSenderId: '796362707405',
  appId: '1:796362707405:web:e804ada613d559d1a97484',
  measurementId: 'G-J504WC7P6E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
