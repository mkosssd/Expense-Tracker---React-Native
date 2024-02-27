import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import Input from './Input'
import { useContext, useState } from 'react'
import Button from '../UI/Button'
import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'
export default function ExpenseForm ({
  onCancel,
  onSubmit,
  isEditing,
  selectedExpense
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : '',
      isValid: true
    },
    description: {
      value: selectedExpense ? selectedExpense.description : '',
      isValid: true
    },
    date: {
      value: selectedExpense ? getFormattedDate(selectedExpense.date) : '',
      isValid: true
    }
  })

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      }
    })
  }

  const onSubmitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    }
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert('Invalid input', 'Please check your input values.')
      setInputs(curInputs => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid
          }
        }
      })
      return
    }
    onSubmit(expenseData)
  }
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid
  return (
    <View>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'date'),
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.date.value
          }}
        />
      </View>

      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, 'description'),
          multiline: true,
          value: inputs.description.value
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input Values. Please Check Your Entered Values.
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={onSubmitHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderColor: GlobalStyles.colors.primary500
  },
  button: {
    minWidth: 120,
    marginHorizontal: 10
  },
  errorText: {
    color: GlobalStyles.colors.red500,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 12
  }
})
