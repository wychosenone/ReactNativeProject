import { database } from './firebaseSetup';
import { collection, addDoc, doc, deleteDoc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { User } from '@/types';

export interface goalData {
  id?: string;
  text: string;
  warning?: boolean; 
}

export async function updateDB(id: string, collectionName: string, updates: Partial<goalData>) {
  try {
    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, updates);
  } catch (err) {
    console.error("Error updating document:", err);
  }
}
export async function writeToDB(data: goalData|User, collectionName: string) {
  try {
    const goalsCollectionRef = collection(database, collectionName);
    await addDoc(goalsCollectionRef, data);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export async function deleteFromDB(id: string, collectionName: string) {
  try {
    const docRef = doc(database, collectionName, id); 
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Error deleting document: ", err);
  }
}

export async function deleteAllFromDB(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach(async (docSnapshot) => {
      const docRef = doc(database, collectionName, docSnapshot.id);
      await deleteDoc(docRef);
    });
  } catch (err) {
    console.error("Error deleting all documents: ", err);
  }
}

export async function readDocFromDB(id: string, collectionName: string) {
  try {
    const docRef = doc(database, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id, ...docSnap.data() } as goalData;
    } else {
      console.error("No document found with ID:", id);
      return null;
    }
  } catch (err) {
    console.error("Error reading document:", err);
    return null;
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
