import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext } from 'react'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'

const RecentExpenses = () => {
  const expenseCtx = useContext(ExpensesContext)
  const recentExpenses = expenseCtx.expenses.filter(expense => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return expense.date >= date7DaysAgo && expense.date <= today
  })
  return <ExpensesOutput expenses={recentExpenses} fallback={"No Recent Expenses Found!"} expensesPeriod='7 Days' />
}

export default RecentExpenses
