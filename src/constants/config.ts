export const CONFIG = {
  tries: 6, // This changes how many tries you get to finish the game
  language: 'Viossa', // This changes the display name for your language
  wordLength: 5, // This sets how long each word is based on how many characters (as defined in orthography.ts) are in each word
  author: 'Sekaha', // Put your name here so people know who made this game!
  authorWebsite: 'https://github.com/sekaha/Kaftoko', // Put a link to your website or social media here
  wordListSource: 'Vicoord', // Describe the source material for your words here
  wordListSourceLink: 'https://github.com/sekaha/Kaftoko', // Put a link to the source material for your words here
  //
  // THESE NEXT SETTINGS ARE FOR ADVANCED USERS
  //
  googleAnalytics: '', // You can use this if you use Google Analytics
  shuffle: false, // whether to shuffle the words in the wordlist each time you load the app (note: you will lose the 'word of the day' functionality if this is true)
  normalization: 'NFC', // whether to apply Unicode normalization to words and orthography - options: 'NFC', 'NFD', 'NKFC', 'NKFD', false
  startDate: '2025-01-17T00:00:00-06:00', // what date, time, and time zone to start your game from
  defaultLang: 'vi_la', // the default interface language
  availableLangs: [
    'vi_la',
    'vi_cy',
    'vi_ka',
    'vi_kr',
    'vi_wy',
    'vi_pa',
    'vi_lj',
    'vi_he',
    'vi_nk',
    'vi_en',
  ], // the options available to the user for translation languages
  escapeSpecialCharacters: true, // whether to escape all characters in the orthography.
}
