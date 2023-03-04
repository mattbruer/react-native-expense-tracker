import axios from 'axios';

const BACKEND_URL = `https://rnexpense-9ee21-default-rtdb.firebaseio.com`;

export async function storeExpense(expenseData) {
  const { data } = await axios.post(
    BACKEND_URL + '/expenses.json',
    expenseData
  );
  const id = data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const expenses = [];

  for (const key in response.data) {
    const dataKey = response.data[key];
    const expenseObj = {
      id: key,
      amount: dataKey.amount,
      date: new Date(dataKey.date),
      description: dataKey.description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}
export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
