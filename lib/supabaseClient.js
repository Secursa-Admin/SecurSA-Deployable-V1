import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvbcurbgtersusmppndc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2YmN1cmJndGVyc3VzbXBwbmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTQ4NDksImV4cCI6MjA2MzQ3MDg0OX0.ZCGQaeZLhkuPUJn5-udt4tKE7ylJrfeNkj1xPcPR5mQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
