import { createAdminClient } from "@/services/supabase/server";

export async function getPublicRooms() {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("chat_room")
        .select("id, name, chat_room_member (count)")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("getPublicRooms error:", error);
        return [];
    }

    return data.map((room) => ({
        id: room.id,
        name: room.name,
        memberCount: room.chat_room_member[0].count,
    }));
}

export async function getJoinedRooms(userId: string) {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("chat_room")
        .select("id, name, chat_room_member (id)")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("getJoinedRooms error:", error);
        return [];
    }

    return data
        .filter(room => room.chat_room_member.some(u => u.id === userId))
        .map((room) => ({
            id: room.id,
            name: room.name,
            memberCount: room.chat_room_member.length,
        }));
}