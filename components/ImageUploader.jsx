import React, { useState } from 'react';

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [quality, setQuality] = useState(0.8); // Default quality value

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setUploading(true);

    try {
      for (const file of files) {
        const imageBitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageBitmap, 0, 0);

        canvas.toBlob((blob) => {
          const fileName = `${file.name.split('.').slice(0, -1).join('.')}.webp`;
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 'image/webp', quality); // Use the quality state value
      }
    } catch (error) {
      console.error('Failed to process images:', error);
      alert('Failed to process images.');
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={quality}
        onChange={(e) => setQuality(parseFloat(e.target.value))}
        className="slider mb-4" // Add your slider styling here
      />
      <p>Quality: {quality.toFixed(2)}</p>
      <input
        type="file"
        accept="image/*"
        multiple
        disabled={uploading}
        onChange={handleUpload}
        className="mb-4"
      />
      {uploading && <p>Processing images...</p>}
    </div>
  );
};

export default ImageUploader;
