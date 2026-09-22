import TransparentButton from "@/components/ui/shared/buttons/transparent-buttons";
import { Bell } from "lucide-react";

export default function NotificationCenter() {
    return(
        <TransparentButton as={"button"}>
            <Bell size={20} strokeWidth={1.7} />
            {/* {count > 0 && <span className="absolute right-0.5 top-0.5 grid min-w-4 place-items-center rounded-full bg-(--primary) px-1 text-[9px] font-semibold leading-4 text-white">{count > 99 ? "99+" : count}</span>} */}
        </TransparentButton>
    );
}