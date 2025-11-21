import React, { useState, useEffect } from 'react'
import './ImageCarousel.css'

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    '/images/дом.jpg',
    '/images/дом2.jpg',
    '/images/дом3.jpg',
    '/images/дом4.jpg',
    '/images/дом5.jpg'
  ]

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length)
    }, 3000) 

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <div 
                className="carousel-image"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImage ? 'active' : ''}`}
            onClick={() => setCurrentImage(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel