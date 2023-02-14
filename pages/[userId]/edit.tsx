import { RootState } from "@/store/store";
import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { editUser } from "@/store/userSlice";

interface InputsInTypes {
    name: string;
    bio: string;
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

    // const submitAvatar = async (data) => {
    //     try {
    //         if (!data.file[0]) return;

    //         const formData = new FormData();
    //         formData.append("avatar", data.file[0]);

    //         await fetch("http://localhost:4000/user/update-avatar", {
    //             method: "POST",
    //             headers: {
    //                 auth: `ut ${cookie}`,
    //             },
    //             body: formData,
    //         }).then((res) => {
    //             console.log(res);
    //         });
    //     } catch (error) {
    //         console.log("lol");
    //     }
    // };

    return (
        <div className="container mx-auto px-4">
            <div className="m-4 text-center">
                <div className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-2 sm:p-8">
                    <div className="flex w-full items-center flex-col gap-3">
                        <img
                            className="w-32 h-32 rounded-full object-cover border-2 border-purple-1000"
                            src={
                                currentUser?.avatar
                                    ? currentUser.avatar
                                    : "/icon.png"
                            }
                        />
                        <button
                            type="submit"
                            className="btn bg-gray-700 w-full shabnam"
                        >
                            ثبت عکس
                        </button>
                    </div>
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
                                        ورود
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
