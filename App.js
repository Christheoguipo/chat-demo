
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { useEffect } from 'react';

// Import the functions you needed for the firebase app and firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { StyleSheet, LogBox, Alert } from 'react-native';
// To ignore AsyncStorage warning
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import { useNetInfo } from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator();

export default function App() {

  // My Firebase configuration
  const firebaseConfig = {

    apiKey: "AIzaSyAdzM32aQVvnEByC2mBevk0xgjW-U3NhWs",

    authDomain: "chatdemoapp-2456f.firebaseapp.com",

    projectId: "chatdemoapp-2456f",

    storageBucket: "chatdemoapp-2456f.appspot.com",

    messagingSenderId: "614638359115",

    appId: "1:614638359115:web:23184803495d0e5aa733ce"

  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app);

  // useNetInfo works similar to useState
  // This checks for the connection status in real time 
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!")
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Start}
        />
        <Stack.Screen name="ChatScreen">
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
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
