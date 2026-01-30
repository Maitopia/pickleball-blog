// CMS - Content Management System for The Court Report

// Initialize default articles if none exist
function initDefaultArticles() {
    if (!localStorage.getItem('articles')) {
        const defaultArticles = [
            {
                id: '1',
                title: 'Master the Third Shot Drop: A Complete Guide',
                excerpt: 'The third shot drop is the foundation of strategic pickleball. Here\'s how to execute it perfectly every time.',
                category: 'Strategy',
                author: 'Mike Johnson',
                date: '2026-01-26',
                content: `The third shot drop is arguably the most important shot in pickleball. It's the bridge between aggressive serving and defensive play at the net.

## Why It Matters

When you serve, you and your partner start at the baseline. The third shot drop allows you to advance to the kitchen line while keeping the ball low, preventing your opponents from attacking.

## Technique Breakdown

1. **Paddle Position**: Keep your paddle face open (angled upward)
2. **Contact Point**: Hit the ball below waist level
3. **Follow Through**: Short, controlled motion toward your target
4. **Arc**: Aim for a high arc that drops into the kitchen

## Common Mistakes

Many players try to hit the third shot too hard. Remember: this is a finesse shot, not a power shot. The goal is placement and touch, not speed.

Practice this shot religiously, and you'll see immediate improvement in your game.`,
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                featured: false
            },
            {
                id: '2',
                title: 'PPA Tour Announces New Tournament Format',
                excerpt: 'Major changes coming to professional pickleball as the PPA unveils their 2026 season structure.',
                category: 'News',
                author: 'Lisa Chen',
                date: '2026-01-26',
                content: `The Professional Pickleball Association (PPA) has announced significant changes to its tournament format for the 2026 season.

## Key Changes

- **Expanded Draw**: Main draw increased from 32 to 48 players
- **Prize Money**: Total purse increased by 40% across all events
- **Streaming**: All matches will be available on PPA's streaming platform
- **International Events**: Four new international stops added

## What Players Are Saying

"These changes are exactly what the sport needs," said Ben Johns. "More opportunity for players and better coverage for fans."

The changes take effect at the next major tournament in March.`,
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                featured: false
            },
            {
                id: '3',
                title: 'Best Paddles for Spin: 2026 Edition',
                excerpt: 'We tested 25 paddles to find which ones generate the most RPM. The results might surprise you.',
                category: 'Equipment',
                author: 'David Park',
                date: '2026-01-25',
                content: `We spent three months testing every major paddle on the market to determine which ones generate the most spin.

## Testing Methodology

Using high-speed cameras and spin-measurement technology, we measured RPM on topspin drives, slice serves, and dink shots.

## Top 5 Paddles

1. **JOOLA Perseus CFS 16** - 2,847 RPM average
2. **Selkirk Vanguard Power Air** - 2,791 RPM
3. **Engage Pursuit MX** - 2,734 RPM
4. **Paddletek Tempest Wave Pro** - 2,689 RPM
5. **Gamma Obsidian** - 2,621 RPM

## Key Findings

Raw carbon fiber faces consistently generated 15-20% more spin than traditional textured surfaces. However, they require more precise contact points.

Full detailed review available to subscribers.`,
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                featured: false
            },
            {
                id: '4',
                title: 'How to Handle the Wind: 7 Essential Techniques',
                excerpt: 'Outdoor play got you down? These pro tips will help you adapt to breezy conditions.',
                category: 'Tips',
                author: 'Jennifer Lopez',
                date: '2026-01-25',
                content: `Wind is the great equalizer in pickleball. Here's how to turn it into an advantage.

## 7 Essential Techniques

1. **Lower Your Trajectory**: Keep shots closer to the net
2. **Shorten Your Swing**: Compact strokes = better control
3. **Adjust Your Grip**: Slightly firmer for stability
4. **Read the Gusts**: Watch trees, flags, and player hair
5. **Use the Wind**: Hit with it when you can
6. **Be Patient**: Wind makes everyone worse, including your opponent
7. **Practice in Wind**: Don't avoid it - embrace it

The best outdoor players aren't fighting the wind - they're working with it.`,
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                featured: false
            },
            {
                id: '5',
                title: 'The 5 Most Common Mistakes Intermediate Players Make',
                excerpt: 'You\'ve graduated from beginner status, but these habits might be holding you back from 4.0 and beyond.',
                category: 'Strategy',
                author: 'Sarah Mitchell',
                date: '2026-01-27',
                content: `You've been playing for a while. You can hold your own at open play. But something's keeping you from leveling up. Here are the five mistakes I see most often.

## 1. Attacking from the Baseline

Just because you CAN hit a hard drive doesn't mean you SHOULD. Attacking from behind the baseline gives your opponents time to react and often sets them up for an easy counter-attack.

**Fix**: Master the transition game. Use the third shot drop or drive to move forward, not to win points.

## 2. Staying in No-Man's Land

The area between the baseline and kitchen line is called no-man's land for a reason. You're too far back to be offensive and too far forward to be defensive.

**Fix**: Make a decision. Either get all the way back or all the way up. Don't linger in the middle.

## 3. Over-Dinking

Dinking is important, but some intermediate players dink just to dink. They're afraid to speed the ball up even when presented with obvious opportunities.

**Fix**: Look for balls above the net. That's your green light to attack.

## 4. Poor Court Positioning

Many players crowd the center line or stand too far apart from their partner, creating exploitable gaps.

**Fix**: Imagine a rope connecting you to your partner. Move as a unit. Generally, you should be 8-10 feet apart.

## 5. Mental Game Neglect

You practice your shots but never practice staying calm under pressure.

**Fix**: Develop a pre-serve routine. Practice breathing techniques. Remember: every point is independent of the last.

Focus on fixing one mistake at a time. Within a month, you'll be a different player.`,
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                featured: true
            }
        ];

        localStorage.setItem('articles', JSON.stringify(defaultArticles));
    }
}

// Get all articles
function getArticles() {
    const articles = localStorage.getItem('articles');
    return articles ? JSON.parse(articles) : [];
}

// Get single article by ID
function getArticle(id) {
    const articles = getArticles();
    return articles.find(article => article.id === id);
}

// Save article (create or update)
function saveArticle(articleData) {
    const articles = getArticles();

    if (articleData.id) {
        // Update existing
        const index = articles.findIndex(a => a.id === articleData.id);
        if (index !== -1) {
            articles[index] = articleData;
        }
    } else {
        // Create new
        articleData.id = Date.now().toString();
        articleData.date = new Date().toISOString().split('T')[0];
        articles.unshift(articleData);
    }

    localStorage.setItem('articles', JSON.stringify(articles));
    return articleData;
}

// Delete article
function deleteArticle(id) {
    const articles = getArticles();
    const filtered = articles.filter(a => a.id !== id);
    localStorage.setItem('articles', JSON.stringify(filtered));
}

// Render articles grid
function renderArticles() {
    const articles = getArticles();
    const grid = document.getElementById('articles-grid');

    // Filter out featured article
    const nonFeatured = articles.filter(a => !a.featured);

    grid.innerHTML = nonFeatured.map(article => `
        <article class="article-card" onclick="viewArticle('${article.id}')">
            <div class="article-image" style="background: ${article.gradient};"></div>
            <div class="article-content">
                <span class="category">${article.category}</span>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="meta">
                    <span class="author">${article.author}</span>
                    <span class="date">${formatDate(article.date)}</span>
                </div>
            </div>
        </article>
    `).join('');

    // Update featured article
    const featured = articles.find(a => a.featured);
    if (featured) {
        document.getElementById('hero-title').textContent = featured.title;
        document.getElementById('hero-excerpt').textContent = featured.excerpt;
        document.getElementById('hero-author').textContent = `By ${featured.author}`;
        document.getElementById('hero-date').textContent = formatDate(featured.date);
        document.getElementById('hero-section').onclick = () => viewArticle(featured.id);
    }
}

// View single article
function viewArticle(id) {
    const article = getArticle(id);
    if (!article) return;

    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('rankings-view').classList.add('hidden');
    document.getElementById('tournaments-view').classList.add('hidden');
    document.getElementById('article-view').classList.remove('hidden');

    document.getElementById('article-title').textContent = article.title;
    document.getElementById('article-meta').innerHTML = `
        <span class="category">${article.category}</span>
        <span class="author">${article.author}</span>
        <span class="date">${formatDate(article.date)}</span>
    `;

    // Convert content to HTML (simple markdown-like conversion)
    const htmlContent = article.content
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(.)/g, '<p>$1')
        .replace(/(.)\n$/, '$1</p>');

    document.getElementById('article-body').innerHTML = htmlContent;

    window.scrollTo(0, 0);
}

// Show home view
function showHome(e) {
    if (e) e.preventDefault();
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('article-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('rankings-view').classList.add('hidden');
    document.getElementById('tournaments-view').classList.add('hidden');
    window.scrollTo(0, 0);
}

// Show admin panel
function showAdmin(e) {
    if (e) e.preventDefault();

    // Check authentication
    if (!localStorage.getItem('isAdmin')) {
        alert('Access Denied. Please login first.');
        return;
    }

    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('article-view').classList.add('hidden');
    document.getElementById('rankings-view').classList.add('hidden');
    document.getElementById('tournaments-view').classList.add('hidden');
    document.getElementById('admin-view').classList.remove('hidden');

    renderAdminArticles();
    window.scrollTo(0, 0);
}

// Authentication Functions
function handleLogin(e) {
    if (e) e.preventDefault();
    const password = prompt('Enter Admin Password:');

    // Simple password check (In a real app, this would be server-side)
    if (password === 'pickleball2026') {
        localStorage.setItem('isAdmin', 'true');
        document.getElementById('admin-nav-btn').classList.remove('hidden');
        alert('Login successful! Admin access enabled.');
    } else {
        alert('Incorrect password.');
    }
}

function initAuth() {
    if (localStorage.getItem('isAdmin') === 'true') {
        document.getElementById('admin-nav-btn').classList.remove('hidden');
    }
}

function handleLogout(e) {
    if (e) e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('isAdmin');
        document.getElementById('admin-nav-btn').classList.add('hidden');
        showHome();
        alert('Logged out successfully.');
    }
}

// Render articles in admin panel
function renderAdminArticles() {
    const articles = getArticles();
    const list = document.getElementById('articles-list');

    list.innerHTML = articles.map(article => `
        <div style="background: var(--dark-bg); padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 1px solid var(--dark-border);">
            <h3 style="color: var(--neon-cyan); margin-bottom: 10px;">${article.title}</h3>
            <p style="color: var(--text-light); margin-bottom: 15px;">${article.excerpt}</p>
            <div style="display: flex; gap: 10px;">
                <button onclick="editArticle('${article.id}')" style="background: var(--neon-blue); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Edit</button>
                <button onclick="confirmDelete('${article.id}')" style="background: #ff0055; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Delete</button>
                ${article.featured ?
            '<span style="background: var(--neon-green); color: black; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold;">FEATURED</span>' :
            `<button onclick="setFeatured('${article.id}')" style="background: var(--dark-border); color: var(--text); border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Set Featured</button>`
        }
            </div>
        </div>
    `).join('');
}

// Edit article
function editArticle(id) {
    const article = getArticle(id);
    if (!article) return;

    document.getElementById('article-id').value = article.id;
    document.getElementById('title').value = article.title;
    document.getElementById('excerpt').value = article.excerpt;
    document.getElementById('category').value = article.category;
    document.getElementById('author').value = article.author;
    document.getElementById('content').value = article.content;
    document.getElementById('gradient').value = article.gradient;
    document.getElementById('featured').checked = article.featured;

    window.scrollTo(0, 0);
}

// Confirm delete
function confirmDelete(id) {
    if (confirm('Are you sure you want to delete this article?')) {
        deleteArticle(id);
        renderAdminArticles();
        renderArticles();
    }
}

// Set article as featured
function setFeatured(id) {
    const articles = getArticles();
    // Remove featured from all articles
    articles.forEach(a => a.featured = false);
    // Set this one as featured
    const article = articles.find(a => a.id === id);
    if (article) {
        article.featured = true;
        localStorage.setItem('articles', JSON.stringify(articles));
        renderAdminArticles();
        renderArticles();
    }
}

// Handle article form submit
function handleArticleSubmit(e) {
    e.preventDefault();

    const articleData = {
        id: document.getElementById('article-id').value || null,
        title: document.getElementById('title').value,
        excerpt: document.getElementById('excerpt').value,
        category: document.getElementById('category').value,
        author: document.getElementById('author').value,
        content: document.getElementById('content').value,
        gradient: document.getElementById('gradient').value,
        featured: document.getElementById('featured').checked,
        date: document.getElementById('article-id').value ?
            getArticle(document.getElementById('article-id').value).date :
            new Date().toISOString().split('T')[0]
    };

    saveArticle(articleData);

    // Reset form
    document.getElementById('article-form').reset();
    document.getElementById('article-id').value = '';

    // Refresh views
    renderAdminArticles();
    renderArticles();

    alert('Article saved successfully!');
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDefaultArticles();
    renderArticles();
    initAuth();
});

console.log('🎨 CMS loaded successfully!');
