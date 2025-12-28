import { motion, useAnimate, useDragControls, useMotionValue } from "motion/react";
import dynamic from "next/dynamic";
import React from "react";
import { createPortal } from "react-dom";
import useMeasure from "react-use-measure";

interface Props {
    className?: string;
    children: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CLOSE_DRAG_THRESHOLD_IN_PX = 50;

function DragCloseDrawer({ children, open, setOpen, className = "" }: Props): React.JSX.Element {
    const drawerId = React.useId();
    const [scope, animate] = useAnimate();
    const controls = useDragControls();
    const y = useMotionValue(0);

    const [drawerRef, { height }] = useMeasure();

    const handleClose = async (): Promise<void> => {
        const yStart = typeof y.get() === "number" ? y.get() : 0;

        animate(scope.current, { opacity: [1, 0] });
        await animate(`#${drawerId}`, { y: [yStart, height] });
        setOpen(false);
    };

    const onDragClose = (): void => {
        if (y.get() > CLOSE_DRAG_THRESHOLD_IN_PX) {
            handleClose();
        }
    };

    return createPortal(
        open ? (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClose}
                ref={scope}
                className="fixed inset-0 z-50 bg-bg-primary/40"
            >
                <motion.div
                    id={drawerId}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{
                        ease: "easeInOut",
                    }}
                    style={{ y }}
                    onDragEnd={onDragClose}
                    drag="y"
                    dragControls={controls}
                    dragListener={false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{ top: 0, bottom: 0.5 }}
                    ref={drawerRef}
                    className={`fixed bottom-0 left-3/6 -translate-x-3/6 w-4/5 h-auto max-w-6xl px-5 overflow-hidden rounded-t-3xl bg-bg-secondary ${className}`}
                >
                    <header className="absolute left-0 right-0 top-0 z-10 flex justify-center pt-4">
                        <button
                            onPointerDown={(e) => controls.start(e)}
                            className="h-2 w-14 cursor-grab touch-none rounded-full transition bg-primary active:cursor-grabbing active:bg-primary-hover"
                        />
                    </header>

                    <section className="relative z-0 h-full overflow-y-auto p-4 pt-12">
                        {children}
                    </section>
                </motion.div>
            </motion.div>
        ) : null,
        document.body,
    );
}

// Make sure component is only rendered on client side
export default dynamic(() => Promise.resolve(DragCloseDrawer), { ssr: false });
