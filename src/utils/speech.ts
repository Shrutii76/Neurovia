// src/utils/speech.ts
export const speakIndianCartoon = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);

    // pick Indian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indianVoice =
      voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('india')) ||
      voices.find(v => v.name.includes('Google हिन्दी')) ||
      voices.find(v => v.name.includes('Microsoft Heera'));
    if (indianVoice) utterance.voice = indianVoice;

    utterance.lang = 'hi-IN'; // Hindi India locale
    utterance.pitch = 2;       // cartoonish high pitch
    utterance.rate = 1.3;      // slightly fast
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Text-to-speech not supported in this browser.');
  }
};
