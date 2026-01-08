import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PrivacyPolicy = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Navigation />

            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="floating-orb floating-orb-1" />
                <div className="floating-orb floating-orb-2" />
                <div className="floating-orb floating-orb-3" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
            </div>

            <main className="pt-24 sm:pt-28 pb-12 sm:pb-16 mobile-safe-area-bottom">
                <div className="mobile-container mx-auto max-w-4xl">
                    {/* Header */}
                    <div ref={headerRef} className={`text-center mb-8 sm:mb-12 ${headerVisible ? 'fade-in-up' : 'opacity-0'}`}>
                        <h1 className="responsive-heading-lg mb-4 bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="responsive-body-md text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-border shadow-xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                        <Section
                            title="Introduction"
                            content="DEW - Devise Energy & Water GmbH ('we', 'our', 'us') respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
                        />

                        <Section
                            title="Information We Collect"
                            content="We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:"
                            list={[
                                "Identity Data: includes first name, last name, company name",
                                "Contact Data: includes email address, telephone numbers, business address",
                                "Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform",
                                "Usage Data: includes information about how you use our website and services",
                                "Marketing and Communications Data: includes your preferences in receiving marketing from us and your communication preferences"
                            ]}
                        />

                        <Section
                            title="How We Use Your Information"
                            content="We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:"
                            list={[
                                "To provide and maintain our services",
                                "To notify you about changes to our services",
                                "To provide customer support",
                                "To gather analysis or valuable information so that we can improve our services",
                                "To monitor the usage of our services",
                                "To detect, prevent and address technical issues",
                                "To provide you with news, special offers and general information about other services which we offer that are similar to those that you have already enquired about"
                            ]}
                        />

                        <Section
                            title="Data Security"
                            content="We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know."
                        />

                        <Section
                            title="Data Retention"
                            content="We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements."
                        />

                        <Section
                            title="Your Legal Rights"
                            content="Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:"
                            list={[
                                "Request access to your personal data",
                                "Request correction of your personal data",
                                "Request erasure of your personal data",
                                "Object to processing of your personal data",
                                "Request restriction of processing your personal data",
                                "Request transfer of your personal data",
                                "Withdraw consent"
                            ]}
                        />

                        <Section
                            title="Cookies"
                            content="Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive."
                        />

                        <Section
                            title="Third-Party Links"
                            content="Our website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit."
                        />

                        <Section
                            title="International Transfers"
                            content="We operate globally and may transfer your personal data to countries outside of your home country. Whenever we transfer your personal data out of your country, we ensure a similar degree of protection is afforded to it by ensuring appropriate safeguards are implemented."
                        />

                        <Section
                            title="Changes to This Privacy Policy"
                            content="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes."
                        />

                        <Section
                            title="Contact Us"
                            content="If you have any questions about this Privacy Policy, please contact us:"
                            list={[
                                "Email: info@dew-group.com",
                                "Address: Devise Energy & Water GmbH"
                            ]}
                        />

                        {/* GDPR Compliance Notice */}
                        <div className="glass rounded-xl p-4 sm:p-6 border-l-4 border-primary">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                                GDPR Compliance
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                DEW - Devise Energy & Water GmbH is committed to ensuring that our use of personal data complies with the General Data Protection Regulation (GDPR) and other applicable data protection laws. We process personal data lawfully, fairly, and in a transparent manner, and we collect personal data only for specified, explicit, and legitimate purposes.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

// Reusable Section Component
const Section = ({
    title,
    content,
    list
}: {
    title: string;
    content: string;
    list?: string[]
}) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <section ref={ref} className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                {title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                {content}
            </p>
            {list && (
                <ul className="space-y-2 ml-4 sm:ml-6">
                    {list.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default PrivacyPolicy;
