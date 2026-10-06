// Source: https://github.com/WebDevSimplified/supabase-realtime-chat/blob/main/src/services/supabase/lib/getCurrentUser.ts

import { cache } from "react";
import { createClient } from "@/services/supabase/server";

export const getCurrentUser = cache(async () => {
    const supabase = await createClient();
    
    return (await supabase.auth.getUser()).data.user;
});