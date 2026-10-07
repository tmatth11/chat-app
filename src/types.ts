export type ChatRoomState = {
    message?: string;
    success?: boolean;
    errors?: {
        name?: string[];
        isPublic?: string[];
    }
};

export interface ChatRoomPageProps {
    params: Promise<{
        "room-id": string;
    }>;
}

export type Message = {
    id: string;
    text: string;
    created_at: string;
    author_id: string;
    author: {
        username: string;
    }
};