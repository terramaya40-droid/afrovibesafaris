import { Cloudinary } from "@cloudinary/url-gen";

export const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'di5eh8f2y' }
});

export const getImageUrl = (path: string) => {
  if (!path) return '/logo.jpg';
  
  // If it's already a full URL (Unsplash, etc.), return as is
  if (path.startsWith('http')) return path;
  
  // If it's a base64 encoded image, return as is
  if (path.startsWith('data:image/')) return path;

  // If it's a root-relative local path, return as is
  if (path.startsWith('/')) return path;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  // If no cloud name is configured, assume it's a local image in /public/images/
  if (!cloudName) {
    // If the path already points to images/ directory
    if (path.includes('images/')) return `/${path}`;
    // Fallback assume it's under images/
    return `/images/${path}.jpg`;
  }

  // Cloudinary URL with auto optimization
  return `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${path}`;
};
