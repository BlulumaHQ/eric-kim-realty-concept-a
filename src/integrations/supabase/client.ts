import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uzdjwpkgldzhnoxjeyrw.supabase.co";
const supabaseKey = "sb_publishable_ifsg2zxajGqu19GsJ2X4RQ_KHBHGIvi";

export const supabase = createClient(supabaseUrl, supabaseKey);
