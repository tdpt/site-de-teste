import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = "https://pfytymwrkzdmqptqbxqw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeXR5bXdya3pkbXFwdHFieHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDU3NzgsImV4cCI6MjA2MzU4MTc3OH0.wBbJoWWOxAV2m18iV4jVm-fWpf3jYGe5nSqoTu7q1Rc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
