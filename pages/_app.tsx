import Layout from "@/components/ui/layouts/Layout";
import { wrapper, store } from "@/store/store";
import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "@/store/userSlice";
import { Cookies } from "react-cookie";

function App({ Component, pageProps }: AppProps) {
    const dispatch = useDispatch();
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
                console.log(response.data);
                dispatch(setCurrentUser(response.data));
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    useEffect(() => {
        me();
    }, []);

    return (
        <Provider store={store}>
            <Layout>
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
            </Layout>
        </Provider>
    );
}

export default wrapper.withRedux(App);
