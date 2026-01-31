import os
import json
import random
import time
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def generate_daily_post():
    """Generates a high-quality original pickleball post using Gemini or Fallback."""
    
    topics = [
        "Mastering the Mental Game: Staying Calm Under Pressure",
        "The Evolution of Pickleball Paddle Technology: What's Next?",
        "Why Pickleball is the Perfect Sport for All Ages",
        "Advanced Strategy: When to Speed Up the Ball",
        "Nutrition and Fitness for the Serious Pickleball Player",
        "Building a Pickleball Community: Tips for Local Organizers"
    ]
    
    selected_topic = random.choice(topics)
    print(f"Generating AI article on topic: {selected_topic}...")

    # Default values
    content = ""
    category = "Strategy"
    gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    ]

    # Try Gemini if API key exists
    if api_key:
        time.sleep(5) # Small delay
        model = genai.GenerativeModel('gemini-pro-latest')
        prompt = f"Write an 800-word pickleball blog post titled '{selected_topic}' in Markdown with subheadings."
        
        try:
            response = model.generate_content(prompt)
            content = response.text
        except Exception as e:
            print(f"  AI Generation failed: {e}")

    # Fallback if no content
    if not content:
        print("  Using static fallback for original post.")
        if "Strategy" in selected_topic or "Speed" in selected_topic:
            selected_topic = "The Ultimate Guide to Pickleball Strategy"
            category = "Strategy"
            content = """# The Ultimate Guide to Pickleball Strategy\n\nPickleball is a game of patience and tactical precision... [800 words of strategy content]"""
        else:
            selected_topic = "Pickleball Fitness and Longevity"
            category = "Tips"
            content = """# Pickleball Fitness and Longevity\n\nStaying healthy on the court is the key to enjoying pickleball for life... [800 words of fitness content]"""

    # Final object
    paragraphs = [p for p in content.split('\n') if p.strip() and not p.startswith('#')]
    excerpt = paragraphs[0][:180] + "..." if paragraphs else "Latest original feature: " + selected_topic

    return {
        'id': f"ai-{int(datetime.now().timestamp())}",
        'title': selected_topic,
        'excerpt': excerpt,
        'content': content,
        'author': "Pickleball Pulse AI",
        'date': datetime.now().strftime('%B %d, %Y'),
        'category': category,
        'featured': True,
        'gradient': random.choice(gradients),
        'ai_generated': True
    }

if __name__ == "__main__":
    print(generate_daily_post())
