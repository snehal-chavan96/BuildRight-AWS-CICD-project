import React from 'react';
import { Building2 } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle Blueprint Background */}
      <div className="absolute inset-0 bg-blueprint dark:bg-blueprint-dark opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-3 mb-4">
               <Building2 className="text-amber-500" size={24} />
               <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">About Us</h2>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight mb-6 transition-colors">
              Building the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-600">Integrity</span>
            </h3>
            
            <div className="inline-flex items-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 px-5 py-2.5 mb-6 shadow-sm">
              <span className="flex h-3 w-3 rounded-full bg-amber-500 mr-3 animate-pulse"></span>
              <span className="text-sm font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-widest">
                Established in 2010
              </span>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-4 transition-colors">
              Vastushilp Designers and Construction, led by Amol Potale, specializes in innovative architectural planning, civil engineering, and construction services.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
              We deliver quality-driven solutions, blending creativity with functionality to design and build spaces that inspire and stand the test of time.
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600 to-amber-400 rounded-3xl opacity-30 blur-2xl transition duration-500 group-hover:opacity-50 group-hover:blur-3xl"></div>
            <div className="relative rounded-3xl p-2 bg-slate-900 ring-1 ring-slate-900/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
               <img 
                 src="https://images.unsplash.com/photo-1541888081691-38aa8db9bc10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Construction Site" 
                 className="rounded-2xl w-full object-cover h-[450px]"
               />
               {/* Decorative Element */}
               <div className="absolute -left-6 -bottom-6 bg-amber-500 text-amber-950 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center transform transition-transform group-hover:-translate-y-2 group-hover:rotate-3 border-4 border-white">
                  <span className="text-3xl font-black">15+</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-amber-900">Years Exp.</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
