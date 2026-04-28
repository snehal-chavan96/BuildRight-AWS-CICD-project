import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Building2, ArrowRight } from 'lucide-react'
import api from '../api/axios'

function formatError(err) {
  const data = err.response?.data
  if (!data) return err.message || 'Something went wrong.'
  if (typeof data.message === 'string') return data.message
  if (data.errors && typeof data.errors === 'object') {
    const first = Object.values(data.errors)[0]
    if (typeof first === 'string') return first
  }
  return 'Request failed.'
}

function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/signup', { name, email, password })
      setSuccess('Account created successfully! Redirecting to login...')
      setTimeout(() => navigate('/login', { replace: true }), 1500)
    } catch (err) {
      setError(formatError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Blueprint background and shapes */}
        <div className="absolute inset-0 bg-blueprint-dark opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
          <div className="absolute top-1/2 right-12 w-80 h-80 rounded-full bg-amber-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-2 text-amber-400 shadow-md">
             <Building2 size={32} strokeWidth={2.5} />
          </div>
          <span className="text-3xl font-black text-white tracking-tight">Build<span className="text-amber-500">Right</span></span>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Discover Our Work.
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed mb-8">
            This platform showcases the work of a professional civil engineering firm and allows clients to explore projects and connect for inquiries.
          </p>

          <div className="space-y-4">
            {[
              "Explore our premium projects",
              "View architectural plans",
              "Connect for new inquiries"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-indigo-100">
                <div className="p-1 rounded-full bg-indigo-500/30">
                  <ArrowRight size={14} className="text-indigo-300" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center text-indigo-300 text-sm">
          <span>© 2026 BuildRight Platforms. All rights reserved.</span>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-slate-50">
        {/* Decorative elements for mobile */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-64 bg-slate-900 rounded-b-3xl">
           <div className="absolute inset-0 bg-blueprint-dark opacity-10 pointer-events-none"></div>
        </div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
            <div className="mb-8 text-center lg:text-left">
              <div className="flex lg:hidden items-center justify-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg text-amber-400">
                  <Building2 size={24} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-black text-slate-800">Build<span className="text-amber-500">Right</span></span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
              <p className="text-slate-500 mt-2">Get started with your free account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                  {success}
                </div>
              )}

              <div className="space-y-4">
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                    Email address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 py-3 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3.5 px-4 rounded-xl border border-transparent text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-indigo-600/20 text-lg"
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating account...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>Sign Up Now</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-amber-400" />
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
