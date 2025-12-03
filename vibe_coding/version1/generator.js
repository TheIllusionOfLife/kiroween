// 90s Website Generator
const form = document.getElementById('websiteForm');
const preview = document.getElementById('preview');
const previewFrame = document.getElementById('previewFrame');
const newSiteBtn = document.getElementById('newSite');

const themes = {
    neon: {
        bg: 'linear-gradient(45deg, #ff00ff, #00ffff)',
        textColor: '#ffff00',
        headerBg: '#ff00ff',
        linkColor: '#00ff00',
        pattern: ''
    },
    space: {
        bg: 'radial-gradient(circle, #000033, #000000)',
        textColor: '#ffffff',
        headerBg: '#ff6600',
        linkColor: '#00ccff',
        pattern: ''
    },
    rainbow: {
        bg: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
        textColor: '#ffffff',
        headerBg: '#ff1493',
        linkColor: '#ffff00',
        pattern: ''
    },
    matrix: {
        bg: 'linear-gradient(180deg, #001100, #003300)',
        textColor: '#00ff00',
        headerBg: '#003300',
        linkColor: '#00ff00',
        pattern: ''
    },
    geocities: {
        bg: '#008080',
        textColor: '#ffff00',
        headerBg: '#800080',
        linkColor: '#00ffff',
        pattern: 'repeating-linear-gradient(45deg, #008080 0px, #008080 10px, #006666 10px, #006666 20px)'
    },
    angelfire: {
        bg: '#000080',
        textColor: '#ffffff',
        headerBg: '#ff0000',
        linkColor: '#ffff00',
        pattern: 'radial-gradient(circle at 20% 50%, transparent 0%, transparent 10%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 11%, transparent 11%), radial-gradient(circle at 60% 80%, transparent 0%, transparent 10%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 11%, transparent 11%)'
    }
};

const funFacts = [
    "The first website was created in 1991!",
    "GeoCities was the 3rd most visited site in 1999!",
    "The dancing baby GIF is from 1996!",
    "Netscape Navigator once had 90% market share!",
    "The <blink> tag was considered a feature!",
    "AOL sent out millions of free trial CDs!",
    "Dial-up modems made that iconic sound!",
    "Web rings were the original social networks!"
];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateWebsite();
});

newSiteBtn.addEventListener('click', () => {
    preview.style.display = 'none';
    form.reset();
});

function generateWebsite() {
    const name = document.getElementById('name').value;
    const hobby = document.getElementById('hobby').value;
    const email = document.getElementById('email').value;
    const theme = themes[document.getElementById('theme').value];
    const addMusic = document.getElementById('addMusic').checked;
    const addCursor = document.getElementById('addCursor').checked;
    const addGifs = document.getElementById('addGifs').checked;
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${name}'s Awesome Homepage!</title>
    <style>
        body {
            background: ${theme.bg};
            ${theme.pattern ? `background-image: ${theme.pattern};` : ''}
            color: ${theme.textColor};
            font-family: 'Comic Sans MS', cursive;
            margin: 0;
            padding: 20px;
            animation: bgPulse 5s infinite;
            ${addCursor ? 'cursor: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Ctext y=\'15\' font-size=\'15\'%3E✨%3C/text%3E%3C/svg%3E"), auto;' : ''}
        }
        
        @keyframes bgPulse {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            background: ${theme.headerBg};
            border: 5px ridge gold;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 0 30px rgba(255, 255, 0, 0.5);
            animation: headerBounce 2s infinite;
        }
        
        @keyframes headerBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        h1 {
            font-size: 3em;
            text-shadow: 3px 3px 0 #000, -1px -1px 0 #000;
            margin: 0;
            animation: textRainbow 3s linear infinite;
        }
        
        @keyframes textRainbow {
            0% { color: red; }
            16% { color: orange; }
            33% { color: yellow; }
            50% { color: green; }
            66% { color: blue; }
            83% { color: indigo; }
            100% { color: red; }
        }
        
        .content {
            background: rgba(255, 255, 255, 0.9);
            color: #000;
            border: 5px outset #0080ff;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.5);
        }
        
        .blink {
            animation: blink 1s step-start infinite;
        }
        
        @keyframes blink {
            50% { opacity: 0; }
        }
        
        .marquee {
            background: #ffff00;
            color: #ff0000;
            padding: 10px;
            border: 3px solid #000;
            margin: 20px 0;
            font-weight: bold;
            overflow: hidden;
        }
        
        .marquee-text {
            display: inline-block;
            animation: scroll 10s linear infinite;
            white-space: nowrap;
        }
        
        @keyframes scroll {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
        }
        
        a {
            color: ${theme.linkColor};
            text-decoration: none;
            font-weight: bold;
            text-shadow: 1px 1px 0 #000;
        }
        
        a:hover {
            text-decoration: underline;
            animation: shake 0.5s infinite;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        
        .counter {
            text-align: center;
            margin: 20px 0;
            font-size: 1.2em;
        }
        
        .gif-section {
            text-align: center;
            margin: 20px 0;
        }
        
        .construction {
            font-size: 2em;
            text-align: center;
            margin: 20px 0;
        }
        
        .guestbook {
            background: #ffffcc;
            border: 3px dashed #ff00ff;
            padding: 15px;
            margin: 20px 0;
        }
        
        .webring {
            background: #ccccff;
            border: 3px double #0000ff;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
        }
        
        .gif-divider {
            text-align: center;
            font-size: 2em;
            margin: 20px 0;
            animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .badge-section {
            text-align: center;
            margin: 20px 0;
        }
        
        .badge {
            display: inline-block;
            background: #000;
            color: #0f0;
            border: 2px solid #0f0;
            padding: 5px 10px;
            margin: 5px;
            font-family: 'Courier New', monospace;
            font-size: 0.8em;
        }
        
        .fun-fact {
            background: #ffff99;
            border: 3px dotted #ff00ff;
            padding: 15px;
            margin: 20px 0;
            font-style: italic;
        }
        
        .hit-counter {
            background: #000;
            color: #ff0000;
            font-family: 'Courier New', monospace;
            padding: 10px;
            display: inline-block;
            border: 3px outset #666;
            letter-spacing: 3px;
            font-size: 1.5em;
            font-weight: bold;
        }
        
        ${addCursor ? `
        * {
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ctext y='15' font-size='15'%3E✨%3C/text%3E%3C/svg%3E"), auto !important;
        }
        ` : ''}
    </style>
</head>
<body>
    ${addMusic ? '<audio autoplay loop><source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" type="audio/wav"></audio>' : ''}
    ${addMusic ? '<div style="position: fixed; top: 10px; right: 10px; background: #ffff00; padding: 10px; border: 3px outset #000; z-index: 9999;">🎵 MIDI Music Playing! 🎵</div>' : ''}
    <div class="container">
        <div class="header">
            <h1>🌟 Welcome to ${name}'s Homepage! 🌟</h1>
            <p class="blink">✨ UNDER CONSTRUCTION ✨</p>
        </div>
        
        <div class="marquee">
            <div class="marquee-text">
                ⭐ YOU ARE VISITOR #${Math.floor(Math.random() * 99999)} ⭐ 
                BEST VIEWED IN NETSCAPE NAVIGATOR ⭐ 
                OPTIMIZED FOR 800x600 ⭐
            </div>
        </div>
        
        ${addGifs ? '<div class="gif-divider">💀 ⚡ 🔥 ⚡ 💀</div>' : ''}
        
        <div class="content">
            <h2>👋 About Me</h2>
            <p>Hi! My name is <strong>${name}</strong> and this is my personal homepage on the World Wide Web!</p>
            <p>I love <strong>${hobby}</strong> and I made this site to share my interests with the world!</p>
            
            ${addGifs ? '<div class="construction">🚧 👷 🚧 👷 🚧</div>' : '<div class="construction">🚧 👷 🚧</div>'}
            
            <div class="fun-fact">
                <strong>💡 DID YOU KNOW?</strong><br>
                ${randomFact}
            </div>
            
            <h2>🎨 My Interests</h2>
            <ul>
                <li>${hobby}</li>
                <li>Surfing the Information Superhighway</li>
                <li>Collecting animated GIFs</li>
                <li>Making cool websites</li>
                <li>Listening to my favorite MP3s</li>
            </ul>
            
            ${addGifs ? '<div class="gif-divider">⭐ 🌟 ✨ 🌟 ⭐</div>' : ''}
            
            <h2>🔗 Cool Links</h2>
            <p><a href="#">My GeoCities Neighborhood</a></p>
            <p><a href="#">Sign My Guestbook!</a></p>
            <p><a href="#">View My Guestbook</a></p>
            <p><a href="#">My Favorite Links</a></p>
            <p><a href="#">Download Winamp Skins</a></p>
            <p><a href="#">My ICQ Number: ${Math.floor(Math.random() * 999999999)}</a></p>
            
            ${email ? `
            <h2>📧 Contact Me</h2>
            <p>Email me at: <a href="mailto:${email}">${email}</a></p>
            <p class="blink">⚡ I check my email every day! ⚡</p>
            ` : ''}
        </div>
        
        ${addGifs ? '<div class="gif-divider">🎨 🖌️ 🎨 🖌️ 🎨</div>' : ''}
        
        <div class="badge-section">
            <div class="badge">NETSCAPE NOW!</div>
            <div class="badge">IE 4.0 READY</div>
            <div class="badge">800x600</div>
            <div class="badge">MIDI ENABLED</div>
            <div class="badge">FRAMES FREE</div>
            <div class="badge">JAVA POWERED</div>
        </div>
        
        <div class="guestbook">
            <h3>📝 Sign My Guestbook!</h3>
            <p>Please sign my guestbook and let me know you were here!</p>
            <p><em>(Guestbook coming soon...)</em></p>
            <p class="blink">⚡ Be the first to sign! ⚡</p>
        </div>
        
        <div class="webring">
            <h3>🔗 This site is part of the ${hobby} WebRing! 🔗</h3>
            <p>
                <a href="#">&lt;&lt; Previous</a> | 
                <a href="#">Random</a> | 
                <a href="#">Next &gt;&gt;</a>
            </p>
        </div>
        
        ${addGifs ? '<div class="gif-divider">🎉 🎊 🎈 🎊 🎉</div>' : ''}
        
        <div class="counter">
            <p>You are visitor number:</p>
            <div class="hit-counter">
                ${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}
            </div>
            <p style="margin-top: 10px;"><em>Counter started: January 1, 1996</em></p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; font-size: 0.9em;">
            ${addGifs ? '<p style="font-size: 2em;">🌈 ⚡ 💫 ⚡ 🌈</p>' : ''}
            <p>Last updated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p class="blink">⭐ Best viewed with Internet Explorer 4.0 or Netscape Navigator 3.0 ⭐</p>
            <p class="blink">💾 Download required: RealPlayer, Flash Player, Shockwave 💾</p>
            <p>This page is optimized for 56k modems</p>
            <p>© ${new Date().getFullYear()} ${name}. All rights reserved.</p>
            <p style="margin-top: 15px;">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23000' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%230f0' font-family='monospace' font-size='12'%3EGeoCities%3C/text%3E%3C/svg%3E" alt="GeoCities" style="margin: 5px;">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23ff0000' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23fff' font-family='Arial' font-size='10' font-weight='bold'%3EAngelfire%3C/text%3E%3C/svg%3E" alt="Angelfire" style="margin: 5px;">
            </p>
        </div>
    </div>
</body>
</html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    previewFrame.src = url;
    preview.style.display = 'block';
    preview.scrollIntoView({ behavior: 'smooth' });
}
