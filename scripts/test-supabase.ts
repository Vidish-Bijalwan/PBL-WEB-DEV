import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkjlmdauildmivuldzxo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtramxtZGF1aWxkbWl2dWxkenhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjk4MTQsImV4cCI6MjA4OTg0NTgxNH0.YQaNg7WZxa6ljY65uk170i7IagVlnn5CTsaGLnXDmcM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log('Testing connection to Supabase...');
    try {
        const { data, error } = await supabase.from('stores').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Connection failed:', error.message);
            process.exit(1);
        }
        console.log('Connection successful! Found', data, 'stores (metadata check passed).');
        process.exit(0);
    } catch (err) {
        console.error('Unexpected error:', err);
        process.exit(1);
    }
}

testConnection();
