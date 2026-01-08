import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const ProjectPackagedPage = () => {
  const images = ['/project2/project2.jpg'];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-28 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl space-y-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <span>←</span>
            <span>Back to projects</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            DEVISE Packaged Plants | Plug &amp; Play Modular Systems
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Factory-built, modular treatment units that can be quickly deployed and integrated into existing
            infrastructure.
          </p>

          <div className="space-y-6">
            {images.map((src, idx) => (
              <button
                key={idx}
                type="button"
                className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex items-center justify-center w-full"
                onClick={() => setSelectedImage(src)}
              >
                <img src={src} alt={`Packaged plant slide ${idx + 1}`} className="w-full object-contain" />
              </button>
            ))}
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
              alt="DEVISE Packaged Plant large view"
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

export default ProjectPackagedPage;
