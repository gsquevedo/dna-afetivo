import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "~/plugins/firebase";

const db = getFirestore(app);

export const addUser = async (userData) => {
  try {
    await addDoc(collection(db, "users"), userData);
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
