import React, { useState, useEffect } from 'react';
import spinnerVideo from '../assets/masloading.mp4'; 

const VideoSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity ${isLoading ? 'opacity-100' : 'opacity-0'}`} >
      <video autoPlay loop muted className="w-full h-full object-cover" onLoad={() => setIsLoading(false)}>
        <source src={spinnerVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoSpinner;
