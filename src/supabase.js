import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sfpgyhysxuhbmcdzrthv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmcGd5aHlzeHVoYm1jZHpydGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMDkxNjIsImV4cCI6MjA3MjU4NTE2Mn0.QWNVWb4Oeq9hSBNhyCsGifbmSa5r89hzgyIJWdzvnnk";

export const supabase = createClient(supabaseUrl, supabaseKey);

// CRUD: create read update delete
