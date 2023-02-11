import { getLoggedUser } from '@/services/users';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('loggedUser', async thunkApi => {
  const user = await getLoggedUser();
  return user;
});

const initialState: UserState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
