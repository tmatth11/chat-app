CREATE TABLE "public"."chat_room" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "is_public" BOOLEAN NOT NULL
);

CREATE TABLE "public"."chat_room_member" (
    "id" UUID REFERENCES "public"."profiles"(id) ON DELETE CASCADE,
    "chat_room_id" UUID REFERENCES "public"."chat_room"(id) ON DELETE CASCADE,
    PRIMARY KEY ("id", "chat_room_id")
);

CREATE TABLE "public"."messages" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "text" TEXT NOT NULL,
    "chat_room_id" UUID REFERENCES "public"."chat_room"(id) ON DELETE CASCADE, 
    "author_id" UUID REFERENCES "public"."profiles"(id) ON DELETE CASCADE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);