// Rankings data and functionality

// Initialize default rankings if none exist
function initDefaultRankings() {
    if (!localStorage.getItem('rankings')) {
        const defaultRankings = {
            mensSingles: [
                { rank: 1, name: "Ben Johns", country: "USA", points: 2847, age: 24, change: 0 },
                { rank: 2, name: "Federico Staksrud", country: "USA", points: 2691, age: 22, change: 1 },
                { rank: 3, name: "JW Johnson", country: "USA", points: 2634, age: 26, change: -1 },
                { rank: 4, name: "Tyson McGuffin", country: "USA", points: 2489, age: 34, change: 0 },
                { rank: 5, name: "Dylan Frazier", country: "USA", points: 2421, age: 25, change: 2 },
                { rank: 6, name: "Jay Devilliers", country: "USA", points: 2378, age: 28, change: -1 },
                { rank: 7, name: "Connor Garnett", country: "USA", points: 2334, age: 24, change: 1 },
                { rank: 8, name: "Rafa Hewett", country: "USA", points: 2287, age: 21, change: -2 },
                { rank: 9, name: "Hunter Johnson", country: "USA", points: 2245, age: 29, change: 0 },
                { rank: 10, name: "Collin Johns", country: "USA", points: 2198, age: 26, change: 0 }
            ],
            womensSingles: [
                { rank: 1, name: "Anna Leigh Waters", country: "USA", points: 2921, age: 17, change: 0 },
                { rank: 2, name: "Catherine Parenteau", country: "CAN", points: 2756, age: 31, change: 0 },
                { rank: 3, name: "Anna Bright", country: "USA", points: 2689, age: 24, change: 1 },
                { rank: 4, name: "Lea Jansen", country: "USA", points: 2634, age: 28, change: -1 },
                { rank: 5, name: "Salome Devidze", country: "GEO", points: 2567, age: 25, change: 0 },
                { rank: 6, name: "Callie Smith", country: "USA", points: 2498, age: 32, change: 2 },
                { rank: 7, name: "Mary Brascia", country: "USA", points: 2445, age: 26, change: -1 },
                { rank: 8, name: "Rachel Rohrabacher", country: "USA", points: 2389, age: 29, change: 1 },
                { rank: 9, name: "Etta Wright", country: "USA", points: 2334, age: 23, change: -2 },
                { rank: 10, name: "Jorja Johnson", country: "USA", points: 2287, age: 27, change: 0 }
            ],
            mensDoubles: [
                { rank: 1, name: "Ben Johns / Collin Johns", country: "USA", points: 3124, age: "24/26", change: 0 },
                { rank: 2, name: "Dylan Frazier / JW Johnson", country: "USA", points: 2987, age: "25/26", change: 0 },
                { rank: 3, name: "Federico Staksrud / Jay Devilliers", country: "USA", points: 2845, age: "22/28", change: 1 },
                { rank: 4, name: "Tyson McGuffin / Connor Garnett", country: "USA", points: 2778, age: "34/24", change: -1 },
                { rank: 5, name: "Rafa Hewett / Hunter Johnson", country: "USA", points: 2689, age: "21/29", change: 0 },
                { rank: 6, name: "Riley Newman / Matt Wright", country: "USA", points: 2634, age: "30/28", change: 1 },
                { rank: 7, name: "AJ Koller / Pablo Tellez", country: "USA/MEX", points: 2567, age: "27/29", change: -1 },
                { rank: 8, name: "Christian Alshon / Hayden Patriquin", country: "USA/CAN", points: 2498, age: "28/25", change: 0 },
                { rank: 9, name: "James Ignatowich / Dekel Bar", country: "USA/ISR", points: 2445, age: "26/24", change: 2 },
                { rank: 10, name: "Gabe Tardio / Quang Duong", country: "USA", points: 2389, age: "31/27", change: -1 }
            ],
            womensDoubles: [
                { rank: 1, name: "Anna Leigh Waters / Catherine Parenteau", country: "USA/CAN", points: 3267, age: "17/31", change: 0 },
                { rank: 2, name: "Anna Bright / Rachel Rohrabacher", country: "USA", points: 2998, age: "24/29", change: 0 },
                { rank: 3, name: "Lea Jansen / Jorja Johnson", country: "USA", points: 2876, age: "28/27", change: 0 },
                { rank: 4, name: "Salome Devidze / Callie Smith", country: "GEO/USA", points: 2789, age: "25/32", change: 1 },
                { rank: 5, name: "Mary Brascia / Etta Wright", country: "USA", points: 2712, age: "26/23", change: -1 },
                { rank: 6, name: "Meghan Dizon / Sarah Ansboury", country: "USA", points: 2645, age: "30/28", change: 0 },
                { rank: 7, name: "Susannah Barr / Jackie Kawamoto", country: "USA", points: 2567, age: "27/26", change: 1 },
                { rank: 8, name: "Vivienne David / Lindsey Newman", country: "USA", points: 2498, age: "29/31", change: -1 },
                { rank: 9, name: "Megan Fudge / Irina Tereschenko", country: "USA", points: 2445, age: "28/24", change: 0 },
                { rank: 10, name: "Lucy Kovalova / Jessie Irvine", country: "USA", points: 2389, age: "33/25", change: 0 }
            ],
            mixed: [
                { rank: 1, name: "Anna Leigh Waters / Ben Johns", country: "USA", points: 3456, age: "17/24", change: 0 },
                { rank: 2, name: "Catherine Parenteau / Riley Newman", country: "CAN/USA", points: 3198, age: "31/30", change: 0 },
                { rank: 3, name: "Anna Bright / JW Johnson", country: "USA", points: 3089, age: "24/26", change: 0 },
                { rank: 4, name: "Lea Jansen / Dylan Frazier", country: "USA", points: 2967, age: "28/25", change: 1 },
                { rank: 5, name: "Rachel Rohrabacher / Hunter Johnson", country: "USA", points: 2876, age: "29/29", change: -1 },
                { rank: 6, name: "Mary Brascia / Jay Devilliers", country: "USA", points: 2789, age: "26/28", change: 0 },
                { rank: 7, name: "Jorja Johnson / Federico Staksrud", country: "USA", points: 2712, age: "27/22", change: 2 },
                { rank: 8, name: "Salome Devidze / Pablo Tellez", country: "GEO/MEX", points: 2645, age: "25/29", change: -1 },
                { rank: 9, name: "Callie Smith / Tyson McGuffin", country: "USA", points: 2589, age: "32/34", change: 1 },
                { rank: 10, name: "Etta Wright / Connor Garnett", country: "USA", points: 2534, age: "23/24", change: -2 }
            ],
            seniors50: [
                { rank: 1, name: "Mark Renneson", country: "CAN", points: 2345, age: 52, change: 0 },
                { rank: 2, name: "Steve Paranto", country: "USA", points: 2289, age: 55, change: 0 },
                { rank: 3, name: "Tom Sather", country: "USA", points: 2234, age: 51, change: 0 },
                { rank: 4, name: "Scott Moore", country: "USA", points: 2178, age: 53, change: 1 },
                { rank: 5, name: "Daniel Moore", country: "USA", points: 2123, age: 54, change: -1 },
                { rank: 6, name: "Mike Sleeth", country: "USA", points: 2067, age: 56, change: 0 },
                { rank: 7, name: "Rob Cassidy", country: "USA", points: 2012, age: 52, change: 0 },
                { rank: 8, name: "Eric Roddy", country: "USA", points: 1956, age: 51, change: 0 },
                { rank: 9, name: "Paul Olin", country: "USA", points: 1901, age: 58, change: 0 },
                { rank: 10, name: "Jeff Warnick", country: "USA", points: 1845, age: 50, change: 0 }
            ],
            juniors: [
                { rank: 1, name: "Anna Leigh Waters", country: "USA", points: 2921, age: 17, change: 0 },
                { rank: 2, name: "Catherine Parenteau", country: "CAN", points: 2456, age: 18, change: 0 },
                { rank: 3, name: "Jack Foster", country: "USA", points: 2389, age: 16, change: 1 },
                { rank: 4, name: "Meghan Harwick", country: "USA", points: 2334, age: 17, change: -1 },
                { rank: 5, name: "Rafa Hewett", country: "USA", points: 2287, age: 19, change: 0 },
                { rank: 6, name: "Kate Fahey", country: "USA", points: 2234, age: 16, change: 0 },
                { rank: 7, name: "Tyler Loong", country: "USA", points: 2178, age: 18, change: 1 },
                { rank: 8, name: "Ava Ignatowich", country: "USA", points: 2123, age: 15, change: -1 },
                { rank: 9, name: "Maxwell Mantey", country: "USA", points: 2067, age: 17, change: 0 },
                { rank: 10, name: "Emma Sakas", country: "USA", points: 2012, age: 16, change: 0 }
            ]
        };

        localStorage.setItem('rankings', JSON.stringify(defaultRankings));
    }
}

// Get rankings by category
function getRankings(category = 'mensSingles') {
    const rankings = localStorage.getItem('rankings');
    const allRankings = rankings ? JSON.parse(rankings) : {};
    return allRankings[category] || [];
}

// Save rankings
function saveRankings(allRankings) {
    localStorage.setItem('rankings', JSON.stringify(allRankings));
}

// Render rankings table
function renderRankings(category = 'mensSingles') {
    const rankings = getRankings(category);
    const container = document.getElementById('rankings-table');

    if (!rankings.length) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 40px;">No rankings data available.</p>';
        return;
    }

    container.innerHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--neon-cyan); color: var(--neon-cyan);">
                        <th style="padding: 15px; text-align: left;">Rank</th>
                        <th style="padding: 15px; text-align: left;">Player(s)</th>
                        <th style="padding: 15px; text-align: left;">Country</th>
                        <th style="padding: 15px; text-align: center;">Age</th>
                        <th style="padding: 15px; text-align: center;">Points</th>
                        <th style="padding: 15px; text-align: center;">Change</th>
                    </tr>
                </thead>
                <tbody>
                    ${rankings.map((p, index) => {
        const name = p.name || p.player || p.team || 'Unknown Player';
        const age = p.age || '—';
        const changeIcon = p.change > 0 ? '↑' : p.change < 0 ? '↓' : '–';
        const changeColor = p.change > 0 ? 'var(--neon-green)' : p.change < 0 ? '#ff0055' : 'var(--text-light)';
        const rowBg = index % 2 === 0 ? 'var(--dark-card)' : 'var(--dark-bg)';

        return `
                            <tr style="background: ${rowBg}; border-bottom: 1px solid var(--dark-border); transition: all 0.3s;" 
                                onmouseover="this.style.background='rgba(0, 255, 255, 0.1)'" 
                                onmouseout="this.style.background='${rowBg}'">
                                <td style="padding: 15px; font-weight: bold; color: var(--neon-cyan); text-shadow: 0 0 5px var(--neon-cyan);">
                                    #${p.rank}
                                </td>
                                <td style="padding: 15px; color: var(--text); font-weight: 500;">
                                    ${name}
                                </td>
                                <td style="padding: 15px; color: var(--text-light);">
                                    ${p.country}
                                </td>
                                <td style="padding: 15px; text-align: center; color: var(--text-light);">
                                    ${age}
                                </td>
                                <td style="padding: 15px; text-align: center; color: var(--neon-pink); font-weight: bold;">
                                    ${p.points ? p.points.toLocaleString() : '0'}
                                </td>
                                <td style="padding: 15px; text-align: center; color: ${changeColor}; font-weight: bold;">
                                    ${changeIcon} ${Math.abs(p.change || 0)}
                                </td>
                            </tr>
                        `;
    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Switch ranking category
function switchRanking(category) {
    // Update active button
    document.querySelectorAll('.ranking-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update title
    const titles = {
        mensSingles: "Men's Singles",
        womensSingles: "Women's Singles",
        mensDoubles: "Men's Doubles",
        womensDoubles: "Women's Doubles",
        mixed: "Mixed Doubles",
        seniors50: "Seniors 50+",
        juniors: "Juniors (Under 19)"
    };

    document.getElementById('ranking-title').textContent = titles[category] || "Rankings";

    // Render rankings
    renderRankings(category);
}

// Show rankings view
function showRankings(e) {
    if (e) e.preventDefault();
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('article-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('tournaments-view').classList.add('hidden');
    document.getElementById('rankings-view').classList.remove('hidden');

    // Render default category
    renderRankings('mensSingles');

    window.scrollTo(0, 0);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDefaultRankings();
});

console.log('🏆 Rankings system loaded successfully!');
