import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Why from "./pages/Why";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import ProjectSafi from "./pages/ProjectSafi";
import ProjectPackagedPage from "./pages/ProjectPackagedPage";
import AllProjectsMap from "./pages/AllProjectsMap";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/why" element={<Why />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/safi" element={<ProjectSafi />} />
                        <Route path="/projects/packaged" element={<ProjectPackagedPage />} />
                        <Route path="/projects/all-map" element={<AllProjectsMap />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
