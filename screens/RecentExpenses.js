import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext, useEffect, useState } from 'react'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { getExpensesRequest } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import { AuthContext } from '../store/Auth-context'

const RecentExpenses = () => {
  const expenseCtx = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    async function fetchExpenses () {
      const authCtx = useContext(AuthContext)
      const token = authCtx.token
      setIsFetching(true)
      try {
        const expenses = await getExpensesRequest(token)
        expenseCtx.setExpenses(expenses)
      } catch {
        setError('Could Not Fetch Data From The Server!')
      }
      setIsFetching(false)
    }

    fetchExpenses()
  }, [])
  const errorHandler = () => {
    setError(null)
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }
  if (isFetching) {
    return <LoadingOverlay />
  }
  const recentExpenses = expenseCtx.expenses.filter(expense => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return expense.date >= date7DaysAgo && expense.date <= today
  })
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      fallback={'No Recent Expenses Found!'}
      expensesPeriod='7 Days'
    />
  )
}

export default RecentExpenses
