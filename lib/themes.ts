export interface Theme {
  bg: string;
  textColor: string;
  headerBg: string;
  linkColor: string;
  pattern?: string;
  tiledBg?: string;
}

export const themes: Record<string, Theme> = {
  neon: {
    bg: "linear-gradient(45deg, #ff00ff, #00ffff)",
    textColor: "#ffff00",
    headerBg: "#ff00ff",
    linkColor: "#00ff00",
    tiledBg: "data:image/svg+xml,%3Csvg width='50' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23ff00ff' width='50' height='50'/%3E%3Cpath d='M25 0L50 25L25 50L0 25z' fill='%2300ffff' opacity='0.3'/%3E%3C/svg%3E",
  },
  space: {
    bg: "radial-gradient(circle, #000033, #000000)",
    textColor: "#ffffff",
    headerBg: "#ff6600",
    linkColor: "#00ccff",
    tiledBg: "data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23000033' width='100' height='100'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%23ffffff'/%3E%3Ccircle cx='40' cy='30' r='1' fill='%23ffffff'/%3E%3Ccircle cx='70' cy='20' r='1' fill='%23ffffff'/%3E%3Ccircle cx='30' cy='70' r='1' fill='%23ffffff'/%3E%3Ccircle cx='80' cy='80' r='1' fill='%23ffffff'/%3E%3C/svg%3E",
  },
  rainbow: {
    bg: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
    textColor: "#ffffff",
    headerBg: "#ff1493",
    linkColor: "#ffff00",
    tiledBg: "data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23ff0000' width='10' height='30'/%3E%3Crect fill='%23ffff00' x='10' width='10' height='30'/%3E%3Crect fill='%230000ff' x='20' width='10' height='30'/%3E%3C/svg%3E",
  },
  matrix: {
    bg: "linear-gradient(180deg, #001100, #003300)",
    textColor: "#00ff00",
    headerBg: "#003300",
    linkColor: "#00ff00",
    tiledBg: "data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23001100' width='20' height='20'/%3E%3Ctext x='5' y='15' font-family='monospace' font-size='12' fill='%2300ff00' opacity='0.3'%3E1%3C/text%3E%3C/svg%3E",
  },
  geocities: {
    bg: "#008080",
    textColor: "#ffff00",
    headerBg: "#800080",
    linkColor: "#00ffff",
    pattern:
      "repeating-linear-gradient(45deg, #008080 0px, #008080 10px, #006666 10px, #006666 20px)",
    tiledBg: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23008080'/%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23006666'/%3E%3C/svg%3E",
  },
  angelfire: {
    bg: "#000080",
    textColor: "#ffffff",
    headerBg: "#ff0000",
    linkColor: "#ffff00",
    pattern:
      "radial-gradient(circle at 20% 50%, transparent 0%, transparent 10%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 11%, transparent 11%), radial-gradient(circle at 60% 80%, transparent 0%, transparent 10%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 11%, transparent 11%)",
    tiledBg: "data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23000080' width='40' height='40'/%3E%3Ccircle cx='20' cy='20' r='3' fill='%23ffffff' opacity='0.3'/%3E%3C/svg%3E",
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
