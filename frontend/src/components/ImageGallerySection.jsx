import React, { useState, useEffect } from 'react';
import { Camera, ZoomIn, X } from 'lucide-react';
import api from '../api/axios';

export default function ImageGallerySection() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api.get('/gallery')
      .then(res => setImages(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getFullUrl = (url) => {
    if (!url) return '';
    return url;
  };

  if (loading) return (
     <section id="gallery" className="py-24 bg-slate-900"><div className="text-center font-semibold text-indigo-400 animate-pulse">Loading gallery...</div></section>
  );

  if (images.length === 0) return (
    <section id="gallery" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-3">
             <Camera className="text-amber-500" size={20} />
             <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-400">Portfolio</h2>
             <Camera className="text-amber-500" size={20} />
          </div>
          <h3 className="text-4xl font-extrabold text-white sm:text-5xl">Image Gallery</h3>
          <p className="mt-4 text-lg text-slate-400">No data available at the moment.</p>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <section id="gallery" className="py-24 bg-slate-900 relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900 pointer-events-none"></div>
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
               <Camera className="text-amber-500" size={24} />
               <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-400">Portfolio</h2>
            </div>
            <h3 className="text-4xl font-extrabold text-white sm:text-5xl">
              Image Gallery
            </h3>
            <p className="mt-6 text-lg font-medium text-slate-300">
              A visual showcase of our finest construction and interior projects, highlighting our attention to detail.
            </p>
          </div>

          {/* Using CSS Columns for a simple Masonry layout effect */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map(image => (
              <div 
                key={image.id} 
                className="relative group overflow-hidden rounded-xl bg-slate-800 cursor-pointer shadow-lg break-inside-avoid"
                onClick={() => setSelectedImage(getFullUrl(image.imageUrl))}
              >
                <img 
                  src={getFullUrl(image.imageUrl)} 
                  alt="Gallery item"
                  className="w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                />
                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                      <ZoomIn size={24} className="text-amber-300" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Full Image Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/50 text-white hover:bg-slate-700 hover:text-amber-400 text-3xl transition-colors focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Fullscreen Preview" 
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-in zoom-in-90 duration-300 border border-slate-800" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
