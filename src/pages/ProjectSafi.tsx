import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const ProjectSafi = () => {
  const images = Array.from({ length: 15 }, (_, i) => `/project/${i + 1}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-28 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mb-4 text-sm text-primary hover:underline flex items-center gap-1"
          >
            <span>←</span>
            <span>Back to projects</span>
          </button>

          <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
            <div className="p-6 border-b border-border">
              <h1 className="text-3xl font-bold mb-2">SAFI mobile desalination</h1>
              <p className="text-sm text-muted-foreground mb-1">Morocco • 140 m³/day</p>
              <p className="text-xs text-muted-foreground">
                Slides arranged from 1 to 15 below
              </p>
            </div>

            <div className="p-6 bg-muted/40">
              <h2 className="text-lg font-semibold mb-4">Project gallery</h2>
              <div className="space-y-6">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="bg-background rounded-lg shadow-sm overflow-hidden flex items-center justify-center w-full"
                    onClick={() => setSelectedImage(src)}
                  >
                    <img src={src} alt={`SAFI slide ${idx + 1}`} className="w-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="SAFI mobile desalination large view"
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl bg-background"
              onClick={() => setSelectedImage(null)}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProjectSafi;
