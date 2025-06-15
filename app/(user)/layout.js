import {UserLayout} from "@/layout";


export const metadata = {
    title: "Halaman User",
    description: "User view",
};

export default function Layout({ children }) {
    return <UserLayout>{children}</UserLayout>;
}
