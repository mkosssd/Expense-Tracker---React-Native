import { useContext, useState } from 'react'

// import LoadingOverlay from '../components/ui/LoadingOverlay';
import Signup from '../../components/Auth/Signup'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { createUser } from '../../util/http'
import { AuthContext } from '../../store/Auth-context'
import AppLoading from 'expo-app-loading'
import LoadingOverlay from '../../components/UI/LoadingOverlay'

function SignupScreen () {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authCtx = useContext(AuthContext)
  async function signupHandler (email, password, name) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password, name)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        'Error Creating User!',
        'Cannot Sign Up. Please Try Again Later!'
      )
    }
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />
  }

  return <Signup onAuthenticate={signupHandler} />
}

export default SignupScreen
