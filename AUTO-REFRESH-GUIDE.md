# 🔄 Auto-Refresh Guide

Your pickleball blog now has automatic data refresh capabilities! Here are your options for keeping content fresh:

## Current Setup (Basic Auto-Refresh)

✅ **Already Implemented:**
- Automatic refresh check every hour
- Rankings refresh every 24 hours
- Tournaments refresh every 24 hours
- Manual force refresh available

**How it works:**
- On page load, checks if data is older than 24 hours
- If stale, refreshes with new data
- Currently simulates updates (rank changes, tournament status)

## Option 1: Use Real APIs (Recommended for Production)

To fetch live data from external sources:

### Step 1: Find API Sources
Popular pickleball data APIs:
- **PPA Tour API**: https://api.ppatour.com (if available)
- **USA Pickleball**: https://usapickleball.org/api
- **Custom scraper**: Build your own data scraper

### Step 2: Configure API Endpoints

Edit `auto-refresh.js` and update the config:

```javascript
const REFRESH_CONFIG = {
    rankings: {
        enabled: true,
        intervalHours: 24,
        apiUrl: 'https://your-api.com/rankings' // Add your API URL
    },
    tournaments: {
        enabled: true,
        intervalHours: 24,
        apiUrl: 'https://your-api.com/tournaments' // Add your API URL
    }
};
```

### Step 3: API Response Format

Your API should return data in this format:

**Rankings API Response:**
```json
{
  "mensSingles": [
    {
      "rank": 1,
      "name": "Ben Johns",
      "country": "USA",
      "points": 2847,
      "age": 24,
      "change": 0
    }
  ],
  "womensSingles": [...],
  ...
}
```

**Tournaments API Response:**
```json
{
  "upcoming": [
    {
      "id": "tournament-id",
      "name": "Tournament Name",
      "date": "2026-02-14 to 2026-02-16",
      "location": "Miami, Florida, USA",
      "venue": "Venue Name",
      "prize": "$250,000",
      "description": "Description...",
      "link": "https://...",
      "image": "linear-gradient(...)",
      "category": "PPA"
    }
  ],
  "past": [...]
}
```

## Option 2: Backend + Database (Best for Multi-User)

Build a simple backend to manage data:

### Using Node.js + Express + MongoDB:

```bash
# Install dependencies
npm install express mongoose cors

# Create backend server
node server.js
```

**server.js:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('your-mongodb-url');

// Rankings endpoint
app.get('/api/rankings', async (req, res) => {
    // Fetch from database
    const rankings = await Rankings.find();
    res.json(rankings);
});

// Tournaments endpoint
app.get('/api/tournaments', async (req, res) => {
    const tournaments = await Tournaments.find();
    res.json(tournaments);
});

app.listen(3000, () => console.log('API running on port 3000'));
```

Then update `auto-refresh.js`:
```javascript
apiUrl: 'http://localhost:3000/api/rankings'
```

## Option 3: Serverless Functions (Easy + Free)

Use free serverless platforms:

### Netlify Functions:

1. Create `/netlify/functions/rankings.js`:
```javascript
exports.handler = async (event, context) => {
    // Fetch rankings from external source
    const rankings = await fetchRankingsData();
    
    return {
        statusCode: 200,
        body: JSON.stringify(rankings)
    };
};
```

2. Update config:
```javascript
apiUrl: '/.netlify/functions/rankings'
```

### Vercel Functions:

1. Create `/api/rankings.js`:
```javascript
export default async function handler(req, res) {
    const rankings = await fetchRankingsData();
    res.status(200).json(rankings);
}
```

2. Update config:
```javascript
apiUrl: '/api/rankings'
```

## Option 4: Web Scraping (Automated Data Collection)

Create a scraper to pull data from official sources:

```javascript
// scraper.js
const puppeteer = require('puppeteer');

async function scrapeRankings() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://ppatour.com/rankings');
    
    const rankings = await page.evaluate(() => {
        // Extract ranking data from page
        return [...document.querySelectorAll('.ranking-row')].map(row => ({
            rank: row.querySelector('.rank').innerText,
            name: row.querySelector('.name').innerText,
            points: row.querySelector('.points').innerText
        }));
    });
    
    await browser.close();
    return rankings;
}
```

Run on a schedule using:
- **Cron job** (Linux/Mac): `0 0 * * * node scraper.js`
- **GitHub Actions** (free): Runs scraper daily
- **Heroku Scheduler**: Runs tasks periodically

## Option 5: Manual Updates via Admin Panel

Keep it simple - update manually through your CMS:

1. Click "Admin" 
2. Update rankings/tournaments as needed
3. Data persists in localStorage

**Pros:** Full control, no APIs needed  
**Cons:** Requires manual work

## Option 6: RSS/Feed Integration

Pull from existing RSS feeds:

```javascript
async function fetchFromRSS() {
    const response = await fetch('https://rss.app/feeds/pickleball-news.xml');
    const xml = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    // Parse and convert to your format
}
```

## Manual Controls

You can manually control refresh from browser console:

```javascript
// Force immediate refresh
window.pickleballRefresh.forceRefresh()

// Check refresh status
window.pickleballRefresh.getStatus()

// Disable auto-refresh
window.pickleballRefresh.config.rankings.enabled = false
```

## Recommended Setup by Use Case

**Personal Blog:**
- Option 5 (Manual via Admin) - Simple, no APIs needed

**Small Community Site:**
- Option 1 (Real APIs) or Option 3 (Serverless) - Automatic, low cost

**Large Professional Site:**
- Option 2 (Backend + Database) - Full control, scalable

**Quick Prototype:**
- Current setup (simulated updates) - Works out of the box

## Testing Auto-Refresh

1. Open browser console
2. Run: `window.pickleballRefresh.forceRefresh()`
3. Check: `window.pickleballRefresh.getStatus()`
4. Reload page and verify data updated

## Current Behavior

Right now, the system:
- ✅ Checks for stale data on page load
- ✅ Refreshes every hour (if data is 24h+ old)
- ✅ Simulates rank changes for demo purposes
- ✅ Keeps data in localStorage

To connect to real data, follow **Option 1** above!

---

Questions? The auto-refresh system is fully functional. Just add your API endpoints to make it live! 🚀
