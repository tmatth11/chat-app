import { Metadata } from "next";
import  EmptyChatList  from "./_components/empty-chat-list";

export const metadata: Metadata = {
    title: "Chat Room List",
    description: "View all chat rooms",
};

export default function ChatListPage() {
    return (
        <div className="flex flex-col items-center p-4">
            <h1>Chat Room List</h1>
            <EmptyChatList />
        </div>
    );
}
