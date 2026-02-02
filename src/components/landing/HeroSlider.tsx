import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    headline: 'Modern Agriculture Management',
    subtitle: 'Streamline your estate operations with comprehensive ERP solutions',
    cta: 'Enter ERP',
    image: '/slides/slide-1.jpg',
  },
  {
    id: 2,
    headline: 'Real-Time Crop Monitoring',
    subtitle: 'Track crop health, growth cycles, and optimize yields',
    cta: 'Explore Modules',
    image: '/slides/slide-2.jpg',
  },
  {
    id: 3,
    headline: 'Efficient Resource Management',
    subtitle: 'Manage assets, inventory, and workforce seamlessly',
    cta: 'Enter ERP',
    image: '/slides/slide-3.jpg',
  },
  {
    id: 4,
    headline: 'Data-Driven Decisions',
    subtitle: 'Analytics and insights to maximize productivity',
    cta: 'Explore Modules',
    image: '/slides/slide-4.jpg',
  },
  {
    id: 5,
    headline: 'Compliance & Safety',
    subtitle: 'Track applications, maintain compliance, ensure safety',
    cta: 'Enter ERP',
    image: '/slides/slide-5.jpg',
  },
  {
    id: 6,
    headline: 'Integrated Operations',
    subtitle: 'Connect all aspects of your agricultural enterprise',
    cta: 'Explore Modules',
    image: '/slides/slide-6.jpg',
  },
]

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image with fallback */}
          <div className="absolute inset-0">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].headline}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Fallback gradient background if image fails to load */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 -z-10" />
          </div>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                {slides[currentIndex].headline}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow">
                {slides[currentIndex].subtitle}
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/app"
                  className="group inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-semibold hover:bg-primary-50 transition-all shadow-xl hover:scale-105"
                >
                  {slides[currentIndex].cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
