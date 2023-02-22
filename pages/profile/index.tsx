import HomeLoading from "@/components/ui/layouts/HomeLoading";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
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
                                href="profile/edit"
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
            <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                <h1>
                    <Link
                        className="flex flex-col justify-center shabnam text-2xl"
                        href={"/" + currentUser?._id}
                    >
                        صفحتو ببین ، کلیک کن
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default Profile;
