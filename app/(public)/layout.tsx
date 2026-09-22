import PublicFooter from "@/components/ui/public/public-footer";
import PublicHeader from "@/components/ui/public/header/public-header";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="public-shell min-h-full bg-[#080c0f] text-white">
            <PublicHeader />
            <main className="h-500">{children}</main>
            <PublicFooter />
        </div>
    );
}
