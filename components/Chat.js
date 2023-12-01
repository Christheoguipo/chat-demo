import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name } = route.params;
  const { color } = route.params;

  const [messages, setMessages] = useState([]);

  const { userID } = route.params;

  // Put this outside useEffect to avoide memory leaks.
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

    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello developer",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'You have entered the chat.',
    //     createdAt: new Date(),
    //     system: true, // Setting this to true makes it a system message.
    //   },
    // ]);

  }, [isConnected]);

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
    // setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))

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


  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
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