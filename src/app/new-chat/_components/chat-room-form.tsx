"use client";

import { createChatRoom } from "@/actions/room-actions";
import { ChatRoomState } from "@/types";
import { useActionState, useState } from "react";

const initialState: ChatRoomState = {};

export default function ChatRoomForm() {
    const [state, formAction, isPending] = useActionState<
        ChatRoomState,
        FormData
    >(createChatRoom, initialState);

    return (
        <div className="bg-container-primary mt-2 flex w-sm flex-col rounded-md p-4 md:w-md">
            {/* Header */}
            <div className="flex flex-col">
                <h4>New room</h4>
                <p>Create a new chat room.</p>
            </div>
            {/* Divider */}
            <hr className="mt-4 border-t" />
            {/* New chat room form */}
            <form action={formAction} className="flex flex-col">
                {/* Name input */}
                <label className="form-group">
                    <span className="form-label">Room name</span>
                    <input
                        className="form-input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter room name"
                        required
                    />
                </label>
                {/* Public toggle */}
                <label className="mt-4 flex cursor-pointer items-center gap-2">
                    <span className="form-label">Public:</span>
                    <input
                        className="cursor-pointer"
                        type="checkbox"
                        name="is-public"
                        id="is-public"
                        defaultChecked={true}
                    />
                </label>
                {/* Error message */}
                <div className="my-2 flex items-center justify-center">
                    {state?.message && <p className="form-error">{state.message }</p>}
                </div>
                {/* Submit button */}
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "Creating room..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
