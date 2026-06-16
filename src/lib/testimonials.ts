import { siteData } from "@/lib/siteData";

export const testimonials = siteData.getTestimonials();
export const testimonialPreview = testimonials.slice(0, 3);
