import { firebaseConfig } from './firebaseConfig';
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { Firestore, getFirestore, } from "firebase/firestore";
import { FirebaseStorage, getStorage, } from "firebase/storage";

export default class FirebaseApi {
  app: FirebaseApp;
  // analytics: Analytics; Analytics not supported in expo
  auth: Auth;
  googleAuthProvider: GoogleAuthProvider;
  firestore: Firestore;
  storage: FirebaseStorage;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    // this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    this.googleAuthProvider = new GoogleAuthProvider();
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }
};
