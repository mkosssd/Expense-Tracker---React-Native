import { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import {
  deleteExpenseRequest,
  storeExpenseRequest,
  updateExpenseRequest
} from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import { AuthContext } from '../store/Auth-context'

const ManageExpense = ({ route, navigation }) => {
  const [error, setError] = useState()

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const expenseCtx = useContext(ExpensesContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const selectedExpense = expenseCtx.expenses.find(
    expense => expense.id === editedExpenseId
  )

  const deleteHandler = async () => {
    const authCtx = useContext(AuthContext)
    const token = authCtx.token
    setIsSubmitting(true)
    expenseCtx.deleteExpense(editedExpenseId)
    try {
      await deleteExpenseRequest(editedExpenseId, token)
    } catch {
      setError('Unable To Delete The Expense - Please Try Again Later.')
    }
    setIsSubmitting(false)
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = async enteredValues => {
    setIsSubmitting(true)
    const authCtx = useContext(AuthContext)
    const token = authCtx.token
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, enteredValues)
        await updateExpenseRequest(editedExpenseId, enteredValues, token)
      } else {
        const id = await storeExpenseRequest(enteredValues, token)
        expenseCtx.addExpense({ id: id, ...enteredValues })
      }
    } catch (error) {
      setError('Could Not Save Data - Please Try Again Later!')
    }
    setIsSubmitting(false)

    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])
  const errorHandler = () => {
    setError(null)
  }
  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
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
