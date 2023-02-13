import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface InputsTypes {
    usernameUp: string;
    nameUp: string;
}

interface InputsInTypes {
    usernameIn: string;
    passwordIn: string;
}

const SignIn = () => {
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [alreadyExists, setAlreadyExists] = useState<boolean>(false);
    const [users, setUsers] = useState<{}[] | null>(null);
    const [usernameInput, setUsernameInput] = useState<string>("");
    const cookie = new Cookies();
    const route = useRouter();

    const fetchUsers = async () => {
        await axios({
            method: "get",
            url: "http://localhost:4000/user",
        })
            .then(function (response) {
                setUsers(response.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(e.target.value);
        setAlreadyExists(false);
    };

    const usernames = users?.map((item: any) => item.username);

    useEffect(() => {
        let timer = setTimeout(() => {
            fetchUsers();
            if (usernames?.includes(usernameInput)) {
                setAlreadyExists(true);
            } else {
                setAlreadyExists(false);
            }
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [usernameInput]);

    const handleForm = () => {
        setShowRegister(!showRegister);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<InputsTypes>();

    const {
        register: register1,
        formState: { errors: errors1 },
        handleSubmit: handleSubmit1,
    } = useForm<InputsInTypes>();

    const signUp: SubmitHandler<InputsTypes> = async (data) => {
        await axios
            .post(`http://localhost:4000/user/signup`, {
                username: data.usernameUp,
                name: data.nameUp,
            })
            .then((res) => {
                cookie.set("token", res.data.token, { path: "/" });
                if (res) {
                    route.push("/");
                    toast("ثبت نام با موفقیت انجام شد.");
                }
            })
            .catch(function (error) {
                if (
                    error.response.data.msg ===
                    "this username already exists in the database"
                ) {
                    setAlreadyExists(!alreadyExists);
                }
            });
    };

    const signIn: SubmitHandler<InputsInTypes> = async (data) => {
        await axios
            .post(`http://localhost:4000/user/login`, {
                username: data.usernameIn,
                password: data.passwordIn,
            })
            .then((res) => {
                cookie.set("token", res.data.token, { path: "/" });
                if (res) {
                    route.push("/");
                    toast(" ورود با موفقیت انجام شد.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="container mx-auto px-4">
            {showRegister ? (
                <div className="m-4 text-center">
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit(signUp)}
                        className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-2 sm:p-16"
                    >
                        <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full flex-col gap-2">
                                <a className="btn gap-2 bg-gray-400">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        version="1.1"
                                        viewBox="0 0 48 48"
                                        enableBackground="new 0 0 48 48"
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                        ></path>
                                        <path
                                            fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                        ></path>
                                        <path
                                            fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
  c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                    </svg>
                                    <span className="shabnam">
                                        ثبت نام با گوگل
                                    </span>
                                </a>
                                <a className="btn gap-2 bg-gray-400">
                                    <svg
                                        width="21"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fab"
                                        data-icon="github"
                                        className="svg-inline--fa fa-github fa-w-16"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 496 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                        ></path>
                                    </svg>

                                    <span className="shabnam">
                                        ثبت نام با گیتهاب
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="divider my-6 text-xs text-content2"></div>
                        <div className="form-group">
                            <div className="form-field relative">
                                <input
                                    {...register("usernameUp", {
                                        required: true,
                                        minLength: 1,
                                        maxLength: 17,
                                    })}
                                    placeholder="نام کاربری"
                                    type="text"
                                    className="input max-w-full shabnam"
                                    onChange={handleUsernameInput}
                                />
                                {errors.usernameUp && (
                                    <label className="form-label">
                                        <span className="form-label-alt shabnam mr-1 text-red-1000">
                                            یک نام کاربری مناسب وارد کنید.
                                        </span>
                                    </label>
                                )}
                                {alreadyExists && (
                                    <label className="form-label">
                                        <span className="form-label-alt shabnam mr-1 text-red-1000">
                                            این نام کاربری تکراری می‌باشد.
                                        </span>
                                    </label>
                                )}
                            </div>
                            <div className="form-field">
                                <div className="form-field">
                                    <input
                                        {...register("nameUp", {
                                            required: true,
                                            minLength: 1,
                                            maxLength: 17,
                                        })}
                                        placeholder="نام"
                                        type="text"
                                        className="input max-w-full shabnam"
                                    />
                                    {errors.nameUp && (
                                        <label className="form-label">
                                            <span className="form-label-alt shabnam mr-1 text-red-1000">
                                                یک نام مناسب وارد کنید.
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
                                        ثبت نام
                                    </button>
                                </div>
                            </div>
                            <div className="form-field">
                                <div
                                    className="form-control flex justify-center"
                                    onClick={handleForm}
                                >
                                    <a className="link link-underline-hover text-md shabnam">
                                        هم اکنون اکانت دارید؟ از اینجا وارد شوید
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="m-4 text-center">
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit1(signIn)}
                        className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-2 sm:p-16"
                    >
                        <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full flex-col gap-2">
                                <a className="btn gap-2 bg-gray-400">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        version="1.1"
                                        viewBox="0 0 48 48"
                                        enableBackground="new 0 0 48 48"
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                        ></path>
                                        <path
                                            fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                        ></path>
                                        <path
                                            fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
  c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                    </svg>
                                    <span className="shabnam">
                                        ثبت نام با گوگل
                                    </span>
                                </a>
                                <a className="btn gap-2 bg-gray-400">
                                    <svg
                                        width="21"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fab"
                                        data-icon="github"
                                        className="svg-inline--fa fa-github fa-w-16"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 496 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                        ></path>
                                    </svg>

                                    <span className="shabnam">
                                        ثبت نام با گیتهاب
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="divider my-6 text-xs text-content2"></div>
                        <div className="form-group">
                            <div className="form-field">
                                <input
                                    {...register1("usernameIn", {
                                        required: true,
                                        minLength: 1,
                                        maxLength: 17,
                                    })}
                                    placeholder="نام کاربری"
                                    type="text"
                                    className="input max-w-full shabnam"
                                />
                                <label className="form-label">
                                    <span className="form-label-alt shabnam mr-1 text-red-1000">
                                        یک نام کاربری مناسب وارد کنید.
                                    </span>
                                </label>
                            </div>
                            <div className="form-field">
                                <div className="form-field">
                                    <input
                                        {...register1("passwordIn", {
                                            required: true,
                                        })}
                                        placeholder="رمز عبور"
                                        type="password"
                                        className="input max-w-full shabnam"
                                    />
                                    <label className="form-label">
                                        <span className="form-label-alt shabnam mr-1 text-red-1000">
                                            یک نام کاربری مناسب وارد کنید.
                                        </span>
                                    </label>
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
                            <div className="form-field">
                                <div
                                    className="form-control flex justify-center"
                                    onClick={handleForm}
                                >
                                    <a className="link link-underline-hover text-md shabnam">
                                        اکانت ندارید؟ از اینجا ثبت نام کنید
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignIn;
