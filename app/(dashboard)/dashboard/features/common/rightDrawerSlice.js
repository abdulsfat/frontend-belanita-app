import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    header: "",
    isOpen: false,
    bodyType: "",
    extraObject: {},
};

export const rightDrawerSlice = createSlice({
    name: 'rightDrawer',
    initialState,
    reducers: {
        openRightDrawer: (state, action) => {
            const { header, bodyType, extraObject } = action.payload;
            state.isOpen = true;
            state.bodyType = bodyType;
            state.header = header;
            state.extraObject = extraObject;
        },
        closeRightDrawer: (state) => {
            state.isOpen = false;
            state.bodyType = "";
            state.header = "";
            state.extraObject = {};
        },
    }
});

export const { openRightDrawer, closeRightDrawer } = rightDrawerSlice.actions;

export default rightDrawerSlice.reducer;
