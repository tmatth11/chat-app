import { MessagesSquare } from "lucide-react";
import Link from "next/link";

export default function EmptyChatList() {
    return (
        <div className="bg-container-primary mt-4 flex max-w-md flex-col items-center gap-2 rounded-md p-4 text-center">
            <div className="bg-text-input mx-auto max-w-fit rounded-md p-2">
                <MessagesSquare />
            </div>
            <h4>No chat rooms</h4>
            <p>Create a new chat room to get started</p>
            <Link href="/new-chat" className="btn btn-primary w-fit">
                Create Room
            </Link>
        </div>
    );
}
