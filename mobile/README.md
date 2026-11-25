# VERIVOX AI — MOBILE APPLICATION

**Cross-Platform iOS & Android App**  
**Framework:** React Native (Expo SDK 58 · React 19 · TypeScript)  
**Lead Developer:** Naman Garg (26BCON1989)  

---

## 📱 Features

1. **Real-Time Voice Call Screening (`DetectorScreen`)**
   - Live microphone audio capture with dynamic animated waveform meters.
   - Forwards audio to the Wav2Vec2 neural audio classifier.
   - Immediate feedback on voice-cloning indicators (phase discontinuities, suppressed breathing pauses, robotic high frequencies).
2. **Text & SMS Scam Intelligence (`DetectorScreen`)**
   - Heuristic + Gemini analysis for digital arrest threats, bank KYC scams, and family distress extortion.
   - Preset quick tests included.
3. **Video & Facial Deepfake Verification (`DetectorScreen`)**
   - Pick video footage from gallery or record from camera.
   - Dual-engine Vision Transformer (ViT) inspection for boundary blending, irregular reflections, and synthetic texture flickering.
4. **Offline Emergency Safe-Word System (`EmergencyScreen`)**
   - High-entropy, memorable 3-word verbal challenge generator (`CRIMSON · HARBOR · 42`).
   - 1-Tap National Emergency Dialers:
     - `1930` (National Cyber Crime Helpline)
     - `112` (National Emergency & Police)
   - Step-by-step offline emergency playbooks for Digital Arrest & Kidnapping voice scams.
5. **AI Safety Assistant (`AssistantScreen`)**
   - Conversational assistant powered by Verivox safety protocols.
   - Quick prompt chips, instant protocol retrieval, and conversation reset.
6. **24-Question Awareness Assessment Quiz (`QuizScreen`)**
   - Complete 24-question assessment across all 4 categories.
   - Interactive options, live progress bar, score calculation, category breakdown, and safety certificate badge.
7. **Profile & Backend Settings (`AboutScreen`)**
   - Developer credentials (Naman Garg, 26BCON1989).
   - Live connection tester & configurable backend host URL (supports Android Emulator `10.0.2.2:8000`, iOS Simulator `localhost:8000`, or live cloud host).

---

## 🚀 How to Run the App

### Option A: Run on your Physical Phone (iOS / Android) via Expo Go (Fastest)

1. Install the free **Expo Go** app on your phone from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. In your terminal, start the development server:
   ```bash
   cd mobile
   npx expo start
   ```
3. A QR code will display in your terminal:
   - **Android:** Scan the QR code using the Expo Go app.
   - **iOS:** Scan the QR code using your phone's native Camera app and tap the Expo banner.

---

### Option B: Run in Your Desktop Web Browser

```bash
cd mobile
npx expo start --web
```
This opens the mobile application directly in your browser at `http://localhost:8081`.

---

### Option C: Run on Android Emulator / iOS Simulator

```bash
cd mobile
npx expo start --android
# or
npx expo start --ios
```

---

## ⚙️ Configuration & Backend Connection

By default, the app automatically connects to:
- **Android Emulator:** `http://10.0.2.2:8000` (maps to your machine's port 8000)
- **iOS Simulator / Local:** `http://localhost:8000`

To connect your physical phone running Expo Go to your computer's Python microservice:
1. Find your computer's local Wi-Fi IP address (e.g. `192.168.1.15`).
2. Open the mobile app, tap the **Profile** tab, and enter:
   `http://192.168.1.15:8000`
3. Tap **Test Connection** & **Save URL**.
