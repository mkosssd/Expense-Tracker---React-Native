import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext, useEffect, useState } from 'react'
import { ExpensesContext } from '../store/expenses-context'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import { getExpensesRequest } from '../util/http'

const AllExpenses = () => {
  const expenseCtx = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState()
  const [error, setError] = useState()
  useEffect(() => {
    async function fetchExpenses () {
      setIsFetching(true)
      try {
        const expenses = await getExpensesRequest()
        expenseCtx.setExpenses(expenses)
      } catch {
        setError('Could Not Fetch Data From The Server!')
      }
      setIsFetching(false)
    }
    fetchExpenses()
  },[])
  const errorHandler = () => {
    setError(null)
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }
  if (isFetching) {
    return <LoadingOverlay />
  }
  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      fallback={'No Expenses Found!'}
      expensesPeriod='Total'
    />
  )
}

export default AllExpenses
