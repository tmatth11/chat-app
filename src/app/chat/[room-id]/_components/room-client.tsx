"use client";

import { Message } from "@/types";

export default function RoomClient({
    room,
    user,
    messages,
}: {
    room: {
        id: string;
        name: string;
    };
    user: {
        id: string;
        username: string;
    };
    messages: Message[];
}) {
    return (
        <>
            <p>RoomClient works!</p>
        </>
    );
}
