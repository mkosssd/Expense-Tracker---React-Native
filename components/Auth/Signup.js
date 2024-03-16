import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { authenticate, createUser } from '../../util/http';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/styles';
export default function Signup ({onAuthenticate}) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [name, setEnteredName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigation = useNavigation()

  const formHandler = () => {
    if (!enteredEmail.includes('@')) {
        Alert.alert('Incorrect Email!', 'Please enter an valid email address.')
        return
    }else if(!name.trim().length>0){
        Alert.alert('Enter A Name!', 'Please enter a valid name.')
        return
    }else if(!enteredPassword.trim().length>8){
        Alert.alert('Enter A Correct Password!', 'Please enter a valid password.')
        return
    }
    onAuthenticate(enteredEmail, enteredEmail, name)
  }
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }
  const LoginHandler = () => {
    navigation.replace('Login')
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        label='Name'
        value={name}
        keyboardType='name-phone-pad'
        onChangeText={updateInputValueHandler.bind(this, 'name')}
        inputMode='text'
      />
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
            SIGN UP
        </Button>
        <Button style={styles.button} mode='contained' onPress={LoginHandler}>
            OLD USER?        
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
