import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight } from 'lucide-react'
import api from '../api/axios'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)

      if (data.role === 'ADMIN') {
        navigate('/admin-dashboard', { replace: true })
      } else {
        navigate('/user-dashboard', { replace: true })
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.'
      setError(msg)
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
          <div className="absolute bottom-12 right-12 w-80 h-80 rounded-full bg-amber-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-2 text-amber-400 shadow-md">
             <Building2 size={32} strokeWidth={2.5} />
          </div>
          <span className="text-3xl font-black text-white tracking-tight">Build<span className="text-amber-500">Right</span></span>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Welcome to BuildRight.
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            This platform showcases the work of a professional civil engineering firm and allows clients to explore projects and connect for inquiries.
          </p>
        </div>

        <div className="relative z-10 flex items-center text-indigo-300 text-sm">
          <span>© 2026 BuildRight Platforms. All rights reserved.</span>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-slate-50 relative">
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
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Sign In</h2>
              <p className="text-slate-500 mt-2">Log in to continue to your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                    Email address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <div className="flex items-center justify-between mb-1 ml-1">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 placeholder-slate-400"
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
              </div>

              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </a>
              </div>

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
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-amber-400" />
                  </span>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-600 text-sm">
                Don't have an account yet?{' '}
                <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
