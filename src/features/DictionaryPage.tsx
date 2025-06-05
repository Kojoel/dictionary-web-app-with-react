import DefinitionCard from "../components/DefinitionCard"
import SearchBar from "../components/SearchBar"
import type { Fonts } from "../interfaces/dictionaryInterfaces";
import { useFontStore, useThemeStore } from "../store/state";

const DictionaryPage = () => {

    const setFont = useFontStore((state) => state.setFont);
    const font = useFontStore((state) => state.font);

    
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <div className={`h-screen flex flex-col w-[736.99px] ${font}`}>
            
            {/* Header */}
            <div className="flex justify-between items-center h-[32px] mt-3 mb-3 md:mt-5 md:mb-5">
            <i className="fas fa-book text-[var(--purple-primary)] text-2xl"></i>

            <div className="flex gap-3 items-center">
                <select 
                className={`select-drop-down ${theme === 'light' ? 'select-light' : 'select-dark'}`} 
                name="font" 
                id="font"
                value={font}
                onChange={(e) => setFont(e.target.value as Fonts)}
                >
                <option value="serif">Serif</option>
                <option value="sansSerif">Sans Serif</option>
                <option value="mono">Mono</option>
                </select>
                <div className="bg-[var(--grey-01)] w-[2px] h-6 rounded"></div>
                <div 
                className={`toggleTheme ${theme === 'light' ? 'toggle-theme-light' : 'toggle-theme-dark'}`} 
                onClick={toggleTheme}
                >
                <div className={`theme-circle ${theme === 'light' ? 'theme-circle-light' : 'theme-circle-dark'}`}></div>
                </div>

                <i className={`fas fa-moon ${theme === 'light' ? 'moon-icon-light' : 'moon-icon-dark'}`}></i>
            </div>
            </div>

            {/* Search + Definition */}
            <div className="flex flex-col flex-grow min-h-0">
            <SearchBar />
            <div className="flex-grow overflow-y-auto">
                <DefinitionCard />
            </div>
            </div>

        </div>
     )

}

export default DictionaryPage