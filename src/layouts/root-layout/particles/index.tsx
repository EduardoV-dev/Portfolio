"use client";

import React from "react";
import { debounce } from "throttle-debounce";

interface ParticleCSS extends React.CSSProperties {
    "--index": number;
}

const PARTICLE_WIDTH_IN_PX = 16;
const DEBOUNCE_DELAY_IN_MS = 400;

const generateRandomNumberBetween10And30 = (): number => Math.ceil(Math.random() * 20 + 10);

const KEYFRAMES_ID = "particle-float-animation";

/**
 * Particles component for layout, memoization is being used since the component will
 * re-render if theme is changed. Particles is a client component, then it should be
 * implemented with SSR off (achived through `dynamic` Next.js method). Component will
 * re-render if the screen is resized.
 */
export default function Particles(): React.JSX.Element {
    const [particles, setParticles] = React.useState<number>(0);

    React.useEffect(() => {
        setParticles(window.innerWidth / PARTICLE_WIDTH_IN_PX);

        // Inject keyframes animation only once
        if (!document.getElementById(KEYFRAMES_ID)) {
            const style = document.createElement("style");
            style.id = KEYFRAMES_ID;
            style.textContent = `
                @keyframes particleFloat {
                    0% {
                        transform: translateY(120vh) scale(0.3);
                    }
                    100% {
                        transform: translateY(-10vh) scale(0.3);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        const calculateRequiredParticlesToFillScreen = debounce(DEBOUNCE_DELAY_IN_MS, (): void =>
            setParticles(window.innerWidth / PARTICLE_WIDTH_IN_PX),
        );

        window.addEventListener("resize", calculateRequiredParticlesToFillScreen);

        return () => window.removeEventListener("resize", calculateRequiredParticlesToFillScreen);
    }, []);

    const ParticleItems = [...new Array(Math.ceil(particles))].map((_, index) => {
        const isEven = index % 2 === 0;

        return (
            <span
                key={crypto.randomUUID()}
                className={`relative w-4 h-4 my-0 mx-1 rounded-full opacity-30 ${
                    isEven ? "bg-red" : "bg-green"
                }`}
                style={
                    {
                        "--index": generateRandomNumberBetween10And30(),
                        boxShadow: isEven
                            ? "0 0 0 10px #ff2d7544, 0 0 30px #ff2d75, 0 0 70px #ff2d75"
                            : "0 0 0 10px #4fc3dc44, 0 0 50px #4fc3dc, 0 0 100px #4fc3dc",
                        animation: "particleFloat 15s linear infinite",
                        animationDuration: "calc(125s / var(--index))",
                    } as ParticleCSS
                }
            />
        );
    });

    return (
        <div className="fixed -z-10 w-full h-screen overflow-hidden">
            <div className="relative flex flex-wrap">{ParticleItems}</div>
        </div>
    );
}
