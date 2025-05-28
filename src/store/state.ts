import { create } from "zustand";
import type { DictionaryEntry, Fonts, Phonetic } from "../interfaces/dictionaryInterfaces";
// import type { DictionaryEntry } from "../interfaces/dictionaryInterfaces";

type DictionaryState = {
    searchQuery: string;
    wordData: DictionaryEntry;
    wordError: string;
    phoneticAudio: string;

    setSearch: (word: string) => void;
    setGetSearchData: (data: DictionaryEntry) => void;
    setGetWordError: (error: string) => void;
    setPhoneticsAudio: ( audioUrl: string ) => void; 
}

type FontState = {
  font: Fonts;
  setFont: (font: Fonts) => void;
}

type ThemeState = {
  theme: string;
  toggleTheme: () => void;
}

export const useDictionaryStore = create<DictionaryState>((set) => ({
  searchQuery: '',
  wordData: {
    word: '',
    phonetic: '',
    meanings: [],
    sourceUrls: [],
  },
  wordError: '',
  phoneticAudio: '',

  setSearch: (word: string) => {
    set({ searchQuery: word });
  },
  setGetSearchData: (data: DictionaryEntry) => {
    set({ wordData: data})
  },
  setGetWordError: (error: string) => {
    set({ wordError: error })
  },
  setPhoneticsAudio: (audioUrl: string) => {
    set({ phoneticAudio: audioUrl })
  }
}));


export const useFontStore = create<FontState>((set) => ({
  font: 'serif',

  setFont: (font: Fonts) => {
    set({ font })
  }
}));


export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }))
  }
}))