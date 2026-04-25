-- Supabase Database Schema for Digital Letters

-- Open Letters Table
CREATE TABLE open_letters (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT DEFAULT 'Anonymous',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Named Letters Table
CREATE TABLE named_letters (
  id SERIAL PRIMARY KEY,
  recipient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT DEFAULT 'Anonymous',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Digital Cards Table
CREATE TABLE digital_cards (
  id TEXT PRIMARY KEY,
  occasion TEXT NOT NULL,
  custom_occasion TEXT,
  theme TEXT NOT NULL,
  recipient_name TEXT,
  message TEXT NOT NULL,
  sender_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE open_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE named_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only for letters, insert for new content)
CREATE POLICY "Allow public read access to open letters" ON open_letters FOR SELECT USING (true);
CREATE POLICY "Allow public insert to open letters" ON open_letters FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to named letters" ON named_letters FOR SELECT USING (true);
CREATE POLICY "Allow public insert to named letters" ON named_letters FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to digital cards" ON digital_cards FOR SELECT USING (true);
CREATE POLICY "Allow public insert to digital cards" ON digital_cards FOR INSERT WITH CHECK (true);
