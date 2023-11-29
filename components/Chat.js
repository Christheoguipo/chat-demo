import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";


const Chat = ({ route, navigation, db }) => {
  const { name } = route.params;
  const { color } = route.params;

  const [messages, setMessages] = useState([]);

  const { userID } = route.params;

  // No dependency was added to useEffect so that it only runs once when the component is mounted
  useEffect(() => {

    navigation.setOptions({
      title: name
    });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        const formattedDate = doc.data().createdAt.toDate();

        newMessages.push({ id: doc.id, ...doc.data(), createdAt: formattedDate })
      });
      setMessages(newMessages);
    });

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


  }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);


  // const addMessages = async (newMessage) => {
  //   const newMessageRef = await addDoc(collection(db, "messages"), newMessage);
  //   if (newMessageRef.id) {
  //     setMessages([newMessage, ...messages]);
  //     Alert.alert(`The message "${listName}" has been added.`);
  //   } else {
  //     Alert.alert("Unable to send message. Please try later");
  //   }
  // }

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


  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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