import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkjlmdauildmivuldzxo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtramxtZGF1aWxkbWl2dWxkenhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjk4MTQsImV4cCI6MjA4OTg0NTgxNH0.YQaNg7WZxa6ljY65uk170i7IagVlnn5CTsaGLnXDmcM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
