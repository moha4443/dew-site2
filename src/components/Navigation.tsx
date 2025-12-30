import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border mobile-safe-area-top">
      <div className="mobile-container mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 max-w-[70%] sm:max-w-none">
            <img
              src="/logo.jpg"
              alt="DEW logo"
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full object-contain bg-background shadow-sm"
            />
            <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent line-clamp-2 sm:line-clamp-1">
              DEW - Devise Energy &amp; Water
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link to="/projects" className="text-foreground hover:text-primary transition-colors font-medium">
              Projects
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
            <Link to="/why" className="text-foreground hover:text-primary transition-colors font-medium">
              Why Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground touch-target p-2 -mr-2 hover:bg-muted rounded-lg transition-colors mobile-touch-feedback"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Content */}
            <div className="fixed top-[4rem] sm:top-[5rem] left-0 right-0 bg-background border-b border-border shadow-xl z-50 md:hidden animate-slide-down max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="mobile-container py-6 space-y-1">
                <Link
                  to="/"
                  className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors mobile-touch-feedback"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors mobile-touch-feedback"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/services"
                  className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors mobile-touch-feedback"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/projects"
                  className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors mobile-touch-feedback"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors mobile-touch-feedback"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/why"
                  className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors mobile-touch-feedback"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Why Us
                </Link>
                <div className="pt-4">
                  <Button
                    variant="default"
                    className="w-full mobile-button bg-primary hover:bg-primary/90 mobile-touch-feedback"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
