import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Banknote, ArrowRight } from 'lucide-react';
import api from '../api/axios';

export default function ProjectShowcase() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('/projects')
      .then(res => {
        if(res.data && res.data.length > 0) {
          setProjects(res.data.slice(0, 3));
        }
      })
      .catch(console.error);
  }, []);

  const getFullUrl = (url) => {
    if (!url) return '';
    return url;
  };

  if(projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Blueprint Background Element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blueprint opacity-50 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
             <div className="flex items-center gap-3 mb-3">
               <span className="h-1 w-8 bg-amber-500 rounded-full"></span>
               <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">Our Work</h2>
             </div>
             <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl transition-colors">
               Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Projects</span>
             </h3>
             <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 font-medium transition-colors">
               Explore a selection of our finest engineering achievements that showcase our dedication to structural excellence and innovation.
             </p>
          </div>
          <Link to="/projects" className="group inline-flex whitespace-nowrap items-center gap-2 px-6 py-3 border-2 border-slate-300 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md">
            View All Projects 
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 text-amber-500" />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:px-0 gap-6 lg:gap-10 snap-x snap-mandatory hide-scrollbar">
          {projects.map(project => (
            <Link key={project.id} to={`/projects/${project.id}`} className="group block relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/20 border border-slate-100 dark:border-slate-700 min-w-[300px] w-full shrink-0 snap-center md:min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                 <img 
                   src={getFullUrl(project.imageUrl)} 
                   alt={project.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                 
                 {/* Top Badge */}
                 <div className="absolute top-4 right-4 bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 transition-transform duration-500 group-hover:-translate-y-1">
                   Completed
                 </div>
                 
                 {/* Content overlay */}
                 <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out">
                      <h4 className="text-2xl font-extrabold text-white mb-3 group-hover:text-amber-400 transition-colors drop-shadow-md">{project.title}</h4>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                        <div className="flex items-center text-slate-200 text-sm font-medium">
                          <MapPin size={16} className="text-amber-400 mr-2 shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>
                        {project.budget && (
                          <div className="flex items-center text-slate-200 text-sm font-medium">
                            <Banknote size={16} className="text-emerald-400 mr-2 shrink-0" />
                            <span>₹ {project.budget.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="mt-4 flex items-center text-amber-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0">
                          View Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
