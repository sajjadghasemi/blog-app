import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { FiPlusSquare, FiLogIn } from "react-icons/fi";
import { CgDarkMode } from "react-icons/cg";
import { TbEdit } from "react-icons/tb";
import { GiSpiderWeb } from "react-icons/gi";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { logout } from "@/store/userSlice";
import { toast } from "react-toastify";
import { toggleTheme } from "@/store/themeSlice";
import { useRouter } from "next/router";

const Navbar = () => {
    const route = useRouter();
    const cookie = new Cookies();
    const dispatch = useDispatch();

    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    const theme = useSelector(
        (state: RootState) => state.themeSlice.darkToggle
    );

    const toggleDark = () => {
        dispatch(toggleTheme(!theme));
    };

    const handleLogout = () => {
        cookie.remove("token");
        dispatch(logout());
        toast("خروج با موفقیت انجام شد.");
    };

    return (
        <div className="navbar rounded-t-3xl fixed bottom-0 bg-gray-1000 dark:bg-[#141414]">
            <div className="navbar-start">
                {currentUser ? (
                    <div className="avatar avatar-ring avatar-md">
                        <div className="dropdown-container">
                            <div className="dropdown dropdown-hover">
                                <label
                                    className="btn btn-ghost flex cursor-pointer px-0"
                                    tabIndex={0}
                                >
                                    <img
                                        src={
                                            currentUser?.avatar
                                                ? "http://localhost:4000/" +
                                                  currentUser.avatar
                                                : "/icon.png"
                                        }
                                        alt="avatar"
                                    />
                                </label>
                                <div className="text-center dropdown-menu border border-gray-500 dropdown-menu-top-left">
                                    <Link
                                        href="/profile"
                                        className="dropdown-item text-sm shabnam"
                                    >
                                        پروفایل
                                    </Link>
                                    <Link
                                        href="/"
                                        onClick={handleLogout}
                                        tabIndex={-1}
                                        className="dropdown-item text-sm shabnam"
                                    >
                                        خروج
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <span
                        className="tooltip tooltip-left"
                        data-tooltip="Login | Signup"
                    >
                        <Link href="/sign">
                            <p className="shabnam border-4 border-gray-800 rounded-md p-2">
                                <FiLogIn className="text-3xl text-black dark:text-[#c9c9c9] hover:scale-110" />
                            </p>
                        </Link>
                    </span>
                )}
                <span
                    className="tooltip tooltip-left mr-4"
                    data-tooltip="Change Theme"
                >
                    <CgDarkMode
                        onClick={toggleDark}
                        className="text-3xl cursor-pointer text-black dark:text-gray-1100"
                    />
                </span>
            </div>
            <div className="navbar-center overflow-hidden">
                <Link
                    href="/"
                    className="navbar-item text-black dark:text-gray-900"
                >
                    <HiOutlineHome className="text-3xl" />
                </Link>
                {currentUser ? (
                    <Link
                        href="/add-blog"
                        className="navbar-item text-black dark:text-gray-900"
                    >
                        <FiPlusSquare className="text-3xl" />
                    </Link>
                ) : null}
                <Link
                    href="/people"
                    className="navbar-item text-black dark:text-gray-900"
                >
                    <TbEdit className="text-3xl" />
                </Link>
                {currentUser ? (
                    <div
                        className={`h-[.25rem] w-[.25rem] bg-gray-1100 p-1 rounded-full mt-10 ${
                            route.pathname === "/"
                                ? "transition-all duration-300 ease-out visible translate-x-[151px]"
                                : route.pathname === "/add-blog"
                                ? "duration-300 translate-x-[92px]"
                                : route.pathname === "/people"
                                ? "transition-all duration-300 ease-out visible translate-x-[33px]"
                                : "hidden"
                        }`}
                    ></div>
                ) : (
                    <div
                        className={`h-[.25rem] w-[.25rem] bg-gray-1100 p-1 rounded-full mt-10 ${
                            route.pathname === "/"
                                ? "transition-all duration-300 ease-out visible translate-x-[93px]"
                                : route.pathname === "/people"
                                ? "transition-all duration-300 ease-out visible translate-x-[33px]"
                                : "hidden"
                        }`}
                    ></div>
                )}
            </div>
            <div className="navbar-end">
                <Link href="/" className="navbar-item text-3xl">
                    <GiSpiderWeb className="text-4xl text-black dark:text-gray-900 hover:scale-125" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
