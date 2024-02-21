import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
const ExpensesSummary = ({ expenses, periodName }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)
  return (
    <View style={styles.container}>
      <Text style={[styles.textContainer, styles.periodName]}>{periodName}</Text>
      <Text style={[styles.textContainer, styles.expense]}>₹{expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  textContainer: {
    fontWeight: '800',
  },
  periodName: {
    fontSize: 15,
    color: GlobalStyles.colors.primary400,
  },
  expense: {
    fontSize: 18,
    color: GlobalStyles.colors.primary500,
  }
})