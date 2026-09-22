import { useSyncExternalStore } from "react";

type ModalEntry = {
    id: string;
    onClose: () => void;
    closing: boolean;
};

let stack: ModalEntry[] = [];

const listeners = new Set<() => void>();

const EMPTY_STACK: ModalEntry[] = [];

let previousBodyOverflow: string | null = null;

function emit() {
    listeners.forEach((listener) => listener());
}

function lockBody() {
    if (typeof document === "undefined") {
        return;
    }

    if (stack.length === 1) {
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    }
}

function unlockBody() {
    if (typeof document === "undefined") {
        return;
    }

    if (stack.length === 0) {
        document.body.style.overflow = previousBodyOverflow ?? "";

        previousBodyOverflow = null;
    }
}

export const modalStack = {
    subscribe(listener: () => void) {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    },

    getSnapshot() {
        return stack;
    },

    getServerSnapshot() {
        return EMPTY_STACK;
    },

    has(id: string) {
        return stack.some((modal) => modal.id === id);
    },

    open(id: string, onClose: () => void) {
        const existing = stack.find((modal) => modal.id === id);

        if (existing) {
            stack = stack.map((modal) =>
                modal.id === id
                    ? {
                          ...modal,
                          onClose,
                          closing: false,
                      }
                    : modal,
            );

            emit();

            return;
        }

        stack = [
            ...stack,
            {
                id,
                onClose,
                closing: false,
            },
        ];

        lockBody();

        emit();
    },

    startClosing(id: string) {
        stack = stack.map((modal) =>
            modal.id === id
                ? {
                      ...modal,
                      closing: true,
                  }
                : modal,
        );

        emit();
    },

    remove(id: string) {
        const exists = stack.some((modal) => modal.id === id);

        if (!exists) {
            return;
        }

        stack = stack.filter((modal) => modal.id !== id);

        unlockBody();

        emit();
    },
};

export const useModalStack = () => {
    return useSyncExternalStore(
        modalStack.subscribe,
        modalStack.getSnapshot,
        modalStack.getServerSnapshot,
    );
};
