import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { userLogin } from '../../util/http';
export default function Login ({onAuthenticate}) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigation = useNavigation()

  const signupToggler = () => {
    navigation.replace('Signup')
  }

  const formHandler = () => {
    if (!enteredEmail.includes('@')) {
        Alert.alert('Incorrect Email!', 'Please enter an valid email address.')
        return
    }else if(!enteredPassword.trim().length>8){
        Alert.alert('Enter A Name!', 'Please enter a valid name.')
        return
    }
    onAuthenticate(enteredEmail, enteredEmail)
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        label='Email'
        value={enteredEmail}
        keyboardType='email-address'
        onChangeText={updateInputValueHandler.bind(this, 'email')}
        inputMode='email'
      />
      <TextInput
        style={styles.TextInput}
        label='Password'
        value={enteredPassword}
        secureTextEntry={true}
        keyboardType='visible-password'
        onChangeText={updateInputValueHandler.bind(this, 'password')}

      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode='contained' onPress={formHandler}>
          LOGIN
        </Button>
        <Button style={styles.button} mode='contained' onPress={signupToggler}>
          NEW USER?
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 15,
    minWidth: 200,
    marginBottom: 10
  },
  TextInput: {
    margin: 5,
  }
})
