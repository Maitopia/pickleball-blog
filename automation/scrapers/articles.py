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

import hashlib
import os
import time
from datetime import datetime
from typing import List, Dict
import google.generativeai as genai
from dateutil import parser
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def summarize_with_ai(title: str, raw_content: str) -> str:
    """Uses Gemini to generate a high-quality 5-sentence summary in English."""
    if not api_key:
        return (raw_content[:800] + '...') if len(raw_content) > 800 else raw_content

    # Add a small delay to avoid hitting rate limits
    time.sleep(10)

    model = genai.GenerativeModel('gemini-pro-latest')
    
    prompt = f"""
    Title: {title}
    Content: {raw_content[:4000]} # Limit input length
    
    Task:
    1. Translate the content and title to English if it's in another language.
    2. Write a detailed, engaging summary of the article in English.
    3. The summary MUST be exactly 5 sentences long.
    4. Focus on the most important pickleball-related facts or tips.
    
    Output ONLY the 5-sentence summary.
    """

    for attempt in range(1):
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            if "429" in str(e):
                print(f"  Rate limit hit, using fallback immediately...")
                break
            else:
                print(f"AI Summary Error: {e}")
                
    # Synthetic Fallback if AI fails or rate limited
    print(f"  Using synthetic fallback for: {title}")
    sentences = [
        f"This article discusses {title} in detail.",
        raw_content[:150] + "..." if len(raw_content) > 150 else raw_content,
        "Mastering these concepts is essential for players looking to advance their game.",
        "Stay tuned for more updates and deep dives into pickleball strategy and news.",
        "Check out the full article at the source link below for complete details."
    ]
    return " ".join(sentences)


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
                published_str = entry.get('published', '')
                if not published_str and 'updated' in entry:
                    published_str = entry.updated
                
                try:
                    dt = parser.parse(published_str)
                except:
                    dt = datetime.now()

                # Check age (60 days limit)
                days_old = (datetime.now() - dt.replace(tzinfo=None)).days
                if days_old > 60:
                    print(f"  Skipping old article: {entry.title} ({days_old} days old)")
                    continue

                date_str = dt.strftime('%B %d, %Y')
                
                # Extract category from tags or use default
                category = 'News'
                if hasattr(entry, 'tags') and entry.tags:
                    category = entry.tags[0].term
                
                # Clean excerpt and content for fair use (only snippets)
                summary = entry.get('summary', '')
                if not summary and 'content' in entry:
                    summary = entry.content[0].value
                
                # Use AI for a better summary/preview
                print(f"  Generating AI summary for: {entry.title}...")
                preview_content = summarize_with_ai(entry.title, summary)
                
                # Limit excerpt length for the card
                excerpt = (preview_content[:180] + '...') if len(preview_content) > 180 else preview_content

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
