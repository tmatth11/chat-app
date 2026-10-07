'use server';

import { getCurrentUser } from "@/lib/get-current-user";
import { createAdminClient } from "@/services/supabase/server";
import { revalidatePath } from "next/cache";

export async function leaveRoom(roomId: string) {
    const user = await getCurrentUser();

    if (user == null) {
        throw new Error("Error: User is not logged in.");
    }

    const supabase = createAdminClient();
    const { error } = await supabase
        .from("chat_room_member")
        .delete()
        .eq("chat_room_id", roomId)
        .eq("id", user.id);

    if (error) {
        console.error("Error:", error);
        throw new Error("Error: Failed to delete room.");
    }

    revalidatePath("/chat-list");
}

export async function joinRoom(roomId: string) {
    const user = await getCurrentUser();

    if (user == null) {
        throw new Error("Error: User is not logged in.");
    }

    const supabase = createAdminClient();
    const { error } = await supabase
        .from("chat_room_member")
        .insert({
            chat_room_id: roomId,
            id: user.id
        });

    if (error) {
        console.error("Error:", error);
        throw new Error("Error: Failed to join room.");
    }

    revalidatePath("/chat-list");
}