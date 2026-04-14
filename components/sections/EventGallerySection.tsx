"use client";

import { useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/constants";
import type { GalleryItem } from "@/types";

/**
 * Event Gallery Section Component
 * 
 * Displays event portfolio in masonry grid layout with filtering and lightbox
 * 
 * Features:
 * - Masonry layout using react-masonry-css
 * - Category filtering with smooth transitions
 * - Hover effects with brightness increase and overlay
 * - Staggered fade and scale animations
 * - Lazy loading images
 * - Lightbox modal for full-size viewing
 * - Responsive: 1 col (mobile), 2 col (tablet), 3-4 col (desktop)
 * 
 * **Validates: Requirements 7.2, 7.3, 7.4, 7.5, 7.6, 7.8, 7.9, 7.10, 7.11, 15.7**
 */

interface EventGallerySectionProps {
  className?: string;
}

const categories = [
  { id: "all", label: "All Events" },
  { id: "concerts", label: "Concerts" },
  { id: "exhibitions", label: "Exhibitions" },
  { id: "conferences", label: "Conferences" },
  { id: "weddings", label: "Weddings" },
  { id: "festivals", label: "Festivals" },
];

const breakpointColumns = {
  default: 4,
  1280: 3,
  768: 2,
  640: 1,
};

export function EventGallerySection({ className = "" }: EventGallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex: number;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <section
      id="gallery"
      className={`py-20 bg-gradient-to-b from-black via-gray-900 to-black ${className}`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Event Gallery
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our portfolio of unforgettable events
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              aria-pressed={activeFilter === category.id}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="mb-6 group cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-800">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="w-full h-auto transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-xl mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-purple-400">{item.date}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-blue-400 capitalize">{item.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Marker */}
                    <div className="absolute top-4 right-4">
                      <div className="relative">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-3 h-3 bg-purple-500 rounded-full animate-ping opacity-75" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No events found in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <LightboxModal
          item={selectedImage}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  );
}

/**
 * Lightbox Modal Component
 * 
 * Features:
 * - Full-size image display
 * - Close button and navigation
 * - Focus trap within modal
 * - Close on Escape key
 * - Prevent body scroll when open
 * 
 * **Validates: Requirements 7.12, 14.5**
 */

interface LightboxModalProps {
  item: GalleryItem;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

function LightboxModal({ item, onClose, onNavigate }: LightboxModalProps) {
  // Prevent body scroll when modal is open
  useState(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowLeft") {
      onNavigate("prev");
    } else if (e.key === "ArrowRight") {
      onNavigate("next");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors"
        aria-label="Close lightbox"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("prev");
        }}
        className="absolute left-4 z-10 p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors"
        aria-label="Previous image"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("next");
        }}
        className="absolute right-4 z-10 p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors"
        aria-label="Next image"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Image Container */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-7xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
          priority
        />
        
        {/* Image Info */}
        <div className="mt-4 text-center">
          <h3 id="lightbox-title" className="text-white text-2xl font-bold mb-2">
            {item.title}
          </h3>
          <p className="text-gray-300 mb-2">{item.description}</p>
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-purple-400">{item.date}</span>
            <span className="text-gray-400">•</span>
            <span className="text-blue-400 capitalize">{item.category}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
