import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: expenses => {}
})

function ExpensesReducer (state, action) {
  switch (action.type) {
    case 'ADD':

      return [action.payload, ...state]

    case 'SET':
      const invertedArray = action.payload.reverse()
      return action.payload

    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload)

    case 'UPDATE':
      const index = state.findIndex(expense => expense.id === action.payload.id)
      const updatableExpense = state[index]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpense = [...state]
      updatedExpense[index] = updatedItem
      return updatedExpense
    default:
      return state
  }
}

function ExpensesContextProvider ({ children }) {
  const [expensesState, dispatch] = useReducer(ExpensesReducer, [])
  function addExpense (expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }
  function deleteExpense (id) {
    dispatch({ type: 'DELETE', payload: id })
  }
  function updateExpense (id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
  }
  function setExpenses (expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}
export default ExpensesContextProvider
