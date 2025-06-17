import React, { useState, useCallback } from 'react';
import { Image, Upload, X, Check } from 'lucide-react';

const PhotoGallery = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, []);

  const handleFiles = useCallback((files) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            src: e.target.result,
            name: file.name,
            size: file.size,
            type: file.type
          };
          setUploadedImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const removeImage = useCallback((id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="mb-8">
      {/* Drag and Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 mb-6 ${
          dragActive 
            ? 'border-blue-400 bg-blue-400/10 scale-105' 
            : 'border-gray-600 hover:border-blue-400 hover:bg-blue-400/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="pointer-events-none">
          <Upload className={`w-12 h-12 mx-auto mb-4 transition-all duration-300 ${
            dragActive ? 'text-blue-400 scale-110' : 'text-gray-500'
          }`} />
          <p className={`text-lg mb-2 transition-colors duration-300 ${
            dragActive ? 'text-blue-400' : 'text-gray-400'
          }`}>
            {dragActive ? 'Drop your images here!' : 'Drag & Drop Photos Here'}
          </p>
          <p className="text-sm text-gray-500">
            Or click to browse files • PNG, JPG, GIF up to 10MB each
          </p>
        </div>
      </div>

      {/* Upload Status */}
      {uploadedImages.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Check className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-400 font-medium">
              {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''} uploaded successfully!
            </span>
          </div>
        </div>
      )}

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {uploadedImages.map((image) => (
            <div key={image.id} className="relative group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-3">
                  <h4 className="text-white font-medium text-sm mb-1 truncate">
                    {image.name}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {formatFileSize(image.size)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;