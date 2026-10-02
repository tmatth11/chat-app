import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@teispace/next-themes";
import { Roboto } from 'next/font/google';
import Navbar from "./_components/navbar";

const roboto = Roboto({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        template: "%s | Chat App",
        default: "Chat App",
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={`${roboto.className}`} suppressHydrationWarning>
            <body className="bg-main dark:text-white">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    enableColorScheme={false}
                >
                    <Navbar />
                    <main className="flex min-h-dvh flex-col">
                        {children}
                        <Analytics />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
