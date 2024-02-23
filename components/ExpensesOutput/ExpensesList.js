import { FlatList, StyleSheet, Text } from 'react-native'
import ExpenseItem from './ExpenseItem'
const renderExpenseItem = itemData => {
  return <ExpenseItem {...itemData.item} />
}
const ExpensesList = ({ expenses }) => {
  return (
    <FlatList style={styles.container}
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  }
})
