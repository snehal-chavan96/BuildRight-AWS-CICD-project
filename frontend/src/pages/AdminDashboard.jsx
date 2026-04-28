import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderPlus, List, LogOut, Trash2, LayoutDashboard, Users, FileText, CheckCircle, Clock, Image as ImageIcon, MapPin, Eye } from 'lucide-react'
import api from '../api/axios'

const initialProjectForm = {
  title: '',
  description: '',
  location: '',
  date: '',
  budget: '',
  area: '',
  year: '',
  image: null,
  pdf: null,
}

const initialPlanForm = {
  title: '',
  description: '',
  image: null
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard') 
  const [projectForm, setProjectForm] = useState(initialProjectForm)
  const [planForm, setPlanForm] = useState(initialPlanForm)
  const [galleryImagesToUpload, setGalleryImagesToUpload] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const [planPreview, setPlanPreview] = useState(null)
  
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  
  const [inquiries, setInquiries] = useState([])
  const [loadingInquiries, setLoadingInquiries] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(false)
  
  const [plans, setPlans] = useState([])
  const [loadingPlans, setLoadingPlans] = useState(false)
  
  const [galleryImages, setGalleryImages] = useState([])
  const [loadingGallery, setLoadingGallery] = useState(false)
  
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login', { replace: true })
  }

  const validateProjectForm = () => {
    const nextErrors = {}
    if (!projectForm.title.trim()) nextErrors.title = 'Title is required'
    if (projectForm.description.trim().length < 10) nextErrors.description = 'Description must be at least 10 characters'
    if (!projectForm.location.trim()) nextErrors.location = 'Location is required'
    if (!projectForm.date.trim()) nextErrors.date = 'Date or year is required'
    if (!projectForm.image) nextErrors.image = 'Image file is required'
    if (!projectForm.pdf) nextErrors.pdf = 'PDF file is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validatePlanForm = () => {
    const nextErrors = {}
    if (!planForm.title.trim()) nextErrors.title = 'Title is required'
    if (planForm.description.trim().length < 5) nextErrors.description = 'Description required'
    if (!planForm.image) nextErrors.image = 'Image file is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const fetchProjects = async () => {
    setLoadingProjects(true)
    try {
      const { data } = await api.get('/projects')
      setProjects(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingProjects(false)
    }
  }

  const fetchInquiries = async () => {
    setLoadingInquiries(true)
    try {
      const { data } = await api.get('/inquiries')
      setInquiries(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingInquiries(false)
    }
  }

  const fetchPlans = async () => {
    setLoadingPlans(true)
    try {
      const { data } = await api.get('/plans')
      setPlans(data)
    } catch(err) {
      console.error(err)
    } finally {
      setLoadingPlans(false)
    }
  }

  const fetchGallery = async () => {
    setLoadingGallery(true)
    try {
      const { data } = await api.get('/gallery')
      setGalleryImages(data)
    } catch(err) {
      console.error(err)
    } finally {
      setLoadingGallery(false)
    }
  }

  useEffect(() => {
    fetchProjects()
    fetchInquiries()
    fetchPlans()
    fetchGallery()
  }, [])

  const handleProjectFileChange = (e, field) => {
    const file = e.target.files[0]
    setProjectForm(prev => ({ ...prev, [field]: file }))
    if (field === 'image' && file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    } else if (field === 'image') {
      setImagePreview(null)
    }
  }

  const handlePlanFileChange = (e) => {
    const file = e.target.files[0]
    setPlanForm(prev => ({ ...prev, image: file }))
    if(file) {
      const reader = new FileReader()
      reader.onloadend = () => setPlanPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setPlanPreview(null)
    }
  }

  const handleProjectSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    if (!validateProjectForm()) return
    setSubmitting(true)
    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      formData.append('location', projectForm.location);
      formData.append('date', projectForm.date);
      formData.append('budget', projectForm.budget);
      formData.append('area', projectForm.area);
      formData.append('year', projectForm.year);
      formData.append('image', projectForm.image);
      formData.append('pdf', projectForm.pdf);

      await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage('Project added successfully')
      setProjectForm(initialProjectForm)
      setImagePreview(null)
      setErrors({})
      await fetchProjects()
      setActiveTab('manage-projects')
    } catch (error) {
      console.error('Project Upload Error:', error);
      console.error('Error Response Details:', error.response?.data);
      setMessage(error.response?.data?.message || 'Failed to add project')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePlanSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if(!validatePlanForm()) return
    setSubmitting(true)
    try {
      const formData = new FormData();
      formData.append('title', planForm.title);
      formData.append('description', planForm.description);
      formData.append('image', planForm.image);

      await api.post('/plans', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage('Architectural plan added successfully')
      setPlanForm(initialPlanForm)
      setPlanPreview(null)
      setErrors({})
      await fetchPlans()
      setActiveTab('manage-plans')
    } catch(err) {
      setMessage('Failed to add plan')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGallerySubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if(galleryImagesToUpload.length === 0) {
      setErrors({gallery: 'Please select images'})
      return
    }
    setSubmitting(true)
    try {
      const formData = new FormData()
      for(let i=0; i<galleryImagesToUpload.length; i++) {
        formData.append('images', galleryImagesToUpload[i])
      }
      await api.post('/gallery', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      setMessage('Images uploaded successfully')
      setGalleryImagesToUpload([])
      setErrors({})
      await fetchGallery()
      setActiveTab('manage-gallery')
    } catch(err) {
      setMessage('Failed to upload images')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return
    setDeletingId(id)
    setMessage('')
    try {
      await api.delete(`/projects/${id}`)
      setProjects((prev) => prev.filter((p) => p.id !== id))
      setMessage('Project deleted successfully')
    } catch (error) {
      setMessage('Failed to delete project')
    } finally {
      setDeletingId(null)
    }
  }

  const handleDeletePlan = async (id) => {
    if (!window.confirm('Delete this plan?')) return
    setDeletingId(id)
    try {
      await api.delete(`/plans/${id}`)
      setPlans(prev => prev.filter(p => p.id !== id))
      setMessage('Plan deleted')
    } catch(err) {
      setMessage('Failed to delete plan')
    } finally {
      setDeletingId(null)
    }
  }

  const handleDeleteGallery = async (id) => {
    if( !window.confirm('Delete this image?')) return
    setDeletingId(id)
    try {
      await api.delete(`/gallery/${id}`)
      setGalleryImages(prev => prev.filter(g => g.id !== id))
      setMessage('Image deleted')
    } catch(err) {
      setMessage('Failed to delete image')
    } finally {
      setDeletingId(null)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/inquiries/${id}/status`, { status })
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)))
      if(selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({...selectedInquiry, status})
      }
      setMessage(`Inquiry marked as ${status}`)
    } catch (error) {
      setMessage('Failed to update status')
    }
  }

  const getFullUrl = (url) => {
    if (!url) return '';
    return url;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 hidden md:flex md:flex-col fixed h-full z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 group">
            <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-2 text-amber-400 shadow-md">
              <LayoutDashboard size={20} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tight text-white transition-colors">
              Build<span className="text-amber-500">Right</span>
            </span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'add-project', label: 'Add Project', icon: FolderPlus },
            { id: 'manage-projects', label: 'Manage Projects', icon: List },
            { id: 'add-plan', label: 'Add Arc Plan', icon: FolderPlus },
            { id: 'manage-plans', label: 'Manage Plans', icon: List },
            { id: 'add-gallery', label: 'Add Gallery Images', icon: ImageIcon },
            { id: 'manage-gallery', label: 'Manage Gallery', icon: List },
          ].map(item =>              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMessage(''); setErrors({}); setSelectedInquiry(null); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-bold transition-all duration-300 ${activeTab === item.id || (activeTab === 'inquiry-details' && item.id==='inquiries') ? 'bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-indigo-400'}`}
              >
                <item.icon size={20} className={activeTab === item.id || (activeTab === 'inquiry-details' && item.id==='inquiries') ? 'text-amber-400' : 'text-slate-500'} /> {item.label}
              </button>
          )}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-400 font-medium transition hover:bg-slate-800 hover:text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-slate-50 min-h-screen">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 capitalize flex items-center gap-2">
            {activeTab.replace('-', ' ')}
          </h2>
        </header>

        <div className="p-8 max-w-7xl mx-auto pb-24">
          {message ? (
            <div className="mb-6 rounded-xl border border-indigo-100 bg-indigo-50/50 backdrop-blur-sm px-4 py-4 text-sm text-indigo-700 flex items-center gap-2 shadow-sm animate-in fade-in slide-in-from-top-2">
              <CheckCircle size={18} /> {message}
            </div>
          ) : null}

           {/* DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Projects', count: projects.length, icon: FolderPlus, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/40' },
                  { label: 'Total Inquiries', count: inquiries.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/40' },
                  { label: 'Arch Plans', count: plans.length, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/40' },
                  { label: 'Gallery Images', count: galleryImages.length, icon: ImageIcon, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/40' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-800/40 group">
                    <div className={`p-4 ${stat.bg} ${stat.color} rounded-xl group-hover:scale-110 transition-transform`}>
                      <stat.icon size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</p>
                      <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{stat.count}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Recent Inquiries</h3>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50/50 dark:bg-slate-800/30 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                         <tr>
                            <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Name</th>
                            <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Project Type</th>
                            <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Budget</th>
                            <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Status</th>
                            <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                         {inquiries.slice(0, 5).map((inq) => (
                            <tr key={inq.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                               <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{inq.name}</td>
                               <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{inq.type}</td>
                               <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{inq.budget}</td>
                               <td className="px-6 py-4">
                                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${inq.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400' : inq.status === 'Rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400'}`}>
                                     {inq.status}
                                  </span>
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <button onClick={() => { setSelectedInquiry(inq); setActiveTab('inquiry-details'); }} className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 text-sm flex items-center justify-end gap-1 w-full"><Eye size={16}/> View Details</button>
                               </td>
                            </tr>
                         ))}
                         {inquiries.length === 0 && (
                           <tr>
                              <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">No inquiries found.</td>
                           </tr>
                         )}
                      </tbody>
                   </table>
                </div>
              </div>
            </div>
          )}

          {/* ADD PROJECT */}
          {activeTab === 'add-project' && (
            <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
              <section className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Project Title</label>
                        <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 transition-colors" />
                        {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                    </div>
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                        <input type="text" value={projectForm.location} onChange={(e) => setProjectForm({...projectForm, location: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 transition-colors" />
                        {errors.location && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Budget (₹)</label>
                        <input type="text" value={projectForm.budget} onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 transition-colors" placeholder="e.g. ₹50 Lakhs" />
                    </div>
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Area (sq ft)</label>
                        <input type="text" value={projectForm.area} onChange={(e) => setProjectForm({...projectForm, area: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 transition-colors" />
                    </div>
                    <div className="relative">
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Completion Year / Date</label>
                        <input type="text" value={projectForm.date} onChange={(e) => setProjectForm({...projectForm, date: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 transition-colors" />
                        {errors.date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
                    </div>
                  </div>
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                    <textarea value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} rows={4} className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 transition-colors" />
                    {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Cover Image</label>
                        <input type="file" accept="image/*" onChange={(e) => handleProjectFileChange(e, 'image')} className="w-full cursor-pointer rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 p-2 text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100" />
                        {errors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>}
                        {imagePreview && <img src={imagePreview} className="mt-4 h-32 w-full object-cover rounded-xl border border-slate-200 dark:border-slate-600" alt="Preview"/>}
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Project PDF File</label>
                        <input type="file" accept=".pdf" onChange={(e) => handleProjectFileChange(e, 'pdf')} className="w-full cursor-pointer rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 p-2 text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100" />
                        {errors.pdf && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pdf}</p>}
                      </div>
                  </div>
                  <button type="submit" disabled={submitting} className="rounded-xl w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 px-8 py-3.5 text-base font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70">
                    {submitting ? 'Uploading...' : 'Save Project'}
                  </button>
                </form>
              </section>
            </div>
          )}

          {/* MANAGE PROJECTS */}
          {activeTab === 'manage-projects' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                  <img src={getFullUrl(project.imageUrl)} className="h-48 w-full object-cover"/>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{project.title}</h3>
                    <p className="text-sm font-medium flex items-center gap-1 text-indigo-600 mb-2"><MapPin size={14}/>{project.location}</p>
                    <p className="text-sm text-slate-500 mb-2">Budget: {project.budget}</p>
                    <div className="mt-auto pt-4 flex gap-2">
                       <button onClick={() => handleDeleteProject(project.id)} disabled={deletingId === project.id} className="w-full py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition">
                         <Trash2 size={16} /> Delete
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADD ARC PLAN */}
          {activeTab === 'add-plan' && (
            <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
              <section className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                <form onSubmit={handlePlanSubmit} className="space-y-6">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Plan Title</label>
                    <input type="text" value={planForm.title} onChange={(e) => setPlanForm({...planForm, title: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 transition-colors" />
                    {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                    <textarea value={planForm.description} onChange={(e) => setPlanForm({...planForm, description: e.target.value})} rows={3} className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 transition-colors" />
                    {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Plan Image</label>
                    <input type="file" accept="image/*" onChange={handlePlanFileChange} className="w-full cursor-pointer rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 p-2 text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 dark:file:text-indigo-400" />
                    {errors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>}
                    {planPreview && <img src={planPreview} className="mt-4 h-48 w-full rounded-xl object-contain bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" alt="Preview"/>}
                  </div>
                  <button type="submit" disabled={submitting} className="rounded-xl w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 px-8 py-3.5 text-base font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70">
                    {submitting ? 'Uploading...' : 'Save Plan'}
                  </button>
                </form>
              </section>
            </div>
          )}

          {/* MANAGE PLANS */}
          {activeTab === 'manage-plans' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {plans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                  <img src={getFullUrl(plan.imageUrl)} className="h-48 w-full object-cover"/>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{plan.description}</p>
                    <div className="mt-auto pt-4 flex gap-2">
                       <button onClick={() => handleDeletePlan(plan.id)} disabled={deletingId === plan.id} className="w-full py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition">
                         <Trash2 size={16} /> Delete
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADD GALLERY IMAGES */}
          {activeTab === 'add-gallery' && (
            <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
              <section className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                <form onSubmit={handleGallerySubmit} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Select Multiple Images</label>
                    <input type="file" multiple accept="image/*" onChange={(e) => setGalleryImagesToUpload(Array.from(e.target.files))} className="w-full cursor-pointer rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 p-2 text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 dark:file:text-indigo-400" />
                    {errors.gallery && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gallery}</p>}
                    {galleryImagesToUpload.length > 0 && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{galleryImagesToUpload.length} files selected.</p>}
                  </div>
                  <button type="submit" disabled={submitting} className="rounded-xl w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 px-8 py-3.5 text-base font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70">
                    {submitting ? 'Uploading...' : 'Upload Gallery Images'}
                  </button>
                </form>
              </section>
            </div>
          )}

          {/* MANAGE GALLERY */}
          {activeTab === 'manage-gallery' && (
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-500">
                {galleryImages.map((img) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                    <img src={getFullUrl(img.imageUrl)} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button onClick={() => handleDeleteGallery(img.id)} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition transform hover:scale-110">
                         <Trash2 size={20} />
                       </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="animate-in fade-in duration-500 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                     <tr>
                        <th className="px-6 py-4 border-b border-slate-200">Name</th>
                        <th className="px-6 py-4 border-b border-slate-200">Project Type</th>
                        <th className="px-6 py-4 border-b border-slate-200">Budget</th>
                        <th className="px-6 py-4 border-b border-slate-200">Status</th>
                        <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-4 font-medium text-slate-900">{inq.name}</td>
                           <td className="px-6 py-4 text-slate-700">{inq.type}</td>
                           <td className="px-6 py-4 font-medium text-slate-700">{inq.budget}</td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${inq.status === 'Pending' ? 'bg-amber-100 text-amber-800' : inq.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                 {inq.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button onClick={() => { setSelectedInquiry(inq); setActiveTab('inquiry-details'); }} className="text-indigo-600 font-medium hover:text-indigo-800 text-sm flex items-center justify-end gap-1 w-full"><Eye size={16}/> View Details</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}

          {/* INQUIRY DETAILS VIEW */}
          {activeTab === 'inquiry-details' && selectedInquiry && (
            <div className="animate-in fade-in duration-500 max-w-4xl">
              <button onClick={() => setActiveTab('inquiries')} className="mb-6 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">← Back to Inquiries</button>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="text-xl font-bold text-slate-900">Inquiry Details</h3>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${selectedInquiry.status === 'Pending' ? 'bg-amber-100 text-amber-800' : selectedInquiry.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                     {selectedInquiry.status}
                  </span>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div><p className="text-sm text-slate-500 font-medium">Customer Name</p><p className="text-lg font-bold text-slate-900">{selectedInquiry.name}</p></div>
                    <div><p className="text-sm text-slate-500 font-medium">Email Address</p><p className="text-lg text-slate-900">{selectedInquiry.email}</p></div>
                    <div><p className="text-sm text-slate-500 font-medium">Phone Number</p><p className="text-lg text-slate-900">{selectedInquiry.phone}</p></div>
                    <div><p className="text-sm text-slate-500 font-medium">Project Location</p><p className="text-lg text-slate-900">{selectedInquiry.location}</p></div>
                  </div>
                  <div className="space-y-6">
                    <div><p className="text-sm text-slate-500 font-medium">Project Type</p><p className="text-lg font-bold text-slate-900">{selectedInquiry.type}</p></div>
                    <div><p className="text-sm text-slate-500 font-medium">Estimated Budget</p><p className="text-lg text-slate-900 font-medium text-indigo-600">{selectedInquiry.budget}</p></div>
                    <div className="flex gap-6">
                      <div><p className="text-sm text-slate-500 font-medium">Plot Area</p><p className="text-lg text-slate-900">{selectedInquiry.plotArea}</p></div>
                      <div><p className="text-sm text-slate-500 font-medium">Construction Area</p><p className="text-lg text-slate-900">{selectedInquiry.constructionArea}</p></div>
                    </div>
                    <div><p className="text-sm text-slate-500 font-medium">Timeline</p><p className="text-lg text-slate-900">{selectedInquiry.timeline}</p></div>
                  </div>
                  <div className="md:col-span-2 mt-4 pt-6 border-t border-slate-100">
                    <p className="text-sm text-slate-500 font-medium mb-2">Message</p>
                    <div className="bg-slate-50 p-4 rounded-xl text-slate-800 whitespace-pre-wrap border border-slate-100">
                      {selectedInquiry.message || 'No additional message provided.'}
                    </div>
                  </div>
                </div>
                {selectedInquiry.status === 'Pending' && (
                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4 justify-end">
                    <button onClick={() => handleUpdateStatus(selectedInquiry.id, 'Rejected')} className="px-6 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 font-bold hover:bg-red-50 transition shadow-sm">Reject Inquiry</button>
                    <button onClick={() => handleUpdateStatus(selectedInquiry.id, 'Approved')} className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-sm shadow-emerald-200">Approve & Start Project</button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
