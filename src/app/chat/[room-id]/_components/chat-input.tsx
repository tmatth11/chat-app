"use client";

import { sendMessage } from "@/actions/message-actions";
import { useState, useTransition } from "react";

export default function ChatInput({ roomId }: { roomId: string }) {
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e?: React.SubmitEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        const text = message.trim();

        if (!text) return;

        startTransition(async () => {
            const id = crypto.randomUUID();
            const result = await sendMessage({ id, text, roomId });

            if (!result.success) {
                setErrorMessage(result.error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        });

        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p className="form-error mb-2">{errorMessage}</p>}
            <div className="flex gap-2">
                <textarea
                    className="form-input field-sizing-content grow"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && !isPending) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                <button
                    className="btn btn-primary h-fit"
                    type="submit"
                    disabled={isPending}
                >
                    Send
                </button>
            </div>
        </form>
    );
}
