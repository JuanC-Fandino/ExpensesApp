import axios from 'axios';

const URL = 'https://react-native-co-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await axios.post(URL + '/expenses.json', expenseData);

  return response.data.name; // In firebase is equivalent to the id
}

export async function fetchExpenses() {
  const response = await axios.get(URL + '/expenses.json');
  const expenses = [];

  for (const key in response.data) {
    const expenseobj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseobj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(URL + `/expenses/${id}.json`);
}
