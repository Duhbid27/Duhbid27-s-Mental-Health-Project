// Supabase configuration
const SUPABASE_URL = 'https://jkgjwtczckvbenhzgepb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZ2p3dGN6Y2t2YmVuaHpnZXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTI2ODUsImV4cCI6MjA5MjYyODY4NX0.tirAoAscsmjjXpoJkVJDccs-YCFs8SuSNYvDgEqEYgw';

// Initialize Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Open Letters functions
export async function saveOpenLetter(letterData) {
  const { data, error } = await supabase
    .from('open_letters')
    .insert([letterData]);

  if (error) {
    console.error('Error saving open letter:', error);
    return false;
  }
  return true;
}

async function getOpenLetters(category = null) {
  let query = supabase.from('open_letters').select('*').order('created_at', { ascending: false });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching open letters:', error);
    return [];
  }
  return data;
}

// Named Letters functions
export async function saveNamedLetter(letterData) {
  const { data, error } = await supabase
    .from('named_letters')
    .insert([letterData]);

  if (error) {
    console.error('Error saving named letter:', error);
    return false;
  }
  return true;
}

async function searchNamedLetters(name) {
  const { data, error } = await supabase
    .from('named_letters')
    .select('*')
    .ilike('recipient_name', `%${name}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching named letters:', error);
    return [];
  }
  return data;
}

// Digital Cards functions
export async function saveDigitalCard(cardData) {
  const { data, error } = await supabase
    .from('digital_cards')
    .insert([cardData]);

  if (error) {
    console.error('Error saving digital card:', error);
    return null;
  }
  return data[0];
}

async function getDigitalCard(cardId) {
  const { data, error } = await supabase
    .from('digital_cards')
    .select('*')
    .eq('id', cardId)
    .single();

  if (error) {
    console.error('Error fetching digital card:', error);
    return null;
  }
  return data;
};
