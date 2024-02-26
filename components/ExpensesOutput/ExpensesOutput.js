import { StyleSheet, View, Text } from 'react-native'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'
import { GlobalStyles } from '../../constants/styles'

const ExpensesOutput = ({ expenses, expensesPeriod, fallback }) => {
  let content = <Text style={styles.infoText}>{fallback}</Text>
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flex: 1
  },
  infoText: {
    color: GlobalStyles.colors.primary400,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 35,
    fontWeight: 'bold'
  }
})
