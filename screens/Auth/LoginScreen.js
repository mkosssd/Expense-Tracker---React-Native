import { View, Text, Alert } from 'react-native'
import React, { useContext } from 'react'
import Login from '../../components/Auth/Login'
import { userLogin } from '../../util/http';
import { AuthContext } from '../../store/Auth-context';

export default function LoginScreen() {
  const authCtx = useContext(AuthContext)
  const token = authCtx.token
  const loginHandler = async(enteredEmail, enteredPassword) => {
    try{
      const data = await userLogin(enteredEmail, enteredPassword);
      authCtx.authenticate(data.token, data.ref_token);
    }catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    }
  }
  return (
    <Login onAuthenticate={loginHandler}/>
  )
}