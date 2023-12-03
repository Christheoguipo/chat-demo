import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Image, Alert } from 'react-native';
import backgroundImage from '../assets/background-image.png';
import TextInputWithIcon from './TextInputWithIcon';
import { getAuth, signInAnonymously } from "firebase/auth";
import { LogBox } from 'react-native';
// To ignore warnings
LogBox.ignoreAllLogs(true);

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [chosenColor, setChosenColor] = useState('white');

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("ChatScreen", { userID: result.user.uid, name: name, color: chosenColor });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      })
  }

  return (
    <View style={styles.container} >
      <ImageBackground style={styles.imageBG} source={backgroundImage} >

        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Chat App</Text>
        </View>

        <View style={styles.bodyContainer}>

          <View style={styles.inputContainer} >
            {/* <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder='Your Name'
            /> */}

            <TextInputWithIcon
              name={name}
              setName={setName}
            />
          </View>

          <View style={styles.chooseColorContainer} >
            <Text style={styles.textChooseColor}>Choose Background Color:</Text>
            <View style={styles.circleContainer}>
              <TouchableOpacity
                style={[styles.circle, styles.blackCircle]}
                onPress={() => setChosenColor('#090C08')}

              />
              <TouchableOpacity
                style={[styles.circle, styles.violetCircle]}
                onPress={() => setChosenColor('#474056')}
              />
              <TouchableOpacity
                style={[styles.circle, styles.blueCircle]}
                onPress={() => setChosenColor('#8A95A5')}
              />
              <TouchableOpacity
                style={[styles.circle, styles.greenCircle]}
                onPress={() => setChosenColor('#B9C6AE')}
              />
            </View>
          </View>

          <View style={styles.buttonContainer} >
            <TouchableOpacity
              style={styles.buttonStartChatting}
              onPress={signInUser}
            >
              <Text style={styles.textStartChatting}>Start Chatting</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    // width: '100%',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 50,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  textTitle: {
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: '600',
  },
  bodyContainer: {
    flex: 50,
    alignItems: 'center',
    width: '88%',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    width: '88%',
    color: '#757083',
    opacity: 0.5,
    height: 60,

    padding: 15,
    borderWidth: 1,
    // marginTop: 15,
    // marginBottom: 15
  },
  textChooseColor: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
  },
  buttonStartChatting: {
    backgroundColor: '#757083',
    width: '88%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStartChatting: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chooseColorContainer: {
    flex: 1,
    width: '88%',
    // alignItems: 'left',
    // justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleContainer: {
    flexDirection: 'row'
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  blackCircle: {
    backgroundColor: '#090C08'
  },
  violetCircle: {
    backgroundColor: '#474056'
  },
  blueCircle: {
    backgroundColor: '#8A95A5'
  },
  greenCircle: {
    backgroundColor: '#B9C6AE'
  }

});

export default Start;