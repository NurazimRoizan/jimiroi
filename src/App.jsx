import React, { useEffect, useState, useRef } from 'react';
import StickerLink from './components/StickerLink';
import { motion } from 'framer-motion';

function App() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const randomPosition = () => {
    if (windowSize.width === 0) return { left: 0, top: 0 };
    
    const isMobile = windowSize.width < 768;
    // Estimate max width/height of a sticker so it doesn't spawn off-screen
    const stickerWidth = isMobile ? 120 : 250;
    const stickerHeight = isMobile ? 120 : 200;

    let safeWidth = Math.max(0, windowSize.width - stickerWidth);
    let safeHeight = Math.max(0, windowSize.height - stickerHeight);

    let left, top;
    let attempts = 0;
    do {
      left = Math.random() * safeWidth;
      top = Math.random() * safeHeight;
      attempts++;
      
      const centerX = windowSize.width / 2;
      const centerY = windowSize.height / 2;
      const stickerCenterX = left + stickerWidth / 2;
      const stickerCenterY = top + stickerHeight / 2;
      
      // Avoid center on desktop so title remains visible
      const isCenter = !isMobile && Math.abs(stickerCenterX - centerX) < 200 && Math.abs(stickerCenterY - centerY) < 150;
      
      if (!isCenter) break;
    } while (attempts < 50);

    return { left, top };
  };

  const links = [
    { id: 1, title: 'Portfolio', url: 'https://nurazimroizan.github.io/', image: '/cat.png', colorClass: 'cyan', rotation: -12 },
    { id: 2, title: 'PiYak', url: 'https://github.com/NurazimRoizan/PiYak', image: '/piyak.png', colorClass: '', rotation: 15 },
    { id: 3, title: 'GeeyBoard', url: 'https://github.com/NurazimRoizan/GeeyBoard', image: '/smiley.png', colorClass: 'yellow', rotation: -5 },
    { id: 4, title: 'The Bench', url: 'https://github.com/NurazimRoizan/The-Bench', image: null, colorClass: 'black', rotation: 8 },
    { id: 5, title: 'Mata', url: 'https://github.com/NurazimRoizan/Mata', image: null, colorClass: 'cyan', rotation: -20 },
    { id: 6, title: 'LinkedIn', url: 'https://www.linkedin.com/in/nurazimroy', image: null, colorClass: '', rotation: 12 },
  ];

  return (
    <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <motion.div 
        className="header-title"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
      >
        JIMIROI
      </motion.div>
      <div className="instruction">Drag the stickers around!</div>
      
      {windowSize.width > 0 && links.map((link) => {
        const pos = randomPosition();
        return (
          <StickerLink
            key={link.id}
            title={link.title}
            url={link.url}
            image={link.image}
            colorClass={link.colorClass}
            initialLeft={pos.left}
            initialTop={pos.top}
            rotation={link.rotation}
            containerRef={containerRef}
          />
        );
      })}
    </div>
  );
}

export default App;
