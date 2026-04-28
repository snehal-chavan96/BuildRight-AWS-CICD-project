import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, Building2 } from 'lucide-react'
import api from '../api/axios'

function Hero() {
  const [projects, setProjects] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects')
        if (data && data.length > 0) {
          setProjects(data.slice(0, 5)) // get top 5 projects
        }
      } catch (err) {
        console.error('Failed to load projects for hero:', err)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [projects.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const getFullImageUrl = (url) => {
    if (!url) return '';
    return url;
  };

  // Fallback image if no projects exists
  const isFallback = projects.length === 0

  return (
    <section id="home" className="relative w-full overflow-hidden bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white dark:from-slate-900/60 dark:via-slate-900/80 dark:to-slate-900"></div>
      <div className="absolute right-0 top-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl"></div>
      
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div className="flex flex-col items-start z-10">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-1.5 text-sm font-bold text-indigo-800 dark:text-indigo-300 shadow-sm transition-all hover:bg-white hover:shadow-md">
            <Building2 size={16} className="text-amber-500" />
            <span className="flex items-center">
              Trusted Civil Engineering Services
              <span className="ml-2 flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
            </span>
          </p>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl text-slate-900">
            Building Your Vision With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">Precision</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Trust</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
            Professional civil engineering services for modern residential and commercial construction. We turn ambitious blueprints into enduring realities.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/signup" className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:from-indigo-700 hover:to-indigo-900 hover:shadow-xl hover:shadow-indigo-600/40">
              Get Started Now
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1 text-amber-400" />
            </Link>
            <Link to="/projects" className="group rounded-xl border-2 border-slate-200 bg-white/90 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-indigo-200 hover:bg-slate-50 hover:text-indigo-700 hover:shadow-md">
              View Our Projects
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none z-10 group mt-10 lg:mt-0">
          <div className="absolute -inset-4 z-0 rounded-[2.5rem] bg-gradient-to-tr from-indigo-500 to-amber-400 opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] ring-1 ring-slate-900/5 bg-slate-900">
            {isFallback ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern construction project"
                  className="w-full h-[400px] object-cover sm:h-[550px] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
              </>
            ) : (
              <div className="relative h-[400px] sm:h-[550px] w-full">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={getFullImageUrl(project.imageUrl)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-0">
                      <Link to={`/projects/${project.id}`} className="inline-block">
                        <h3 className="text-3xl font-extrabold text-white mb-3 hover:text-amber-400 transition-colors drop-shadow-md">
                          {project.title}
                        </h3>
                      </Link>
                      <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                        <span className="bg-indigo-600/90 text-white backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-indigo-500/30">
                          {project.location}
                        </span>
                        <span className="bg-amber-500/90 text-amber-950 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm font-bold border border-amber-400/50">
                          ₹ {project.budget}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Controls */}
                {projects.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/30 hover:scale-110 transition duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/20"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/30 hover:scale-110 transition duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/20"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-6 right-8 flex space-x-2">
                      {projects.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            i === currentIndex ? 'w-8 bg-amber-500 shadow-md' : 'w-2.5 bg-white/40 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

