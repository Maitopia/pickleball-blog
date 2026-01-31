// CMS - Content Management System for The Court Report

// Initialize default articles if none exist
async function initDefaultArticles() {
    if (!localStorage.getItem('articles')) {
        try {
            const response = await fetch('data/articles.json');
            if (response.ok) {
                const articles = await response.json();
                localStorage.setItem('articles', JSON.stringify(articles));
                if (typeof renderArticles === 'function') renderArticles();
            }
        } catch (e) {
            console.error('Failed to load initial articles:', e);
        }
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
    let featured = articles.find(a => a.featured);

    // Fallback to first article if no featured article is explicitly set
    if (!featured && articles.length > 0) {
        featured = articles[0];
    }

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

    // Convert content to HTML if it's not already HTML
    let htmlContent = article.content;
    if (!htmlContent.trim().startsWith('<')) {
        htmlContent = htmlContent
            .replace(/## (.*)/g, '<h2>$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.)/g, '<p>$1')
            .replace(/(.)\n$/, '$1</p>');
    }

    document.getElementById('article-body').innerHTML = htmlContent;

    // Add source attribution and "Read Full" button if it's an external article
    if (article.source_url) {
        const sourceHtml = `
            <div class="source-attribution" style="margin-top: 40px; padding: 25px; background: var(--light-card); border-radius: 12px; border-left: 4px solid var(--pickleball-blue);">
                <p style="margin-bottom: 15px; color: var(--text-light); font-style: italic;">
                    This article was originally published by <strong>${article.source_name || 'the original source'}</strong>. 
                </p>
                <a href="${article.source_url}" target="_blank" class="admin-btn" style="display: inline-block; text-decoration: none;">
                    Read Full Article at Source →
                </a>
            </div>
        `;
        document.getElementById('article-body').innerHTML += sourceHtml;
    }

    window.scrollTo(0, 0);
}

// Listen for data refreshes from auto-refresh.js
window.addEventListener('pickleball-data-refreshed', (e) => {
    if (e.detail.type === 'articles') {
        console.log('🔄 Articles refreshed, updating UI...');
        renderArticles();
    }
});

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
    // Force a clear of articles on load to ensure we get the latest from JSON
    // but ONLY if it's been more than an hour since last refresh
    initDefaultArticles();
    renderArticles();
    initAuth();
});

console.log('🎨 CMS loaded successfully!');
