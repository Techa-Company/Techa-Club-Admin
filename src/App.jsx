import { Outlet } from 'react-router-dom'
import SkipToMain from './components/skip-to-main'
import Sidebar from './components/sidebar'
import useIsCollapsed from './hooks/use-is-collapsed'

export default function App() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:mr-14' : 'md:mr-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}
