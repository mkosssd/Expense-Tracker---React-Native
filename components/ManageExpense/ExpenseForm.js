import { StyleSheet, TextInput, View } from 'react-native'
import Input from './Input'
import { useContext, useState } from 'react'
import Button from '../UI/Button'
import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'
export default function ExpenseForm ({onCancel, onSubmit, isEditing, selectedExpense}) {
  const [inputValues, setInputValue] = useState({
    amount: selectedExpense ? selectedExpense.amount.toString() : '',
    description: selectedExpense ? selectedExpense.description : '',
    date: selectedExpense ? getFormattedDate(selectedExpense.date) : ''
  })

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValue(curInput => {
      return {
        ...curInput,
        [inputIdentifier]: enteredValue
      }
    })
  }

  const onSubmitHandler = () => {
	const expenseData = {
		amount: +inputValues.amount,
		date: new Date(inputValues.date),
		description: inputValues.description
	}
	onSubmit(expenseData)
  }

  return (
    <View>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount
          }}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'date'),
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputValues.date
          }}
        />
      </View>

      <Input
        label='Description'
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, 'description'),
          multiline: true,
          value: inputValues.description
        }}
      />
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
  }
})
