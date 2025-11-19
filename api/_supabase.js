import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://fupvwkzyjidthfnbhhyl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1cHZ3a3p5amlkdGhmbmJoaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MjM4NDAsImV4cCI6MjA3OTA5OTg0MH0.pkzevMKrT107JEAynWbslLtNAYHMV4udbptkopZAvCc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
