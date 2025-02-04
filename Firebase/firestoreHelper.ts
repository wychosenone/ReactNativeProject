import { database } from './firebaseSetup';
import { collection, addDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';

export interface goalData {
  text: string;
}

export async function writeToDB(data: goalData, collectionName: string) {
  try {
    const goalsCollectionRef = collection(database, collectionName);
    const docRef = await addDoc(goalsCollectionRef, data);
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


