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
            <Particles
                className="fixed inset-0 z-10"
                quantity={80}
                ease={80}
                color="#5d67c8"
                refresh
                size={5}
                vy={-0.01}
            />
            <div className="fixed bg-primary/15 rounded-2xl top-0 left-0 w-full h-full pointer-events-none" />
        </div>
    );
}
