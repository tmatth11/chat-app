"use client";

import Link from "next/link";
import { useState } from "react";
import {
    CircleArrowRight,
    CircleArrowUp,
    CirclePlus,
    List,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import ModeToggle from "./mode-toggle";
import { createClient } from "@/services/supabase/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
    const [linksDisplay, setLinksDisplay] = useState("hidden");
    const { loading, isAuthenticated } = useUser();
    const supabase = createClient();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    if (loading) return <p>Checking status...</p>;

    return (
        <header className="bg-navbar sticky top-0 left-0 w-full">
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
                    {isAuthenticated && (
                        <>
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
                        </>
                    )}
                    {!isAuthenticated && (
                        <>
                            {/* Log in link */}
                            <Link className="hidden md:flex" href="/auth/login">
                                <div className="nav-link">
                                    <CircleArrowRight />
                                    <span>Log in</span>
                                </div>
                            </Link>
                            {/* Sign up link */}
                            <Link
                                className="hidden md:flex"
                                href="/auth/sign-up"
                            >
                                <div className="nav-link">
                                    <CircleArrowUp />
                                    <span>Sign up</span>
                                </div>
                            </Link>
                        </>
                    )}
                    {isAuthenticated && (
                        // Sign out link
                        <Link
                            className="hidden md:flex"
                            href="/chat-list"
                            onClick={handleSignOut}
                        >
                            <div className="nav-link">
                                <LogOut />
                                <span>Sign out</span>
                            </div>
                        </Link>
                    )}
                    {/* Dark mode toggle */}
                    <div className="nav-link">
                        <ModeToggle />
                    </div>
                    {/* Hamburger menu/close button */}
                    <button
                        className="hover:text-link-hover flex cursor-pointer md:hidden"
                        aria-label={
                            linksDisplay === "hidden"
                                ? "Expand menu"
                                : "Close menu"
                        }
                        title={
                            linksDisplay === "hidden"
                                ? "Expand menu"
                                : "Close menu"
                        }
                        onClick={() =>
                            linksDisplay == "hidden"
                                ? setLinksDisplay("flex")
                                : setLinksDisplay("hidden")
                        }
                    >
                        {linksDisplay === "hidden" ? <Menu /> : <X />}
                    </button>
                </div>
            </nav>
            {/* Bottom navbar */}
            <div className={`${linksDisplay} flex-col gap-4 p-4 md:hidden`}>
                {isAuthenticated && (
                    <>
                        {/* New chat link */}
                        <Link
                            href="/new-chat"
                            onClick={() => setLinksDisplay("hidden")}
                        >
                            <div className="nav-link">
                                <CirclePlus />
                                <span>New chat</span>
                            </div>
                        </Link>
                        {/* Chat list link */}
                        <Link
                            href="/chat-list"
                            onClick={() => setLinksDisplay("hidden")}
                        >
                            <div className="nav-link">
                                <List />
                                <span>Chat list</span>
                            </div>
                        </Link>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        {/* Log in link */}
                        <Link
                            href="/auth/login"
                            onClick={() => setLinksDisplay("hidden")}
                        >
                            <div className="nav-link">
                                <CircleArrowRight />
                                <span>Log in</span>
                            </div>
                        </Link>
                        {/* Sign up link */}
                        <Link
                            href="/auth/sign-up"
                            onClick={() => setLinksDisplay("hidden")}
                        >
                            <div className="nav-link">
                                <CircleArrowUp />
                                <span>Sign up</span>
                            </div>
                        </Link>
                    </>
                )}
                {isAuthenticated && (
                    // Sign out link
                    <Link
                        href="/chat-list"
                        onClick={() => {
                            setLinksDisplay("hidden");
                            handleSignOut();
                        }}
                    >
                        <div className="nav-link">
                            <LogOut />
                            <span>Sign out</span>
                        </div>
                    </Link>
                )}
            </div>
        </header>
    );
}
