import { Mail, Phone, MapPin, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Login', path: '/login' },
  { name: 'Sign Up', path: '/signup' }
];

function Footer() {
  return (
    <footer className="w-full bg-slate-950 py-16 text-slate-300 relative overflow-hidden">
      {/* Decorative Blueprint Background */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-10 pointer-events-none"></div>

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-4 lg:px-8 relative z-10">
        <div className="md:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 group mb-4 inline-flex">
            <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-2 text-amber-400 shadow-md">
              <HardHat size={20} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tight text-white transition-colors">
              Build<span className="text-amber-500">Right</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400 font-medium">
            Professional civil engineering services by Vastushilp Designers. Building the future with integrity since 2010.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm font-bold text-xs uppercase tracking-wider">
              In
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm font-bold text-xs uppercase tracking-wider">
              Fb
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm font-bold text-xs uppercase tracking-wider">
              Tw
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-50 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link className="text-sm text-slate-400 transition-colors hover:text-amber-400 font-medium font-medium flex items-center gap-2 before:content-[''] before:block before:w-0 before:h-[1px] before:bg-amber-400 hover:before:w-2 before:transition-all before:duration-300" to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="text-sm font-bold uppercase tracking-wider text-slate-50 mb-6 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-amber-500"></span> Discover
           </h4>
           <ul className="space-y-3">
             <li>
                <a className="text-sm text-slate-400 transition-colors hover:text-amber-400 font-medium font-medium flex items-center gap-2 before:content-[''] before:block before:w-0 before:h-[1px] before:bg-amber-400 hover:before:w-2 before:transition-all before:duration-300" href="#about">
                  About Us
                </a>
             </li>
             <li>
                <a className="text-sm text-slate-400 transition-colors hover:text-amber-400 font-medium font-medium flex items-center gap-2 before:content-[''] before:block before:w-0 before:h-[1px] before:bg-amber-400 hover:before:w-2 before:transition-all before:duration-300" href="#plans">
                  Architectural Plans
                </a>
             </li>
             <li>
                <a className="text-sm text-slate-400 transition-colors hover:text-amber-400 font-medium font-medium flex items-center gap-2 before:content-[''] before:block before:w-0 before:h-[1px] before:bg-amber-400 hover:before:w-2 before:transition-all before:duration-300" href="#gallery">
                  Image Gallery
                </a>
             </li>
           </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-50 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Contact
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3 group">
              <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-amber-950 transition-colors">
                <Mail size={16} />
              </div>
              <a href="mailto:Amolpotale30@gmail.com" className="transition-colors hover:text-white leading-loose font-medium">Amolpotale30@gmail.com</a>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-amber-950 transition-colors">
                <Phone size={16} />
              </div>
              <a href="tel:+919881488565" className="transition-colors hover:text-white leading-loose font-medium">+91 9881488565</a>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-amber-950 transition-colors">
                <MapPin size={16} />
              </div>
              <span className="leading-relaxed font-medium">Shel Pimplgaon,<br/>Chakan, Maharashtra</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="relative z-10 mx-auto mt-16 max-w-7xl border-t border-slate-800/80 px-4 pt-8 sm:px-6 lg:px-8 text-center text-sm font-medium text-slate-500 h-full flex flex-col sm:flex-row justify-between items-center">
        <span>&copy; {new Date().getFullYear()} BuildRight Inc. All rights reserved.</span>
        <span className="mt-2 sm:mt-0 flex items-center gap-2">
          Designed with precision <HardHat size={14} className="text-indigo-400" />
        </span>
      </div>
    </footer>
  )
}

export default Footer
