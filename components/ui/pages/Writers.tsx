import Link from "next/link";
import { FC } from "react";

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
const Writers: FC<UsersTypes> = (props) => {
    return (
        <div className="container max-w-[1000px] mx-auto px-20 m-4">
            {props.users.map((item, i) => (
                <Link className="text-gray-600" href={`/people/${item._id}`}>
                    <div
                        key={i}
                        className="ring-1 grid grid-cols-2 place-items-center ring-gray-300 hover:shadow-lg p-2"
                    >
                        <div className="p-3">
                            <img
                                className="rounded-full border border-gray-300 p-1 h-16 md:h-36 w-16 md:w-36"
                                src={
                                    item.avatar
                                        ? `http://localhost:4000/${item.avatar}`
                                        : "/userAvatar.png"
                                }
                            />
                        </div>
                        <div className="text-[.7rem] md:text-[1.2rem] p-3 ml-5">
                            <p className="text-white shabnam">{item.name}</p>
                            <p className="text-white mt-2 text-[.8rem] shabnam">
                                {item.bio ? item.bio : "No info"}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Writers;
