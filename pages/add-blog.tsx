import AddBlog from "@/components/ui/pages/AddBlog";
import { RootState } from "@/store/store";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";

const NewBlog = () => {
    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    return (
        <>
            {currentUser ? (
                <>
                    <Head>
                        <title>Blog App | Add Blog</title>
                        <meta name="description" content="Add new blog" />
                    </Head>
                    <AddBlog />
                </>
            ) : (
                <h1 className="text-4xl text-center mt-10">Nothing</h1>
            )}
        </>
    );
};

export default NewBlog;
