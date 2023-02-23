import { FC, Suspense, useState } from "react";
import Home from "@/components/ui/pages/Home";
import axios from "axios";
import { toast } from "react-toastify";
import HomeLoading from "@/components/ui/layouts/HomeLoading";

interface BlogsTypes {
    blogs: {
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
        rateCount: 0;
    }[];
}

const HomePage: FC<BlogsTypes> = (props) => {
    if (!props.blogs) return <HomeLoading />;

    return <Home blogs={props.blogs} />;
};

export const getStaticProps = async () => {
    const BLOGS = await axios({
        method: "GET",
        url: "http://localhost:4000/blog",
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function () {
            toast.error("مشکلی رخ داده است.");
        });

    return {
        props: {
            blogs: BLOGS || null,
        },
        revalidate: 1,
    };
};

export default HomePage;
