import { cn } from "@/lib/helpers/cn";
import { cva } from "class-variance-authority";
import { LoaderPinwheel } from "lucide-react";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
    variant?: "primary" | "green";
    loading?: boolean;
}

const buttonVariants = cva(
    "flex py-2.5 px-4 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-medium transition disabled:opacity-60 text-white",
    {
        variants: {
            variant: {
                primary: "bg-(--primary) hover:bg-(--primary)/80",
                green: "bg-(--green) hover:bg-(--green)/80",
                disabled: "disabled:cursor-not-allowed bg-gray-600",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    },
);

export default function Button({
    className,
    children,
    variant = "primary",
    disabled,
    loading,
    ...rest
}: Props) {
    return (
        <button
            className={cn(buttonVariants({ variant: disabled || loading ? "disabled" : variant, className }))}
            disabled={disabled || loading}
            {...rest}
        >
            {loading
                ? (
                    <div className="flex gap-2.5">
                        <LoaderPinwheel size={20} className="animate-spin"/>
                        <span>Завантаження</span>
                    </div>
                ) : children
            }
        </button>
    );
}
