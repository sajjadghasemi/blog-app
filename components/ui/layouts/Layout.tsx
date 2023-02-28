import { RootState } from "@/store/store";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren<{}>) => {
    const theme = useSelector(
        (state: RootState) => state.themeSlice.darkToggle
    );

    return (
        <div className={`${theme && "dark"}`}>
            <main className="mb-20">{children}</main>
            <Navbar />
        </div>
    );
};
export default Layout;
