import { StyleSheet, View, Text, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { orderBy, query, collection, onSnapshot, addDoc } from 'firebase/firestore';

/* Takes color and name from Start.js, sets the title as name and set the background color as color. */

const Chat = ({ route, navigation, db }) => {
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

  /* Sets the title and bg color, grabs messages in real time */
  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubChat = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })

    return () => {
      if (unsubChat) unsubChat();
    }

  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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