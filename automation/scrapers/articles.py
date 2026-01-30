"""
Article scraper and generator for pickleball blog.
Fetches articles from RSS feeds and generates article data.
"""

try:
    import feedparser
    HAS_FEEDPARSER = True
except ImportError:
    HAS_FEEDPARSER = False
    print("Warning: feedparser not installed. RSS fetching disabled. Install with: sudo apt install python3-pip && pip3 install feedparser")

import json
from datetime import datetime
from typing import List, Dict
import hashlib


def fetch_rss_articles(feed_urls: List[str], max_articles: int = 10) -> List[Dict]:
    """
    Fetch articles from RSS feeds.
    
    Args:
        feed_urls: List of RSS feed URLs
        max_articles: Maximum number of articles to fetch per feed
        
    Returns:
        List of article dictionaries
    """
    if not HAS_FEEDPARSER:
        print("  feedparser not available, using sample articles")
        return generate_sample_articles()
    
    articles = []
    
    for feed_url in feed_urls:
        try:
            print(f"Fetching articles from {feed_url}...")
            feed = feedparser.parse(feed_url)
            
            for entry in feed.entries[:max_articles]:
                # Generate unique ID from URL
                article_id = hashlib.md5(entry.link.encode()).hexdigest()[:12]
                
                # Parse published date
                published = entry.get('published_parsed', None)
                if published:
                    date_str = datetime(*published[:6]).strftime('%B %d, %Y')
                else:
                    date_str = datetime.now().strftime('%B %d, %Y')
                
                # Extract category from tags or use default
                category = 'News'
                if hasattr(entry, 'tags') and entry.tags:
                    category = entry.tags[0].term
                
                # Clean excerpt and content for fair use (only snippets)
                summary = entry.get('summary', '')
                if not summary and 'content' in entry:
                    summary = entry.content[0].value
                
                # Limit excerpt length for the card
                excerpt = (summary[:180] + '...') if len(summary) > 180 else summary
                
                # We store a slightly longer preview for the article view, 
                # but NOT the full article to respect copyright and encourage clicks to source
                preview_content = (summary[:800] + '...') if len(summary) > 800 else summary

                article = {
                    'id': article_id,
                    'title': entry.title,
                    'excerpt': excerpt,
                    'content': preview_content,
                    'author': entry.get('author', 'Staff Writer'),
                    'date': date_str,
                    'category': category,
                    'featured': False,
                    'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'source_url': entry.link,
                    'source_name': feed.feed.get('title', 'Original Source')
                }
                
                articles.append(article)
                
        except Exception as e:
            print(f"Error fetching from {feed_url}: {e}")
            continue
    
    return articles


def generate_sample_articles() -> List[Dict]:
    """
    Generate sample articles for demonstration.
    
    Returns:
        List of sample article dictionaries
    """
    return [
        {
            'id': 'sample-001',
            'title': 'Top 10 Pickleball Drills for Intermediate Players',
            'excerpt': 'Elevate your game with these essential drills designed specifically for intermediate-level players.',
            'content': '<p>Improve your pickleball skills with these targeted drills...</p>',
            'author': 'Coach Sarah Mitchell',
            'date': datetime.now().strftime('%B %d, %Y'),
            'category': 'Tips',
            'featured': False,
            'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            'id': 'sample-002',
            'title': 'Understanding the Third Shot Drop',
            'excerpt': 'Master one of the most important shots in pickleball with our comprehensive guide.',
            'content': '<p>The third shot drop is a crucial skill...</p>',
            'author': 'Mike Johnson',
            'date': datetime.now().strftime('%B %d, %Y'),
            'category': 'Strategy',
            'featured': False,
            'gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ]


def save_articles(articles: List[Dict], output_file: str):
    """
    Save articles to JSON file.
    
    Args:
        articles: List of article dictionaries
        output_file: Path to output JSON file
    """
    with open(output_file, 'w') as f:
        json.dump(articles, f, indent=2)
    print(f"Saved {len(articles)} articles to {output_file}")


if __name__ == '__main__':
    # For testing
    sample_articles = generate_sample_articles()
    print(f"Generated {len(sample_articles)} sample articles")
