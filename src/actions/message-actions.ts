"use server";

import { getCurrentUser } from "@/lib/get-current-user";
import { createAdminClient } from "@/services/supabase/server";
import { Message } from "@/types";

export async function sendMessage(data: {
    id: string
    text: string;
    roomId: string;
}): Promise<
    | { success: true; data: Message; error?: never }
    | { success: false; error: string; data?: never }
> {
    const user = await getCurrentUser();

    // Return error if user is not authenticated
    if (user == null) {
        return {
            success: false,
            error: "Error: User is not authenticated."
        };
    }

    const supabase = createAdminClient();

    // Determine if user is a member of this chat room
    const { data: membership, error: membershipError } = await supabase
        .from("chat_room_member")
        .select("id")
        .eq("chat_room_id", data.roomId)
        .eq("id", user.id)
        .single();

    // Return error if user is not a member of the chat room
    if (membershipError || !membership) {
        if (membershipError) {
            console.error("Error:", membershipError);
        }
        return {
            success: false,
            error: "Error: User is not a member of the chat room."
        };
    }

    // Insert message into messages table
    const { data: message, error } = await supabase.from("messages")
        .insert({
            id: data.id,
            text: data.text,
            chat_room_id: data.roomId,
            author_id: user.id
        })
        .select("id, text, created_at, author_id, author:profiles (username)")
        .single();

    if (error || !message) {
        console.error("Error:", error);
        return {
            success: false,
            error: "Error: Failed to send message"
        };
    }

    return {
        success: true,
        data: message
    };
}