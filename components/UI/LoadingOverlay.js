import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'

export default function LoadingOverlay ({message}) {

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size='large'
        color={GlobalStyles.colors.primary500}
      ></ActivityIndicator>
      <Text style={styles.message}>{message}</Text>
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
  message: {
    fontWeight: '700',
    fontSize: 17,
    marginTop: 10
  }
})
