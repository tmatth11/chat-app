import { Metadata } from "next";
import ChatRoomForm from "./_components/chat-room-form";

export const metadata: Metadata = {
    title: "New Chat Room",
    description: "Create a new chat room",
};

export default function NewChatPage() {
    return (
        <div className="flex justify-center p-4">
            <ChatRoomForm />
        </div>
    );
}