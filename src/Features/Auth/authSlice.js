// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI } from './authApi';

const userFromStorage = JSON.parse(localStorage.getItem('user')) || null;

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const user = await loginAPI(credentials);
  return user;
});

export const register = createAsyncThunk('auth/register', async (userInfo) => {
  const user = await registerAPI(userInfo);
  return user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      // state.isLoading = false;
      // state.isError = false;
      // state.message = '';
    },

    // logout: (state) => {
    //   state.user = null;
    //   localStorage.removeItem('authToken');
    //   localStorage.removeItem('currentUser');
    //   state.loading = false;
    //   state.error = null;
    // },
    // You might have an action to set user from localStorage on app load
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
