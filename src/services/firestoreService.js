import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

function toMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  return 0;
}

function sortByCreatedAtDesc(items) {
  return [...items].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
}

function sortByTimestampAsc(items) {
  return [...items].sort((a, b) => toMillis(a.timestamp) - toMillis(b.timestamp));
}

/* -------------------------------------------------------------------------- */
/*                                  JOURNEYS                                  */
/* -------------------------------------------------------------------------- */

export async function createJourney(uid, journeyData) {
  const journeysCol = collection(db, "journeys");
  const docRef = await addDoc(journeysCol, {
    uid,
    trainNumber: journeyData.trainNumber,
    trainName: journeyData.trainName,
    fromStation: journeyData.fromStation,
    toStation: journeyData.toStation,
    journeyDate: journeyData.journeyDate,
    pnr: journeyData.pnr || "",
    coachBerth: journeyData.coachBerth || "Coach B3 / Berth 21",
    travelType: journeyData.travelType || "reserved", // 'reserved' | 'unreserved' | 'daily_commute'
    platformGuidance: journeyData.platformGuidance || "Entry Gate 2, Escalator to PF 3, Coach Position 12th from Engine",
    status: "planned", // 'planned' | 'active' | 'completed' | 'cancelled'
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function getUserJourneys(uid) {
  try {
    const q = query(collection(db, "journeys"), where("uid", "==", uid));
    const snap = await getDocs(q);
    return sortByCreatedAtDesc(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error("Error fetching user journeys:", error);
    return [];
  }
}

export async function updateJourneyStatus(journeyId, status) {
  const ref = doc(db, "journeys", journeyId);
  await updateDoc(ref, { status });
}

/* -------------------------------------------------------------------------- */
/*                                FOOD ORDERS                                 */
/* -------------------------------------------------------------------------- */

export async function createFoodOrder(uid, orderData) {
  const colRef = collection(db, "food_orders");
  const docRef = await addDoc(colRef, {
    uid,
    journeyId: orderData.journeyId || "sample-journey-1",
    trainNumber: orderData.trainNumber || "12951",
    station: orderData.station || "Ratlam Jn",
    vendorName: orderData.vendorName,
    items: orderData.items,
    totalAmount: Number(orderData.totalAmount),
    status: "placed", // 'placed' | 'preparing' | 'delivered' | 'cancelled'
    hygieneRating: orderData.hygieneRating || 5,
    hygieneReview: orderData.hygieneReview || "Verified hygienic packaging",
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function getUserFoodOrders(uid) {
  try {
    const q = query(collection(db, "food_orders"), where("uid", "==", uid));
    const snap = await getDocs(q);
    return sortByCreatedAtDesc(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error("Error fetching food orders:", error);
    return [];
  }
}

export async function submitHygieneReview(orderId, rating, reviewText) {
  const ref = doc(db, "food_orders", orderId);
  await updateDoc(ref, {
    hygieneRating: Number(rating),
    hygieneReview: reviewText
  });
}

/* -------------------------------------------------------------------------- */
/*                              DATA RECHARGES                                */
/* -------------------------------------------------------------------------- */

export async function createDataRecharge(uid, rechargeData) {
  const colRef = collection(db, "data_recharges");
  const docRef = await addDoc(colRef, {
    uid,
    phone: rechargeData.phone,
    operator: rechargeData.operator, // 'Jio' | 'Airtel' | 'Vi' | 'BSNL'
    packName: rechargeData.packName,
    dataAmount: rechargeData.dataAmount,
    amount: Number(rechargeData.amount),
    status: "success",
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function getUserDataRecharges(uid) {
  try {
    const q = query(collection(db, "data_recharges"), where("uid", "==", uid));
    const snap = await getDocs(q);
    return sortByCreatedAtDesc(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error("Error fetching data recharges:", error);
    return [];
  }
}

/* -------------------------------------------------------------------------- */
/*                             JOURNEY MEMORIES                               */
/* -------------------------------------------------------------------------- */

export async function createJourneyMemory(uid, memoryData) {
  const colRef = collection(db, "journey_memories");
  const docRef = await addDoc(colRef, {
    uid,
    journeyId: memoryData.journeyId || "sample-journey-1",
    title: memoryData.title,
    note: memoryData.note,
    mediaUrl: memoryData.mediaUrl || "",
    trainNumber: memoryData.trainNumber || "12951",
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function getUserMemories(uid) {
  try {
    const q = query(collection(db, "journey_memories"), where("uid", "==", uid));
    const snap = await getDocs(q);
    return sortByCreatedAtDesc(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error("Error fetching journey memories:", error);
    return [];
  }
}

/* -------------------------------------------------------------------------- */
/*                           COMMUTER COMMUNITY CHAT                          */
/* -------------------------------------------------------------------------- */

export async function sendChatMessage(uid, messageData) {
  const colRef = collection(db, "live_chats");
  const docRef = await addDoc(colRef, {
    uid,
    channel: messageData.channel || "12951",
    senderName: messageData.senderName || "Passenger",
    text: messageData.text,
    timestamp: serverTimestamp()
  });
  return docRef.id;
}

export function subscribeToChatChannel(channel, callback) {
  const q = query(collection(db, "live_chats"), where("channel", "==", channel));
  return onSnapshot(q, (snapshot) => {
    const msgs = sortByTimestampAsc(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))).slice(-40);
    callback(msgs);
  });
}
