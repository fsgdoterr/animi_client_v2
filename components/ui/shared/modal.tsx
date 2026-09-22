"use client";

import { modalStack, useModalStack } from "@/lib/hooks/use-modal-stack";
import {
    ComponentPropsWithoutRef,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

import { createPortal } from "react-dom";

const ANIMATION_DURATION = 200;

type ModalProps = ComponentPropsWithoutRef<"div"> & {
    isOpen: boolean;
    onClose: () => void;
};

export default function Modal({
    isOpen,
    onClose,
    children,
    className,
    ...rest
}: ModalProps) {
    const reactId = useId();

    const id = useRef(`modal-${reactId}`).current;

    const stack = useModalStack();

    const onCloseRef = useRef(onClose);

    onCloseRef.current = onClose;

    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    const openFrame1Ref = useRef<number | null>(null);
    const openFrame2Ref = useRef<number | null>(null);

    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const requestClose = useCallback(() => {
        onCloseRef.current();
    }, []);

    useEffect(() => {
        if (openFrame1Ref.current !== null) {
            cancelAnimationFrame(openFrame1Ref.current);

            openFrame1Ref.current = null;
        }

        if (openFrame2Ref.current !== null) {
            cancelAnimationFrame(openFrame2Ref.current);

            openFrame2Ref.current = null;
        }

        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);

            closeTimerRef.current = null;
        }

        if (isOpen) {
            setVisible(false);
            setMounted(true);

            modalStack.open(id, requestClose);

            openFrame1Ref.current = requestAnimationFrame(() => {
                openFrame2Ref.current = requestAnimationFrame(() => {
                    setVisible(true);

                    openFrame1Ref.current = null;

                    openFrame2Ref.current = null;
                });
            });

            return;
        }

        if (!modalStack.has(id)) {
            return;
        }

        setVisible(false);

        modalStack.startClosing(id);

        closeTimerRef.current = setTimeout(() => {
            modalStack.remove(id);

            setMounted(false);

            closeTimerRef.current = null;
        }, ANIMATION_DURATION);
    }, [isOpen, id, requestClose]);

    useEffect(() => {
        return () => {
            if (openFrame1Ref.current !== null) {
                cancelAnimationFrame(openFrame1Ref.current);
            }

            if (openFrame2Ref.current !== null) {
                cancelAnimationFrame(openFrame2Ref.current);
            }

            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }

            modalStack.remove(id);
        };
    }, [id]);

    const index = stack.findIndex((modal) => modal.id === id);

    const currentModal = stack.find((modal) => modal.id === id);

    const isClosing = currentModal?.closing ?? false;

    const isBackdropOwner = index === 0;

    const isCovered =
        index >= 0 && stack.slice(index + 1).some((modal) => !modal.closing);

    const hasActiveModal = stack.some((modal) => !modal.closing);

    useEffect(() => {
        if (!isBackdropOwner) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") {
                return;
            }

            const topModal = stack.at(-1);

            if (!topModal || topModal.closing) {
                return;
            }

            topModal.onClose();
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isBackdropOwner, stack]);

    if (!mounted || typeof document === "undefined") {
        return null;
    }

    const handleBackdropClick = () => {
        const topModal = stack.at(-1);

        if (!topModal || topModal.closing) {
            return;
        }

        topModal.onClose();
    };

    const animationClass =
        !visible || isClosing
            ? "opacity-0 scale-[0.94]"
            : isCovered
              ? "opacity-70 scale-[0.96] pointer-events-none"
              : "opacity-100 scale-100";

    return createPortal(
        <div
            onClick={(event) => {
                event.stopPropagation();
            }}
            onMouseDown={(event) => {
                event.stopPropagation();
            }}
        >
            {isBackdropOwner && (
                <div
                    onMouseDown={(event) => {
                        event.stopPropagation();

                        handleBackdropClick();
                    }}
                    className={[
                        "fixed inset-0 z-1000",

                        "bg-black/45",
                        "backdrop-blur-[6px]",

                        "transition-[opacity,backdrop-filter]",
                        "duration-200",
                        "ease-out",

                        hasActiveModal
                            ? [
                                  "opacity-100",
                                  "backdrop-blur-[6px]",
                                  "pointer-events-auto",
                              ].join(" ")
                            : [
                                  "opacity-0",
                                  "backdrop-blur-none",
                                  "pointer-events-none",
                              ].join(" "),
                    ].join(" ")}
                />
            )}

            <div
                className="
                pointer-events-none
                fixed
                inset-0
                grid
                place-items-center
            "
                style={{
                    zIndex: 1001 + Math.max(index, 0),
                }}
            >
                <div
                    {...rest}
                    className={[
                        "relative",
                        "pointer-events-auto",

                        "origin-center",
                        "transform-gpu",

                        "will-change-[transform,opacity]",

                        "transition-[transform,opacity]",
                        "duration-200",

                        "ease-[cubic-bezier(0.16,1,0.3,1)]",

                        animationClass,

                        className,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
}
