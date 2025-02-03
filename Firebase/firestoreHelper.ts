import { database } from './firebaseSetup';
import { collection, addDoc } from 'firebase/firestore';

interface GoalData {
  text: string;
}

export async function writeToDB(data: GoalData, collectionName: string) {
  try {
    const goalsCollectionRef = collection(database, collectionName);

    const docRef = await addDoc(goalsCollectionRef, data);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}
