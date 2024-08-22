
import './App.css'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import RightBar from './components/RightBar'
import SearchBar from './components/SearchBar'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router'
import { useDispatch } from 'react-redux'
import { expand } from './redux/features/playerSlice'
import { Toaster } from 'sonner'


function App() {
  


  return (
    <div className='flex items-center h-[100vh] bg-gradientMain gap-2 w-[100vw] overflow-hidden'>
      <SideBar/>
      <div className='w-full relative h-full ml-[80px]  py-4'>
        <SearchBar/>
        <Outlet/> 
        <MusicPlayer/>
      </div>
      <RightBar/>

      <Toaster duration={2000} theme='dark' className='mb-10 bg-navy'/>
    </div>
  )
}

export default App
