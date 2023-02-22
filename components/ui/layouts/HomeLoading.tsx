import { toast } from "react-toastify";

const HomeLoading = () => {
    toast.error("مشکلی رخ داد.");
    return (
        <div className="container max-w-[1000px] mx-auto px-20 m-4">
            <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                <div className="flex flex-col items-center">
                    <div className="w-[15rem] h-[15rem] skeleton"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-[15rem] h-[15rem] skeleton"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-[15rem] h-[15rem] skeleton"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-[15rem] h-[15rem] skeleton"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-[15rem] h-[15rem] skeleton"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-[15rem] h-[15rem] skeleton"></div>
                </div>
            </div>
        </div>
    );
};

export default HomeLoading;
