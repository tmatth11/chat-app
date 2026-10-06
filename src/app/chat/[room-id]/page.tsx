import { ChatRoomPageProps } from "@/types";
import { notFound } from "next/navigation";
import { z } from "zod";

const IdParamSchema = z.coerce.string().pipe(z.uuid());

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
    const resolvedParams = await params;
    
    const result = IdParamSchema.safeParse(resolvedParams["room-id"]);
    if (!result.success) {
        return notFound();
    }

    const chatId = result.data;

    return (
        <>
            <p>ChatRoomPage works!</p>
        </>
    );
}
