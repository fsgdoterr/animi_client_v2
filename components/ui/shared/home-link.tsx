import Link from "next/link";

export default function HomeLink() {
    return(
        <Link 
            href="/" 
            aria-label="Animi - на головну" 
            className="inline-flex items-center text-[24px] font-semibold tracking-[0.055em] text-white transition-opacity hover:opacity-80"
        >
            Animi
        </Link>
    );
}