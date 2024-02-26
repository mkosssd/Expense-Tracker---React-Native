import { useContext, useLayoutEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import Button from '../components/UI/Button'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const expenseCtx = useContext(ExpensesContext)
  const selectedExpense = expenseCtx.expenses.find(
    expense => expense.id === editedExpenseId
  )

  const deleteHandler = () => {
    expenseCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = enteredValues => {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, enteredValues)
    } else {
      expenseCtx.addExpense(enteredValues)
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
      <ExpenseForm
        editingLabel={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        selectedExpense={selectedExpense}
      />

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
  }
})
