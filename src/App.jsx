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
    if (windowSize.width === 0) return { x: 0, y: 0 };
    
    const isMobile = windowSize.width < 768;
    const paddingX = isMobile ? 120 : 250;
    const paddingY = isMobile ? 120 : 250;

    let safeWidth = Math.max(0, windowSize.width - paddingX);
    let safeHeight = Math.max(0, windowSize.height - paddingY);

    let x, y;
    let attempts = 0;
    do {
      x = (Math.random() - 0.5) * safeWidth;
      y = (Math.random() - 0.5) * safeHeight;
      attempts++;
    } while (!isMobile && Math.abs(x) < 200 && Math.abs(y) < 150 && attempts < 50);

    return { x, y };
  };

  const links = [
    { id: 1, title: 'Portfolio', url: 'https://portfolio.jimiroi.com', image: '/cat.png', colorClass: 'cyan', rotation: -12 },
    { id: 2, title: 'Project Alpha', url: '#', image: '/smiley.png', colorClass: '', rotation: 15 },
    { id: 3, title: 'Project Beta', url: '#', image: '/smiley.png', colorClass: 'yellow', rotation: -5 },
    { id: 4, title: 'GitHub', url: 'https://github.com/NurazimRoizan', image: null, colorClass: 'black', rotation: 8 },
    { id: 5, title: 'My Links', url: '#', image: null, colorClass: 'cyan', rotation: -20 },
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
            initialX={pos.x}
            initialY={pos.y}
            rotation={link.rotation}
            containerRef={containerRef}
          />
        );
      })}
    </div>
  );
}

export default App;
