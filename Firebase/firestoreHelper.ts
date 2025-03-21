import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";
import { GoalData, User } from "@/types";

export async function writeToDB(data: GoalData | User, collectionName: string) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//delete a document from the database
export async function deleteFromDB(id: string, collectionName: string) {
  try {
    await deleteDoc(doc(database, collectionName, id));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

//read all documents from the database
export async function readAllFromDB(collectionName: string) {
  const querySnapshot = await getDocs(collection(database, collectionName));
  if (querySnapshot.empty) return null;
  let data: User[] = [];
  querySnapshot.forEach((docSnapshot) => {
    data.push(docSnapshot.data() as User);
  });
  //return the data
  return data;
}

//read a document from the database
export async function readDocFromDB(id: string, collectionName: string) {
  try {
    const docRef = doc(database, collectionName, id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
    return null;
  } catch (e) {
    console.error("Error reading document: ", e);
  }
}

export async function updateDB(
  id: string,
  collectionName: string,
  data: { [key: string]: any }
) {
  try {
    //update a document in the database
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}