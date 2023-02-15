import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";

const UserId = () => {
    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    return (
        <div className="container mx-auto px-20 m-4">
            <div className="m-4 grid grid-cols-1 border-b-2">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 justify-center">
                        <img
                            className="w-12 h-12 md:w-32 md:h-32 rounded-full object-cover border-2 border-purple-1000"
                            src={
                                currentUser?.avatar
                                    ? "http://localhost:4000/" +
                                      currentUser.avatar
                                    : "/icon.png"
                            }
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="p-4 flex flex-col gap-2 justify-center">
                            <h1 className="text-sm md:text-xl shabnam">
                                {currentUser?.name
                                    ? currentUser.name
                                    : "نام را وارد کنید"}
                            </h1>
                            <p className="text-xs md:text-md shabnam">
                                {currentUser?.bio
                                    ? currentUser.bio
                                    : "بیوگرافی را وارد کنید"}
                            </p>
                        </div>
                        {currentUser ? (
                            <Link
                                href={
                                    currentUser?._id
                                        ? currentUser._id + "/edit"
                                        : "/"
                                }
                                className="flex justify-center items-center text-3xl shabnam"
                            >
                                ...
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
                <Link className="flex flex-col items-center" href="">
                    <div className="relative">
                        <img
                            className="h-full w-full object-cover cursor-pointer"
                            src="defaultImage.png"
                        />
                        <div
                            style={{ direction: "ltr" }}
                            className="absolute text-center w-full py-1 bottom-0 border bg-black opacity-70"
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
                <Link className="flex flex-col items-center" href="">
                    <div className="relative">
                        <img
                            className="h-full w-full object-cover cursor-pointer"
                            src="defaultImage.png"
                        />
                        <div
                            style={{ direction: "ltr" }}
                            className="absolute text-center w-full py-1 bottom-0 border bg-black opacity-70"
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
                <Link className="flex flex-col items-center" href="">
                    <div className="relative">
                        <img
                            className="h-full w-full object-cover cursor-pointer"
                            src="defaultImage.png"
                        />
                        <div
                            style={{ direction: "ltr" }}
                            className="absolute text-center w-full py-1 bottom-0 border bg-black opacity-70"
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
                <Link className="flex flex-col items-center" href="">
                    <div className="relative">
                        <img
                            className="h-full w-full object-cover cursor-pointer"
                            src="defaultImage.png"
                        />
                        <div
                            style={{ direction: "ltr" }}
                            className="absolute text-center w-full py-1 bottom-0 border bg-black opacity-70"
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
            </div>
        </div>
    );
};

export default UserId;
