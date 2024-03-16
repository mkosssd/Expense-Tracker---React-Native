import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
export default function Login () {
  const [text, setText] = useState('')
  const inputHandler = inputText => {
    setText(inputText)
  }
  const formHandler = () => {
    if (text.includes('@')) {
      console.log(true)
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        label='Email'
        value={text}
        keyboardType='email-address'
        onChangeText={text => inputHandler(text)}
        inputMode='email'
      />
      <TextInput
        style={styles.TextInput}
        label='Password'
        secureTextEntry={true}
        keyboardType='visible-password'
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode='contained' onPress={formHandler}>
          LOGIN
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
    alignItems: 'center',
    marginVertical: 20
  },
  button: {
    paddingHorizontal: 15
  },
  TextInput: {
    margin: 5,
  }
})
