import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export default function Input ({ textInputConfig, style, label }) {
    let inputStyle = [styles.input]
    if(textInputConfig && textInputConfig.multiline){
        inputStyle.push(styles.inputMultiline)
    }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 4,
        marginHorizontal: 15, 
        borderColor: GlobalStyles.colors.primary400,
        // borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    label: {
        fontWeight: '900',
        color: GlobalStyles.colors.primary400
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary400,
        borderRadius: 5,
        color: 'white',
        fontSize: 15,
        paddingVertical: 4,
        // margin: 4 
        marginTop: 2,
        fontWeight: '600',
        paddingHorizontal: 8,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
})