import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, LayoutDashboard, HardHat, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', to: 'home', id: 'home' },
  { label: 'Projects', to: 'projects', id: 'projects' },
  { label: 'About Us', to: 'about', id: 'about' },
  { label: 'Gallery', to: 'gallery', id: 'gallery' },
  { label: 'Contact', to: 'contact', id: 'contact' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const [activeSection, setActiveSection] = useState('home')
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean);
      let current = 'home';
      for (const section of sections) {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      }
      setActiveSection(current);
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (id === 'projects' && location.pathname !== '/') {
        // Option to navigate to /projects directly
        navigate('/projects');
        return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
        else el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else el?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  const dashboardLink = role === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm transition-colors duration-300">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-2 text-amber-400 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-lg">
            <HardHat size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
            Build<span className="text-amber-500 group-hover:text-amber-400 transition-colors">Right</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === '/' ? activeSection === link.id : location.pathname.includes(link.to);
            return (
              <li key={link.label}>
                <button
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative py-1 transition-colors outline-none cursor-pointer ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-indigo-600 dark:hover:text-indigo-400'
                  } after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-amber-500 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
                    isActive ? 'after:scale-x-100 after:origin-bottom-left' : ''
                  }`}
                >
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {token ? (
            <>
               <Link
                to={dashboardLink}
                className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-700 dark:hover:text-indigo-400"
              >
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 px-5 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-indigo-900 hover:shadow-lg hover:shadow-indigo-600/30 ring-2 ring-transparent hover:ring-amber-400 focus:ring-amber-400"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
