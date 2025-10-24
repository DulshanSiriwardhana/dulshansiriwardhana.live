import './App.css'
import UnderDevelopment from './pages/UnderDevelopment';

function App() {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  return(
    <div className='w-full min-h-screen bg-black text-white'>
      {
        environment === "development" ? (
          <UnderDevelopment/>
        ) : (
          <div>Hi</div>
        )
      }
    </div>
  )
}

export default App
