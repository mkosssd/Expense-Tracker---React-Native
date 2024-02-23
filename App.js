import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import ManageExpense from './screens/ManageExpense'
import RecentExpenses from './screens/RecentExpenses'
import AllExpenses from './screens/AllExpenses'
import { GlobalStyles } from './constants/styles'
import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/UI/IconButton'
import ExpensesContextProvider from './store/expenses-context'
const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary400
        },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        tabBarActiveTintColor: GlobalStyles.colors.primary50,
        headerRight: ({ tintColor }) => (
          <IconButton
            size={25}
            icon='add'
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense')
            }}
          />
        )
      })}
    >
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          headerTitle: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' size={size} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          headerTitle: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='hourglass' size={size} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App () {
  return (
    <>
      <StatusBar style='light' />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
              headerTintColor: 'white'
            }}
          >
            <Stack.Screen
              name='ExpensesOverview'
              options={{ headerShown: false }}
              component={ExpensesOverview}
            />
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{ presentation: 'modal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  )
}

const styles = StyleSheet.create({})
