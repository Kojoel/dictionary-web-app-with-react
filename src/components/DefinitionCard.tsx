import { useEffect, useRef } from 'react';
import '../../src/styles/utilities.css';
import { useDictionaryStore, useFontStore } from '../store/state';
import type { DictionaryEntry } from '../interfaces/dictionaryInterfaces';
import gsap from 'gsap';

const DefinitionCard = () => {

    const word = useDictionaryStore((state) => state.wordData.word);
    const phonetic = useDictionaryStore((state) => state.wordData.phonetic);
    const meanings = useDictionaryStore((state) => state.wordData.meanings);
    const sourceUrls = useDictionaryStore((state) => state.wordData.sourceUrls);
    const setGetSearchData = useDictionaryStore((state) => state.setGetSearchData);
    const definitionRef = useRef(null);

    const font = useFontStore((state) => state.font);

    const wordData = useDictionaryStore((state) => state.wordData);

    const animateDefinition = () => {
        if(definitionRef.current) {
            gsap.killTweensOf(definitionRef.current);
            gsap.fromTo(
                definitionRef.current,
                { y: 200, opacity: 0 },
                { y: 0, opacity: 1, duration: .5 }
            )
        }
    };


    useEffect(() => {
        const prevSearchData = localStorage.getItem('recentSearchData');
        
        if(prevSearchData) {
            const parsedPrevSearchData: DictionaryEntry =  JSON.parse(prevSearchData)
            setGetSearchData(parsedPrevSearchData)
        }
    }, []);

    useEffect(() => {
        if(word) {
            animateDefinition();
        }
    }, [word])


    const playSound = () => {
        if(!wordData.phonetics) return;

        const phoneticWithAudio = wordData.phonetics.find(p => p.audio?.trim() !== "");

        if (phoneticWithAudio) {
            const audio = new Audio(phoneticWithAudio.audio);
            audio.play();
        }

    }

    return (
        <div ref={definitionRef} className={`mb-8 ${font}`}>
            <div className="flex justify-between relative mb-[32px]">
                <div className="word-phonetics flex flex-col ">
                    <p className="heading-l-inter text-[32px] md:text-[64px]">{word}</p>
                    <p className="heading-m-inter text-[var(--purple-primary)]">{phonetic}</p>
                </div>
                {meanings.length ? 
                <>
                    <div 
                        className="play-btn flex absolute top-5 right-0 cursor-pointer"
                        onClick={playSound}
                    >
                        <div className="w-[4rem] h-[4rem] bg-[var(--purple-primary)] opacity-20 rounded-full ">
                        </div>
                        <i className="fas fa-play text-[var(--purple-primary)] absolute top-4 left-[35%] text-[2rem]"></i>
                    </div>
                </> : <></>}
            </div>
            {meanings.map((meaning, index) => (
                <>
                    <div key={index} className="flex justify-between items-center gap-3 mb-[32px]">
                        <p className="body-m-inter">{meaning.partOfSpeech}</p>
                        <div className="h-[2px] flex-1 bg-[var(--grey-02)]"></div>
                    </div>

                    <div className="text-[16px] text-[var(--grey-01)] mb-[17px]" >Meaning</div>

                    <div className="meanings flex flex-col gap-3 mb-[32px]">
                        {meaning.definitions.map((definition, index) => (
                            <>
                                <div key={index} className="item flex justify-between gap-5 items-start">
                                    <div className="circle w-[5px] h-[5px] bg-[var(--purple-primary)] rounded-full mt-2"></div>
                                    <p className="flex-1">{definition.definition}</p>
                                </div>
                            </>
                        ))}

                        {meaning.definitions.some(def => def.synonyms && def.synonyms.length > 0) && (
                            <div className="synonyms flex gap-5 mb-[32px]">
                                <div className="text-[16px] text-[var(--grey-01)]">Synonyms</div>
                                <div className="other-words flex gap-2 text-[var(--purple-primary)] font-bold flex-wrap">
                                    {meaning.definitions.flatMap((def) =>
                                        def.synonyms ? def.synonyms : []
                                    ).map((syn, synIndex) => (
                                        <span key={synIndex}>{syn}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </>
            ))}


            {sourceUrls.length > 0 
            ? 
                <>
                <div className="h-[2px] w-[100%] bg-[var(--grey-02)] mb-[32px] mt-[32px]"></div>
            
                <div className="underline flex flex-col gap-2">
                    <span className="text-[var(--grey-01)] ">Source</span>
                        <div className="flex gap-3 flex-col">
                            {sourceUrls.map((url, index) => (
                                <a key={index} href={url}><span className="" >{url}</span></a>
                            ))}
                        </div>
                </div>
                </> 
            :   
                <></>

            }

            {
                meanings.length == 0 ?
                <>
                    <div className="nothing-to-show flex flex-col items-center justify-center h-60 border-2 rounded-3xl md:h-80 pl-10 pr-10 text-center">
                        <h3 className="text-[2rem] text-[var(--grey-01)] md:text-[3rem]">Nothing to Show</h3>
                        <p className="text-[var(--grey-01)]">Search something to see your search results</p>
                    </div>
                </> :
                <></>
            }
            
        </div>
    )
}

export default DefinitionCard