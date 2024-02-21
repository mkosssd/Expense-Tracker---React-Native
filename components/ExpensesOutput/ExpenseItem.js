import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'
const ExpenseItem = ({ description, date, amount }) => {
  return (
    <Pressable>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date )}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>₹{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}
export default ExpenseItem

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: GlobalStyles.colors.primary400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.primary50
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  amountContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 100
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: '800'
  }
})
