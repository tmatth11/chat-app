import Link from "next/link";
import RoomCard from "./room-card";

export default function RoomList({
    title,
    rooms,
    isJoined = false,
}: {
    title: string;
    rooms: {
        id: string;
        name: string;
        memberCount: number;
    }[];
    isJoined?: boolean;
}) {
    return (
        <div className="mt-4 flex flex-col">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
                <h2>{title}</h2>
                <Link href="/new-chat" className="btn btn-primary w-fit">
                    Create Room
                </Link>
            </div>
            {/* List of rooms */}
            <div className="flex flex-col gap-2 mt-2">
                {rooms.map((room) => (
                    <RoomCard {...room} key={room.id} isJoined={isJoined} />
                ))}
            </div>
        </div>
    );
}
