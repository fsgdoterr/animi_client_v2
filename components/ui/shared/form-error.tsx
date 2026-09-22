import type { ReactNode } from "react";

interface FieldErrorMessageProps {
    id?: string;
    message?: string;
}

export function FieldErrorMessage({ id, message }: FieldErrorMessageProps) {
    if (!message) {
        return null;
    }

    return (
        <p id={id} className="mt-1 px-0.5 text-[12px] leading-4 text-red-300">
            {message}
        </p>
    );
}

interface RequestErrorMessageProps {
    children: ReactNode;
}

export function RequestErrorMessage({ children }: RequestErrorMessageProps) {
    return (
        <div
            role="alert"
            className="rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-[13px] text-red-300"
        >
            {children}
        </div>
    );
}
