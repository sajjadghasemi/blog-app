import { FC } from "react";
import SingleBlog from "@/components/ui/pages/SingleBlog";
import axios from "axios";
import React from "react";
import HomeLoading from "@/components/ui/layouts/HomeLoading";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { blogComments } from "@/hooks/fetches";
import Head from "next/head";

interface BlogTypes {
    blog: {
        _id: string;
        title: string;
        content: string;
        creatorId: string;
        imgurl: string;
        averageScore: number;
        createdAt: string;
        updatedAt: string;
        creator: {
            _id: string;
            username: string;
            name: string;
            bio: string;
            blogs: string[];
            avatar: string;
            averageScore: number;
            createdAt: string;
            updatedAt: string;
        };
        rateCount: number;
    };
}

interface IdsTypes {
    _id: string;
    title: string;
    content: string;
    creatorId: string;
    imgurl: string;
    averageScore: number;
    createdAt: string;
    updatedAt: string;
    creator: {
        _id: string;
        username: string;
        name: string;
        bio: string;
        blogs: string[];
        avatar: string;
        averageScore: number;
        createdAt: string;
        updatedAt: string;
    };
    rateCount: number;
}

interface ContextTypes {
    params: { blogId: string };
    locales: undefined;
    locale: undefined;
    defaultLocale: undefined;
}

const Single: FC<BlogTypes> = (props) => {
    if (!props.blog) return <HomeLoading />;

    return (
        <>
            <Head>
                <title>Blog App | {props.blog.title}</title>
                <meta name="description" content={props.blog.content} />
            </Head>
            <SingleBlog blog={props.blog} />
        </>
    );
};

export const getStaticPaths = async () => {
    const BLOGS = await axios({
        method: "GET",
        url: `http://localhost:4000/blog`,
    }).then(function (response) {
        return response.data;
    });

    return {
        fallback: false,
        paths: BLOGS.map((blog: IdsTypes) => ({
            params: { blogId: blog._id },
        })),
    };
};

export const getStaticProps = async (context: ContextTypes) => {
    const blogId = context.params.blogId;
    const SINGLE_BLOG = await axios({
        method: "GET",
        url: `http://localhost:4000/blog/single-blog/${blogId}`,
    }).then(function (response) {
        return response.data;
    });

    const queryClient = new QueryClient();

    await queryClient.fetchQuery(["comments", blogId], () =>
        blogComments(blogId)
    );

    return {
        props: {
            blog: SINGLE_BLOG,
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default Single;
