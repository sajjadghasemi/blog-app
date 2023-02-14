import Layout from "@/components/ui/layouts/Layout";
import { wrapper, store, RootState } from "@/store/store";
import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/store/userSlice";
import { Cookies } from "react-cookie";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
    const renderWithLayout =
        Component.getLayout ||
        function (page) {
            return <Layout>{page}</Layout>;
        };
    const dispatch = useDispatch();
    const userEdited = useSelector(
        (state: RootState) => state.userSlice.userEdited
    );
    const updateAvatar = useSelector(
        (state: RootState) => state.userSlice.updateAvatar
    );

    const cookie: string = new Cookies().get("token");

    const me = async () => {
        await axios({
            method: "post",
            url: "http://localhost:4000/user/me",
            headers: {
                auth: `ut ${cookie}`,
            },
        })
            .then(function (response) {
                dispatch(setCurrentUser(response.data));
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    useEffect(() => {
        me();
    }, [cookie, userEdited, updateAvatar]);

    return renderWithLayout(
        <Provider store={store}>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Component {...pageProps} />
        </Provider>
    );
}

export default wrapper.withRedux(App);
