import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ubnetfmxskzwxkfdoijl.supabase.co";
const supabaseKey = "sb_publishable_xkQ6DiYL6ndhlrazcv-9zg_jt4EYyU7";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
