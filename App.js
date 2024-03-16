import { AntDesign, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext, useEffect, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import IconButton from './components/UI/IconButton'
import { GlobalStyles } from './constants/styles'
import AllExpenses from './screens/AllExpenses'
import LoginScreen from './screens/Auth/LoginScreen'
import SignupScreen from './screens/Auth/SignupScreen'
import RecentExpenses from './screens/RecentExpenses'
import AuthContentProvider, { AuthContext } from './store/Auth-context'
import LoadingOverlay from './components/UI/LoadingOverlay'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ExpensesContextProvider from './store/expenses-context'
import ManageExpense from './screens/ManageExpense'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  )
}

const Navigation = () => {
  const AuthCTX = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!AuthCTX.isAuthenticated && <AuthenticationStack />}
      {AuthCTX.isAuthenticated && (
        <ExpensesContextProvider>
          <Stack.Navigator>
            <Stack.Screen
              name='Expenses'
              component={ExpensesOverview}
              options={({ navigation }) => ({
                title: 'Expenses',
                headerShown: false
              })}
            />
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </ExpensesContextProvider>
      )}
    </NavigationContainer>
  )
}

const ExpensesOverview = () => {
  const AuthCTX = useContext(AuthContext)
  return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary400
          },
          headerTintColor: 'white',
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary400 },
          tabBarActiveTintColor: GlobalStyles.colors.primary50,
          headerRight: () => (
            <IconButton
              size={25}
              icon='exit'
              color='white'
              onPress={() => {
                AuthCTX.logout()
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
        <BottomTabs.Screen
          name='ManageExpenses'
          component={ManageExpense}
          options={{
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={size} name='add' color={color} />
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
      <AuthContentProvider>
        <Root />
      </AuthContentProvider>
    </>
  )
}

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true)

  const AuthCTX = useContext(AuthContext)

  useEffect(() => {
    async function fetchToken () {
      const storedToken = await AsyncStorage.getItem('token')

      if (storedToken) {
        AuthCTX.authenticate(storedToken)
      }

      setIsTryingLogin(false)
    }

    fetchToken()
  }, [])

  if (isTryingLogin) {
    return <LoadingOverlay />
  }

  return <Navigation />
}

const styles = StyleSheet.create({})
