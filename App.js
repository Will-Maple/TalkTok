import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import Start from './components/Start'
import Chat from './components/Chat'

/* Creates navigation between and a stack of the two components Start and Chat */

const Stack = createNativeStackNavigator();

export default function App() {
  /* Enter Credentials Here */
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
  const storage = getStorage(app);
  const connectionStatus = useNetInfo();

  /* Monitors internet connection, if connected tries to connect to Firebase*/
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props} />}
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
