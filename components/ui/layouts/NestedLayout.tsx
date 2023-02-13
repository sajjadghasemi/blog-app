import Link from "next/link";
import { PropsWithChildren } from "react";

const NestedLayout = ({ children }: PropsWithChildren<{}>) => {
    return (
        <>
            <Link href="/" className="text-2xl">
                Home
            </Link>
            <Link href="/dashbord/ali" className="text-2xl ml-10">
                Ali
            </Link>
            <main>{children}</main>
        </>
    );
};

export default NestedLayout;
