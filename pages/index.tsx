import { FC } from "react";
import Home from "@/components/ui/pages/Home";
import axios from "axios";
import { toast } from "react-toastify";

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

    console.log(BLOGS);

    return {
        props: {
            blogs: BLOGS,
        },
        revalidate: 1,
    };
};

export default HomePage;
