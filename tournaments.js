// Tournaments data and functionality

// Initialize default tournaments if none exist
function initDefaultTournaments() {
    if (!localStorage.getItem('tournaments')) {
        const defaultTournaments = {
            upcoming: [
                {
                    id: 'ppa-miami-2026',
                    name: 'PPA Miami Open',
                    date: '2026-02-14 to 2026-02-16',
                    location: 'Miami, Florida, USA',
                    venue: 'Hard Rock Stadium',
                    prize: '$250,000',
                    description: 'The PPA Tour kicks off its 2026 season in Miami with expanded draws and increased prize money. Features men\'s and women\'s singles, doubles, and mixed doubles.',
                    link: 'https://ppatour.com/miami-open',
                    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    category: 'PPA'
                },
                {
                    id: 'mlp-orlando-2026',
                    name: 'MLP Orlando Premier',
                    date: '2026-02-21 to 2026-02-23',
                    location: 'Orlando, Florida, USA',
                    venue: 'Orange County Convention Center',
                    prize: '$500,000',
                    description: 'Major League Pickleball returns to Orlando for the first premier event of 2026. Team-based competition featuring the top 12 franchises.',
                    link: 'https://majorleaguepickleball.com/orlando',
                    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    category: 'MLP'
                },
                {
                    id: 'us-open-2026',
                    name: 'US Open Pickleball Championships',
                    date: '2026-04-18 to 2026-04-26',
                    location: 'Naples, Florida, USA',
                    venue: 'East Naples Community Park',
                    prize: '$400,000',
                    description: 'The largest pickleball tournament in the world returns for its 10th anniversary. Over 3,000 players competing across all age and skill divisions.',
                    link: 'https://usopenpickleballchampionships.com',
                    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    category: 'Major'
                },
                {
                    id: 'ppa-mesa-2026',
                    name: 'PPA Mesa Arizona Grand Slam',
                    date: '2026-03-07 to 2026-03-09',
                    location: 'Mesa, Arizona, USA',
                    venue: 'Bell Bank Park',
                    prize: '$300,000',
                    description: 'Second Grand Slam event of 2026, featuring extended match formats and the debut of the new collegiate showcase.',
                    link: 'https://ppatour.com/mesa-grand-slam',
                    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    category: 'PPA'
                },
                {
                    id: 'app-austin-2026',
                    name: 'APP Austin Open',
                    date: '2026-03-28 to 2026-03-30',
                    location: 'Austin, Texas, USA',
                    venue: 'Austin Sports Center',
                    prize: '$200,000',
                    description: 'The Association of Pickleball Professionals makes its Texas debut with a star-studded field and innovative tournament format.',
                    link: 'https://apptour.org/austin',
                    image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                    category: 'APP'
                },
                {
                    id: 'nationals-2026',
                    name: 'USA Pickleball National Championships',
                    date: '2026-11-02 to 2026-11-08',
                    location: 'Indian Wells, California, USA',
                    venue: 'Indian Wells Tennis Garden',
                    prize: '$350,000',
                    description: 'The premier amateur championship returns to Indian Wells. Featuring age and skill-based brackets with over 2,500 players expected.',
                    link: 'https://usapickleball.org/nationals',
                    image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    category: 'USA Pickleball'
                }
            ],
            past: [
                {
                    id: 'ppa-indoor-2026',
                    name: 'PPA Indoor National Championships',
                    date: '2026-01-24 to 2026-01-26',
                    location: 'Lakeville, Minnesota, USA',
                    venue: 'Lakeville Arena',
                    prize: '$200,000',
                    description: 'Indoor championship featuring climate-controlled play and a sell-out crowd.',
                    category: 'PPA',
                    results: {
                        mensSingles: { gold: 'Ben Johns', silver: 'Federico Staksrud', bronze: 'JW Johnson' },
                        womensSingles: { gold: 'Anna Leigh Waters', silver: 'Catherine Parenteau', bronze: 'Anna Bright' },
                        mensDoubles: { gold: 'Ben Johns / Collin Johns', silver: 'Dylan Frazier / JW Johnson', bronze: 'Tyson McGuffin / Connor Garnett' },
                        womensDoubles: { gold: 'Anna Leigh Waters / Catherine Parenteau', silver: 'Anna Bright / Rachel Rohrabacher', bronze: 'Lea Jansen / Jorja Johnson' },
                        mixed: { gold: 'Anna Leigh Waters / Ben Johns', silver: 'Catherine Parenteau / Riley Newman', bronze: 'Anna Bright / JW Johnson' }
                    },
                    highlights: [
                        'Ben Johns wins his 15th consecutive singles title',
                        'Anna Leigh Waters dominates with three gold medals',
                        'Record attendance of 8,500 fans over three days',
                        'New indoor court surface receives praise from players'
                    ]
                },
                {
                    id: 'mlp-premier-2025',
                    name: 'MLP Premier Level Finals',
                    date: '2025-12-15 to 2025-12-17',
                    location: 'Las Vegas, Nevada, USA',
                    venue: 'Mandalay Bay Convention Center',
                    prize: '$1,000,000',
                    description: 'Season-ending championship with the highest prize pool in pickleball history.',
                    category: 'MLP',
                    results: {
                        champion: 'New York Hustlers',
                        runnerUp: 'Texas Ranchers',
                        thirdPlace: 'Florida Smash',
                        mvp: 'Ben Johns (New York Hustlers)'
                    },
                    highlights: [
                        'New York Hustlers win their second MLP title',
                        'Championship match goes to deciding game',
                        'Record prize money distributed to 12 teams',
                        'Ben Johns named Finals MVP'
                    ]
                },
                {
                    id: 'app-vegas-2025',
                    name: 'APP Las Vegas Championships',
                    date: '2025-11-08 to 2025-11-10',
                    location: 'Las Vegas, Nevada, USA',
                    venue: 'Downtown Las Vegas Events Center',
                    prize: '$300,000',
                    description: 'Final APP event of 2025 featuring outdoor night matches under the lights.',
                    category: 'APP',
                    results: {
                        mensSingles: { gold: 'Federico Staksrud', silver: 'Dylan Frazier', bronze: 'Ben Johns' },
                        womensSingles: { gold: 'Catherine Parenteau', silver: 'Anna Leigh Waters', bronze: 'Lea Jansen' },
                        mensDoubles: { gold: 'Dylan Frazier / JW Johnson', silver: 'Ben Johns / Collin Johns', bronze: 'Riley Newman / Matt Wright' },
                        womensDoubles: { gold: 'Anna Bright / Rachel Rohrabacher', silver: 'Anna Leigh Waters / Catherine Parenteau', bronze: 'Lea Jansen / Jorja Johnson' },
                        mixed: { gold: 'Catherine Parenteau / Riley Newman', silver: 'Anna Leigh Waters / Ben Johns', bronze: 'Lea Jansen / Dylan Frazier' }
                    },
                    highlights: [
                        'Federico Staksrud upsets Ben Johns in singles final',
                        'First night championship matches in APP history',
                        'Catherine Parenteau wins two gold medals',
                        'Dramatic five-game mixed doubles final'
                    ]
                },
                {
                    id: 'ppa-dallas-2025',
                    name: 'PPA Dallas Premier',
                    date: '2025-10-25 to 2025-10-27',
                    location: 'Dallas, Texas, USA',
                    venue: 'Fair Park Tennis Center',
                    prize: '$250,000',
                    description: 'Texas showdown featuring windy conditions and competitive play.',
                    category: 'PPA',
                    results: {
                        mensSingles: { gold: 'JW Johnson', silver: 'Ben Johns', bronze: 'Tyson McGuffin' },
                        womensSingles: { gold: 'Anna Leigh Waters', silver: 'Anna Bright', bronze: 'Catherine Parenteau' },
                        mensDoubles: { gold: 'Ben Johns / Collin Johns', silver: 'Federico Staksrud / Jay Devilliers', bronze: 'Dylan Frazier / JW Johnson' },
                        womensDoubles: { gold: 'Anna Leigh Waters / Catherine Parenteau', silver: 'Lea Jansen / Jorja Johnson', bronze: 'Anna Bright / Rachel Rohrabacher' },
                        mixed: { gold: 'Anna Leigh Waters / Ben Johns', silver: 'Anna Bright / JW Johnson', bronze: 'Lea Jansen / Dylan Frazier' }
                    },
                    highlights: [
                        'JW Johnson wins singles in upset over Ben Johns',
                        'Challenging wind conditions test player adaptability',
                        'Johns brothers remain undefeated in doubles',
                        'Anna Leigh Waters extends winning streak to 23 matches'
                    ]
                }
            ]
        };

        localStorage.setItem('tournaments', JSON.stringify(defaultTournaments));
    }
}

// Get tournaments by type
function getTournaments(type = 'upcoming') {
    const tournaments = localStorage.getItem('tournaments');
    const allTournaments = tournaments ? JSON.parse(tournaments) : { upcoming: [], past: [] };
    return allTournaments[type] || [];
}

// Render upcoming tournaments
function renderUpcomingTournaments() {
    const tournaments = getTournaments('upcoming');
    const container = document.getElementById('tournaments-content');

    if (!tournaments.length) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 40px;">No upcoming tournaments.</p>';
        return;
    }

    container.innerHTML = tournaments.map(tournament => `
        <div class="tournament-card" style="background: var(--light-card); border: 2px solid var(--light-border); border-radius: 12px; overflow: hidden; margin-bottom: 30px; transition: all 0.3s;" 
             onmouseover="this.style.borderColor='var(--pickleball-blue)'; this.style.boxShadow='0 8px 20px rgba(0, 0, 0, 0.12)'" 
             onmouseout="this.style.borderColor='var(--light-border)'; this.style.boxShadow='none'">
            <div style="background: ${tournament.image}; height: 180px; position: relative;">
                <span style="position: absolute; top: 15px; right: 15px; background: var(--pickleball-yellow); padding: 8px 16px; border-radius: 20px; color: var(--pickleball-navy); font-size: 12px; font-weight: 600; text-transform: uppercase;">
                    ${tournament.category}
                </span>
            </div>
            <div style="padding: 30px;">
                <h3 style="font-size: 24px; margin-bottom: 15px; color: var(--pickleball-navy); font-weight: 700;">
                    ${tournament.name}
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                    <div>
                        <p style="color: var(--text-light); font-size: 13px; margin-bottom: 5px;">📅 Date</p>
                        <p style="color: var(--text); font-weight: 500;">${tournament.date}</p>
                    </div>
                    <div>
                        <p style="color: var(--text-light); font-size: 13px; margin-bottom: 5px;">📍 Location</p>
                        <p style="color: var(--text); font-weight: 500;">${tournament.location}</p>
                    </div>
                    <div>
                        <p style="color: var(--text-light); font-size: 13px; margin-bottom: 5px;">🏟️ Venue</p>
                        <p style="color: var(--text); font-weight: 500;">${tournament.venue}</p>
                    </div>
                    <div>
                        <p style="color: var(--text-light); font-size: 13px; margin-bottom: 5px;">💰 Prize Money</p>
                        <p style="color: var(--pickleball-green); font-weight: bold;">${tournament.prize}</p>
                    </div>
                </div>
                
                <p style="color: var(--text-light); line-height: 1.6; margin-bottom: 20px;">
                    ${tournament.description}
                </p>
                
                <a href="${tournament.link}" target="_blank" style="display: inline-block; background: #0066cc; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s;" 
                   onmouseover="this.style.background='#0052a3'; this.style.transform='translateY(-2px)'" 
                   onmouseout="this.style.background='#0066cc'; this.style.transform='translateY(0)'">
                    Learn More & Register →
                </a>
            </div>
        </div>
    `).join('');
}

// Render past tournaments with results
function renderPastTournaments() {
    const tournaments = getTournaments('past');
    const container = document.getElementById('tournaments-content');

    if (!tournaments.length) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 40px;">No past tournaments.</p>';
        return;
    }

    container.innerHTML = tournaments.map(tournament => `
        <div class="tournament-card" style="background: var(--light-card); border: 2px solid var(--light-border); border-radius: 12px; padding: 30px; margin-bottom: 30px; transition: all 0.3s;" 
             onmouseover="this.style.borderColor='var(--pickleball-orange)'; this.style.boxShadow='0 8px 20px rgba(0, 0, 0, 0.12)'" 
             onmouseout="this.style.borderColor='var(--light-border)'; this.style.boxShadow='none'">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                <div>
                    <h3 style="font-size: 24px; margin-bottom: 10px; color: var(--pickleball-navy); font-weight: 700;">
                        ${tournament.name}
                    </h3>
                    <p style="color: var(--text-light); font-size: 14px;">${tournament.date} • ${tournament.location}</p>
                </div>
                <span style="background: var(--pickleball-orange); padding: 6px 14px; border-radius: 20px; color: white; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                    ${tournament.category}
                </span>
            </div>
            
            <p style="color: var(--text-light); line-height: 1.6; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid var(--light-border);">
                ${tournament.description}
            </p>
            
            ${tournament.results.mensSingles ? `
                <div style="margin-bottom: 25px;">
                    <h4 style="color: var(--pickleball-navy); font-size: 18px; margin-bottom: 15px; font-weight: 600;">🏆 Results</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div>
                            <p style="color: var(--text-light); font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Men's Singles</p>
                            <p style="color: var(--pickleball-green); font-weight: bold;">🥇 ${tournament.results.mensSingles.gold}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥈 ${tournament.results.mensSingles.silver}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥉 ${tournament.results.mensSingles.bronze}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-light); font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Women's Singles</p>
                            <p style="color: var(--pickleball-green); font-weight: bold;">🥇 ${tournament.results.womensSingles.gold}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥈 ${tournament.results.womensSingles.silver}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥉 ${tournament.results.womensSingles.bronze}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-light); font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Men's Doubles</p>
                            <p style="color: var(--pickleball-green); font-weight: bold;">🥇 ${tournament.results.mensDoubles.gold}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥈 ${tournament.results.mensDoubles.silver}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥉 ${tournament.results.mensDoubles.bronze}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-light); font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Women's Doubles</p>
                            <p style="color: var(--pickleball-green); font-weight: bold;">🥇 ${tournament.results.womensDoubles.gold}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥈 ${tournament.results.womensDoubles.silver}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥉 ${tournament.results.womensDoubles.bronze}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-light); font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Mixed Doubles</p>
                            <p style="color: var(--pickleball-green); font-weight: bold;">🥇 ${tournament.results.mixed.gold}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥈 ${tournament.results.mixed.silver}</p>
                            <p style="color: var(--text); margin-top: 5px;">🥉 ${tournament.results.mixed.bronze}</p>
                        </div>
                    </div>
                </div>
            ` : `
                <div style="margin-bottom: 25px;">
                    <h4 style="color: var(--pickleball-navy); font-size: 18px; margin-bottom: 15px; font-weight: 600;">🏆 Results</h4>
                    <div style="background: var(--light-bg); padding: 20px; border-radius: 8px; border: 2px solid var(--light-border);">
                        <p style="color: var(--pickleball-green); font-weight: bold; font-size: 18px; margin-bottom: 10px;">🏆 Champion: ${tournament.results.champion}</p>
                        <p style="color: var(--text); margin-bottom: 8px;">🥈 Runner-up: ${tournament.results.runnerUp}</p>
                        <p style="color: var(--text); margin-bottom: 15px;">🥉 Third Place: ${tournament.results.thirdPlace}</p>
                        <p style="color: var(--pickleball-blue); font-weight: bold;">⭐ MVP: ${tournament.results.mvp}</p>
                    </div>
                </div>
            `}
            
            ${tournament.highlights ? `
                <div>
                    <h4 style="color: var(--pickleball-green); font-size: 18px; margin-bottom: 15px; font-weight: 600;">✨ Highlights</h4>
                    <ul style="list-style: none; padding: 0;">
                        ${tournament.highlights.map(highlight => `
                            <li style="color: var(--text); padding: 10px 0; padding-left: 25px; position: relative; border-bottom: 1px solid var(--light-border);">
                                <span style="position: absolute; left: 0; color: var(--pickleball-green);">▸</span>
                                ${highlight}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Switch tournament view
function switchTournaments(type) {
    // Update active button
    document.querySelectorAll('.tournament-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update content
    if (type === 'upcoming') {
        renderUpcomingTournaments();
    } else {
        renderPastTournaments();
    }
}

// Show tournaments view
function showTournaments(e) {
    if (e) e.preventDefault();
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('article-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('rankings-view').classList.add('hidden');
    document.getElementById('tournaments-view').classList.remove('hidden');

    // Render upcoming by default
    renderUpcomingTournaments();

    // Reset active button
    document.querySelectorAll('.tournament-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.tournament-filter[onclick*="upcoming"]').classList.add('active');

    window.scrollTo(0, 0);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDefaultTournaments();
});

console.log('🏆 Tournaments system loaded successfully!');
