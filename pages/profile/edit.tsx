import EditUser from "@/components/ui/pages/EditUser";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Edit = () => {
    const currentUser = useSelector(
        (state: RootState) => state.userSlice.currentUser
    );

    return (
        <>
            {currentUser ? (
                <EditUser />
            ) : (
                <h1 className="text-4xl text-center mt-10">Nothing</h1>
            )}
        </>
    );
};

export default Edit;
