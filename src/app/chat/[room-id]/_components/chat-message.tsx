import { Message } from "@/types";
import Image from "next/image";

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
});

export default function ChatMessage(message: Message) {
    return (
        <div className="flex flex-col gap-2 border-b last:border-b-0">
            {/* Message header */}
            <div className="flex items-center gap-2">
                {/* Profile picture */}
                <Image
                    src="/blank-user.png"
                    width="40"
                    height="40"
                    className="rounded-full"
                    alt="Blank user image"
                />
                {/* Author username */}
                <p className="font-semibold">{message.author.username}</p>
                {/* Date sent */}
                <p className="text-sm">
                    {DATE_FORMATTER.format(new Date(message.created_at))}
                </p>
            </div>
            <p className="break-all">{message.text}</p>
        </div>
    );
}
