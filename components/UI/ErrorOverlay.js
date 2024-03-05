import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Button from './Button'

export default function ErrorOverlay ({message, onConfirm}) {
  return (
    <View style={styles.container}>
        <Text style={[styles.text,styles.title]}>An Error Occured!</Text>
        <Text style={[styles.text,styles.message]}>{message}</Text>
        <Button onPress={onConfirm}>Okay!</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8
  },
  title: {
    fontWeight: '800',
    fontSize: 20
  },
  message: {
    fontSize: 14
  }
})
