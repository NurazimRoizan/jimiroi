import React, { useEffect, useState } from 'react';
import StickerLink from './components/StickerLink';
import { motion } from 'framer-motion';

function App() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const randomPosition = () => {
    if (windowSize.width === 0) return { x: 0, y: 0 };
    
    // Position relative to the center (0,0) since framer-motion x/y are relative to the element's original position 
    // Wait, if the element is absolute at top:0 left:0, then x/y need to be full screen.
    // Let's assume the stickers are centered by default and we offset them.
    let x, y;
    do {
      x = (Math.random() - 0.5) * (windowSize.width - 300);
      y = (Math.random() - 0.5) * (windowSize.height - 300);
    } while (Math.abs(x) < 250 && Math.abs(y) < 150);

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', position: 'relative' }}>
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
          />
        );
      })}
    </div>
  );
}

export default App;
