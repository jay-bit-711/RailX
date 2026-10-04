# RailX

Design lock: **v15** (black/white, RX logo top-left, Plan · Live · Explore · Feed · Me).

Live mock: https://railx-phi.vercel.app/  
Firebase project: `railx-48e91`

## Stack (locked)

- **Frontend:** plain HTML + Tailwind CDN + Firebase JS SDK (matches current Vercel deploy)
- **Backend:** Firebase Auth (Phone) · Firestore · Storage · Cloud Messaging · Cloud Functions (later)
- **Host:** Vercel (`public/` or root `index.html`)

## One-time setup (you click; builder can’t access your accounts)

### 1. Push this repo to GitHub

```bash
cd RailX
git init
git add .
git commit -m "RailX v15 design lock + Firebase scaffold"
git branch -M main
git remote add origin https://github.com/jay-bit-711/RailX.git
git push -u origin main
```

### 2. Vercel

- Import `jay-bit-711/RailX`
- Root directory: leave default (or set to `public` if asked)
- Deploy → should match logo **top-left**

### 3. Firebase Console — https://console.firebase.google.com/project/railx-48e91

1. **Authentication** → Sign-in method → **Phone** → Enable → Save  
2. **Firestore Database** → Create database → **Production mode** → location `asia-south1` (Mumbai) if available  
3. **Firestore** → Rules → paste from `firestore.rules` → Publish  
4. **Project settings** → General → Your apps → **Web** (`</>`) → nickname `railx-web` → Copy config into `public/firebase-config.js`  
5. (Optional) **Storage** → Get started → production rules later  

### 4. Local test with Auth

Open `public/index.html` via any static server after filling `firebase-config.js`.  
Phone OTP needs authorized domains: add `localhost` and `railx-phi.vercel.app` under Authentication → Settings → Authorized domains.

## Train data / IRCTC (you don’t have keys yet)

| Need | How to get |
|------|------------|
| Live status / PNR (unofficial) | RapidAPI “Indian Railway” / “IRCTC” style APIs — search RapidAPI, subscribe free tier, put key in Firebase **secret** not frontend |
| Official | IRCTC / CRIS authorized agent or tourism partner — business agreement; not self-serve API |
| Stations list | Open datasets / static JSON we can ship in repo |
| UTS / unreserved | Deep-link or future partner |

**MVP without IRCTC:** mock booking in Firestore + real phone auth + profile. Swap train search to live API when you have a key.

## Next build order

1. Phone auth + write `users/{uid}`  
2. Profile / passengers CRUD  
3. Create booking doc + invoice stub  
4. FCM notifications  
5. Live train proxy (Cloud Function + API key)

## Test checklist (for you)

- [ ] GitHub has files (not empty)
- [ ] Vercel shows **RX top-left**
- [ ] Phone Auth enabled
- [ ] Firestore created + rules published
- [ ] `firebase-config.js` filled (not placeholder)
- [ ] Reply: “auth works” or paste error text
