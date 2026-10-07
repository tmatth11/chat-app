import { getMessages, getRoom, getUser } from "@/lib/data";
import { ChatRoomPageProps } from "@/types";
import { notFound } from "next/navigation";
import { z } from "zod";
import RoomClient from "./_components/room-client";

const IdParamSchema = z.coerce.string().pipe(z.uuid());

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
    const resolvedParams = await params;

    const result = IdParamSchema.safeParse(resolvedParams["room-id"]);
    if (!result.success) {
        return notFound();
    }

    const chatId = result.data;

    const [room, user, messages] = await Promise.all([
        getRoom(chatId),
        getUser(),
        getMessages(chatId),
    ]);

    if (room == null || user == null) {
        return notFound();
    }

    return (
        <div className="flex flex-col items-center overflow-x-hidden p-4">
            <RoomClient user={user} room={room} messages={messages} />
        </div>
    );
}
