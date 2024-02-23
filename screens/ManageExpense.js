import { useContext, useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import Button from '../components/UI/Button'
import { ExpensesContext } from '../store/expenses-context'

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const expenseCtx = useContext(ExpensesContext)

  const deleteHandler = () => {
    expenseCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = () => {
    if (isEditing) {
      console.log(editedExpenseId);
      expenseCtx.updateExpense(
        editedExpenseId, {
        description: 'EditTest',
        amount: 1500,
        date: new Date('2024-02-21')
      })
    } else {
      expenseCtx.addExpense({
        description: 'Test',
        amount: 3400,
        date: new Date('2024-02-22')
      })
    }
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            size={30}
            onPress={deleteHandler}
            icon='trash'
            color={GlobalStyles.colors.primary400}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: GlobalStyles.colors.primary50
  },
  deleteContainer: {
    marginTop: 15,
    alignItems: 'center'
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
