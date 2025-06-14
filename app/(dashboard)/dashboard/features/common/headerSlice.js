import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageTitle: "Home",
    noOfNotifications: 15,
    newNotificationMessage: "",
    newNotificationStatus: 1,
};

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setPageTitle: (state, action) => {
            state.pageTitle = action.payload.title;
        },
        removeNotificationMessage: (state) => {
            state.newNotificationMessage = "";
        },
        showNotification: (state, action) => {
            state.newNotificationMessage = action.payload.message;
            state.newNotificationStatus = action.payload.status;
        },
    }
});

export const { setPageTitle, removeNotificationMessage, showNotification } = headerSlice.actions;

export default headerSlice.reducer;
