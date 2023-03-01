import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        // Always do navigations after the first render
        router.push("/page/?brand=samsung", undefined, { shallow: true });
    }, []);

    useEffect(() => {}, [router.query.brand]);

    const changeUrl = () => {
        router.push("/page/?brand=sony", undefined, { shallow: true });
    };

    console.log(router.query);

    return (
        <div>
            <button onClick={changeUrl}>ssssss</button>
        </div>
    );
};

export default Page;
