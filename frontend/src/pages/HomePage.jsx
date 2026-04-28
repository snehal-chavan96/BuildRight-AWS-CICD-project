import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import Features from '../components/Features'
import ArchitecturalPlansSection from '../components/ArchitecturalPlansSection'
import ProjectShowcase from '../components/ProjectShowcase'
import ImageGallerySection from '../components/ImageGallerySection'
import CtaSection from '../components/CtaSection'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <ArchitecturalPlansSection />
        <ProjectShowcase />
        <Features />
        <ImageGallerySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
