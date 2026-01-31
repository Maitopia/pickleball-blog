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
        time.sleep(2) # Small delay
        model = genai.GenerativeModel('gemini-pro-latest')
        prompt = f"Write a comprehensive 800-word pickleball blog post titled '{selected_topic}' in Markdown with subheadings. Focus on providing actionable advice and deep insights."
        
        try:
            response = model.generate_content(prompt)
            content = response.text
        except Exception as e:
            print(f"  AI Generation failed: {e}")

    # Fallback if no content
    if not content:
        print("  Using high-quality static fallback for original post.")
        if any(kw in selected_topic.lower() for kw in ["strategy", "speed", "mastering"]):
            selected_topic = "The Ultimate Guide to Pickleball Strategy"
            category = "Strategy"
            content = """# The Ultimate Guide to Pickleball Strategy: Mastering the Transition Game

Pickleball is often described as a game of chess played on a court. While power and speed have their place, the most successful players are those who master the subtle art of strategy, particularly the transition game. Moving from the baseline to the non-volley zone (NVZ) is the most critical phase of any point, and understanding how to navigate this 'no-man's land' is what separates intermediate players from the pros.

## The Importance of the Third Shot Drop

The third shot drop is the foundation of high-level pickleball. Its primary goal is not to win the point outright, but to allow the serving team to move forward to the kitchen line. By hitting a soft, lofted shot that lands deep in the opponent's NVZ, you force them to hit the ball upward, neutralizing their ability to attack. 

A common mistake is trying to hit the drop too perfectly. Remember, the goal is simply to get the ball into the kitchen. Focus on a smooth, underhand motion with a soft grip. Your paddle should move like a pendulum, guided by your shoulder rather than your wrist. Consistent practice of this shot will drastically improve your win rate by getting you to the net more often.

## Navigating No-Man's Land

The transition zone—the area between the baseline and the kitchen—is often called 'no-man's land' because it's where you are most vulnerable. However, you don't always have to get to the net in one shot. If your third shot isn't perfect, be prepared to hit a 'fifth shot drop' or a 'seventh shot drop.' 

The key is balance. If you are caught mid-transition, stop and get into your ready position. It's better to hit a solid reset from the middle of the court than to be caught moving when your opponent strikes the ball. This 'split-step' is a fundamental technique that allows you to react quickly to any return.

## The Art of the Dink

Once all four players are at the kitchen line, the game becomes a patient battle of dinks. Dinking is not just about keeping the ball in play; it's about pushing your opponents out of position. Look for opportunities to hit the ball toward their feet or to their backhand side.

Patience is your greatest weapon here. Many players get frustrated during long dink rallies and try to speed up a ball that is too low. Only attack when you see a ball that is above the net height. Until then, keep your dinks low and unattackable.

## Doubles Communication

In doubles, you and your partner must move as a unit. Imagine a ten-foot rope connecting you; when one moves left, the other should follow. This keeps the gaps in your defense closed. Communication is also vital. Calling 'mine!' or 'yours!' prevents confusion on middle balls and ensures that the player with the better angle takes the shot.

Establish a game plan before the match starts. Are you going to target one player? Are you playing more aggressively or defensively? Being on the same page as your partner will lead to more consistent wins.

## Advanced Strategy: The Speed Up

Knowing when to speed up the ball is an advanced skill that requires excellent timing. The best time to speed up is when your opponent is leaning back or caught out of position. Aim for their shoulder or hip, as these are the hardest spots to defend.

However, be prepared for the ball to come back fast. If you speed up the ball, stay low and keep your paddle out in front. Expect the counter-attack and be ready to reset the ball if your initial speed-up doesn't end the point.

## Conclusion

Mastering pickleball strategy takes time and dedication. By focusing on the third shot drop, disciplined movement through the transition zone, patient dinking, and clear communication, you'll find yourself winning more matches and enjoying the game on a much deeper level. Remember, pickleball is a game of errors—the team that makes fewer unforced errors will almost always come out on top.
"""
        else:
            selected_topic = "Pickleball Fitness and Longevity: A Comprehensive Guide"
            category = "Tips"
            content = """# Pickleball Fitness and Longevity: Playing Your Best for Life

Pickleball is often praised for its accessibility, but that doesn't mean it isn't physically demanding. As the sport grows in popularity, so do the number of pickleball-related injuries. To play your best and ensure you can stay on the court for years to come, you must prioritize fitness, nutrition, and recovery.

## The Importance of a Dynamic Warm-Up

One of the most common mistakes players make is stepping onto the court without a proper warm-up. Cold muscles are more prone to strains and tears. Instead of static stretching, focus on dynamic movements that mimic the actions of pickleball.

Start with five minutes of brisk walking or light jogging around the court. Follow this with leg swings, arm circles, and torso rotations. Spend a few minutes doing side-shuffles and shadow-swings. This increases blood flow to your muscles and prepares your joints for the lateral movements required during a match.

## Building Strength and Agility

Pickleball requires explosive power and quick directional changes. A well-rounded strength training program should focus on your core, legs, and shoulders.

- **Legs**: Squats and lunges are essential for building the power needed for drives and the agility needed for moving at the kitchen line.
- **Core**: A strong core provides stability and helps prevent lower back pain. Planks and Russian twists are excellent additions to your routine.
- **Shoulders**: Rotator cuff exercises are critical for preventing common shoulder injuries, especially if you hit a lot of overhead smashes.

Agility drills, such as ladder work or shuttle runs, will also help you react faster to your opponent's shots and improve your footwork.

## Nutrition for Performance

What you eat before, during, and after play can significantly impact your energy levels and recovery. Focus on a diet rich in complex carbohydrates, lean protein, and healthy fats.

- **Pre-match**: Eat a small meal with complex carbs (like oatmeal or whole-wheat toast) 1-2 hours before playing to provide sustained energy.
- **During play**: Stay hydrated with water and consider an electrolyte drink if you are playing for more than an hour in the heat.
- **Post-match**: Within 30-60 minutes of finishing, consume protein and carbohydrates to help repair muscle tissue and replenish glycogen stores. A protein shake with a banana is a quick and effective option.

## Prevention of Common Injuries

Pickleball players are particularly susceptible to 'Pickleball Elbow' (lateral epicondylitis), Achilles tendonitis, and knee strains.

- **Avoid over-gripping**: Holding your paddle too tight is a leading cause of elbow pain. Focus on a relaxed grip (3 or 4 out of 10 in firmness).
- **Proper footwear**: Never play in running shoes, which lack lateral support. Invest in high-quality court shoes (tennis or pickleball-specific) to prevent ankle rolls and knee pain.
- **Listen to your body**: If you feel sharp pain, stop playing immediately. Pushing through an injury often leads to longer recovery times.

## The Role of Recovery

As we age, our bodies need more time to recover. Don't underestimate the power of rest. Aim for at least 7-8 hours of quality sleep per night, as this is when the most significant muscle repair occurs.

Consider incorporating low-impact activities like yoga or swimming on your off days to maintain flexibility and cardiovascular health without the impact of the court. Foam rolling and massage can also help alleviate muscle tightness and improve circulation.

## Conclusion

Pickleball is a lifetime sport, but only if you take care of the vehicle that allows you to play. By implementing a dynamic warm-up, building strength, fueling your body correctly, and listening to your recovery needs, you can minimize your risk of injury and maximize your enjoyment of this amazing game. Stay fit, stay healthy, and we'll see you at the kitchen line!
"""

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
