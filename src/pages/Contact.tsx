import { useLocation, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const Contact = () => {
  const location = useLocation();
  const prefilledEmail =
    (location.state as { email?: string } | null)?.email &&
      typeof (location.state as { email?: string }).email === 'string'
      ? (location.state as { email: string }).email
      : '';
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-sky-500/10 animate-gradient"></div>

        {/* Floating connection nodes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-sky-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

        {/* Grid pattern for connection theme */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>

      <Navigation />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative z-10 mobile-safe-area-bottom">
        <div className="mobile-container mx-auto max-w-3xl">
          <h1 className="responsive-heading-md text-center mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
            Contact
          </h1>
          <p className="responsive-body-md text-muted-foreground text-center mb-6 sm:mb-8">
            Share a few details about your project or question and our team will get back to you as soon as
            possible to explore how we can help.
          </p>

          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-blue-100 shadow-xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">Full name</label>
                  <input
                    className="mobile-input border border-blue-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Full name"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">Company</label>
                  <input
                    className="mobile-input border border-blue-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Company"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">Email</label>
                  <input
                    className="mobile-input border border-blue-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Email"
                    type="email"
                    defaultValue={prefilledEmail}
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">Phone</label>
                  <input
                    className="mobile-input border border-blue-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Phone"
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">Message</label>
                <textarea
                  className="mobile-textarea border border-blue-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Message"
                ></textarea>
              </div>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <label className="flex items-start gap-2 sm:gap-3 cursor-pointer hover:text-foreground transition-colors">
                  <input type="checkbox" className="mt-1 accent-blue-600 touch-target" />
                  <span className="text-sm">
                    I agree to receive communications including updates and newsletters. I understand that I can
                    unsubscribe at any time.
                  </span>
                </label>

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-2">
                  <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                    By submitting you agree to our <Link to="/privacy-policy" className="underline text-blue-600 hover:text-blue-700">Privacy Policy</Link>.
                  </div>
                  <button
                    type="button"
                    className="mobile-button bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg hover:shadow-xl transition-all duration-300 mobile-touch-feedback w-full sm:w-auto"
                  >
                    Send enquiry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 6s ease-in-out infinite;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default Contact;
