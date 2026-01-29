// Visual refresh indicator for the UI

// Add refresh status to footer
function addRefreshIndicator() {
    const footer = document.querySelector('footer .container');
    if (!footer) return;
    
    const indicator = document.createElement('div');
    indicator.id = 'refresh-indicator';
    indicator.style.cssText = `
        text-align: center;
        padding: 20px 0 10px;
        border-top: 1px solid var(--dark-border);
        margin-top: 20px;
    `;
    
    const statusText = document.createElement('p');
    statusText.id = 'refresh-status-text';
    statusText.style.cssText = `
        color: var(--text-light);
        font-size: 13px;
        margin-bottom: 10px;
    `;
    
    const refreshBtn = document.createElement('button');
    refreshBtn.id = 'manual-refresh-btn';
    refreshBtn.innerHTML = '🔄 Refresh Data Now';
    refreshBtn.style.cssText = `
        background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
    `;
    
    refreshBtn.onmouseover = function() {
        this.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.5)';
        this.style.transform = 'translateY(-2px)';
    };
    
    refreshBtn.onmouseout = function() {
        this.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.3)';
        this.style.transform = 'translateY(0)';
    };
    
    refreshBtn.onclick = async function() {
        this.disabled = true;
        this.innerHTML = '⏳ Refreshing...';
        this.style.opacity = '0.6';
        
        try {
            await window.pickleballRefresh.forceRefresh();
            this.innerHTML = '✅ Refreshed!';
            updateRefreshStatus();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.disabled = false;
                this.innerHTML = '🔄 Refresh Data Now';
                this.style.opacity = '1';
            }, 2000);
        } catch (error) {
            this.innerHTML = '❌ Failed';
            this.disabled = false;
            this.style.opacity = '1';
        }
    };
    
    indicator.appendChild(statusText);
    indicator.appendChild(refreshBtn);
    
    // Insert before footer-bottom
    const footerBottom = footer.querySelector('.footer-bottom');
    if (footerBottom) {
        footer.insertBefore(indicator, footerBottom);
    } else {
        footer.appendChild(indicator);
    }
    
    // Initial status update
    updateRefreshStatus();
}

// Update refresh status text
function updateRefreshStatus() {
    const statusText = document.getElementById('refresh-status-text');
    if (!statusText) return;
    
    const status = window.pickleballRefresh?.getStatus();
    if (!status) {
        statusText.innerHTML = 'Auto-refresh not available';
        return;
    }
    
    const lastRefresh = status.lastRefresh ? new Date(status.lastRefresh) : null;
    
    if (lastRefresh) {
        const now = new Date();
        const hoursSince = Math.floor((now - lastRefresh) / (1000 * 60 * 60));
        const minutesSince = Math.floor((now - lastRefresh) / (1000 * 60));
        
        let timeAgo;
        if (hoursSince > 0) {
            timeAgo = `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`;
        } else if (minutesSince > 0) {
            timeAgo = `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`;
        } else {
            timeAgo = 'just now';
        }
        
        statusText.innerHTML = `
            📊 Last data check: ${timeAgo} • 
            Auto-refresh: Every 24 hours
        `;
    } else {
        statusText.innerHTML = '📊 Data check: Ready • Auto-refresh: Every 24 hours';
    }
}

// Add indicator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(addRefreshIndicator, 500); // Wait for footer to render
    });
} else {
    setTimeout(addRefreshIndicator, 500);
}

// Update status every minute
setInterval(updateRefreshStatus, 60000);

console.log('💡 Refresh indicator added to footer');
