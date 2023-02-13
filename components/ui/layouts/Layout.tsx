import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren<{}>) => {
    return (
        <>
            <main className="mb-20">{children}</main>
            <Navbar />
        </>
    );
};
export default Layout;
