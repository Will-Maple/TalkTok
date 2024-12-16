import Start from './components/Start'
import Chat from './components/Chat'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/* Creates navigation between and a stack of the two components Start and Chat */

const Stack = createNativeStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDTgGztum0ZwuLeNx07-9RUOteAcBjhGeY",
    authDomain: "chat-app-cb5d3.firebaseapp.com",
    projectId: "chat-app-cb5d3",
    storageBucket: "chat-app-cb5d3.firebasestorage.app",
    messagingSenderId: "1089537422783",
    appId: "1:1089537422783:web:723f0dfb251e2491191d0a"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
