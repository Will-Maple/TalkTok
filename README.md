This is a chatting app that allows users to login anonymously and send their messages, photos, and location to a database to be displayed on the app with offline capabilities. It was built using...

- React.js Native
- Expo
- Google Firebase
- Node.js


You can run this app and connect it with your own database by...

1. Installing the following dependencies ->

"dependencies": {
    "@react-native-async-storage/async-storage": "1.23.1",
    "@react-native-community/netinfo": "11.4.1",
    "@react-navigation/native": "^7.0.14",
    "@react-navigation/native-stack": "^7.2.0",
    "expo": "~52.0.18",
    "expo-image-picker": "^16.0.3",
    "expo-status-bar": "~2.0.0",
    "firebase": "^10.3.1",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "react-native-gifted-chat": "^2.6.4",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.1.0",
    "expo-location": "~18.0.4",
    "react-native-maps": "1.18.0"
    "uuidv4": "^6.2.13"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  }

2. Adding your own credentials for Google Firebase to "const firebaseConfig" at the top of the App declaration in App.js.

3. Run npx expo start from the console and connect to the expo app on your phone.