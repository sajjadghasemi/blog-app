import { RootState } from "@/store/store";
import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { editUser, updateAvatar } from "@/store/userSlice";

interface InputsInTypes {
    name: string;
    bio: string;
}

interface AvatarInputTypes {
    file: any;
}

const Edit = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    const cookie: string = new Cookies().get("token");

    const route = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<InputsInTypes>();

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm<AvatarInputTypes>();

    const edit: SubmitHandler<InputsInTypes> = async (data) => {
        await axios({
            method: "post",
            url: "http://localhost:4000/user/edit",
            data: {
                name: data.name,
                bio: data.bio,
            },
            headers: {
                auth: `ut ${cookie}`,
            },
        })
            .then(function (response) {
                if (response.data.msg === "ok") {
                    toast("ویرایش با موفقیت انجام شد.");
                }
            })
            .catch(function (error) {
                toast("مشکلی رخ داد. دوباره تلاش کنید");
            });
        dispatch(editUser({ name: data.name, bio: data.bio }));
        route.back();
    };

    const submitAvatar: SubmitHandler<AvatarInputTypes> = async (data) => {
        try {
            if (!data.file[0]) return;

            const formData = new FormData();
            formData.append("avatar", data.file[0]);

            await fetch("http://localhost:4000/user/update-avatar", {
                method: "POST",
                headers: {
                    auth: `ut ${cookie}`,
                },
                body: formData,
            }).then((res) => {
                if (res.ok === true) {
                    toast("عکس با موفقیت بارگذاری شد.");
                }
            });
        } catch (error) {
            console.log("lol");
        }
        dispatch(updateAvatar(data.file[0].name));
        route.back();
    };

    return (
        <div className="container mx-auto px-4">
            <div className="m-4 text-center">
                <div className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-2 sm:p-8">
                    <form onSubmit={handleSubmit2(submitAvatar)}>
                        <div className="flex w-full flex-col gap-3">
                            <div className="flex w-full items-center flex-col">
                                <label htmlFor="avatar-input">
                                    <img
                                        className="cursor-pointer w-32 h-32 rounded-full object-cover border-2 border-purple-1000"
                                        src={
                                            currentUser?.avatar
                                                ? "http://localhost:4000/" +
                                                  currentUser.avatar
                                                : "/icon.png"
                                        }
                                    />
                                </label>
                                <input
                                    {...register2("file")}
                                    type="file"
                                    id="avatar-input"
                                    className="hidden cursor-pointer w-48 px-2 py-1.5 text-[.7rem] text-gray-700 outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn bg-gray-700 w-full shabnam"
                            >
                                ثبت عکس
                            </button>
                        </div>
                    </form>
                    <div className="divider my-6 text-xs text-content2"></div>
                    <div className="form-group">
                        <form
                            autoComplete="off"
                            onSubmit={handleSubmit(edit)}
                            className="flex flex-col gap-4"
                        >
                            <div className="form-field">
                                <input
                                    {...register("name")}
                                    placeholder="نام"
                                    type="text"
                                    className="input max-w-full shabnam"
                                    defaultValue={currentUser?.name}
                                />
                                {errors.name && (
                                    <label className="form-label">
                                        <span className="form-label-alt shabnam mr-1 text-red-1000">
                                            یک نام مناسب وارد کنید.
                                        </span>
                                    </label>
                                )}
                            </div>
                            <div className="form-field">
                                <div className="form-field">
                                    <input
                                        {...register("bio", {
                                            required: true,
                                            maxLength: 200,
                                        })}
                                        placeholder="بیوگرافی"
                                        type="text"
                                        className="input max-w-full shabnam"
                                        defaultValue={currentUser?.bio}
                                    />
                                    {errors.bio && (
                                        <label className="form-label">
                                            <span className="form-label-alt shabnam mr-1 text-red-1000">
                                                یک بیوگرافی مناسب وارد کنید.
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="form-field pt-3">
                                <div className="form-control justify-between">
                                    <button
                                        type="submit"
                                        className="btn bg-gray-700 w-full shabnam"
                                    >
                                        ویرایش
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
