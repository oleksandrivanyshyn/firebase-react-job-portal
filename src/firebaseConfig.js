import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAo3j4NZP9eSc1e4cX2MR463yjAjnSW3WY',
  authDomain: 'chat-yt-df5cf.firebaseapp.com',
  projectId: 'chat-yt-df5cf',
  storageBucket: 'chat-yt-df5cf.firebasestorage.app',
  messagingSenderId: '271376162290',
  appId: '1:271376162290:web:f4a03aaff37f45a231df6b',
};

export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
