# RailX — AI Door-to-Door Train Journey Executor

> **One app for all Indian Railways journey needs:** Plan door-to-door, check seat availability, choose & pay, order hygiene-verified meals, boost in-train 4G/5G data, track live train speed & platforms, rate food hygiene, explore coach indicators, pass time with railways trivia, and preserve journey memories for daily commuters and frequent passengers (12+ journeys a year).

---

## 🚀 Live App & Firebase Details

- **Firebase Project ID:** `railx-48e91`
- **Firebase Registered Web App ID:** `1:262895001272:web:c2be60c87cdb4ad9a85e4d`
- **Live Hosting URL:** [https://railx-48e91.web.app](https://railx-48e91.web.app)
- **Firebase Console:** [https://console.firebase.google.com/project/railx-48e91/overview](https://console.firebase.google.com/project/railx-48e91/overview)

---

## 🛠 Features & Capabilities

1. **Door-to-Door Journey Executor:**
   - Breaks down trip into 4 distinct legs: *Door to Station*, *Platform & Coach Navigation*, *In-Train Experience*, and *Last Mile to Final Door*.
   - Supports **Reserved Express** (Rajdhani, Vande Bharat), **General Unreserved** (with crowd surge advice & queue management), and **Daily Commuter** (Suburban fast passes).
   - Persists all trips to Firestore collection `journeys`.

2. **Firebase Phone Authentication:**
   - Secure OTP verification using Firebase Web SDK + invisible/normal reCAPTCHA verifier.
   - User profile synchronization in Firestore (`users/{uid}`) with frequent commuter tier tracking (*Silver*, *Gold*, *Platinum* for 12+ journeys/year).
   - One-click testing support for zero-friction local development.

3. **Live Train & Rake Telemetry Tracker:**
   - Real-time simulated GPS speed, current station, platform number, and punctuality status.
   - Interactive coach rake visualization (Loco -> General -> Sleeper -> Pantry -> AC 3A/2A/1A) with distance calculations to station footbridges.

4. **FSSAI Hygiene-Audited Food Ordering:**
   - Order in-seat meals delivered directly to coach and berth from certified outlets (Haldiram's, Comesum, Jan Aahaar, Behrouz Biryani).
   - Real-time order tracking (`placed`, `preparing`, `delivered`).
   - Interactive passenger hygiene rating & packaging audit form written to Firestore `food_orders`.

5. **In-Train Data Booster:**
   - Quick 1-click 4G/5G data voucher top-ups for Jio, Airtel, Vi, and BSNL to keep passengers connected through low-signal rural corridors.
   - Stored in Firestore collection `data_recharges`.

6. **Platform Guidance & Station Navigation:**
   - Decodes digital Coach Guidance Indicators (CGI).
   - Station amenities directory: Foot-over-bridges, IRCTC Executive Lounges, coolie tariffs, cloak rooms, emergency medical booths.

7. **Journey Memories & Railways Trivia:**
   - Personal digital travelogue to store train memories, scenic landmarks, and passenger stories in Firestore `journey_memories`.
   - Built-in Indian Railways trivia quiz to entertain commuters during long journeys.

8. **Live Commuter Community Chat:**
   - Train and station-specific discussion channels using real-time Firestore `onSnapshot` listeners.

---

## 📱 Firebase Phone Auth Configuration in Console

To allow passengers to receive real SMS OTPs on their personal mobile numbers:

1. Open the [Firebase Authentication Providers Console](https://console.firebase.google.com/project/railx-48e91/authentication/providers).
2. Click on **Phone** under **Sign-in providers** and toggle it to **Enable**.
3. *(Recommended for Testing)* Under **Phone numbers for testing (optional)**, add:
   - Phone: `+91 98765 43210`
   - Verification code: `123456`
4. In **Settings > Authorized domains**, ensure `localhost` and `railx-48e91.web.app` are listed.

---

## 🔒 Firestore Security Rules

Production-grade rules have been authored and deployed to `railx-48e91`:
- **Default Deny:** Strict authentication required.
- **Owner Isolation:** Passengers can only read and modify their own trips, food orders, data top-ups, and memories (`uid == request.auth.uid`).
- **Schema Validation:** Field types, string length bounds, price limits, and immutable creation timestamps are verified on all operations.
- **Journey Add-ons:** Selected door-to-door add-ons are saved with journeys and restricted to the supported add-on list by Firestore rules.
- **Commuter Chat:** Authenticated passengers can read train/station chatter and post verified updates.

For the Firestore queries in the app (`uid == ...` with `orderBy(createdAt)` / `orderBy(timestamp)`), the required composite indexes are tracked in `firestore.indexes.json` and should be deployed with `firebase deploy --only firestore:indexes` when the project is updated.

---

## 💻 Local Development

```bash
# 1. Navigate to directory
cd /Users/jay/.gemini/antigravity/scratch/railx

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Deploy changes to Firebase
firebase deploy
```
