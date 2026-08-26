const SUPABASE_URL = "https://ubawrqmjkdbshoomenlh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_pRV6w6KTwKYj6pGvVjj0_g_PfK5stqk";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);