import { StyleSheet, Text, View, Button, TextInput, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";


const img = '../assets/BGimg.png'
const bg1 = "#090C08",
  bg2 = "#474056",
  bg3 = "#8A95A5",
  bg4 = "#B9C6AE";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  /* Logs user in Anonymously on Firebase*/
  const auth = getAuth();
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { name: name, color: color, userID: result.user.uid });
        Alert.alert("Signed in Successfully");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }

  /* Returns a view with an imagebackground, a title... then a text input and series of color buttons that take a username and a background color... when submitted they open the 2nd screen passing the name and bg color*/
  return (
    <View style={styles.container}>
      <ImageBackground source={img} resizeMode='cover' style={styles.img}>
        <Text style={styles.appName}>TalkTok</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type your username here'
        />
        <View style={styles.colorTOContainer}>
          <TouchableOpacity
            style={[styles.colorTO, styles.TO1]}
            onPress={() => setColor(bg1)}
          />
          <TouchableOpacity
            style={[styles.colorTO, styles.TO2]}
            onPress={() => setColor(bg2)}
          />
          <TouchableOpacity
            style={[styles.colorTO, styles.TO3]}
            onPress={() => setColor(bg3)}
          />
          <TouchableOpacity
            style={[styles.colorTO, styles.TO4]}
            onPress={() => setColor(bg4)}
          />
        </View>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="To Chat Screen"
          accessibilityHint="Submits username and background color and takes you to the chat screen"
          accessibilityRole="button"
          style={styles.startButton}
          onPress={signInUser}
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>

      </ImageBackground>
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    flex: 1,
    justifyContent: 'center'
  },
  appName: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff'
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  colorTOContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40,
    alignItems: 'center',
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: '#757083',
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  colorTO: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  TO1: {
    backgroundColor: bg1
  },
  TO2: {
    backgroundColor: bg2
  },
  TO3: {
    backgroundColor: bg3
  },
  TO4: {
    backgroundColor: bg4
  },
  startButton: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
    backgroundColor: '#757083'
  }
});

export default Start;