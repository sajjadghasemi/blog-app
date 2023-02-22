import AddBlog from "@/components/ui/pages/AddBlog";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const NewBlog = () => {
    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    return (
        <>
            {currentUser ? (
                <AddBlog />
            ) : (
                <h1 className="text-4xl text-center mt-10">Nothing</h1>
            )}
        </>
    );
};

export default NewBlog;
