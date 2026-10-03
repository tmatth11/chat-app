"use client";

import Link from "next/link";
import { useState } from "react";
import { CirclePlus, List } from "lucide-react";
import ModeToggle from "./mode-toggle";

export default function Navbar() {
    const [linksDisplay, setLinksDisplay] = useState("hidden");

    return (
        <header className="bg-navbar fixed top-0 left-0 w-full">
            {/* Top navbar */}
            <nav className="flex items-center justify-between p-4">
                <Link
                    href="/"
                    className="hover:text-link-hover cursor-pointer text-2xl font-semibold"
                    onClick={() => setLinksDisplay("hidden")}
                >
                    Chat App
                </Link>
                <div className="flex items-center gap-4">
                    {/* New chat link */}
                    <Link className="hidden md:flex" href="/new-chat">
                        <div className="nav-link">
                            <CirclePlus />
                            <span>New chat</span>
                        </div>
                    </Link>
                    {/* Chat list link */}
                    <Link className="hidden md:flex" href="/chat-list">
                        <div className="nav-link">
                            <List />
                            <span>Chat list</span>
                        </div>
                    </Link>
                    {/* Dark mode toggle */}
                    <div className="nav-link">
                        <ModeToggle />
                        <span className="md:hidden">Toggle mode</span>
                    </div>
                </div>
            </nav>
        </header>
    );
}
