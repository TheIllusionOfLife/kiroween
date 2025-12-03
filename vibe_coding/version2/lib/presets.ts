export interface PresetConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  config: {
    name: string;
    hobby: string;
    email: string;
    theme: string;
    addMusic: boolean;
    addCursor: boolean;
    addGifs: boolean;
    addPopups: boolean;
    addRainbowText: boolean;
  };
}

export const presets: PresetConfig[] = [
  {
    id: "gamer",
    name: "90s Gamer Kid",
    description: "N64, Pokemon cards, and Mountain Dew",
    emoji: "🎮",
    config: {
      name: "xXCoolGamer99Xx",
      hobby: "Playing N64 and collecting Pokemon cards",
      email: "coolgamer@hotmail.com",
      theme: "space",
      addMusic: true,
      addCursor: true,
      addGifs: true,
      addPopups: true,
      addRainbowText: true,
    },
  },
  {
    id: "geocities",
    name: "GeoCities Classic",
    description: "Friendship bracelets and boy bands",
    emoji: "💖",
    config: {
      name: "Jennifer's Homepage",
      hobby: "Making friendship bracelets and listening to BSB",
      email: "jen_4ever@yahoo.com",
      theme: "geocities",
      addMusic: true,
      addCursor: true,
      addGifs: true,
      addPopups: true,
      addRainbowText: false,
    },
  },
  {
    id: "webmaster",
    name: "Webmaster Pro",
    description: "HTML tutorials and web design tips",
    emoji: "💻",
    config: {
      name: "Dave's Tech Corner",
      hobby: "HTML tutorials and web design",
      email: "webmaster@dave.com",
      theme: "matrix",
      addMusic: false,
      addCursor: false,
      addGifs: false,
      addPopups: false,
      addRainbowText: false,
    },
  },
  {
    id: "fanpage",
    name: "Ultimate Fan Page",
    description: "Dedicated to your favorite band/show",
    emoji: "⭐",
    config: {
      name: "Backstreet Boys Forever",
      hobby: "BSB fan since 1997! I ❤️ Nick Carter",
      email: "bsb_fan_4life@aol.com",
      theme: "rainbow",
      addMusic: true,
      addCursor: true,
      addGifs: true,
      addPopups: true,
      addRainbowText: true,
    },
  },
  {
    id: "hacker",
    name: "Elite Hacker",
    description: "1337 h4x0r vibes",
    emoji: "🔓",
    config: {
      name: "Th3_Gh0st",
      hobby: "Hacking the Gibson and phreaking",
      email: "elite_hacker@underground.net",
      theme: "matrix",
      addMusic: false,
      addCursor: true,
      addGifs: false,
      addPopups: true,
      addRainbowText: false,
    },
  },
  {
    id: "angelfire",
    name: "Angelfire Special",
    description: "Poetry, quotes, and deep thoughts",
    emoji: "🌙",
    config: {
      name: "Sarah's Sanctuary",
      hobby: "Writing poetry and collecting inspirational quotes",
      email: "dreamer_girl@angelfire.com",
      theme: "angelfire",
      addMusic: true,
      addCursor: true,
      addGifs: true,
      addPopups: false,
      addRainbowText: true,
    },
  },
];
