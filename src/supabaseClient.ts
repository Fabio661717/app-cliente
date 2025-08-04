// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dfcdtxdejraqwtduzjsy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmY2R0eGRlanJhcXd0ZHV6anN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NjU5MDgsImV4cCI6MjA2ODU0MTkwOH0.93JyLGZaiw40Tsv6rI8rvvlkHE34skBf3pi6EBRCJ_0'
export const supabase = createClient(supabaseUrl, supabaseKey)
