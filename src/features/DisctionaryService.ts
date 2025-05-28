import type { DictionaryEntry } from "../interfaces/dictionaryInterfaces";

const dictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";


export const getWord = async ( 
    word: string,
    setGetWordError: (error: string) => void,
    setGetSearchData: (data: DictionaryEntry) => void,
) => {
    // if (!word) {
    //     throw new Error("Cannot find searched word!")
    // }

    try {
        const res = await fetch(`${dictionaryUrl}/${word}`);
        if (!res.ok) {
            setGetWordError("Word not found")
            return null;
        };

        const data: DictionaryEntry[] = await res.json();
        if (data.length > 0) {
            setGetSearchData(data[0]);
            const saveData = data[0];
            localStorage.setItem('recentSearchData', JSON.stringify(saveData))
        } else {
            setGetWordError("No definitions available");
        }
    }
    catch (err: any) {
        setGetWordError("Network or server down")
        return { err: err.message }
    }


}

