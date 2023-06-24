import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseApi } from '../Firebase';
import { AppThunk } from './store';

export interface UserState {
  userId: string | null | undefined;
}

const initialState: UserState = {
  userId: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => { },
});

export const { setUserId } = userSlice.actions;

export const handleUserChange =
  (firebaseApi: FirebaseApi, userId: string | null): AppThunk =>
    (dispatch, getState) => {
      if (userId === getState().user.userId) {
        return;
      }
      dispatch(setUserId(userId));
    };

export default userSlice.reducer;
