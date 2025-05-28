
import { useRef, useState } from 'react';
import '../../src/styles/utilities.css';
import { getWord } from '../features/DisctionaryService';
import { useDictionaryStore, useFontStore, useThemeStore } from '../store/state';
import gsap from 'gsap';


const SearchBar = () => {
  const [input, setInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const setGetWordError = useDictionaryStore((state) => state.setGetWordError);
  const wordError = useDictionaryStore((state) => state.wordError);
  const setGetSearchData = useDictionaryStore((state) => state.setGetSearchData);
  const errorBoxRef = useRef(null);

  const font = useFontStore((state) => state.font);

  const theme = useThemeStore((state) => state.theme);

  const animateErrorBox = () => {
    if (errorBoxRef.current) {
      gsap.killTweensOf(errorBoxRef.current); // Stop previous animations if still running
      gsap.fromTo(
        errorBoxRef.current,
        { y: -100, opacity: 0 },
        { y: -60, opacity: 1, duration: 0.5 }
      );
      gsap.to(errorBoxRef.current, {
        y: -200,
        opacity: 0,
        duration: 0.7,
        delay: 2
      });
    }
  };

  const handleSearch = async () => {

    if (!input.trim()) {
      setSearchError("Whoops, can't be empty");
      return; 
    }

    if (/[^a-zA-Z]/.test(input)) {
      setSearchError("Cannot contain symbols or numbers");
      return;
    }

    await getWord(input, setGetWordError, setGetSearchData);

    if(useDictionaryStore.getState().wordError)
      animateErrorBox();
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      handleSearch();
    }
  } 
  

  return (
    <div className={`flex relative cursor-pointer mb-4 ${font}`}>
        <input 
            className={`${theme === 'light' ? 'input-light' : 'input-dark'}`} 
            type="search" 
            name="search-bar" 
            id="search-bar" 
            placeholder="Search..." 
            onChange={(e) => {
              setInput(e.target.value); 
              setSearchError(''); 
              setGetWordError('')
            }}
            onKeyDown={handleKeyDown}
        />
        <i
          className="fas fa-search text-[var(--purple-primary)] absolute top-4 right-6"
          onClick={handleSearch}
        ></i>
        {
          searchError && (
            <>
              <p className="error absolute top-11 left-1 text-[var(--red-primary)]">{searchError}</p>
            </>
          )
        }
        {
          wordError && (
            <>
              <p ref={errorBoxRef} className="error-box ">{wordError}</p>
            </>
          )
        }
    </div>
  )
}

export default SearchBar