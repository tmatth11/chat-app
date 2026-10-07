"use client";

import { leaveRoom } from "@/actions/room-member-actions";
import { useTransition } from "react";

export default function LeaveRoomButton({ roomId }: { roomId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        startTransition(async () => {
            try {
                await leaveRoom(roomId);
            }
            catch {
                console.error("Error: Failed to leave room.");
            }
        });
    };

    return (
        <button
            onClick={handleClick}
            className="btn btn-destructive"
            disabled={isPending}
        >
            {isPending ? "Leaving..." : "Leave"}
        </button>
    );
}
