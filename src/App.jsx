import React, { useEffect, useState, useRef, useMemo } from 'react';
import StickerLink from './components/StickerLink';
import { motion } from 'framer-motion';

const links = [
  { id: 1, title: 'Portfolio', url: 'https://portfolio.jimiroi.com', image: '/cat.png', colorClass: 'cyan', rotation: -12 },
  { id: 2, title: 'PiYak', url: 'https://piyak.jimiroi.com', image: '/piyak.png', colorClass: '', rotation: 15 },
  { id: 3, title: 'GeeyBoard', url: 'https://github.com/NurazimRoizan/GeeyBoard', image: '/smiley.png', colorClass: 'yellow', rotation: -5 },
  { id: 4, title: 'The Bench', url: 'https://thebench.vercel.app/', image: null, colorClass: 'black', rotation: 8 },
  { id: 5, title: 'Mata', url: 'https://nurazimroizan.github.io/Mata/', image: null, colorClass: 'cyan', rotation: -20 },
  { id: 6, title: 'LinkedIn', url: 'https://www.linkedin.com/in/nurazimroy', image: null, colorClass: '', rotation: 12 },
  { id: 7, title: 'GitHub', url: 'https://github.com/NurazimRoizan', image: null, colorClass: 'black', rotation: -8 },
  { id: 8, title: 'not-my-portfolio', url: 'https://404.jimiroi.com', image: null, colorClass: 'yellow', rotation: 25 },
  { id: 9, title: 'Wallo', url: 'https://wallo.jimiroi.com', image: '/wallo.png', colorClass: 'cyan', rotation: -15 },
];

function App() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stickerPositions = useMemo(() => {
    if (windowSize.width === 0) return links.map(() => ({ left: 0, top: 0 }));

    const isMobile = windowSize.width < 768;

    // Define "controlled chaos" percentages for desktop (x: vw, y: vh)
    const desktopCoords = [
      { x: 8, y: 10 },   // Portfolio
      { x: 75, y: 8 },   // PiYak
      { x: 5, y: 45 },   // GeeyBoard
      { x: 82, y: 38 },  // The Bench (pushed further right and up to avoid title)
      { x: 12, y: 75 },  // Mata
      { x: 72, y: 78 },  // LinkedIn
      { x: 32, y: 12 },  // GitHub
      { x: 45, y: 80 },  // not-my-portfolio
      { x: 40, y: 25 },  // Wallo
    ];

    // Define "controlled chaos" percentages for mobile (x: vw, y: vh)
    // Mobile layout dodges the center (y roughly 40-60 is avoided)
    const mobileCoords = [
      { x: 5, y: 5 },    // Portfolio
      { x: 55, y: 8 },   // PiYak
      { x: 15, y: 22 },  // GeeyBoard
      { x: 60, y: 28 },  // The Bench
      { x: 5, y: 65 },   // Mata
      { x: 55, y: 62 },  // LinkedIn
      { x: 18, y: 82 },  // GitHub
      { x: 50, y: 85 },  // not-my-portfolio
      { x: 35, y: 15 },  // Wallo
    ];

    const coords = isMobile ? mobileCoords : desktopCoords;

    return links.map((link, index) => {
      // Fallback in case we add more links than predefined coords
      if (index >= coords.length) {
        return { 
          left: Math.random() * (windowSize.width * 0.8), 
          top: Math.random() * (windowSize.height * 0.8) 
        };
      }
      
      const c = coords[index];
      // Convert vw/vh percentages to absolute pixels for Framer Motion constraints to work
      return {
        left: (c.x / 100) * windowSize.width,
        top: (c.y / 100) * windowSize.height
      };
    });
  }, [windowSize.width, windowSize.height]);

  return (
    <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <motion.div 
        className="header-title"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
      >
        JIMIROI
      </motion.div>
      <div className="instruction">YEET THE STICKERS!</div>
      
      {windowSize.width > 0 && links.map((link, index) => {
        const pos = stickerPositions[index];
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
