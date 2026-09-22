import { cn } from "@/lib/helpers/cn";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";

type ButtonProps = {
    as: "button";
} & ComponentProps<"button">;

type LinkButtonProps = {
    as: "link";
} & ComponentProps<typeof Link>;

type TransparentButtonProps = PropsWithChildren<ButtonProps | LinkButtonProps>;

export default function TransparentButton(props: TransparentButtonProps) {
    if (props.as === "button") {
        const { as, children, className, ...rest } = props;

        return (
            <button
                className={cn(
                    "grid size-10 cursor-pointer place-items-center rounded-xl text-white/85 transition hover:bg-white/6 disabled:opacity-50",
                    className,
                )}
                {...rest}
            >
                {children}
            </button>
        );
    }

    const { as, children, className, ...rest } = props;

    return (
        <Link
            className={cn(
                "hidden rounded-lg px-2 py-2 text-[14px] font-medium uppercase text-white/78 transition hover:bg-white/5 hover:text-white lg:block",
                className,
            )}
            {...rest}
        >
            {children}
        </Link>
    );
}
