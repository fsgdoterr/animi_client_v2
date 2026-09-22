import { cn } from "@/lib/helpers/cn";
import { ComponentProps, forwardRef, ReactNode } from "react";

interface Props extends ComponentProps<"input"> {
    icon?: ReactNode;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
    ({ className, icon, ...rest }, ref) => {
        const classes = cn(
            "flex h-10 items-center gap-2 rounded-lg border bg-[#171d22] px-3 text-white/45 transition focus-within:border-white/18 focus-within:bg-[#1a2026] border-white/4.5",
            className,
        );

        return (
            <div className={classes}>
                {icon}
                <input
                    className="
                        min-w-0
                        flex-1
                        bg-transparent
                        text-[14px]
                        text-white/82
                        outline-none
                        placeholder:text-white/27
                    "
                    ref={ref}
                    {...rest}
                />
            </div>
        );
    },
);

export default TextInput;
