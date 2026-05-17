import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pnstqwyuhdzdmodeqvid.supabase.co";
const supabaseKey = "sb_publishable_aN7LwltKQzntPyc4_moyQg_XSWARdPD";

export const supabase = createClient(supabaseUrl, supabaseKey);
