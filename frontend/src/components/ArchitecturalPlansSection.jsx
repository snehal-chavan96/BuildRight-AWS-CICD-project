import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ruler, DraftingCompass, ArrowUpRight } from 'lucide-react';
import api from '../api/axios';

export default function ArchitecturalPlansSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/plans')
      .then(res => setPlans(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getFullUrl = (url) => {
    if (!url) return '';
    return url;
  };

  const handleInquire = () => {
    const token = localStorage.getItem('token');
    if (token) navigate('/user-dashboard'); // Ideally to the new inquiry tab
    else navigate('/login');
  };

  if (loading) return (
     <section id="plans" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300"><div className="text-center font-semibold text-indigo-600 dark:text-indigo-400 animate-pulse">Loading architectural plans...</div></section>
  );

  if (plans.length === 0) return (
    <section id="plans" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-3">
             <Ruler className="text-amber-500" size={20} />
             <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-700">Expert Design</h2>
             <Ruler className="text-amber-500" size={20} />
          </div>
          <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl transition-colors">Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Plans</span></h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 transition-colors">No data available at the moment.</p>
        </div>
      </div>
    </section>
  );

  return (
    <section id="plans" className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      {/* Subtle blueprint pattern for the tech/architecture feel */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
             <DraftingCompass className="text-amber-500" size={24} />
             <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">Expert Design</h2>
          </div>
          <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl transition-colors">
            Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Plans</span>
          </h3>
          <p className="mt-6 text-lg font-medium text-slate-600 dark:text-slate-300 transition-colors">
            Browse our pre-designed architectural templates crafted by experts or find inspiration for your custom blueprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map(plan => (
            <div key={plan.id} className="bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-900/10 dark:hover:shadow-indigo-900/40 border border-slate-200 dark:border-slate-700 transition-all duration-500 group hover:-translate-y-1">
              <div className="relative overflow-hidden h-64 bg-slate-900 p-2">
                <div className="absolute inset-0 bg-blueprint dark:bg-blueprint-dark opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img src={getFullUrl(plan.imageUrl)} alt={plan.title} className="w-full h-full object-cover rounded-xl transition duration-700 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-indigo-600/90 dark:bg-indigo-900/90 text-white backdrop-blur-md p-2 rounded-lg shadow-md">
                  <DraftingCompass size={20} />
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{plan.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 font-medium mb-8 line-clamp-3 transition-colors">{plan.description}</p>
                <button 
                  onClick={handleInquire}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                >
                  Inquire Now
                  <ArrowUpRight size={18} className="text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
