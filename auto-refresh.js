// Auto-refresh functionality for The Court Report

// Configuration
const REFRESH_CONFIG = {
    rankings: {
        enabled: true,
        intervalHours: 24, // Refresh every 24 hours
        apiUrl: null // Set to your API endpoint if you have one
    },
    tournaments: {
        enabled: true,
        intervalHours: 24,
        apiUrl: null
    },
    articles: {
        enabled: false, // Articles are manually managed via CMS
        intervalHours: 0,
        apiUrl: null
    }
};

// Check if data needs refresh
function needsRefresh(lastRefreshKey, intervalHours) {
    const lastRefresh = localStorage.getItem(lastRefreshKey);
    
    if (!lastRefresh) {
        return true; // Never refreshed before
    }
    
    const lastRefreshTime = new Date(lastRefresh);
    const now = new Date();
    const hoursSinceRefresh = (now - lastRefreshTime) / (1000 * 60 * 60);
    
    return hoursSinceRefresh >= intervalHours;
}

// Mark data as refreshed
function markRefreshed(lastRefreshKey) {
    localStorage.setItem(lastRefreshKey, new Date().toISOString());
}

// Fetch fresh data from API (if configured)
async function fetchFreshData(type) {
    const config = REFRESH_CONFIG[type];
    
    if (!config || !config.apiUrl) {
        console.log(`No API configured for ${type}. Using default data.`);
        return null;
    }
    
    try {
        const response = await fetch(config.apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch ${type} data:`, error);
        return null;
    }
}

// Refresh rankings data
async function refreshRankings() {
    if (!REFRESH_CONFIG.rankings.enabled) return;
    
    if (!needsRefresh('rankings_last_refresh', REFRESH_CONFIG.rankings.intervalHours)) {
        console.log('Rankings data is fresh. Skipping refresh.');
        return;
    }
    
    console.log('Refreshing rankings data...');
    
    // Try to fetch from API
    const freshData = await fetchFreshData('rankings');
    
    if (freshData) {
        localStorage.setItem('rankings', JSON.stringify(freshData));
        console.log('Rankings updated from API');
    } else {
        // Simulate rank changes in default data (for demo purposes)
        const rankings = JSON.parse(localStorage.getItem('rankings') || '{}');
        
        // Add some randomness to rank changes
        Object.keys(rankings).forEach(category => {
            if (Array.isArray(rankings[category])) {
                rankings[category].forEach(player => {
                    // Random rank change between -2 and +2
                    player.change = Math.floor(Math.random() * 5) - 2;
                });
            }
        });
        
        localStorage.setItem('rankings', JSON.stringify(rankings));
        console.log('Rankings updated with simulated changes');
    }
    
    markRefreshed('rankings_last_refresh');
}

// Refresh tournaments data
async function refreshTournaments() {
    if (!REFRESH_CONFIG.tournaments.enabled) return;
    
    if (!needsRefresh('tournaments_last_refresh', REFRESH_CONFIG.tournaments.intervalHours)) {
        console.log('Tournaments data is fresh. Skipping refresh.');
        return;
    }
    
    console.log('Refreshing tournaments data...');
    
    // Try to fetch from API
    const freshData = await fetchFreshData('tournaments');
    
    if (freshData) {
        localStorage.setItem('tournaments', JSON.stringify(freshData));
        console.log('Tournaments updated from API');
    } else {
        // Move past tournaments if dates have passed
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '{"upcoming":[],"past":[]}');
        const now = new Date();
        
        // Check if any upcoming tournaments should be moved to past
        const stillUpcoming = [];
        tournaments.upcoming.forEach(tournament => {
            const endDate = new Date(tournament.date.split(' to ')[1] || tournament.date);
            if (endDate > now) {
                stillUpcoming.push(tournament);
            } else {
                // Move to past (would need real results in production)
                console.log(`Tournament "${tournament.name}" has ended. Moving to past.`);
            }
        });
        
        tournaments.upcoming = stillUpcoming;
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
        console.log('Tournaments updated (dates checked)');
    }
    
    markRefreshed('tournaments_last_refresh');
}

// Refresh all enabled data sources
async function refreshAll() {
    console.log('🔄 Starting auto-refresh check...');
    
    await refreshRankings();
    await refreshTournaments();
    
    console.log('✅ Auto-refresh complete');
    
    // Update last check time
    localStorage.setItem('last_auto_refresh', new Date().toISOString());
}

// Get refresh status
function getRefreshStatus() {
    const status = {
        lastRefresh: localStorage.getItem('last_auto_refresh'),
        rankings: {
            lastRefresh: localStorage.getItem('rankings_last_refresh'),
            nextRefresh: null
        },
        tournaments: {
            lastRefresh: localStorage.getItem('tournaments_last_refresh'),
            nextRefresh: null
        }
    };
    
    // Calculate next refresh times
    if (status.rankings.lastRefresh) {
        const next = new Date(status.rankings.lastRefresh);
        next.setHours(next.getHours() + REFRESH_CONFIG.rankings.intervalHours);
        status.rankings.nextRefresh = next.toISOString();
    }
    
    if (status.tournaments.lastRefresh) {
        const next = new Date(status.tournaments.lastRefresh);
        next.setHours(next.getHours() + REFRESH_CONFIG.tournaments.intervalHours);
        status.tournaments.nextRefresh = next.toISOString();
    }
    
    return status;
}

// Force manual refresh
function forceRefresh() {
    localStorage.removeItem('rankings_last_refresh');
    localStorage.removeItem('tournaments_last_refresh');
    return refreshAll();
}

// Initialize auto-refresh on page load
document.addEventListener('DOMContentLoaded', () => {
    // Run initial refresh check
    refreshAll();
    
    // Set up periodic checks (every hour)
    setInterval(() => {
        refreshAll();
    }, 60 * 60 * 1000); // 1 hour
});

// Expose functions globally for manual control
window.pickleballRefresh = {
    refreshAll,
    forceRefresh,
    getStatus: getRefreshStatus,
    config: REFRESH_CONFIG
};

console.log('🔄 Auto-refresh system loaded');
console.log('💡 Use window.pickleballRefresh.forceRefresh() to manually refresh data');
console.log('💡 Use window.pickleballRefresh.getStatus() to check refresh status');
