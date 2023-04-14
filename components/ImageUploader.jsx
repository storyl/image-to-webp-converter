import { useState } from 'react';

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setUploading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const { files } = await res.json();
      files.forEach(({ fileName, base64Data }) => {
        const link = document.createElement('a');
        link.href = `data:image/webp;base64,${base64Data}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      alert('Failed to process images.');
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center">
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