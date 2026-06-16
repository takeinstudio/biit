import { siteData } from "@/lib/siteData";

export const galleryImages = siteData.getGallery().map(g => g.url);
export const galleryData = siteData.getGallery();
