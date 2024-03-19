import axios from 'axios'

const BACKEND_URL =
  'https://expense-app---react-native-default-rtdb.firebaseio.com/'

const API_KEY = `AIzaSyCGgRuQGnO4gKKvrTMSoAP6Ze1m2wxHLcY`

export async function storeExpenseRequest (expenseData, token) {
  const response = await axios.post(
    BACKEND_URL + `/expenses.json?auth=${token}`,
    expenseData
  )
  const id = response.data.name
  return id
}
export async function getExpensesRequest (token) {
  const response = await axios.get(BACKEND_URL + `/expenses.json?auth=${token}`)

  const expenses = []
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    }
    expenses.push(expenseObj)
  }
  return expenses
}
function autoLogout () {}
export function updateExpenseRequest (id, expenseData, token) {
  return axios.put(
    BACKEND_URL + `/expenses/${id}.json?auth=${token}`,
    expenseData
  )
}
export async function deleteExpenseRequest (id, token) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json?auth=${token}`)
}
// export const authenticate = async (mode, email, password) => {
//   const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

//   const response = await axios.post(URL, {
//     email: email,
//     password: password,
//     returnSecureToken: true
//   })

// }
export async function createUser (email, password, name) {
  const signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
  const userData = {
    email: email,
    password: password,
    displayName: name,
    returnSecureToken: true
  }
  const response = await axios.post(signUpEndpoint, userData)
  return response.data.idToken
}

export const userLogin = async (email, password) => {
  const signInEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
  const userData = {
    email: email,
    password: password,
    returnSecureToken: true
  }
  const response = await axios.post(signInEndpoint, userData)
  const data = {
    token: response.data.idToken,
    ref_token: response.data.refreshToken
  }
  return data
}

export const refereshToken = async ref_token => {
	try {
		
		const response = await axios.post('https://securetoken.googleapis.com/v1/token?key='+API_KEY,{
			grant_type: 'refresh_token',
			refresh_token: ref_token
		})
		authCtx.authenticate(response.data.id_token, response.data.refresh_token);
	} catch (error) {
	}
}
