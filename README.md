# TalkTok (ReactNative, Firebase)
A chatting app where users can login anonymously and send messages, photos, and share location. Built to maintain access offline and resync when connection is reestablished. 
<br>
<br>

<img src="https://github.com/user-attachments/assets/42adaf5f-b278-4650-a6f5-b60d50e7ee4f" width=55% alt="Image of app"> 

## Tech-stack
- ReactNative
- Expo
- Google Firebase

## Steps to Run 

### Clone repo
- Of course!
### Install Expo
```sh
npm install -g expo-cli
```
```sh
npx expo install expo@^52.0.0 
```
### Install Firebase and connect
```sh
npm install firebase@10.3.1 --save
```
-Connect to your firebase account thru App.js here
```js
 /* Enter Credentials Here */
  const firebaseConfig = {
    apiKey: "AIzaSyDTgGztum0ZwuLeNx07-9RUOteAcBjhGeY",
    authDomain: "chat-app-cb5d3.firebaseapp.com",
    projectId: "chat-app-cb5d3",
    storageBucket: "chat-app-cb5d3.firebasestorage.app",
    messagingSenderId: "1089537422783",
    appId: "1:1089537422783:web:723f0dfb251e2491191d0a"
  };
```

### Download Expo Go to your Android device
- From <a href=”https://expo.dev/go?sdkVersion=52&platform=android&device=false”> this Link!</a> download the Expo Go APK file and run on your Android device.

### Run locally
```sh
npx expo start
```
- Scan the QR code with your device from the Expo Go app.

## Dependencies
- Expo Go SDK 52 (must be version 52)
- ReactNative
- Firebase
- Babel
