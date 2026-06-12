import React, { useEffect, useState, useRef, useMemo } from 'react';
import StickerLink from './components/StickerLink';
import { motion } from 'framer-motion';

const links = [
  { id: 1, title: 'Portfolio', url: 'https://nurazimroizan.github.io/', image: '/cat.png', colorClass: 'cyan', rotation: -12 },
  { id: 2, title: 'PiYak', url: 'https://piyak.jimiroi.com', image: '/piyak.png', colorClass: '', rotation: 15 },
  { id: 3, title: 'GeeyBoard', url: 'https://github.com/NurazimRoizan/GeeyBoard', image: '/smiley.png', colorClass: 'yellow', rotation: -5 },
  { id: 4, title: 'The Bench', url: 'https://thebench.vercel.app/', image: null, colorClass: 'black', rotation: 8 },
  { id: 5, title: 'Mata', url: 'https://nurazimroizan.github.io/Mata/', image: null, colorClass: 'cyan', rotation: -20 },
  { id: 6, title: 'LinkedIn', url: 'https://www.linkedin.com/in/nurazimroy', image: null, colorClass: '', rotation: 12 },
  { id: 7, title: 'GitHub', url: 'https://github.com/NurazimRoizan', image: null, colorClass: 'black', rotation: -8 },
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
    const stickerWidth = isMobile ? 100 : 220;
    const stickerHeight = isMobile ? 100 : 220;

    const safeWidth = Math.max(0, windowSize.width - stickerWidth);
    const safeHeight = Math.max(0, windowSize.height - stickerHeight);
    
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    
    // The "JIMIROI" title bounding box
    const titleWidth = isMobile ? windowSize.width * 0.9 : 700;
    const titleHeight = isMobile ? 80 : 180;
    const titleRect = {
      left: centerX - titleWidth / 2,
      right: centerX + titleWidth / 2,
      top: centerY - titleHeight / 2,
      bottom: centerY + titleHeight / 2,
    };

    const positions = [];

    for (let i = 0; i < links.length; i++) {
      let left, top;
      let attempts = 0;
      let hasOverlap = false;

      do {
        left = Math.random() * safeWidth;
        top = Math.random() * safeHeight;
        hasOverlap = false;

        const currentRect = {
          left: left,
          right: left + stickerWidth,
          top: top,
          bottom: top + stickerHeight,
        };

        // 1. Avoid spawning on the JIMIROI title
        let overlapsTitle = false;
        if (
          currentRect.left < titleRect.right &&
          currentRect.right > titleRect.left &&
          currentRect.top < titleRect.bottom &&
          currentRect.bottom > titleRect.top
        ) {
          overlapsTitle = true;
        }

        // 2. Avoid overlapping with previously placed stickers
        let overlapsSticker = false;
        if (!overlapsTitle) {
          for (const pos of positions) {
            const prevRect = {
              left: pos.left,
              right: pos.left + stickerWidth,
              top: pos.top,
              bottom: pos.top + stickerHeight,
            };

            const margin = 10; // 10px spacing
            if (
              currentRect.left < prevRect.right + margin &&
              currentRect.right > prevRect.left - margin &&
              currentRect.top < prevRect.bottom + margin &&
              currentRect.bottom > prevRect.top - margin
            ) {
              overlapsSticker = true;
              break;
            }
          }
        }

        hasOverlap = overlapsTitle || overlapsSticker;

        // If the screen is too cramped (mobile) we might never find a perfect spot.
        // After 300 attempts, we allow stickers to overlap EACH OTHER, 
        // but we STILL strictly forbid them from overlapping the title!
        if (attempts > 300) {
          hasOverlap = overlapsTitle;
        }

        attempts++;
      } while (hasOverlap && attempts < 500); 

      positions.push({ left, top });
    }

    return positions;
  }, [windowSize.width, windowSize.height]);

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
