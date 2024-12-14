import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

/* Takes color and name from Start.js, sets the title as name and set the background color as color. */

let color;

const Chat = (route, navigation) => {
  const { name } = route.params.name;

  useEffect(() => {
    navigation.setOptions({ title: name });
    color = route.params.color;
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Chatroom!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: { color }
  }
});

export default Chat;