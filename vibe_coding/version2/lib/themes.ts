export interface Theme {
  bg: string;
  textColor: string;
  headerBg: string;
  linkColor: string;
  pattern?: string;
}

export const themes: Record<string, Theme> = {
  neon: {
    bg: "linear-gradient(45deg, #ff00ff, #00ffff)",
    textColor: "#ffff00",
    headerBg: "#ff00ff",
    linkColor: "#00ff00",
  },
  space: {
    bg: "radial-gradient(circle, #000033, #000000)",
    textColor: "#ffffff",
    headerBg: "#ff6600",
    linkColor: "#00ccff",
  },
  rainbow: {
    bg: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
    textColor: "#ffffff",
    headerBg: "#ff1493",
    linkColor: "#ffff00",
  },
  matrix: {
    bg: "linear-gradient(180deg, #001100, #003300)",
    textColor: "#00ff00",
    headerBg: "#003300",
    linkColor: "#00ff00",
  },
  geocities: {
    bg: "#008080",
    textColor: "#ffff00",
    headerBg: "#800080",
    linkColor: "#00ffff",
    pattern:
      "repeating-linear-gradient(45deg, #008080 0px, #008080 10px, #006666 10px, #006666 20px)",
  },
  angelfire: {
    bg: "#000080",
    textColor: "#ffffff",
    headerBg: "#ff0000",
    linkColor: "#ffff00",
    pattern:
      "radial-gradient(circle at 20% 50%, transparent 0%, transparent 10%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 11%, transparent 11%), radial-gradient(circle at 60% 80%, transparent 0%, transparent 10%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 11%, transparent 11%)",
  },
};

export const funFacts = [
  "The first website was created in 1991!",
  "GeoCities was the 3rd most visited site in 1999!",
  "The dancing baby GIF is from 1996!",
  "Netscape Navigator once had 90% market share!",
  "The <blink> tag was considered a feature!",
  "AOL sent out millions of free trial CDs!",
  "Dial-up modems made that iconic sound!",
  "Web rings were the original social networks!",
];
