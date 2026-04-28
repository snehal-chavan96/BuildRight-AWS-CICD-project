import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Banknote, Maximize, FileText } from 'lucide-react'
import api from '../api/axios'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data } = await api.get(`/projects/${id}`)
        setProject(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load project details')
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id])

  const getFullUrl = (url) => {
    if (!url) return '';
    return url;
  };

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20">
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 right-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 z-10">
        <Link to="/projects" className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-amber-500 transition-colors">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Projects
        </Link>

        {loading ? <div className="text-center py-20 text-indigo-600 font-bold animate-pulse">Loading project details...</div> : null}
        {error ? <p className="rounded-xl bg-red-50 p-4 font-bold text-red-600 shadow-sm">{error}</p> : null}

        {project ? (
          <article className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-900/5 ring-1 ring-slate-100">
            <div className="relative h-72 sm:h-96 md:h-[500px]">
              <img src={getFullUrl(project.imageUrl)} alt={project.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md mb-2">{project.title}</h1>
                <div className="flex items-center gap-2 text-amber-400 font-medium text-lg">
                  <MapPin size={20} /> {project.location}
                </div>
              </div>
            </div>
            
            <div className="space-y-8 p-8 sm:p-12">
              <div className="flex flex-wrap gap-4 text-sm">
                {(project.year || project.date) && (
                  <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-slate-700 font-bold border border-slate-200 shadow-sm">
                    <Calendar size={18} className="text-indigo-500" /> {project.year || project.date}
                  </span>
                )}
                {project.budget && (
                  <span className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-emerald-800 font-bold border border-emerald-200 shadow-sm">
                    <Banknote size={18} className="text-emerald-500" /> ₹ {project.budget}
                  </span>
                )}
                {project.area && (
                  <span className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-indigo-800 font-bold border border-indigo-200 shadow-sm">
                    <Maximize size={18} className="text-amber-500" /> {project.area} sq ft
                  </span>
                )}
              </div>
              
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="text-amber-500" /> Project Description
                </h3>
                <p className="whitespace-pre-line leading-loose text-slate-600 font-medium text-lg">{project.description}</p>
              </div>
              
              <div className="border-t border-slate-100 pt-8">
                <a
                  href={getFullUrl(project.pdfUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-4 font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 hover:from-indigo-700 hover:to-indigo-900"
                >
                  <FileText size={20} className="text-amber-400 group-hover:scale-110 transition-transform" /> 
                  View Complete PDF Plan
                </a>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  )
}
