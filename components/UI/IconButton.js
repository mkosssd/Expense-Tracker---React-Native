import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, View } from 'react-native'
function IconButton ({ color, icon, size, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  )
}
export default IconButton
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 8
  },
  pressed: {
    opacity: 0.75
  }
})
