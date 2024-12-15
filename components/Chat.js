import { StyleSheet, View, Text, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

/* Takes color and name from Start.js, sets the title as name and set the background color as color. */

let color;

const Chat = ({ route, navigation }) => {
  const { name } = route.params.name;
  const [messages, setMessages] = useState('');

  /* Appends sent messages to messages */
  const onSend = (newMessage) => {
    setMessages(previousMessage => GiftedChat.append(previousMessages, newMessages))
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

  useEffect(() => {
    navigation.setOptions({ title: name });
    color = route.params.color;
  }, []);

  /* Starts the view with a system message and a welcome message */
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any"
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ])
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color
  }
});

export default Chat;