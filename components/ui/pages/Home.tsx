import { FC } from "react";
import Link from "next/link";
import StarRatings from "react-star-ratings";

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

const Home: FC<BlogsTypes> = (props) => {
    return (
        <div className="container max-w-[1000px] mx-auto px-20 m-4">
            <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                {props.blogs.map((item) => (
                    <Link
                        className="flex flex-col items-center"
                        href={item._id}
                        key={item._id}
                    >
                        <div className="relative w-[15rem] h-[15rem]">
                            <img
                                loading="lazy"
                                className="h-full w-full object-cover cursor-pointer"
                                src={
                                    item?.imgurl
                                        ? item.imgurl
                                        : "/defaultImage.png"
                                }
                            />
                            <div
                                style={{ direction: "ltr" }}
                                className="absolute text-center w-full py-1 bottom-0 bg-black opacity-70"
                            >
                                <StarRatings
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    rating={4.5}
                                    starDimension="16px"
                                    starSpacing="2px"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
