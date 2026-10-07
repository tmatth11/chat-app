import { createAdminClient } from "@/services/supabase/server";
import { getCurrentUser } from "./get-current-user";

export async function getPublicRooms() {
    const supabase = createAdminClient();

    // Fetch all public chat rooms
    const { data, error } = await supabase
        .from("chat_room")
        .select("id, name, chat_room_member (count)")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

    // Return nothing if error has occurred
    if (error) {
        console.error("getPublicRooms error:", error);
        return [];
    }

    // Returns room id, name, and number of members
    return data.map((room) => ({
        id: room.id,
        name: room.name,
        memberCount: room.chat_room_member[0].count,
    }));
}

export async function getJoinedRooms(userId: string) {
    const supabase = createAdminClient();

    // Fetch all rooms
    const { data, error } = await supabase
        .from("chat_room")
        .select("id, name, chat_room_member (id)")
        .order("created_at", { ascending: false });

    // Return nothing if error has occurred
    if (error) {
        console.error("getJoinedRooms error:", error);
        return [];
    }

    // Return all chat rooms that include the current user 
    return data
        .filter(room => room.chat_room_member.some(u => u.id === userId))
        .map((room) => ({
            id: room.id,
            name: room.name,
            memberCount: room.chat_room_member.length,
        }));
}

export async function getRoom(id: string) {
    const user = await getCurrentUser();

    // Return null if user is not found
    if (user == null) {
        return null;
    }

    const supabase = createAdminClient();

    // Get rooms that user is a member of
    const { data: room, error } = await supabase
        .from("chat_room")
        .select("id, name, chat_room_member!inner ()")
        .eq("id", id)
        .eq("chat_room_member.id", user.id)
        .single();

    // Return null if error has occurred
    if (error) {
        console.error("Error:", error);
        return null;
    }

    return room;
}

export async function getUser() {
    const user = await getCurrentUser();
    const supabase = createAdminClient();

    // Return null if user is not found
    if (user == null) {
        return null;
    }

    // Get user ID and name from profiles table
    const { data, error } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("id", user.id);

    // Return null if error has occurred
    if (error) {
        console.log("Error:", error);
        return null;
    }

    return data;
}

export async function getMessages(roomId: string) {
    const user = await getCurrentUser();
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("messages")
        .select("id, text, created_at, author_id, author:user_profile (username)")
        .eq("chat_room_id", roomId)
        .order("created_at", { ascending: false })
        .limit(10);

    // Return empty array if error has occurred
    if (error) {
        console.error("Error:", error);
        return [];
    }

    return data;
}