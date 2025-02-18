import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Kullanıcı durumu
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Durumu güncelle
    },
    logout: (state) => {
      state.user = null; // Kullanıcı durumunu sıfırla
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
