"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterImage {
  before: string;
  after: string;
  title?: string;
  description?: string;
}

interface BeforeAfterSliderProps {
  images: BeforeAfterImage[];
  className?: string;
}

export default function BeforeAfterSlider({ images, className = "" }: BeforeAfterSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(images.length).fill(false));

  const currentImage = images[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle image loading
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Preload first image on mount
  useEffect(() => {
    if (!imagesLoaded[0]) {
      const img = new window.Image();
      img.src = images[0].before;
      img.onload = () => handleImageLoad(0);
    }
  }, [images, imagesLoaded]);

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    if (!imagesLoaded[nextIndex]) {
      const img = new window.Image();
      img.src = images[nextIndex].before;
      img.onload = () => handleImageLoad(nextIndex);
    }
  }, [currentIndex, images, imagesLoaded]);

  // Auto-play functionality (only when images are loaded)
  useEffect(() => {
    if (!imagesLoaded[currentIndex]) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, imagesLoaded, currentIndex]);

  if (!currentImage) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nos Transformations
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez l'impact de nos interventions professionnelles sur vos espaces verts
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-4xl mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize select-none"
          style={{ 
            width: '100%',
            height: '400px',
            maxWidth: '800px',
            margin: '0 auto'
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Loading state */}
          {!imagesLoaded[currentIndex] && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-gray-500 text-sm">Chargement de l'image...</div>
              </div>
            </div>
          )}

          {/* Before Image - Full container */}
          <div className="absolute inset-0">
            <Image
              src={currentImage.before}
              alt={`Avant - ${currentImage.title || 'Transformation'}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              onLoad={() => handleImageLoad(currentIndex)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* After Image - Same size, clipped */}
          <div
            className="absolute inset-0"
            style={{ 
              width: `${sliderPosition}%`,
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <Image
              src={currentImage.after}
              alt={`Après - ${currentImage.title || 'Transformation'}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20">
            AVANT
          </div>
          <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20">
            APRÈS
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all z-20"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all z-20"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image Info */}
        {currentImage.title && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentImage.title}
            </h3>
            {currentImage.description && (
              <p className="text-gray-600">
                {currentImage.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}