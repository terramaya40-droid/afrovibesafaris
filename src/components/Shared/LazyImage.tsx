import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '', wrapperClassName = '', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`lazy-image-wrapper ${wrapperClassName}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--cream)',
        overflow: 'hidden',
      }}
    >
      {!isLoaded && !hasError && (
        <div 
          className="skeleton-loader" 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, var(--cream) 0%, var(--warm-white) 50%, var(--cream) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear'
          }}
        />
      )}
      
      {hasError ? (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-body)'
        }}>
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={className}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 400ms ease-in-out',
            display: 'block'
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
