import { firebaseConfig } from './firebaseConfig';
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  Unsubscribe,
  User,

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

  onAuthStateChanged = (nextOrObserver: NextOrObserver<User>): Unsubscribe => {
    return onAuthStateChanged(this.auth, nextOrObserver);
  };

  signInWithGoogleCredential = (accessToken: string) => {
    const credential = GoogleAuthProvider.credential(null, accessToken);
    return signInWithCredential(this.auth, credential);
  };

  signOut = () => {
    return signOut(this.auth);
  }

};
