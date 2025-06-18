// src/features/auth/authAPI.js

export async function loginAPI({ email, password }) {
  // Replace with actual API call using fetch or axios
  if (email === 'test@example.com' && password === '123456') {
    return { name: 'Test User', email, token: 'fake-jwt-token' };
  }
  throw new Error('Invalid credentials');
}

export async function registerAPI({ name, email, password }) {
  // Simulate user registration
  return { name, email, token: 'fake-jwt-token' };
}
