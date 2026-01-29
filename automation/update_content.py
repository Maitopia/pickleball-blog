"""
Main content update script for pickleball blog automation.
Orchestrates data fetching, processing, and output generation.
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

# Add scrapers directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'scrapers'))

from articles import fetch_rss_articles, generate_sample_articles, save_articles
from tournaments import generate_sample_tournaments
from rankings import generate_sample_rankings


class ContentUpdater:
    """Main class for updating blog content."""
    
    def __init__(self, config_path='automation/config.json'):
        """Initialize the content updater."""
        self.config = self.load_config(config_path)
        self.data_dir = Path(self.config['output']['data_dir'])
        self.data_dir.mkdir(exist_ok=True)
        
    def load_config(self, config_path):
        """Load configuration from JSON file."""
        with open(config_path, 'r') as f:
            return json.load(f)
    
    def backup_data(self, data_type):
        """Create backup of existing data."""
        if not self.config['output']['backup_enabled']:
            return
            
        source_file = self.data_dir / f'{data_type}.json'
        if source_file.exists():
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_file = self.data_dir / f'{data_type}_backup_{timestamp}.json'
            backup_file.write_text(source_file.read_text())
            print(f"✓ Backed up {data_type}.json")
    
    def update_articles(self):
        """Update articles from RSS feeds."""
        print("\n📰 Updating Articles...")
        
        if not self.config['data_sources']['articles']['enabled']:
            print("  Articles update disabled in config")
            return
        
        self.backup_data('articles')
        
        # Fetch from RSS feeds
        rss_feeds = self.config['data_sources']['articles']['rss_feeds']
        articles = []
        
        try:
            articles = fetch_rss_articles(rss_feeds, max_articles=5)
            print(f"  Fetched {len(articles)} articles from RSS feeds")
        except Exception as e:
            print(f"  Error fetching RSS articles: {e}")
            print("  Using sample articles instead")
            articles = generate_sample_articles()
        
        # Save to JSON
        output_file = self.data_dir / 'articles.json'
        with open(output_file, 'w') as f:
            json.dump(articles, f, indent=2)
        
        print(f"✓ Saved {len(articles)} articles to {output_file}")
    
    def update_tournaments(self):
        """Update tournament data."""
        print("\n🏆 Updating Tournaments...")
        
        if not self.config['data_sources']['tournaments']['enabled']:
            print("  Tournaments update disabled in config")
            return
        
        self.backup_data('tournaments')
        
        # For now, use sample data
        # In production, this would scrape from actual sources
        tournaments = generate_sample_tournaments()
        
        # Save to JSON
        output_file = self.data_dir / 'tournaments.json'
        with open(output_file, 'w') as f:
            json.dump(tournaments, f, indent=2)
        
        upcoming_count = len(tournaments.get('upcoming', []))
        past_count = len(tournaments.get('past', []))
        print(f"✓ Saved {upcoming_count} upcoming and {past_count} past tournaments to {output_file}")
    
    def update_rankings(self):
        """Update player rankings."""
        print("\n📊 Updating Rankings...")
        
        if not self.config['data_sources']['rankings']['enabled']:
            print("  Rankings update disabled in config")
            return
        
        self.backup_data('rankings')
        
        # For now, use sample data
        # In production, this would scrape from actual sources
        rankings = generate_sample_rankings()
        
        # Save to JSON
        output_file = self.data_dir / 'rankings.json'
        with open(output_file, 'w') as f:
            json.dump(rankings, f, indent=2)
        
        categories_count = len(rankings)
        print(f"✓ Saved rankings for {categories_count} categories to {output_file}")
    
    def update_all(self):
        """Update all content types."""
        print("=" * 60)
        print("🎾 Pickleball Blog Content Updater")
        print("=" * 60)
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        try:
            self.update_articles()
            self.update_tournaments()
            self.update_rankings()
            
            print("\n" + "=" * 60)
            print("✅ Content update completed successfully!")
            print("=" * 60)
            
        except Exception as e:
            print(f"\n❌ Error during update: {e}")
            raise


def main():
    """Main entry point."""
    updater = ContentUpdater()
    updater.update_all()


if __name__ == '__main__':
    main()
