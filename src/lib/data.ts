import { createAdminClient } from "@/services/supabase/server";

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