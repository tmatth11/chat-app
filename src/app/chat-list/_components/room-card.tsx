import Link from "next/link";
import LeaveRoomButton from "./leave-room-button";
import JoinRoomButton from "./join-rooom-button";

export default function RoomCard({
    id,
    name,
    memberCount,
    isJoined,
}: {
    id: string;
    name: string;
    memberCount: number;
    isJoined: boolean;
}) {
    return (
        <div className="bg-container-primary flex flex-col gap-2 rounded-md p-2">
            <h4>{name}</h4>
            <p>
                {memberCount} member{memberCount != 1 && "s"}
            </p>
            {isJoined ? (
                <div className="flex items-center gap-2">
                    <Link href={`/chat/${id}`} className="btn btn-secondary grow">
                        Enter
                    </Link>
                    <LeaveRoomButton roomId={id} />
                </div>
            ) : (
                <JoinRoomButton roomId={id} />
            )}
        </div>
    );
}
