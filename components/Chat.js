import { StyleSheet, View, Text, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { orderBy, query, collection, onSnapshot, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

/* Takes color and name from Start.js, sets the title as name and set the background color as color. */

const Chat = ({ route, navigation, db, isConnected, storage }) => {
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

  /* Uploads messages to the cache when called */
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

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
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages => {
          onSend([{
            ...messages,
            id: uuidv4(),
            createdAt: new Date(),
            user: {
              id: userID,
              name: name
            }
          }])
        })} {...props} />;
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