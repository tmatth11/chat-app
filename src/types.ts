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