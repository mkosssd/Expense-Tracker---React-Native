import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export default function Button ({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed }>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 1
  },
  flat: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600'
  },
  flatText: {
    color: GlobalStyles.colors.primary500
  },
  pressed: {
    opacity: 0.8,
    backgroundColor: GlobalStyles.colors.primary50
  }
})
