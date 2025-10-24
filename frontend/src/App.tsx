import './App.css'
import { ConstructionAreaPopupProvider } from './context/ConstructionPopupContext';
import UnderDevelopment from './pages/UnderDevelopment';

function App() {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  return(
    <div className='w-full min-h-screen bg-black text-white font-spectral'>
      {
        environment === "development" ? (
          <ConstructionAreaPopupProvider>
            <UnderDevelopment/>
          </ConstructionAreaPopupProvider>
          
        ) : (
          <div>Hi</div>
        )
      }
    </div>
  )
}

export default App
