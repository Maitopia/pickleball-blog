# Pickleball Pulse

A modern, automated pickleball news and information blog with live tournament results, player rankings, and articles.

## 🎾 Features

- **Automated Content Updates** - Daily article updates via GitHub Actions
- **Live Tournament Results** - Upcoming and past tournament information
- **Player Rankings** - Real-time rankings across all categories
- **Responsive Design** - Clean, sporty pickleball-themed interface
- **Admin Panel** - Easy content management

## 🚀 Live Site

Visit the live site at: `https://YOUR-USERNAME.github.io/pickleball-blog`

## 📦 Setup & Deployment

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/pickleball-blog.git
cd pickleball-blog
```

2. Run local server:
```bash
python3 -m http.server 8000
```

3. Open in browser: `http://localhost:8000`

### Deploy to GitHub Pages

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"
   - Save

3. **Your site will be live at:**
   `https://YOUR-USERNAME.github.io/pickleball-blog`

## 🤖 Automated Content Updates

The site automatically updates content daily using GitHub Actions:

- **Articles**: Updated daily at 8 AM UTC
- **Tournaments**: Auto-updated when data changes
- **Rankings**: Refreshed with latest data

### Manual Content Update

Trigger a manual update:
1. Go to "Actions" tab in GitHub
2. Select "Update Blog Content"
3. Click "Run workflow"

### Local Content Update

```bash
python3 automation/update_content.py
```

## 📁 Project Structure

```
pickleball-blog/
├── index.html              # Main page
├── style.css               # Pickleball-themed styles
├── script.js               # Main JavaScript
├── cms.js                  # Content management
├── tournaments.js          # Tournament display
├── rankings.js             # Rankings display
├── automation/             # Content automation
│   ├── update_content.py   # Main update script
│   ├── config.json         # Configuration
│   └── scrapers/           # Data fetchers
├── data/                   # Generated content
│   ├── articles.json
│   ├── tournaments.json
│   └── rankings.json
└── .github/workflows/      # GitHub Actions
    ├── update-content.yml  # Content updates
    └── deploy-pages.yml    # Site deployment
```

## 🎨 Customization

### Update Colors

Edit `style.css` CSS variables:
```css
:root {
    --pickleball-yellow: #c8d900;
    --pickleball-blue: #0066cc;
    --pickleball-orange: #ff6b35;
    --pickleball-green: #7cb342;
    --pickleball-navy: #1e3a5f;
}
```

### Configure Data Sources

Edit `automation/config.json`:
```json
{
  "data_sources": {
    "articles": {
      "rss_feeds": [
        "https://your-feed-url.com/feed"
      ]
    }
  }
}
```

## 📝 Content Management

### Admin Panel

Access the admin panel by clicking "Admin" in the navigation:
- Create/edit articles
- Manage content
- Preview changes

### Manual Data Updates

Edit JSON files in the `data/` directory:
- `data/articles.json` - Blog articles
- `data/tournaments.json` - Tournament info
- `data/rankings.json` - Player rankings

## 🔧 Development

### Install Python Dependencies (Optional)

For RSS feed fetching:
```bash
pip3 install -r automation/requirements.txt
```

### Run Tests

```bash
python3 automation/update_content.py
```

## 📄 License

MIT License - feel free to use for your own pickleball blog!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Contact

For questions or suggestions, open an issue on GitHub.

---

Built with ❤️ for the pickleball community
