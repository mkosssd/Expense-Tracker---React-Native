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
const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary400
        },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        tabBarActiveTintColor: GlobalStyles.colors.primary50
      }}
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
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='ExpensesOverview'
            options={{ headerShown: false }}
            component={ExpensesOverview}
          />
          <Stack.Screen name='ManageExpense' component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({})
