import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, storage, isConnected }) => {
  const name = route.params.name;
  const { color } = route.params;

  const [messages, setMessages] = useState([]);

  const { userID } = route.params;

  // Put this outside useEffect to avoid memory leaks.
  let unsubMessages;
  // No need to add dependency for "querying new collections of messages"; It fetches data automatically because of the onSnapshot function
  useEffect(() => {

    navigation.setOptions({
      title: name
    });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          const formattedDate = doc.data().createdAt.toDate();

          newMessages.push({ id: doc.id, ...doc.data(), createdAt: formattedDate })
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });

    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }

  }, [isConnected]);

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: name
  //   });

  //   const handleUserJoin = async () => {
  //     const systemMessage = {
  //       _id: Math.random().toString(36).substring(7),
  //       text: `${name} joined the chat`,
  //       createdAt: new Date(),
  //       system: true,
  //     };

  //     // Add the system message to Firestore
  //     await addDoc(collection(db, "messages"), systemMessage);

  //   };

  //   if (isConnected === true) {
  //     // unregister current onSnapshot() listener to avoid registering multiple listeners when
  //     // useEffect code is re-executed.
  //     if (unsubMessages) unsubMessages();
  //     unsubMessages = null;

  //     const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  //     unsubMessages = onSnapshot(q, (documentsSnapshot) => {
  //       let newMessages = [];
  //       documentsSnapshot.forEach(doc => {
  //         const formattedDate = doc.data().createdAt.toDate();
  //         newMessages.push({ id: doc.id, ...doc.data(), createdAt: formattedDate });
  //       });

  //       // If there are no messages, it means the user just joined, so add a system message
  //       if (newMessages.length === 0) {
  //         handleUserJoin();
  //       }

  //       cacheMessages(newMessages);
  //       setMessages(newMessages);
  //     });
  //   } else {
  //     // Load cached messages only if there are no messages in Firestore (user just joined)
  //     loadCachedMessages().then(cachedMessages => {
  //       if (cachedMessages.length === 0) {
  //         handleUserJoin();
  //       }
  //       setMessages(cachedMessages);
  //     });
  //   }

  //   // Clean up code
  //   return () => {
  //     if (unsubMessages) unsubMessages();
  //   };

  // }, [isConnected]);


  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])

  }

  const renderBubble = (props) => {
    return <Bubble
      {...props} // This inherits the props
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  const renderInputToolbar = (props) => {
    if (isConnected === true)
      return <InputToolbar {...props} />
    else
      return null
  }

  const renderCustomActions = (props) => {


    return <CustomActions storage={storage} userID={userID} {...props} />;
  }

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      {/* This will avoid the keyboard from covering the input box */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;