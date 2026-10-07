"use client";

import { Message } from "@/types";
import InviteUserModal from "./invite-user-modal";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";

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
        <div className="flex w-full flex-col gap-2 md:w-3xl">
            {/* Header */}
            <div className="flex flex-col border-b md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <h2 className="font-semibold">{room.name}</h2>
                    <p className="mb-2">
                        0 users online
                        {/* {connectedUsers} */}
                    </p>
                </div>
                <InviteUserModal roomId={room.id} />
            </div>
            {/* Messages */}
            <div
                className="flex grow flex-col-reverse overflow-y-auto"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "var(--clr-text-input) transparent",
                }}
            >
                <div className="bg-container-primary space-y-2 rounded-md p-2">
                    {messages.toReversed().map((message) => (
                        <ChatMessage key={message.id} {...message} />
                    ))}
                </div>
            </div>
            <ChatInput roomId={room.id} />
        </div>
    );
}
