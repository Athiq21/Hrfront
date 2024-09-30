import React from 'react';

interface ImageDisplayProps {
  imageUrl: string;
  altText?: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, altText = 'Image' }) => {
  return (
    <div className="flex justify-center">
      <img src={imageUrl} alt={altText} className="rounded-lg shadow-md max-w-full h-auto" />
    </div>
  );
};

export default ImageDisplay;
