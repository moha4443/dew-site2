import { Linkedin, Mail, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mobile-section-spacing mobile-safe-area-bottom">
      <div className="mobile-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12 items-start">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
              DEW - Devise Energy &amp; Water
            </span>
            <p className="text-sm sm:text-base text-secondary-foreground/80 leading-relaxed">
              Delivering resilient water &amp; energy infrastructure through integrated treatment and renewable
              energy solutions.
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-start md:items-end justify-center gap-3 text-sm">
            <a
              href="https://eg.linkedin.com/company/devise-energy-water"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors touch-target mobile-touch-feedback"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Devise Energy &amp; Water GmbH</span>
            </a>

            <div className="h-px w-full md:w-24 bg-secondary-foreground/20 my-1 sm:my-2" />

            <div className="flex flex-col items-start md:items-end gap-2 sm:gap-3 text-xs sm:text-sm text-secondary-foreground/80 w-full md:w-auto">
              <a
                href="mailto:info@dew-group.com"
                className="inline-flex items-center gap-2 hover:text-primary-foreground transition-colors touch-target mobile-touch-feedback"
              >
                <Mail className="w-4 h-4" />
                <span>info@dew-group.com</span>
              </a>
              <a
                href="https://www.youtube.com/@DEW-Group"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary-foreground transition-colors touch-target mobile-touch-feedback"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube overview</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-secondary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
          <p className="text-secondary-foreground/70 text-xs sm:text-sm">
            © {new Date().getFullYear()} DEW - Devise Energy &amp; Water. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link to="/privacy-policy" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors touch-target mobile-touch-feedback">
              Privacy Policy
            </Link>
            <a href="#" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors touch-target mobile-touch-feedback">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
