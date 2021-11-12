// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";

export async function createArticle({ title, body }) {
  const data = { title, body, date: new Date() };
  const docRef = await addDoc(collection(db, "articles"), data);
  return { id: docRef.id, ...data };
}

export async function deleteArticle({ article }) {
  console.log(article);
  const docRef = await deleteDoc(doc(db, "articles", article.id));
  return article.id;
}

export async function fetchArticles() {
  const querySnapshot = await getDocs(
    collection(db, "articles"),
    orderBy("date", "desc"),
    limit(50)
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
