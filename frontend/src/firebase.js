import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import FirebaseContext from "./context/FirebaseContext";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    this.API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
    this.app = initializeApp(config);
    this.auth = getAuth();
    this.db = getFirestore();
  }

  signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(this.auth, provider)
      .then(async (result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        const usersRef = collection(this.db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setDoc(doc(this.db, "users", user.email), {
            displayName: user.displayName,
            uid: user.uid,
            photoUrl: user.photoURL,
            email: user.email,
            isPlaidLinked: false,
          });
        } else {
          const firestoreUser = querySnapshot.docs[0].data();
          return firestoreUser;
        }

        return {
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL,
          email: user.email,
          isPlaidLinked: false,
        };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(`${errorCode} ${errorMessage} ${email} ${credential}`);
      });
  };

  signOut = () => {
    return signOut(this.auth);
  };

  fetchTransactions = async (accountId) => {
    console.log('ACCOUNT ID', accountId);
    const transactionsRef = collection(this.db, "transactions");
    const q = query(transactionsRef, where("accountId", "==", accountId));
    const querySnapshot = await getDocs(q);
    const result = []

    querySnapshot.forEach((doc) => {
      const document = doc.data();
      result.push(document);
    });

    return result;
  }

  fetchAccount = async (userId) => {
    const accountRef = collection(this.db, "accounts");
    const q = query(accountRef, where("userID", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0].data();
  }
}

export default Firebase;
export { FirebaseContext };
