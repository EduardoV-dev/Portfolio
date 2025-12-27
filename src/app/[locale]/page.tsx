import BlastPortfolio from "./sections/blast-portfolio";
import HeroFullStack from "./sections/hero-full-stack";

export default function Home() {
    return (
        <section className="grid h-full gap-16 py-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <HeroFullStack />
            <BlastPortfolio />
        </section>
    );
}
