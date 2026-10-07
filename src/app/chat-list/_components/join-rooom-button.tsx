"use client";

import { joinRoom } from "@/actions/room-member-actions";
import { useTransition } from "react";

export default function JoinRoomButton({ roomId }: { roomId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        startTransition(async () => {
            try {
                await joinRoom(roomId);
            }
            catch {
                console.error("Error: Failed to leave room.");
            }
        });
    };

    return (
        <button
            onClick={handleClick}
            className="btn btn-primary"
            disabled={isPending}
        >
            {isPending ? "Joining..." : "Join"}
        </button>
    );
}
