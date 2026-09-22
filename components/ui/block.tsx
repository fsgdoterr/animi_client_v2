import { cn } from "@/lib/helpers/cn";

interface Props extends React.ComponentProps<"div"> {
    hover?: boolean;
}

export default function Block({
    className,
    children,
    hover = false,
    ...rest
}: Props) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-white/8 bg-(--bg-2)",
                hover &&
                    "transition duration-200 hover:border-white/8 hover:bg-(--bg-3)",
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    );
}
