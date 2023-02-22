import { FC, useState } from "react";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { FaRegCommentDots } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { blogComments } from "@/hooks/fetches";
import HomeLoading from "../layouts/HomeLoading";

interface InputsTypes {
    comment: string;
}

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

interface CommentsTypes {
    _id: string;
    text: string;
    userId: string;
    createdAt: string;
    user: {
        _id: string;
        username: string;
        name: string;
        bio: string;
        blogs: string;
        avatar: string;
        averageScore: number;
        createdAt: string;
        updatedAt: string;
    };
}

const SingleBlog: FC<BlogTypes> = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    const handleDropdown = () => {
        setDropdown(!dropdown);
    };

    const clickDropdownBody = () => {
        setDropdown(!dropdown);
    };

    const route = useRouter();

    const { data, refetch } = useQuery({
        queryFn: () => blogComments(props.blog._id),
        queryKey: ["comments"],
    });

    const cookie = new Cookies().get("token");

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<InputsTypes>();

    const submitComment: SubmitHandler<InputsTypes> = async (data) => {
        fetch("http://localhost:4000/comment/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: `ut ${cookie}`,
            },
            body: JSON.stringify({
                blogId: route.query.blogId,
                text: data.comment,
            }),
        }).then((response) => response.json());
        toast.success("نظر شما با موفقیت ثبت شد.");
        refetch();
        reset();
    };

    const changeRating = async (rating: number) => {
        if (currentUser) {
            await axios.post(
                "http://localhost:4000/blog/submit-rate",
                {
                    blogId: props.blog._id,
                    score: rating,
                },
                {
                    headers: {
                        auth: `ut ${cookie}`,
                    },
                }
            );
            toast.success("با موفقیت ثبت شد.");
        } else {
            route.push("/sign");
            toast.warning("برای ثبت رای باید وارد شوید.");
        }
    };

    const deleteBlog = async () => {
        await fetch("http://localhost:4000/blog/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: `ut ${cookie}`,
            },
            body: JSON.stringify({
                blogId: props.blog._id,
            }),
        }).then((response) => response.json());
        toast.success("با موفقیت حذف شد.");
    };

    return (
        <div className="container max-w-[1000px] mx-auto px-20 m-4">
            <div className="px-3 grid gap-2 grid-cols-1 md:grid-cols-2 my-2">
                <div className="h-auto w-auto">
                    <img
                        className="object-cover h-full w-full border border-gray-800"
                        src={
                            props.blog.imgurl
                                ? props.blog.imgurl
                                : "/userAvatar.png"
                        }
                    />
                </div>
                <div className="p-3 mr-3">
                    <div className="flex justify-between items-center relative">
                        <img
                            className="hidden md:block h-20 w-20 border border-gray-400 rounded-full"
                            src={
                                props.blog.creator.avatar
                                    ? `http://localhost:4000/${props.blog.creator.avatar}`
                                    : "/userAvatar.png"
                            }
                        />
                        <div style={{ direction: "ltr" }}>
                            <StarRatings
                                starRatedColor="orange"
                                numberOfStars={5}
                                name="rating"
                                starDimension="23px"
                                rating={props.blog.averageScore}
                                starSpacing="2px"
                                changeRating={changeRating}
                            />
                        </div>
                        {currentUser?._id === currentUser?._id && (
                            <span
                                onClick={handleDropdown}
                                className="cursor-pointer text-3xl mb-5"
                            >
                                ...
                            </span>
                        )}
                        {dropdown && (
                            <div
                                onClick={clickDropdownBody}
                                className="absolute left-1 top-10 my-2 bg-gray-100 rounded divide-y divide-gray-400 shadow-lg"
                            >
                                <ul>
                                    <li>
                                        <Link
                                            href={props.blog._id + "/edit"}
                                            className="block py-2 px-4 text-sm text-white hover:bg-gray-200"
                                        >
                                            Edit
                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link
                                            href="/"
                                            onClick={deleteBlog}
                                            className="block py-2 px-4 text-sm text-white hover:bg-gray-200"
                                        >
                                            Delete
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <p className="text-xl mt-4 ml-2 shabnam">
                        {props.blog.title}
                    </p>
                    <p className="text-md text-gray-1000 mt-2 ml-2 shabnam">
                        {props.blog.content}
                    </p>
                </div>
            </div>
            {currentUser ? (
                <form autoComplete="off" onSubmit={handleSubmit(submitComment)}>
                    <div className="mt-3 p-2 w-full border text-center border-gray-400 rounded">
                        <FaRegCommentDots className="text-xl block" />
                        <textarea
                            {...register("comment", {
                                required: true,
                            })}
                            placeholder="نظر خود را بنویسید..."
                            className="bg-inherit text-sm block w-full mt-1 p-1 outline-none resize-none shabnam"
                        ></textarea>
                        {errors.comment && (
                            <label className="form-label">
                                <span className="form-label-alt shabnam mr-1 text-red-1000">
                                    فیلد نظرات خالی میباشد.
                                </span>
                            </label>
                        )}
                        <button
                            type="submit"
                            className="text-sm bg-gray-600 py-1 px-3 rounded text-gray-1100 mt-1 shabnam hover:bg-gray-400"
                        >
                            ثبت نظر
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mt-3 p-2 w-full border text-center border-gray-400 rounded">
                    <FaRegCommentDots className="text-xl inline-block ml-2" />
                    <Link
                        className="text-gray-1100 hover:text-gray-900 shabnam"
                        href="/sign"
                    >
                        برای ثبت نظر وارد شوید.
                    </Link>
                </div>
            )}
            <div className="grid grid-cols-1 my-3 p-2 w-full">
                {!data ? (
                    <div className="flex flex-col">
                        <h2 className="p-1 text-xl underline shabnam mb-3">
                            نظرات
                        </h2>
                        <span className="text-gray-1100 text-md shabnam text-center">
                            هنوز نظری ثبت نشده!
                        </span>
                    </div>
                ) : (
                    data.map((item: CommentsTypes) => (
                        <div
                            key={item._id}
                            className="border-b py-2 border-gray-400 px-1 shabnam"
                        >
                            <b className="text-red-1100 text-md shabnam">
                                {item.user.username}:
                            </b>
                            <span className="text-gray-1000 text-sm shabnam">
                                {" "}
                                {item.text}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SingleBlog;
