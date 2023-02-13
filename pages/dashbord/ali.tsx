import NestedLayout from "../../components/ui/layouts/NestedLayout";
import type { ReactElement } from "react";

export default function Ali() {
    return <h1>HEEEEEEEEEEY</h1>;
}

Ali.getLayout = function (page: ReactElement) {
    return <NestedLayout>{page}</NestedLayout>;
};
