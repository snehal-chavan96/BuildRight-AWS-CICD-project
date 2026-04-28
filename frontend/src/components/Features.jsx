import { ShieldCheck, UserCheck, Clock } from 'lucide-react';

const features = [
  {
    title: 'Quality Construction',
    description:
      'We deliver strong and durable structures using industry best practices and high-grade materials that stand the test of time.',
    icon: ShieldCheck,
  },
  {
    title: 'Expert Engineers',
    description:
      'Our experienced team plans and executes every project with precision, ensuring safety and innovation at the core.',
    icon: UserCheck,
  },
  {
    title: 'Timely Delivery',
    description:
      'Efficient workflows, proactive management, and project tracking help us complete your builds right on schedule.',
    icon: Clock,
  },
]

function Features() {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900 py-24 sm:py-32 relative overflow-hidden transition-colors duration-300">
      {/* Decorative blueprint background */}
      <div className="absolute inset-0 bg-blueprint dark:bg-blueprint-dark opacity-50 pointer-events-none"></div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 -ml-40 h-80 w-80 rounded-full bg-indigo-200 opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 -mr-40 h-80 w-80 rounded-full bg-amber-200 opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
             <span className="h-1 w-8 bg-amber-500 rounded-full"></span>
             <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-700">Our Advantages</h2>
             <span className="h-1 w-8 bg-amber-500 rounded-full"></span>
          </div>
          <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight transition-colors">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-600">BuildRight</span>
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
            We combine technical expertise, modern working methods, and reliable execution
            to deliver engineering projects that last for generations.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <article
              key={feature.title}
              className="group relative flex flex-col items-start rounded-3xl bg-white dark:bg-slate-800 p-10 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-900/10 dark:hover:shadow-indigo-900/40 border-b-4 border-transparent hover:border-amber-500 z-10"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-slate-700 dark:to-slate-600 text-indigo-600 dark:text-indigo-400 shadow-inner border border-indigo-200/50 dark:border-slate-500 transition-all duration-500 group-hover:scale-110 group-hover:from-indigo-600 group-hover:to-indigo-800 group-hover:text-amber-400 group-hover:shadow-lg">
                <feature.icon size={32} strokeWidth={2} />
              </div>
              <h4 className="mb-4 text-2xl font-extrabold text-slate-900 dark:text-white transition-colors group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                {feature.title}
              </h4>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300 font-medium transition-colors">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
