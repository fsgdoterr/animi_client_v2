"use client";
import AuthModal from "@/components/ui/public/modals/auth/auth-modal";
import { cn } from "@/lib/helpers/cn";
import { imageSrc } from "@/lib/helpers/image-src";
import { useAppSelector } from "@/lib/hooks/redux";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AccountButton() {
    const user = useAppSelector(state => state.auth.user);
    const size = 44;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <button
            type="button"
            onClick={() => {
                if (!user) {
                    setIsOpen(true);
                    return;
                }
                // setUserOpen((value) => !value);
            }}
            className={cn(
                "grid size-10 cursor-pointer place-items-center overflow-hidden rounded-xl border transition",
                user
                    ? "border-white/6 bg-white/[0.035] hover:bg-white/[0.07]"
                    : "border-dashed border-white/15 bg-transparent text-white/65 hover:border-white/25 hover:text-white",
            )}
            aria-label={user ? "Меню користувача" : "Увійти"}
        >
            {user?.avatar?.path ? (
                <Image
                    src={imageSrc(user.avatar.path)!}
                    alt={user.displayName || user.username}
                    width={size}
                    height={size}
                    unoptimized
                    className="size-full object-cover"
                />
            ) : (
                <UserRound
                    size={size <= 24 ? 20 : size >= 50 ? 27 : 22}
                    strokeWidth={1.7}
                />
            )}
            {!user &&
                <AuthModal isOpen={isOpen} close={() => setIsOpen(false)} />
            }
        </button>
    );
}

{
    /* <button
    type="button"
    onClick={toggleUserMenu}
    className={cn(
        "group relative -mt-5 grid size-[54px] place-items-center overflow-hidden rounded-[19px] border text-white transition active:scale-95",
        user
            ? "border-white/12 bg-[#1b2228] shadow-[0_12px_28px_rgba(0,0,0,.36)]"
            : "border-white/10 bg-(--primary) shadow-[0_12px_28px_rgba(228,95,58,.34)]",
        user && userOpen && "ring-2 ring-[#e45f3a]/45 ring-offset-2 ring-offset-[#10161b]",
    )}
    aria-label={user ? "Профіль" : "Увійти"}
>
    <UserAvatar user={user} size={54} />
</button> */
}
