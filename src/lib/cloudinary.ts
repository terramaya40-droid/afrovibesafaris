import { Cloudinary } from "@cloudinary/url-gen";

export const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'di5eh8f2y' }
});

export const getImageUrl = (path: string, width?: number) => {
  if (!path) return '/logo.jpg';
  
  // If it's a base64 encoded image, return as is (cannot easily resize client-side)
  if (path.startsWith('data:image/')) return path;

  // Handle Unsplash Images
  if (path.includes('unsplash.com')) {
    let url = new URL(path);
    if (width) url.searchParams.set('w', width.toString());
    url.searchParams.set('q', '80');
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    return url.toString();
  }
  
  // If it's already a full HTTP URL but not Unsplash, return as is
  if (path.startsWith('http')) return path;
  
  // If it's a root-relative local path, return as is
  if (path.startsWith('/')) return path;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  // If no cloud name is configured, assume it's a local image in /public/images/
  if (!cloudName) {
    if (path.includes('images/')) return `/${path}`;
    return `/images/${path}.jpg`;
  }

  // Cloudinary URL with auto optimization
  const transformations = ['q_auto', 'f_auto'];
  if (width) transformations.push(`w_${width}`, 'c_limit');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(',')}/${path}`;
};
