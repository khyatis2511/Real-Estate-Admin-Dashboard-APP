/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    data: any | null;
    error: string | null;
    message: string | null;
    loading: boolean;
}

const initialState: UserState = {
    data: null,
    error: null,
    message: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        create: (state) => {
            state.loading = true;
        },
        createSuccess: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.error = null; 
            state.message = 'Data saved successfully';
            state.loading = false;
        },
        createFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        update: (state, action: PayloadAction<Partial<UserState["data"]>>) => {
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
                state.message = 'Data updated successfully';
                state.error = null;
            } else {
                state.error = 'No data available to update';
            }
            state.loading = false;
        },
        delete: (state) => {
            state.data = null;
            state.message = 'Data deleted successfully';
            state.error = null;
            state.loading = false;
        },
        reset: (state) => {
            state.data = null;
            state.error = null;
            state.message = null;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const {
    create,
    createSuccess,
    createFailure,
    update,
    delete: deleteData,
    reset,
    setLoading,
} = userSlice.actions;

export default userSlice.reducer;
