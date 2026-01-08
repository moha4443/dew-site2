import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  newsletter: boolean;
}

const Contact = () => {
  const location = useLocation();
  const prefilledEmail =
    (location.state as { email?: string } | null)?.email &&
      typeof (location.state as { email?: string }).email === 'string'
      ? (location.state as { email: string }).email
      : '';

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    defaultValues: {
      email: prefilledEmail,
      newsletter: false
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      reset(); // Clear the form
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

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
      <main className="pt-24 sm:pt-28 pb-12 sm:pb-16 relative z-10 mobile-safe-area-bottom">
        <div className="mobile-container mx-auto max-w-3xl">
          <h1 className="responsive-heading-md text-center mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
            Contact
          </h1>
          <p className="responsive-body-md text-muted-foreground text-center mb-6 sm:mb-8">
            Share a few details about your project or question and our team will get back to you as soon as
            possible to explore how we can help.
          </p>

          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-blue-100 shadow-xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Thank you for your enquiry!</h3>
                  <p className="text-green-700 text-sm mt-1">
                    We've received your message and will get back to you within 24-48 hours.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800">Submission Failed</h3>
                  <p className="text-red-700 text-sm mt-1">
                    {errorMessage || 'Something went wrong. Please try again later.'}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('fullName', {
                      required: 'Full name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className={`mobile-input border ${errors.fullName ? 'border-red-400' : 'border-blue-200'} bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Full name"
                    type="text"
                    disabled={submitStatus === 'loading'}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">Company</label>
                  <input
                    {...register('company')}
                    className="mobile-input border border-blue-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Company"
                    type="text"
                    disabled={submitStatus === 'loading'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className={`mobile-input border ${errors.email ? 'border-red-400' : 'border-blue-200'} bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Email"
                    type="email"
                    disabled={submitStatus === 'loading'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">Phone</label>
                  <input
                    {...register('phone')}
                    className="mobile-input border border-blue-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Phone"
                    type="tel"
                    disabled={submitStatus === 'loading'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base mb-1 font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' }
                  })}
                  className={`mobile-textarea border ${errors.message ? 'border-red-400' : 'border-blue-200'} bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                  placeholder="Tell us about your project or question..."
                  disabled={submitStatus === 'loading'}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <label className="flex items-start gap-2 sm:gap-3 cursor-pointer hover:text-foreground transition-colors">
                  <input
                    {...register('newsletter')}
                    type="checkbox"
                    className="mt-1 accent-blue-600 touch-target"
                    disabled={submitStatus === 'loading'}
                  />
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
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="mobile-button bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 font-medium shadow-lg hover:shadow-xl transition-all duration-300 mobile-touch-feedback w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send enquiry'
                    )}
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
