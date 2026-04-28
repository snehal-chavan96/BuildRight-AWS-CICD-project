import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  PlusCircle, 
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  IndianRupee,
  Ruler,
  Calendar,
  FileText
} from 'lucide-react';
import api from '../api/axios';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // New Inquiry Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Residential',
    budget: 'Under ₹50 Lakhs',
    location: '',
    plotArea: '',
    constructionArea: '',
    timeline: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/inquiries/my');
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inquiries', label: 'My Inquiries', icon: MessageSquare },
    { id: 'new', label: 'New Inquiry', icon: PlusCircle },
  ];

  const handleNewInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');
    
    try {
      await api.post('/inquiries', form);
      setMessage('Inquiry submitted successfully!');
      setForm({
        name: '',
        email: '',
        phone: '',
        type: 'Residential',
        budget: 'Under ₹50 Lakhs',
        location: '',
        plotArea: '',
        constructionArea: '',
        timeline: '',
        message: ''
      });
      fetchInquiries();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-black text-slate-900">
            Build<span className="text-amber-500">Right</span>
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMessage(''); setError(''); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-md font-bold' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-700 font-medium'
                }`}
              >
                <Icon size={20} className={activeTab === item.id ? 'text-amber-400' : 'text-slate-400 group-hover:text-indigo-600'} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between md:hidden">
            <h1 className="text-xl font-bold text-slate-800">BuildRight</h1>
            <button onClick={handleLogout} className="text-slate-600 hover:text-slate-900">
                <LogOut size={24} />
            </button>
        </header>

        <div className="p-8 pb-12 flex-1 max-w-5xl">
          
          {message && <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 border border-green-200">{message}</div>}
          {error && <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200">{error}</div>}

          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Welcome Back!</h2>
                <p className="text-slate-500 mt-1">Here is the latest update on your inquiries.</p>
              </div>

              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-700">Total Inquiries</h3>
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{inquiries.length}</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-700">Pending</h3>
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                      <Clock size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{inquiries.filter(i => i.status === 'Pending').length}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-700">Approved</h3>
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{inquiries.filter(i => i.status === 'Approved').length}</p>
                </div>
              </div>

              {/* Recent Inquiries Section */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-800">Recent Inquiries</h3>
                  <button onClick={() => setActiveTab('inquiries')} className="text-sm text-indigo-600 font-bold hover:text-indigo-700 transition">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {loading ? (
                    <p className="p-6 text-slate-500">Loading...</p>
                  ) : inquiries.length === 0 ? (
                    <p className="p-6 text-slate-500">No inquiries found. Create one to get started.</p>
                  ) : (
                    inquiries.slice(0, 4).map((item, i) => (
                      <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <h4 className="font-medium text-slate-800">{item.type}</h4>
                          <p className="text-sm text-slate-500 mt-0.5">{item.budget}</p>
                        </div>
                        {item.status === 'Pending' && (
                          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium flex items-center gap-1.5">
                            <Clock size={14} /> Pending
                          </span>
                        )}
                        {item.status === 'Approved' && (
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex items-center gap-1.5">
                            <CheckCircle2 size={14} /> Approved
                          </span>
                        )}
                        {item.status === 'Rejected' && (
                          <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium flex items-center gap-1.5">
                            <AlertCircle size={14} /> Rejected
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">My Inquiries</h2>
                <p className="text-slate-500 mt-1">Review all your submitted inquiries and their statuses.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {loading ? (
                    <p className="p-6 text-slate-500">Loading...</p>
                  ) : inquiries.length === 0 ? (
                    <div className="p-12 flex flex-col items-center">
                      <MessageSquare className="text-slate-300 w-16 h-16 mb-4" />
                      <p className="text-slate-500 font-medium">You haven't made any inquiries yet.</p>
                      <button onClick={() => setActiveTab('new')} className="mt-4 text-white bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 px-6 py-2.5 font-bold shadow-md rounded-xl transition">Submit an Inquiry</button>
                    </div>
                  ) : (
                    inquiries.map((item) => (
                      <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-800 text-lg">{item.type}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-sm text-slate-600">
                            <span className="flex items-center gap-1.5"><strong className="text-slate-700">For:</strong> {item.name}</span>
                            <span className="flex items-center gap-1.5"><strong className="text-slate-700">Budget:</strong> {item.budget}</span>
                            <span className="flex items-center gap-1.5"><strong className="text-slate-700">Contact:</strong> {item.email}</span>
                          </div>
                        </div>
                        <div>
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 ${
                            item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'new' && (
            <div className="animate-in fade-in duration-500 max-w-3xl mx-auto flex flex-col items-center">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">New Inquiry</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Fill out the form below to submit a new inquiry.</p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 w-full rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <form onSubmit={handleNewInquiry} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                          type="text" 
                          required 
                          value={form.name}
                          onChange={(e) => setForm({...form, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                          type="email" 
                          required 
                          value={form.email}
                          onChange={(e) => setForm({...form, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                          type="tel" 
                          required 
                          value={form.phone}
                          onChange={(e) => setForm({...form, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm"
                          placeholder="+91 9881488565"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                          type="text" 
                          required 
                          value={form.location}
                          onChange={(e) => setForm({...form, location: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm"
                          placeholder="Project Location"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Type</label>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <select 
                          required
                          value={form.type}
                          onChange={(e) => setForm({...form, type: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm appearance-none"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Renovation">Renovation</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estimated Budget (₹)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                          type="text" 
                          required 
                          value={form.budget}
                          onChange={(e) => setForm({...form, budget: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm"
                          placeholder="e.g. ₹50 Lakhs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Plot Area (sq ft)</label>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                          type="text" 
                          value={form.plotArea}
                          onChange={(e) => setForm({...form, plotArea: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm"
                          placeholder="e.g. 2000 sq ft"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Construction Area (sq ft)</label>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                          type="text" 
                          value={form.constructionArea}
                          onChange={(e) => setForm({...form, constructionArea: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm"
                          placeholder="e.g. 1500 sq ft"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 relative group">
                       <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timeline</label>
                       <div className="relative">
                         <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                         <input 
                           type="text" 
                           value={form.timeline}
                           onChange={(e) => setForm({...form, timeline: e.target.value})}
                           className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm"
                           placeholder="e.g. Within 6 months"
                         />
                       </div>
                    </div>
                  </div>

                  <div className="relative group">
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                     <div className="relative">
                       <FileText className="absolute left-3 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                       <textarea 
                         required 
                         value={form.message}
                         onChange={(e) => setForm({...form, message: e.target.value})}
                         className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 shadow-sm min-h-[100px]"
                         placeholder="Additional details about your inquiry..."
                       ></textarea>
                     </div>
                  </div>
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-bold py-3.5 px-4 rounded-xl transition duration-300 shadow-md hover:shadow-xl shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed text-lg active:scale-[0.98]"
                    >
                      {submitting ? 'Submitting...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

