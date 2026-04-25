# Digital Letters - Supabase Setup Guide

## 🚀 Setting up Supabase for your Digital Letters website

### Step 1: Create a Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

### Step 2: Set up your Database
1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to create the tables and policies

### Step 3: Get your Project Credentials
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy your **Project URL** and **anon/public key**

### Step 4: Configure your Website
1. Open `supabase-db.js`
2. Replace `'your-project-url'` with your actual Supabase URL
3. Replace `'your-anon-key'` with your actual anon key

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### Step 5: Deploy to GitHub Pages
1. Push your code to a GitHub repository
2. Go to **Settings** → **Pages**
3. Set source to "Deploy from a branch"
4. Select your main branch and save

### Step 6: Enable CORS (if needed)
If you encounter CORS issues, add your GitHub Pages domain to allowed origins:
1. Go to **Authentication** → **URL Configuration**
2. Add your GitHub Pages URL (e.g., `https://yourusername.github.io`)

## 📊 Database Tables Created

- **`open_letters`**: Stores community letters with categories
- **`named_letters`**: Stores letters addressed to specific names
- **`digital_cards`**: Stores digital greeting cards with unique IDs

## 🔒 Security Notes

- Row Level Security (RLS) is enabled
- Public read access for all tables
- Public insert access (anyone can post letters/cards)
- Consider adding authentication if you want user accounts

## 🆘 Troubleshooting

**CORS Errors**: Add your domain to Supabase URL configuration
**Connection Issues**: Double-check your URL and API key
**Data Not Saving**: Check browser console for error messages

## 💡 Next Steps

- Add user authentication for private features
- Implement moderation for posted content
- Add email notifications for new letters
- Set up automated backups

## 📞 Support

If you need help, check the Supabase documentation or their Discord community!