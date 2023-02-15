import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface InputsTypes {
    title: string;
    imageUrl: string;
    content: string;
}

const AddBlog = () => {
    const route = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<InputsTypes>();

    const cookie = new Cookies().get("token");

    const newPost: SubmitHandler<InputsTypes> = async (data) => {
        await fetch("http://localhost:4000/blog/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: `ut ${cookie}`,
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content,
                imgurl: data.imageUrl,
            }),
        }).then((response) => response.json());
        toast("مطلب شما با موفقیت پست شد.");
        route.push("/");
    };

    return (
        <div className="container mx-auto px-4">
            <div className="m-4 text-center">
                <div className="mx-auto flex w-full max-w-lg flex-col gap-6 rounded-xl border border-border bg-backgroundSecondary p-2 sm:p-8">
                    <div>
                        <h2 className="shabnam text-2xl">
                            مطلب جدید اضافه کنید.
                        </h2>
                    </div>
                    <div className="form-group">
                        <form
                            autoComplete="off"
                            onSubmit={handleSubmit(newPost)}
                            className="flex flex-col gap-4"
                        >
                            <div className="form-field">
                                <input
                                    {...register("title", {
                                        required: true,
                                    })}
                                    placeholder="عنوان"
                                    type="text"
                                    className="input max-w-full shabnam"
                                />
                                {errors.title && (
                                    <label className="form-label">
                                        <span className="form-label-alt shabnam mr-1 text-red-1000">
                                            یک عنوان مناسب وارد کنید.
                                        </span>
                                    </label>
                                )}
                            </div>
                            <div className="form-field">
                                <input
                                    {...register("imageUrl", {
                                        required: true,
                                    })}
                                    placeholder="آدرس عکس"
                                    type="text"
                                    className="input max-w-full shabnam"
                                />
                                {errors.imageUrl && (
                                    <label className="form-label">
                                        <span className="form-label-alt shabnam mr-1 text-red-1000">
                                            یک عکس مناسب وارد کنید.
                                        </span>
                                    </label>
                                )}
                            </div>
                            <div className="form-field">
                                <textarea
                                    {...register("content", {
                                        required: true,
                                    })}
                                    placeholder="توضیحات"
                                    className="input max-w-full shabnam p-3 h-52"
                                ></textarea>
                                {errors.content && (
                                    <label className="form-label">
                                        <span className="form-label-alt shabnam mr-1 text-red-1000">
                                            توضیحات مناسب وارد کنید.
                                        </span>
                                    </label>
                                )}
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

export default AddBlog;
