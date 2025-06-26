// src/features/auth/authAPI.js

export async function loginAPI({ accountNumber, password }) {
  console.log('Login API called with:', accountNumber)
  accountNumber = accountNumber.toString() // Ensure accountnumber is a number
  console.log('Login API called with:', typeof accountNumber, accountNumber, typeof password, password);
  // Replace with actual API call using fetch or axios
  if (accountNumber === '1234567890123456' && password === '123456') {
    return { name: 'Test User', accountNumber, token: 'fake-jwt-token' };
  }
  throw new Error('Invalid credentials');
}

export async function registerAPI({ name, email, password }) {
  // Simulate user registration
  return { name, email, token: 'fake-jwt-token' };
}
