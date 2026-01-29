# Pickleball Blog - Content Automation

This directory contains the automation system for updating blog content automatically.

## Quick Start

### 1. Install Dependencies

```bash
cd automation
pip3 install -r requirements.txt
```

### 2. Run Manual Update

```bash
python3 automation/update_content.py
```

### 3. Set Up Automated Updates (Cron)

```bash
chmod +x setup_cron.sh
./setup_cron.sh
```

## Directory Structure

```
automation/
├── update_content.py          # Main orchestration script
├── config.json                # Configuration settings
├── requirements.txt           # Python dependencies
├── scrapers/                  # Data fetching modules
│   ├── articles.py           # Article/RSS scraper
│   ├── tournaments.py        # Tournament data scraper
│   └── rankings.py           # Rankings scraper
└── logs/                     # Log files (auto-created)
```

## Configuration

Edit `automation/config.json` to customize:

- **Data sources**: Enable/disable specific data sources
- **RSS feeds**: Add or remove article RSS feeds
- **Scraping settings**: Adjust delays and timeouts
- **Output settings**: Configure data directory and backups

## Data Output

Updated data is saved to the `data/` directory:

- `data/articles.json` - Blog articles
- `data/tournaments.json` - Tournament information
- `data/rankings.json` - Player rankings

## Scheduled Updates

Default schedule (configurable in `setup_cron.sh`):

- **Daily (8:00 AM)**: Article updates
- **Weekly (Sunday 8:00 PM)**: Tournament updates
- **Weekly (Monday 6:00 AM)**: Rankings updates

## Manual Commands

```bash
# Run full update
python3 automation/update_content.py

# View cron jobs
crontab -l

# Edit cron jobs
crontab -e

# View update logs
tail -f automation/logs/update.log
```

## Customization

### Adding New Data Sources

1. Create a new scraper in `automation/scrapers/`
2. Import and call it in `update_content.py`
3. Add configuration to `config.json`

### Changing Update Frequency

Edit the cron schedule in `setup_cron.sh` or manually:

```bash
crontab -e
```

Cron format: `minute hour day month weekday command`

Examples:
- `0 8 * * *` - Daily at 8:00 AM
- `0 */6 * * *` - Every 6 hours
- `0 20 * * 0` - Sundays at 8:00 PM

## Troubleshooting

### Check if cron is running
```bash
sudo systemctl status cron
```

### View cron logs
```bash
grep CRON /var/log/syslog
```

### Test the script manually
```bash
cd /home/elson/clawd/pickleball-blog
python3 automation/update_content.py
```

## Notes

- The current implementation uses sample data
- To enable real web scraping, implement the scraper functions in the `scrapers/` modules
- Always respect website terms of service and rate limits
- Backups are created automatically before each update
