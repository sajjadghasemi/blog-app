import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineHome } from "react-icons/hi";
import { FiPlusSquare, FiLogIn } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { GiSpiderWeb } from "react-icons/gi";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { logout } from "@/store/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
    const cookie = new Cookies();
    const dispatch = useDispatch();

    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    const route = useRouter();

    const handleLogout = () => {
        cookie.remove("token");
        dispatch(logout());
        toast("خروج با موفقیت انجام شد.");
    };

    return (
        <div className="navbar rounded-t-3xl fixed bottom-0">
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
                                        href={currentUser._id}
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
                                <FiLogIn className="text-3xl" />
                            </p>
                        </Link>
                    </span>
                )}
            </div>
            <div className="navbar-center">
                <Link
                    href="/"
                    className={`navbar-item shabnam text-gray-900 ${
                        route.pathname == "/" ? "text-white" : ""
                    }`}
                >
                    <HiOutlineHome className="text-3xl" />
                </Link>
                <Link href="/" className="navbar-item shabnam text-gray-900">
                    <FiPlusSquare className="text-3xl" />
                </Link>
                <Link
                    href="/news"
                    className="navbar-item text-gray-900 shabnam"
                >
                    <TbEdit className="text-3xl" />
                </Link>
            </div>
            <div className="navbar-end">
                <Link href="/" className="navbar-item text-3xl shabnam">
                    <GiSpiderWeb className="text-4xl" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
