import Block from "@/components/ui/block";
import AccountButton from "@/components/ui/public/header/account/account-button";
import NotificationCenter from "@/components/ui/public/header/notification-center";
import RandomAnimeButton from "@/components/ui/public/header/random-anime-button";
import TransparentButton from "@/components/ui/shared/buttons/transparent-buttons";
import HomeLink from "@/components/ui/shared/home-link";
import { cn } from "@/lib/helpers/cn";
import {
    Bell,
    Bookmark,
    Dices,
    Film,
    House,
    LoaderCircle,
    LogOut,
    PlayCircle,
    Search,
    Settings,
    Shield,
    UserRound,
    X,
} from "lucide-react";

export default function PublicHeader() {
    return(
        <header className="fixed top-5 left-0 right-0 max-w-370 w-full mx-auto shadow-[0_16px_60px_rgba(0,0,0,.26)] backdrop-blur-xl">
            <Block className="px-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2 lg:grid-cols-[minmax(260px,1fr)_minmax(280px,620px)_minmax(260px,1fr)] lg:gap-6">
                <HomeLink />
                <div className="relative min-w-0">

                </div>
                <nav className="flex items-center justify-end gap-2">
                    <RandomAnimeButton />
                    <TransparentButton as={"link"} href={"/animes"}>
                        УСІ АНІМЕ
                    </TransparentButton>
                    <TransparentButton as={"link"} href={"/animes?preset=ongoing"}>
                        ОНҐОЇНГИ
                    </TransparentButton>
                    <NotificationCenter />
                    <AccountButton />
                </nav>
            </Block>
        </header>
    );
}