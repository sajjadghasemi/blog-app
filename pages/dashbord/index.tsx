import NestedLayout from "../../components/ui/layouts/NestedLayout";
import DHome from "@/components/ui/pages/DHome";
import type { ReactElement } from "react";

export default function AlternativeLayoutPage() {
    return <DHome />;
}

AlternativeLayoutPage.getLayout = function (page: ReactElement) {
    return <NestedLayout>{page}</NestedLayout>;
};
