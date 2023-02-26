import { FC } from "react";
import Writers from "@/components/ui/pages/Writers";
import axios from "axios";
import HomeLoading from "@/components/ui/layouts/HomeLoading";
import { toast } from "react-toastify";

interface UsersTypes {
    users: {
        _id: string;
        username: string;
        name: string;
        bio: string;
        avatar: string;
        averageScore: number;
        createdAt: string;
        updatedAt: string;
    }[];
}
const People: FC<UsersTypes> = (props) => {
    if (!props.users) return <HomeLoading />;

    return <Writers users={props.users} />;
};

export const getStaticProps = async () => {
    const USERS = await axios({
        method: "GET",
        url: "http://localhost:4000/user/",
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function () {
            toast.error("مشکلی رخ داده است.");
        });

    return {
        props: {
            users: USERS || null,
        },
        revalidate: 1,
    };
};

export default People;
