import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSidebar: false,
    isCartScreen: false,
    isAddandBillingScreen: false,
    isPaymentScreen: false,
  },
  reducers: {
    reset: (state) => {
      state.isSidebar = true;
      state.isCartScreen = false;
      state.isAddandBillingScreen = false;
      state.isPaymentScreen = false;
      state.isPaymentComplete = false;
    },
    setCurrentDevice: (state, action) => {
      state.currentDevice = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.isSidebar = !state.isSidebar;
    },
    hideSidebar: (state) => {
      state.isSidebar = false;
    },
    showCartScreen: (state, action) => {
      state.isCartScreen = true;
      state.isAddandBillingScreen = false;
      state.isPaymentScreen = false;
      state.isCartComplete = false;
    },
    showAddandBillingScreen: (state) => {
      state.isCartScreen = false;
      state.isAddandBillingScreen = true;
      state.isPaymentScreen = false;
      state.isCartComplete = true;
      state.isBillComplete = false;
    },
    showPaymentScreen: (state) => {
      state.isCartScreen = false;
      state.isBillComplete = true;
      state.isAddandBillingScreen = false;
      state.isPaymentScreen = true;
      state.isPaymentComplete = false;
    },
    displayModal: (state) => {
      state.isModal = true;
    },
  },
  extraReducers: {},
});
export const {
  toggleSidebar,
  hideSidebar,
  showCartScreen,
  showAddandBillingScreen,
  showPaymentScreen,
  displayModal,
  setCurrentDevice,
} = uiSlice.actions;
export default uiSlice.reducer;
