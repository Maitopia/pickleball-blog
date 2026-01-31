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

To master the drop, you must understand gravity and geometry. The ball needs to cross the net at its highest point of the arc and then fall sharply. This is why a higher arc is generally safer than a flat one. If your drop is too flat, your opponents can easily volley it or speed it up. If it's too high but deep, they can still attack it. Finding that 'sweet spot' in the kitchen is the hallmark of a great strategist.

## Navigating No-Man's Land

The transition zone—the area between the baseline and the kitchen—is often called 'no-man's land' because it's where you are most vulnerable. However, you don't always have to get to the net in one shot. If your third shot isn't perfect, be prepared to hit a 'fifth shot drop' or a 'seventh shot drop.' 

The key is balance. If you are caught mid-transition, stop and get into your ready position. It's better to hit a solid reset from the middle of the court than to be caught moving when your opponent strikes the ball. This 'split-step' is a fundamental technique that allows you to react quickly to any return. Patience in the transition zone is what separates the elite from the average. Amateur players often rush forward regardless of the quality of their shot, only to be hit in the feet or the chest. Professionals know when to stay back and wait for a better opportunity to advance.

## The Art of the Dink

Once all four players are at the kitchen line, the game becomes a patient battle of dinks. Dinking is not just about keeping the ball in play; it's about pushing your opponents out of position. Look for opportunities to hit the ball toward their feet or to their backhand side.

Patience is your greatest weapon here. Many players get frustrated during long dink rallies and try to speed up a ball that is too low. Only attack when you see a ball that is above the net height. Until then, keep your dinks low and unattackable. Consider the 'around the post' (ATP) shot as a defensive-offensive hybrid. If your opponent dinks too wide, you can take it outside the court and hit it back around the post. This is a rare but effective way to end a rally when you've been pushed to the extreme edge of the court.

## Doubles Communication

In doubles, you and your partner must move as a unit. Imagine a ten-foot rope connecting you; when one moves left, the other should follow. This keeps the gaps in your defense closed. Communication is also vital. Calling 'mine!' or 'yours!' prevents confusion on middle balls and ensures that the player with the better angle takes the shot.

Establish a game plan before the match starts. Are you going to target one player? Are you playing more aggressively or defensively? Being on the same page as your partner will lead to more consistent wins. Professional teams use signals and constant verbal reinforcement to maintain their 'umbilical cord' connection. If one player is poaching, the other must immediately slide to cover the vacated line. This synchronization is the ultimate team strategy.

## Advanced Strategy: The Speed Up

Knowing when to speed up the ball is an advanced skill that requires excellent timing. The best time to speed up is when your opponent is leaning back or caught out of position. Aim for their shoulder or hip, as these are the hardest spots to defend.

However, be prepared for the ball to come back fast. If you speed up the ball, stay low and keep your paddle out in front. Expect the counter-attack and be ready to reset the ball if your initial speed-up doesn't end the point. A 'fake' speed-up or a 'hold' can also be effective. By pausing slightly before your shot, you can freeze your opponents, making them unsure whether you're going to dink or drive. This mental pressure is as much a part of the strategy as the physical shot itself.

## The Lob as a Strategic Weapon

The lob is often underrated in modern pickleball, but it can be a devastating tool when used correctly. A well-placed lob forces your opponents off the kitchen line and resets the point. The key to a successful lob is disguise. It should look like a dink until the very last second.

However, be wary of the overhead smash. If your lob isn't deep enough, you've just given your opponent an easy point. Use the lob sparingly and mostly when you notice your opponents are leaning far forward or have slower mobility. In the senior circuits, the lob is a primary strategic element, but even at the pro level, a perfectly timed 'cloud-looper' can win a critical point.

## Conclusion: Putting it All Together

Mastering pickleball strategy takes time, dedication, and a willingness to fail. By focusing on the third shot drop, disciplined movement through the transition zone, patient dinking, and clear communication, you'll find yourself winning more matches and enjoying the game on a much deeper level. Remember, pickleball is a game of errors—the team that makes fewer unforced errors will almost always come out on top. Keep practicing, stay patient, and always look for ways to out-think your opponent at the kitchen line. The journey from a 3.0 to a 5.0 player is mapped out in these strategic choices, not just in how hard you can hit the ball.
"""
        else:
            selected_topic = "Pickleball Fitness and Longevity: A Comprehensive Guide"
            category = "Tips"
            content = """# Pickleball Fitness and Longevity: Playing Your Best for Life

Pickleball is often praised for its accessibility, but that doesn't mean it isn't physically demanding. As the sport grows in popularity, so do the number of pickleball-related injuries. To play your best and ensure you can stay on the court for years to come, you must prioritize fitness, nutrition, and recovery. This comprehensive guide covers everything from the science of the warm-up to the psychology of longevity in the sport.

## The Importance of a Dynamic Warm-Up

One of the most common mistakes players make is stepping onto the court without a proper warm-up. Cold muscles are more prone to strains and tears. Instead of static stretching (holding a stretch for 30 seconds), which can actually decrease explosive power if done before activity, focus on dynamic movements that mimic the actions of pickleball.

Start with five minutes of brisk walking or light jogging around the court. Follow this with leg swings, arm circles, and torso rotations. Spend a few minutes doing side-shuffles and shadow-swings. This increases blood flow to your muscles, lubricates your joints, and activates your nervous system for the lateral movements required during a match. A proper warm-up should leave you slightly breathless and with a light sweat; this is the sign that your core temperature has risen sufficiently for safe play.

## Building Strength and Agility

Pickleball requires explosive power and quick directional changes. A well-rounded strength training program should focus on your core, legs, and shoulders, with a particular emphasis on functional movements rather than just mirror muscles.

- **Legs**: Squats, lunges, and calf raises are essential for building the power needed for drives and the agility needed for moving at the kitchen line. Focus on balance as well; single-leg Romanian deadlifts are great for stabilizing the ankles and knees.
- **Core**: A strong core provides stability and helps prevent lower back pain. Planks, Russian twists, and 'dead bugs' are excellent additions to your routine. Remember, your power comes from the ground up through your core to your paddle.
- **Shoulders**: Rotator cuff exercises are critical for preventing common shoulder injuries, especially if you hit a lot of overhead smashes. Use light resistance bands for external rotations and scaption exercises.

Agility drills, such as ladder work or shuttle runs, will also help you react faster to your opponent's shots. The 'Spider Drill'—where you start at the center of the baseline and run to various points on the court and back—is a staple for serious competitors looking to improve their court coverage.

## Nutrition and Hydration for Performance

What you eat before, during, and after play can significantly impact your energy levels and recovery. Focus on a diet rich in complex carbohydrates, lean protein, and healthy fats.

- **Pre-match**: Eat a small meal with complex carbs (like oatmeal or whole-wheat toast) 1-2 hours before playing to provide sustained energy. Avoid heavy, greasy foods that can lead to sluggishness.
- **During play**: Stay hydrated with water and consider an electrolyte drink if you are playing for more than an hour in the heat. Dehydration leads to loss of focus and cramping. A good rule of thumb is to drink 4-6 ounces of water for every 15-20 minutes of intense play.
- **Post-match**: Within 30-60 minutes of finishing, consume protein and carbohydrates to help repair muscle tissue and replenish glycogen stores. A protein shake with a banana or a turkey sandwich on whole-grain bread are both effective options. Don't skip this window; it's when your body is most primed for recovery.

## Prevention of Common Injuries

Pickleball players are particularly susceptible to 'Pickleball Elbow' (lateral epicondylitis), Achilles tendonitis, and knee strains. Understanding the root causes of these issues is the first step in prevention.

- **Avoid over-gripping**: Holding your paddle too tight is a leading cause of elbow pain. Focus on a relaxed grip (3 or 4 out of 10 in firmness). If your arm feels tired after a game, you're likely gripping too hard.
- **Proper footwear**: Never play in running shoes, which lack lateral support and are designed for forward motion only. Invest in high-quality court shoes (tennis or pickleball-specific) to prevent ankle rolls and knee pain. The tread on court shoes is specifically designed to slide and stop on hard surfaces without catching.
- **Listen to your body**: If you feel sharp pain, stop playing immediately. Pushing through an injury often leads to longer recovery times or chronic issues. The 'no pain, no gain' mantra does not apply to joint or tendon pain.

## The Role of Rest and Recovery

As we age, our bodies need more time to recover. Don't underestimate the power of rest. Aim for at least 7-8 hours of quality sleep per night, as this is when the most significant muscle repair and hormonal balancing occur.

Consider incorporating low-impact activities like yoga or swimming on your off days to maintain flexibility and cardiovascular health without the impact of the court. Foam rolling and massage can also help alleviate muscle tightness and improve circulation. Active recovery—doing something light and enjoyable—is often better than complete sedentary rest, as it keeps the blood flowing through recovering tissues.

## Mental Fitness and Longevity

Longevity isn't just about the body; it's about the mind. Pickleball can be frustrating and intense. Maintaining a positive attitude and focusing on the social aspects of the game can prevent burnout. Meditation and visualization techniques can help you stay calm during high-pressure points, which in turn reduces physical tension and the risk of injury.

Set realistic goals for your progress. Don't compare yourself to the 20-year-olds if you're in your 60s. Celebrate the 'small wins'—a perfectly placed dink or a strategic lob—and remember that the most successful player is the one who enjoys the game the most.

## Conclusion: The Path Forward

Pickleball is a lifetime sport, but only if you take care of the vehicle that allows you to play. By implementing a dynamic warm-up, building strength, fueling your body correctly, and listening to your recovery needs, you can minimize your risk of injury and maximize your enjoyment of this amazing game. Stay fit, stay healthy, and prioritize your longevity so we can see you at the kitchen line for decades to come!
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
