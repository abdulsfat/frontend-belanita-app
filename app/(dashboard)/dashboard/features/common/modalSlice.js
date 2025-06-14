import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    title: "",
    isOpen: false,
    bodyType: "",
    size: "",
    extraObject: {},
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            const { title, bodyType, extraObject, size } = action.payload;
            state.isOpen = true;
            state.bodyType = bodyType;
            state.title = title;
            state.size = size || 'md';
            state.extraObject = extraObject;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.bodyType = "";
            state.title = "";
            state.extraObject = {};
        },
    }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
