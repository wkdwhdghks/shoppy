import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase();

export async function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: any) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user: any) {
  return get(ref(db, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

interface ProductInfo {
  price?: string | undefined;
  options?: string | undefined;
}
export async function addNewProduct(
  product: ProductInfo | undefined,
  image: any
) {
  const id = uuid();
  set(ref(db, `product/${id}`), {
    ...product,
    id,
    price: parseInt(product?.price ?? ""),
    image: image,
    options: product?.options ?? "".split(","),
  });
}
