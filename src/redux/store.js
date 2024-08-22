import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import accountReducer from '../redux/account/accountSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer // Khai báo Reducer có tên "account" (để sử dụng trong file accountSlice.jsx line 16)
  },
});
