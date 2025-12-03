import { themes, funFacts } from "./themes";

export interface SiteConfig {
  name: string;
  hobby: string;
  email?: string;
  theme: string;
  addMusic: boolean;
  addCursor: boolean;
  addGifs: boolean;
  addPopups?: boolean;
  addRainbowText?: boolean;
  createdAt?: number;
}

export function generateSiteHTML(config: SiteConfig): string {
  const theme = themes[config.theme];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${config.name}'s Awesome Homepage!</title>
    <style>
        body {
            background: ${theme.bg};
            ${theme.pattern ? `background-image: ${theme.pattern};` : ""}
            ${theme.tiledBg ? `background-image: url("${theme.tiledBg}");` : ""}
            ${theme.tiledBg ? `background-repeat: repeat;` : ""}
            color: ${theme.textColor};
            font-family: 'Comic Sans MS', cursive;
            margin: 0;
            padding: 20px;
            animation: bgPulse 5s infinite;
            ${config.addCursor ? 'cursor: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Ctext y=\'15\' font-size=\'15\'%3E✨%3C/text%3E%3C/svg%3E"), auto;' : ""}
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
        
        .rainbow-text {
            background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        .divider {
            height: 10px;
            background: linear-gradient(90deg, transparent, #ff00ff, #00ffff, #ffff00, #ff00ff, transparent);
            margin: 20px 0;
            animation: shimmer 2s linear infinite;
        }
        
        @keyframes shimmer {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
        }
        
        .ascii-art {
            font-family: 'Courier New', monospace;
            white-space: pre;
            line-height: 1.2;
            font-size: 0.8em;
            text-align: center;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    ${config.addPopups ? `
    <script>
        window.addEventListener('load', function() {
            alert('🌟 Welcome to ${config.name}\\'s Awesome Homepage! 🌟');
        });
        window.addEventListener('beforeunload', function(e) {
            e.preventDefault();
            e.returnValue = 'Are you sure you want to leave this awesome site?';
            return 'Are you sure you want to leave this awesome site?';
        });
    </script>
    ` : ""}
    ${config.addMusic ? '<div style="position: fixed; top: 10px; right: 10px; background: #ffff00; padding: 10px; border: 3px outset #000; z-index: 9999;">🎵 MIDI Music Playing! 🎵</div>' : ""}
    <div class="container">
        <div class="header">
            <h1>🌟 Welcome to ${config.name}'s Homepage! 🌟</h1>
            <p class="blink">✨ UNDER CONSTRUCTION ✨</p>
        </div>
        
        <div class="marquee">
            <div class="marquee-text">
                ⭐ YOU ARE VISITOR #${Math.floor(Math.random() * 99999)} ⭐ 
                BEST VIEWED IN NETSCAPE NAVIGATOR ⭐ 
                OPTIMIZED FOR 800x600 ⭐
            </div>
        </div>
        
        ${config.addGifs ? '<div class="gif-divider">💀 ⚡ 🔥 ⚡ 💀</div>' : ""}
        <div class="divider"></div>
        
        <div class="content">
            <h2>👋 About Me</h2>
            <p>Hi! My name is <strong>${config.addRainbowText ? `<span class="rainbow-text">${config.name}</span>` : config.name}</strong> and this is my personal homepage on the World Wide Web!</p>
            <p>I love <strong>${config.hobby}</strong> and I made this site to share my interests with the world!</p>
            
            <div class="ascii-art">
   _____ _____ _____ 
  |  _  |  _  |  _  |
  |\\__  |\\__  |\\__  |
  |_____/|_____/|_____/
   WELCOME TO THE WEB!
            </div>
            
            <div class="fun-fact">
                <strong>💡 DID YOU KNOW?</strong><br>
                ${randomFact}
            </div>
            
            <h2>🎨 My Interests</h2>
            <ul>
                <li>${config.hobby}</li>
                <li>Surfing the Information Superhighway</li>
                <li>Collecting animated GIFs</li>
                <li>Making cool websites</li>
                <li>Listening to my favorite MP3s</li>
            </ul>
            
            <h2>🔗 Cool Links</h2>
            <p><a href="#">My GeoCities Neighborhood</a></p>
            <p><a href="#">Download Winamp Skins</a></p>
            <p><a href="#">My ICQ Number: ${Math.floor(Math.random() * 999999999)}</a></p>
            
            ${config.email ? `
            <h2>📧 Contact Me</h2>
            <p>Email me at: <a href="mailto:${config.email}">${config.email}</a></p>
            <p class="blink">⚡ I check my email every day! ⚡</p>
            ` : ""}
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
            <div class="badge">NETSCAPE NOW!</div>
            <div class="badge">IE 4.0 READY</div>
            <div class="badge">MIDI ENABLED</div>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
            <p>You are visitor number:</p>
            <div class="hit-counter">
                ${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div style="text-align: center; margin-top: 30px; font-size: 0.9em;">
            <p>Last updated: ${config.createdAt ? new Date(config.createdAt).toLocaleString() : new Date().toLocaleString()}</p>
            <p>© ${new Date().getFullYear()} ${config.name}. All rights reserved.</p>
            <p class="blink">⚠️ Best viewed in 800x600 resolution ⚠️</p>
        </div>
    </div>
</body>
</html>
    `;
}
