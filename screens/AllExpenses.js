import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"

const AllExpenses = () => {
    const expenseCtx = useContext(ExpensesContext)
    return <ExpensesOutput expenses={expenseCtx.expenses} fallback={"No Expenses Found!"} expensesPeriod="Total"/>
}

export default AllExpenses