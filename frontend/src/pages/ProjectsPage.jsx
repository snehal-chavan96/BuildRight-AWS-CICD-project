import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Banknote, Calendar, Construction } from 'lucide-react'
import api from '../api/axios'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await api.get('/projects')
        setProjects(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const getFullImageUrl = (url) => {
    if (!url) return '';
    return url;
  };

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20">
      {/* Decorative Blueprint Background Element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blueprint opacity-40 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
             <Construction className="text-amber-500" size={24} />
             <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-700">Portfolio</h2>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Projects</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 font-medium max-w-2xl">
            Browse our comprehensive portfolio of completed architectural and civil engineering masterpieces.
          </p>
        </div>

        {loading ? (
           <div className="py-20 text-center font-semibold text-indigo-600 animate-pulse">Loading amazing projects...</div>
        ) : null}
        
        {error ? <p className="rounded-xl bg-red-50 p-4 font-semibold text-red-600">{error}</p> : null}

        {!loading && !error ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group block relative rounded-3xl overflow-hidden bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/20 border border-slate-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={getFullImageUrl(project.imageUrl)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 border border-indigo-500/50">
                    <Construction size={12} className="text-amber-300" />
                    Completed
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h2 className="text-2xl font-extrabold text-white mb-3 group-hover:text-amber-400 transition-colors drop-shadow">{project.title}</h2>
                    
                    <div className="grid grid-cols-2 gap-3 text-slate-200 text-sm font-medium">
                      <div className="flex items-center col-span-2">
                        <MapPin size={16} className="text-amber-400 mr-2 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      
                      {project.budget && (
                        <div className="flex items-center">
                          <Banknote size={16} className="text-emerald-400 mr-2 shrink-0" />
                          <span className="truncate">₹ {project.budget}</span>
                        </div>
                      )}
                      
                      {project.date && (
                        <div className="flex items-center">
                          <Calendar size={16} className="text-indigo-400 mr-2 shrink-0" />
                          <span className="truncate">{project.date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
