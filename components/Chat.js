import { StyleSheet, View, Text, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { orderBy, query, collection, onSnapshot, addDoc } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Takes color and name from Start.js, sets the title as name and set the background color as color. */

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);

  /* Appends sent messages to messages in firebase */
  const onSend = (newMessage) => {
    addDoc(collection(db, "messages"), newMessage[0])
  };

  /* Sets the color for the sent and recieved messages */
  const renderBubble = (props) => {
    return <Bubble
      {...props}
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

  /* Removes the ability to submit new messages when called */
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null
  }

  /* Sets messages to messages in the cache when called */
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  let unsubChat
  /* Sets the title and bg color, grabs messages in real time if connected, from cache if no internet connection */
  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubChat = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        cacheMessages(newMessages)
        setMessages(newMessages);
      });
    } else loadCachedMessages()

    return () => {
      if (unsubChat) unsubChat();
      unsubChat = null;
    }

  }, [isConnected]);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{ _id: userID, name: name }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Chat;