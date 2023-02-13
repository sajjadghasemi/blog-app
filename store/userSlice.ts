import { createSlice } from "@reduxjs/toolkit";

interface InitialStateTypes {
    currentUser: {
        _id: string;
        avatar: string;
        averageScore: number;
        bio: string;
    } | null;
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
        logout(state) {
            state.currentUser = null;
        },
    },
});

export const { setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer;
