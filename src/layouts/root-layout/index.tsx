import dynamic from "next/dynamic";

import Header from "./header";

const Footer = dynamic(() => import("./footer"));
const Particles = dynamic(() => import("./particles"));

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <div id="__next">
            <Header />
            <main className="container mx-auto px-6">{children}</main>
            <Footer />
            <Particles />
        </div>
    );
}
