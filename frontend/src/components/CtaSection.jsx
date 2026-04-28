import { ArrowRight, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';

function CtaSection() {
  return (
    <section id="contact" className="w-full relative overflow-hidden py-32 z-10 bg-slate-900">
      <div className="absolute inset-0 bg-blueprint-dark opacity-10"></div>
      
      {/* Premium gradients to give it an elegant dark feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/50 via-slate-900 to-slate-900 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none"></div>
      
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 mb-6 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-full shadow-lg">
             <HardHat className="text-amber-500" size={20} />
             <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Let's Build Together</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to Start Your Construction Journey?
          </h2>
          <p className="mt-6 text-xl text-indigo-100/80 font-medium">
            Let's discuss how we can bring your next big project to life with our expert engineering team and industry-leading standards.
          </p>
        </div>
        <div className="flex-shrink-0 mt-8 md:mt-0">
          <Link to="/signup" className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-5 text-lg font-bold text-amber-950 shadow-xl shadow-amber-900/20 transition-all duration-300 hover:scale-105 hover:from-amber-400 hover:to-amber-500 hover:shadow-2xl hover:shadow-amber-500/30">
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight size={24} className="relative z-10 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
