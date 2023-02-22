import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import SignIn from "../components/ui/pages/SignIn";

const Sign = () => {
    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    return (
        <>
            {!currentUser ? (
                <SignIn />
            ) : (
                <h1 className="text-4xl text-center mt-10">Nothing</h1>
            )}
        </>
    );
};

export default Sign;
