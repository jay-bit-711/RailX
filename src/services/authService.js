import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInAnonymously
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

let confirmationResult = null;
let recaptchaVerifier = null;

/**
 * Initializes the invisible or normal reCAPTCHA verifier for Phone Auth
 */
export function setupRecaptcha(containerId = "recaptcha-container", isNormal = false) {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch {
      // ignore
    }
  }

  const container = document.getElementById(containerId);
  if (!container) return null;

  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: isNormal ? "normal" : "invisible",
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber
    },
    "expired-callback": () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      console.warn("reCAPTCHA expired. Resetting...");
    }
  });

  return recaptchaVerifier;
}

/**
 * Sends OTP to the given phone number using Firebase Phone Authentication
 * @param {string} phoneNumber - Full E.164 formatted number (e.g. +919876543210)
 * @param {string} containerId - Element ID for reCAPTCHA
 */
export async function sendPhoneOtp(phoneNumber, containerId = "recaptcha-container") {
  try {
    const verifier = setupRecaptcha(containerId);
    if (!verifier) {
      throw new Error("Could not initialize reCAPTCHA container. Ensure element exists.");
    }
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    return { success: true, confirmationResult };
  } catch (error) {
    console.error("Firebase sendPhoneOtp error:", error);
    // Reset recaptcha if failed
    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
        recaptchaVerifier = null;
      } catch {
        // ignore
      }
    }
    return { success: false, error };
  }
}

/**
 * Verifies the OTP entered by user against Firebase Auth
 * @param {string} otpCode - 6-digit SMS OTP
 */
export async function verifyPhoneOtp(otpCode) {
  try {
    if (!confirmationResult) {
      throw new Error("No active phone verification session found. Please request OTP first.");
    }
    const userCredential = await confirmationResult.confirm(otpCode);
    const user = userCredential.user;

    // Synchronize or create user document in Firestore
    await syncUserProfile(user, user.phoneNumber);

    return { success: true, user };
  } catch (error) {
    console.error("Firebase verifyPhoneOtp error:", error);
    return { success: false, error };
  }
}

/**
 * Demo Fast Sign-In for testing without waiting for SMS
 * Signs in passenger using Firebase Anonymous Auth and initializes passenger profile
 */
export async function demoPassengerSignIn(demoPhone = "+919876543210", displayName = "Rajesh Kumar (Frequent Commuter)") {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    await syncUserProfile(user, demoPhone, displayName, 14, "Platinum");
    return { success: true, user };
  } catch (error) {
    console.error("Demo sign in error:", error);
    return { success: false, error };
  }
}

/**
 * Creates or updates the passenger profile in Firestore
 */
export async function syncUserProfile(user, phone, displayName = "Passenger", journeysCount = 12, frequentTier = "Gold") {
  if (!user) return null;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const profileData = {
      uid: user.uid,
      phone: phone || user.phoneNumber || "+919876543210",
      displayName: displayName,
      journeysCount: journeysCount,
      frequentTier: frequentTier,
      homeStation: "MMCT",
      createdAt: serverTimestamp()
    };
    await setDoc(userRef, profileData);
    return profileData;
  }
  return userSnap.data();
}

/**
 * Get current passenger profile from Firestore
 */
export async function getUserProfile(uid) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  } catch (err) {
    console.warn("Could not fetch user profile:", err);
    return null;
  }
}

/**
 * Sign out current user
 */
export async function signOutUser() {
  confirmationResult = null;
  return firebaseSignOut(auth);
}

/**
 * Auth state listener hook helper
 */
export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
