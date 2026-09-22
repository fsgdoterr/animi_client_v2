import { didactGothic } from "@/lib/helpers/fonts";
import "./globals.css";
import Providers from "@/components/providers/providers";

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`h-full antialiased ${didactGothic.className}`}
        >
            <body className="min-h-full flex flex-col bg-(--bg-1)">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
