import { Metadata } from "next";
import EmptyChatList from "./_components/empty-chat-list";
import { getJoinedRooms, getPublicRooms } from "@/lib/data";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Chat Room List",
    description: "View all chat rooms",
};

export default async function ChatListPage() {
    const user = await getCurrentUser();
    if (user == null) {
        redirect("/auth/login");
    }

    console.log("user id:", user.id);

    const [publicRooms, joinedRooms] = await Promise.all([
        getPublicRooms(),
        getJoinedRooms(user.id),
    ]);

    const hasNoRooms = publicRooms.length === 0 && joinedRooms.length == 0;

    return (
        <div className="flex flex-col items-center p-4">
            <h1>Chat Room List</h1>
            {hasNoRooms && (
                <EmptyChatList />
            )}
        </div>
    );
}
