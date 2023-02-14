import Link from "next/link";
import StarRatings from "react-star-ratings";

const Home = () => {
    return (
        <div className="container max-w-[1000px] mx-auto px-20 m-4">
            <div className="m-4 grid grid-cols-1 md:grid-cols-3">
                <Link className="flex flex-col items-center" href="">
                    <div className="h-[270px] w-[270px] relative">
                        <img
                            className="p-1 h-full w-full object-cover cursor-pointer"
                            src="defaultImage.png"
                        />
                        <div
                            style={{ direction: "ltr" }}
                            className="absolute text-center p-1 bottom-1 left-1 bg-black w-[16.4rem] opacity-70"
                        >
                            <StarRatings
                                starRatedColor="orange"
                                numberOfStars={5}
                                rating={4.5}
                                starDimension="23px"
                                starSpacing="2px"
                            />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
