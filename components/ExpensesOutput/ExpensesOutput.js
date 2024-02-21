import { FlatList, StyleSheet, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Shoes',
    amount: 1599.0,
    date: new Date('2024-02-19')
  },
  {
    id: 'e2',
    description: 'Mobile Phone',
    amount: 159999.0,
    date: new Date('2024-02-20')
  },
  {
    id: 'e3',
    description: 'Fruits',
    amount: 190.0,
    date: new Date('2023-09-05')
  },
  {
    id: 'e4',
    description: 'Books',
    amount: 250.0,
    date: new Date('2023-11-08')
  },
  {
    id: 'e5',
    description: 'EarPhone',
    amount: 1900.0,
    date: new Date('2023-02-20')
  }
]

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flex: 1,
  }
})
