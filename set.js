const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtGRVhuNlFHRWpBK3FoMHVwakFQakRWN2RBSk5qcUFTaThnOFR2a0tuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaE9vczY2U3FPWFYwVi93d0ExTnJ4YUJ6NTRFcER4dmJqbzMwSFhXbkhUdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQzVwbW0wZFZsTndaUlVLanUrMWxDV2llQjFqbmJPeGJaTEFhUXRWa1hvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvaDRzNE1MMmxxZ1d1NVdQNzE4eTBzTXJEMHVnQWFYNWs5VnNTN1ZyNFdrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9MaGVFTFJSTXNHMW80YUVJaTM4cWw5MENlNVNWbXBXQmRuM3hONU9TR3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im8vVGp3MnNTa0NLRTBFcDVkd3RKdTlzN2dsbHIzVjFnWnduSkdMb1RObUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUp3TnJ6N2Z2NGNqL0RNeFlXdk4rVTZVRDZqNktLNHA5VEFuVXUyOXdVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BlL0VFMWZLK2JDTjdXcUlaK3BoQ3VTeXVoWm5wdFNQMktzUzhNWWhoVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFEekw0ZElEcTJmSHpmUU9SQzBTWnUveGhqT1dBRmpORTI5YTJsb2Roa1JJb0tTenM3VTI3Q09McEpwSzZwVHJrMGtIbWRJMC9EWmxhWDhndmxuV0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM2LCJhZHZTZWNyZXRLZXkiOiJNZ1pmQ2VXVkNOMkc1c3RBUHU5Sjk1UXZxL0kyY3ZHMU00Rm9maG9UVGlzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkRBMTg2NUNBMDYzQjc2M0IwRjU1QTU1RjEwOTUwQjRGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzgxMzEyODN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZCN0RCMDNBNURGODhDNTNCOTgwMEIzNTUwNzcwMDVGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzgxMzEyODN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVaczR2V1ZxVEppRi1PazJYaE9adVEiLCJwaG9uZUlkIjoiZmE1NDIyMmMtYjI0Zi00M2FhLWJmNjItODI4ZmI3MTRmYjk2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxnV2tCd25LQ0Vicnd1NEk4RVE5cHFpMFN6ND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrZlFFU01MZC8rTjc5Y0NuRGJKK2pTM0EwN2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUzhHVzg2OEQiLCJtZSI6eyJpZCI6IjQwNzcwODExOTI5OjY5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImNvc21pbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmFoNVBRRUVNT081N3dHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSVdSem5vNGJyY21pV0VGc1VGYk5qbnlLcDh6NUl2elFUWWdsSVRuTzBoWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUmxhQ0F2Wk1ydFVIbmtGclZjbGZYMXRicjlMZnkybmNiVzM4U0RwbS8rTzBmcVlYZnlKZWc5eXFvZ05vSCtqNWJpdFNHc2ppSTR4RXlJeFBYUkdpQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImhNSjBhajNFWWJBNDlFRTVWSVR4KzBYa0s0SUllQXRUKzRzQkJYTFMxVWU3QjJLV0cvL3ZsVkV0V3NuSjBCZUpabTRHKzhBcWd0eVpUTE5idk5iUUR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzA4MTE5Mjk6NjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU0ZrYzU2T0c2M0pvbGhCYkZCV3pZNThpcWZNK1NMODBFMklKU0U1enRJVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczODEzMTI4MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGaTMifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "cosmin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "40770811929",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
