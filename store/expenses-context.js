import { createContext, useReducer } from 'react'
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
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: ( id, {description, amount, date }) => {}
})

function ExpensesReducer (state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString + Math.random().toString()
      return [{ ...action.payload, id: id }, ...state]

    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload)

    case 'UPDATE':
      console.log(action.payload.data);
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
  const [expensesState, dispatch] = useReducer(ExpensesReducer, DUMMY_EXPENSES)
  function addExpense (expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }
  function deleteExpense (id) {
    dispatch({ type: 'DELETE', payload: id })
  }
  function updateExpense (id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}
export default ExpensesContextProvider
