
import './App.css'
import DictionaryPage from './features/DictionaryPage'
import { useThemeStore } from './store/state'

function App() {

  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={`pr-4 pl-4 md:pr-20 md:pl-20 flex justify-center ${theme}`}>
      <DictionaryPage />
    </div>
  )
}

export default App
