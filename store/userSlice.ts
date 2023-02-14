import { createSlice } from "@reduxjs/toolkit";

interface InitialStateTypes {
    currentUser: {
        _id: string;
        name: string;
        username: string;
        avatar: string;
        averageScore: number;
        bio: string;
    } | null;
    userEdited: { name: string; bio: string };
}

const initialState: InitialStateTypes = {
    currentUser: null,
    userEdited: { name: "", bio: "" },
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
        editUser(state, action) {
            state.userEdited = action.payload;
        },
    },
});

export const { setCurrentUser, logout, editUser } = userSlice.actions;

export default userSlice.reducer;
