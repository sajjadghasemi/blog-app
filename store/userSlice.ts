import { createSlice } from "@reduxjs/toolkit";

interface InitialStateTypes {
    currentUser: {} | null;
}

const initialState: InitialStateTypes = {
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
