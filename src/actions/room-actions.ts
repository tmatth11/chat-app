'use server';

import { getCurrentUser } from "@/lib/get-current-user";
import { createAdminClient } from "@/services/supabase/server";
import { ChatRoomState } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const roomSchema = z.object({
    name: z.string().min(1).trim(),
    isPublic: z.boolean(),
});

export async function createChatRoom(prevState: ChatRoomState, formData: FormData) {
    const user = await getCurrentUser();

    // Check if user is authenticated
    if (user == null) {
        return {
            success: false,
            message: "Error: User is not authenticated."
        };
    }

    // Get form elements
    const rawName = formData.get("name");
    const rawIsPulic = formData.get("is-public");

    // Validate fields
    const validatedFields = roomSchema.safeParse({
        name: rawName,
        isPublic: rawIsPulic === "on",
    });

    // Return errors if present
    if (!validatedFields.success) {
        return {
            success: false,
            message: "Error: Missing or invalid fields. Please check your inputs.",
            errors: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    const supabase = createAdminClient();

    // Insert data into chat_room table
    const { data: room, error: roomError } = await supabase
        .from("chat_room")
        .insert({ name: validatedFields.data.name, is_public: validatedFields.data.isPublic })
        .select("id")
        .single();
    
    // Throw error if necessary
    if (roomError || room == null) {
        console.error("Room error:", roomError);
        return {
            success: false,
            message: "Error: Failed to create room.",
        };
    }

    // Insert data into chat_room_member table
    const { error: membershipError } = await supabase
        .from("chat_room_member")
        .insert({ chat_room_id: room.id, id: user.id });

    // Throw error if necessary
    if (membershipError) {
        return {
            success: false,
            message: "Error: Failed to add user to room.",
        };
    }

    // Redirect to new room
    const redirectPath = `/chat/${room.id}`;

    revalidatePath(redirectPath);
    redirect(redirectPath);
}