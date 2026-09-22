'use client'
import TransparentButton from "@/components/ui/shared/buttons/transparent-buttons";
import { cn } from "@/lib/helpers/cn";
import { Dices } from "lucide-react";
import { useState } from "react";

export default function RandomAnimeButton() {
    const [isLoading, setIsLoading] = useState(false);

    return(
        <TransparentButton as={"button"}>
            <Dices size={21} strokeWidth={1.7} className={cn(isLoading && "animate-pulse")} />
        </TransparentButton>
    );
}