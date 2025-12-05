import { themes, funFacts } from "./themes";
import type { SiteConfig } from "./types";

// HTML escaping helper to prevent XSS
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Audio generation helpers
function generateBGMAudio(bgmTrack?: string): string {
  if (!bgmTrack) return '';
  
  // TODO: Replace with self-hosted audio files or configurable URLs
  // Current implementation uses external URLs which may be subject to hotlink restrictions
  // For production, audio files should be:
  // 1. Self-hosted in public/audio/ directory, OR
  // 2. Served from a CDN with proper licensing, OR
  // 3. Made configurable via environment variables
  const audioTracks: Record<string, string> = {
    'midi-game': 'https://www.bensound.com/bensound-music/bensound-retrosoul.mp3',
    'midi-chill': 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
    'midi-epic': 'https://www.bensound.com/bensound-music/bensound-epic.mp3',
  };
  
  const audioUrl = audioTracks[bgmTrack] || audioTracks['midi-game'];
  
  return `
    <div style="position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8); padding: 10px; border: 2px solid #ffff00; border-radius: 5px; z-index: 10000;">
      <div style="color: #ffff00; font-family: 'Courier New', monospace; font-size: 12px; margin-bottom: 5px;">
        🎵 BGM Player
      </div>
      <audio id="bgm-player" controls loop style="width: 200px;">
        <source src="${audioUrl}" type="audio/mpeg">
        Your browser does not support audio.
      </audio>
      <script>
        // Auto-play with user interaction fallback
        var bgmPlayer = document.getElementById('bgm-player');
        bgmPlayer.volume = 0.3;
        var playPromise = bgmPlayer.play();
        if (playPromise !== undefined) {
          playPromise.catch(function() {
            // Auto-play was prevented, will play on first user interaction
            document.addEventListener('click', function() {
              bgmPlayer.play();
            }, { once: true });
          });
        }
      </script>
    </div>
  `;
}

function generateSoundEffects(): string {
  return `
    <script>
      // Reuse a single AudioContext for better performance
      var sharedAudioContext = null;
      
      function getAudioContext() {
        if (!sharedAudioContext) {
          try {
            sharedAudioContext = new (window.AudioContext || window.webkitAudioContext)();
          } catch (e) {
            // AudioContext not supported
          }
        }
        return sharedAudioContext;
      }
      
      // Sound effect helper
      function playSound(frequency, duration) {
        try {
          var audioContext = getAudioContext();
          if (!audioContext) return;
          
          var oscillator = audioContext.createOscillator();
          var gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = frequency;
          oscillator.type = 'square';
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
          // Sound not supported
        }
      }
      
      // Add sound effects to buttons
      document.addEventListener('DOMContentLoaded', function() {
        var buttons = document.querySelectorAll('.hover-button');
        buttons.forEach(function(button) {
          button.addEventListener('click', function() {
            playSound(800, 0.1);
          });
          button.addEventListener('mouseenter', function() {
            playSound(600, 0.05);
          });
        });
        
        // Add sound to links
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
          link.addEventListener('mouseenter', function() {
            playSound(400, 0.05);
          });
        });
      });
    </script>
  `;
}

export function generateSiteHTML(config: SiteConfig): string {
  const theme = themes[config.theme] ?? themes["neon"]; // Fallback to neon if invalid theme
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  
  // Escape user inputs to prevent XSS
  const safeName = escapeHtml(config.name);
  const safeHobby = escapeHtml(config.hobby);
  const safeEmail = config.email ? escapeHtml(config.email) : undefined;
  
  // For inline JavaScript, use JSON.stringify to safely encode strings
  const jsName = JSON.stringify(config.name);
  const jsEmail = JSON.stringify(config.email || "webmaster@geocities.com");
  
  // Apply custom colors if provided, otherwise use theme defaults
  const bgColor = config.customColors?.background || theme.bg;
  const textColor = config.customColors?.text || theme.textColor;
  const linkColor = config.customColors?.links || theme.linkColor;
  
  // Apply custom fonts if provided
  const headingFont = config.customFonts?.heading || "'Comic Sans MS', cursive";
  const bodyFont = config.customFonts?.body || "'Comic Sans MS', cursive";

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${safeName}'s Awesome Homepage!</title>
    <style>
        body {
            background: ${bgColor};
            ${theme.pattern && !config.customColors?.background ? `background-image: ${theme.pattern};` : ""}
            ${theme.tiledBg && !config.customColors?.background ? `background-image: url("${theme.tiledBg}");` : ""}
            ${theme.tiledBg && !config.customColors?.background ? `background-repeat: repeat;` : ""}
            color: ${textColor};
            font-family: ${bodyFont};
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
            font-family: ${headingFont};
            text-shadow: 3px 3px 0 #000, -1px -1px 0 #000;
            margin: 0;
            animation: textRainbow 3s linear infinite;
        }
        
        h2 {
            font-family: ${headingFont};
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
            color: ${linkColor};
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
        
        .clock {
            background: #000;
            color: #0f0;
            font-family: 'Courier New', monospace;
            padding: 10px 20px;
            border: 3px outset #666;
            display: inline-block;
            font-size: 1.2em;
            font-weight: bold;
            letter-spacing: 2px;
        }
        
        .new-badge {
            display: inline-block;
            background: #ff0000;
            color: #ffff00;
            font-weight: bold;
            padding: 2px 8px;
            border: 2px solid #ffff00;
            animation: pulse 1s infinite;
            font-size: 0.8em;
            margin-left: 5px;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .hover-button {
            background: #0080ff;
            color: #fff;
            border: 3px outset #0080ff;
            padding: 10px 20px;
            font-weight: bold;
            cursor: pointer;
            font-family: 'Comic Sans MS', cursive;
            margin: 5px;
            transition: all 0.1s;
        }
        
        .hover-button:hover {
            background: #ff0080;
            border-color: #ff0080;
            transform: scale(1.05);
        }
        
        .hover-button:active {
            border-style: inset;
            transform: scale(0.95);
        }
        
        .bouncing-marquee {
            background: #ffff00;
            color: #ff0000;
            padding: 10px;
            border: 3px solid #000;
            margin: 20px 0;
            font-weight: bold;
            overflow: hidden;
            height: 40px;
        }
        
        .bouncing-text {
            display: inline-block;
            animation: bounce-horizontal 3s linear infinite;
            white-space: nowrap;
        }
        
        @keyframes bounce-horizontal {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
        }
        
        .spinning {
            display: inline-block;
            animation: spin360 3s linear infinite;
        }
        
        @keyframes spin360 {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .bouncing {
            display: inline-block;
            animation: bounce 1s ease-in-out infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .browser-warning {
            background: #ffff00;
            border: 3px solid #ff0000;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
            color: #000;
        }
        
        .badge-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin: 20px 0;
        }
        
        .badge-img {
            border: 2px solid #000;
            box-shadow: 3px 3px 0 rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <script>
        // Digital clock
        function updateClock() {
            var now = new Date();
            var hours = String(now.getHours()).padStart(2, '0');
            var minutes = String(now.getMinutes()).padStart(2, '0');
            var seconds = String(now.getSeconds()).padStart(2, '0');
            var clockElement = document.getElementById('digital-clock');
            if (clockElement) {
                clockElement.textContent = hours + ':' + minutes + ':' + seconds;
            }
        }
        setInterval(updateClock, 1000);
        updateClock();
        
        // Disable right-click
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert('Right-clicking is disabled! This is a protected site! 🚫');
            return false;
        });
        
        // Random page title changes
        var siteName = ${jsName};
        var titles = [
            siteName + '\\'s Homepage',
            'Welcome to ' + siteName + '\\'s Site!',
            '✨ ' + siteName + ' ✨',
            'You are visitor #' + Math.floor(Math.random() * 99999)
        ];
        var titleIndex = 0;
        setInterval(function() {
            document.title = titles[titleIndex];
            titleIndex = (titleIndex + 1) % titles.length;
        }, 3000);
    </script>
    ${config.addPopups ? `
    <script>
        // Only show popups if not in an iframe (i.e., downloaded version)
        if (window.self === window.top) {
            // Welcome popup
            window.addEventListener('load', function() {
                alert('🌟 Welcome to ' + siteName + '\\'s Awesome Homepage! 🌟');
            });
            
            // Exit confirmation
            window.addEventListener('beforeunload', function(e) {
                e.preventDefault();
                e.returnValue = 'Are you sure you want to leave this awesome site?';
                return 'Are you sure you want to leave this awesome site?';
            });
        }
        
        // Scrolling status bar text
        var contactEmail = ${jsEmail};
        var statusMessages = [
            'Welcome to ' + siteName + '\\'s site!',
            'Thanks for visiting!',
            'Don\\'t forget to sign the guestbook!',
            'Best viewed in Netscape Navigator',
            'This site is under construction',
            'Email me at ' + contactEmail,
            '© ' + new Date().getFullYear() + ' ' + siteName
        ];
        var messageIndex = 0;
        setInterval(function() {
            window.status = statusMessages[messageIndex];
            messageIndex = (messageIndex + 1) % statusMessages.length;
        }, 2000);
        
        // Browser detection
        var browserName = 'Unknown Browser';
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf('Firefox') > -1) browserName = 'Mozilla Firefox';
        else if (userAgent.indexOf('Chrome') > -1) browserName = 'Google Chrome';
        else if (userAgent.indexOf('Safari') > -1) browserName = 'Safari';
        else if (userAgent.indexOf('Edge') > -1) browserName = 'Microsoft Edge';
        
        window.addEventListener('load', function() {
            var warning = document.getElementById('browser-warning');
            if (warning && browserName !== 'Netscape Navigator') {
                warning.innerHTML = '⚠️ WARNING: You are using ' + browserName + '. This site is optimized for Netscape Navigator 4.0! ⚠️';
            }
        });
    </script>
    ` : ""}
    ${config.bgmTrack ? generateBGMAudio(config.bgmTrack) : config.addMusic ? '<div style="position: fixed; top: 10px; right: 10px; background: #ffff00; padding: 10px; border: 3px outset #000; z-index: 9999;">🎵 MIDI Music Playing! 🎵</div>' : ""}
    ${config.soundEffects ? generateSoundEffects() : ""}
    <div class="container">
        <div class="header">
            <h1>🌟 Welcome to ${safeName}'s Homepage! 🌟</h1>
            <p class="blink">✨ UNDER CONSTRUCTION ✨</p>
        </div>
        
        <div class="marquee">
            <div class="marquee-text">
                ⭐ YOU ARE VISITOR #${Math.floor(Math.random() * 99999)} ⭐ 
                BEST VIEWED IN NETSCAPE NAVIGATOR ⭐ 
                OPTIMIZED FOR 800x600 ⭐
            </div>
        </div>
        
        ${config.addPopups ? '<div id="browser-warning" class="browser-warning">⚠️ This site is best viewed in Netscape Navigator 4.0 ⚠️</div>' : ""}
        
        ${config.addGifs ? '<div class="gif-divider"><span class="spinning">💀</span> <span class="bouncing">⚡</span> <span class="spinning">🔥</span> <span class="bouncing">⚡</span> <span class="spinning">💀</span></div>' : ""}
        <div class="divider"></div>
        
        <div class="content">
            <h2>👋 About Me</h2>
            <p>Hi! My name is <strong>${config.addRainbowText ? `<span class="rainbow-text">${safeName}</span>` : safeName}</strong> and this is my personal homepage on the World Wide Web!</p>
            <p>I love <strong>${safeHobby}</strong> and I made this site to share my interests with the world!</p>
            
            <div class="ascii-art">
   _____ _____ _____ 
  |  _  |  _  |  _  |
  |\\__  |\\__  |\\__  |
  |_____/|_____/|_____/
   WELCOME TO THE WEB!
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <div class="clock" id="digital-clock">00:00:00</div>
                <p style="margin-top: 10px; font-size: 0.9em;">Current Time on Your Computer</p>
            </div>
            
            <div class="fun-fact">
                <strong>💡 DID YOU KNOW?</strong><br>
                ${randomFact}
            </div>
            
            <h2>🎨 My Interests <span class="new-badge">NEW!</span></h2>
            <ul>
                <li>${safeHobby}</li>
                <li>Surfing the Information Superhighway</li>
                <li>Collecting animated GIFs</li>
                <li>Making cool websites <span class="new-badge">UPDATED!</span></li>
                <li>Listening to my favorite MP3s</li>
            </ul>
            
            <div class="bouncing-marquee">
                <div class="bouncing-text">
                    ⭐ CHECK OUT MY COOL LINKS BELOW! ⭐ SIGN MY GUESTBOOK! ⭐ COME BACK SOON! ⭐
                </div>
            </div>
            
            ${config.addGifs ? '<div class="gif-divider"><span class="spinning">⭐</span> <span class="bouncing">🌟</span> <span class="spinning">✨</span> <span class="bouncing">🌟</span> <span class="spinning">⭐</span></div>' : ""}
            
            <h2>🔗 Cool Links <span class="new-badge">HOT!</span></h2>
            <p><a href="#" class="hover-link">My GeoCities Neighborhood</a></p>
            <p><a href="#" class="hover-link">Download Winamp Skins</a></p>
            <p><a href="#" class="hover-link">My ICQ Number: ${Math.floor(Math.random() * 999999999)}</a></p>
            
            <div style="text-align: center; margin: 20px 0;">
                <button class="hover-button" onclick="alert('Thanks for clicking! 🎉')">
                    Click Me!
                </button>
                <button class="hover-button" onclick="alert('You found the secret button! 🎊')">
                    Secret Button
                </button>
            </div>
            
            <div class="ascii-art">
    .-""-.
   /      \\
  |  o  o  |
  |   __   |
   \\  \\/  /
    '-..-'
   WEBMASTER
            </div>
            <p><a href="#">Join my WebRing!</a></p>
            <p><a href="#">View my awards!</a></p>
            
            ${safeEmail ? `
            <h2>📧 Contact Me</h2>
            <p>Email me at: <a href="mailto:${config.email || ""}">${safeEmail}</a></p>
            <p class="blink">⚡ I check my email every day! ⚡</p>
            ` : ""}
        </div>
        
        ${config.addGifs ? '<div class="gif-divider"><span class="spinning">🎨</span> <span class="bouncing">🖌️</span> <span class="spinning">🎨</span> <span class="bouncing">🖌️</span> <span class="spinning">🎨</span></div>' : ""}
        
        <div class="badge-grid">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23000080' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23fff' font-family='Arial' font-size='10' font-weight='bold'%3ENetscape Now!%3C/text%3E%3C/svg%3E" alt="Netscape Now" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23ff0000' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23fff' font-family='Arial' font-size='10' font-weight='bold'%3EIE 4.0 Ready%3C/text%3E%3C/svg%3E" alt="IE 4.0" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23008000' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23fff' font-family='Arial' font-size='10' font-weight='bold'%3E800x600%3C/text%3E%3C/svg%3E" alt="800x600" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23800080' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23fff' font-family='Arial' font-size='10' font-weight='bold'%3EMIDI Enabled%3C/text%3E%3C/svg%3E" alt="MIDI" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23ff8c00' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23000' font-family='Arial' font-size='10' font-weight='bold'%3EJava Powered%3C/text%3E%3C/svg%3E" alt="Java" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23000' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%2300ff00' font-family='Courier' font-size='10' font-weight='bold'%3EFrames Free%3C/text%3E%3C/svg%3E" alt="Frames Free" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23ffff00' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23000' font-family='Arial' font-size='9' font-weight='bold'%3EAnti-Microsoft%3C/text%3E%3C/svg%3E" alt="Anti-Microsoft" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%2300ffff' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23000' font-family='Arial' font-size='10' font-weight='bold'%3EHTML 3.2%3C/text%3E%3C/svg%3E" alt="HTML 3.2" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23ff1493' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23fff' font-family='Arial' font-size='9' font-weight='bold'%3EGeoCities%3C/text%3E%3C/svg%3E" alt="GeoCities" class="badge-img">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31'%3E%3Crect fill='%23666' width='88' height='31'/%3E%3Ctext x='44' y='20' text-anchor='middle' fill='%23fff' font-family='Courier' font-size='9' font-weight='bold'%3EMade w/ Notepad%3C/text%3E%3C/svg%3E" alt="Made with Notepad" class="badge-img">
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
            <p>© ${new Date().getFullYear()} ${safeName}. All rights reserved.</p>
            <p class="blink">⚠️ Best viewed in 800x600 resolution ⚠️</p>
            <p style="margin-top: 10px;">
                <span class="new-badge">100% HTML</span>
                <span class="new-badge">NO FRAMES</span>
                <span class="new-badge">HAND CODED</span>
            </p>
        </div>
    </div>
</body>
</html>
    `;
}
