import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const StickerLink = ({ title, url, image, colorClass, initialLeft, initialTop, rotation, containerRef }) => {
  const lastClickTime = useRef(0);

  const handleClick = (e) => {
    e.preventDefault();

    const currentTime = Date.now();
    const timeDifference = currentTime - lastClickTime.current;

    if (timeDifference < 400 && timeDifference > 0) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    lastClickTime.current = currentTime;
  };

  return (
    <motion.a
      href={url}
      className={`sticker ${colorClass}`}
      
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      
      drag
      dragConstraints={containerRef}
      dragMomentum={false}
      dragElastic={0.2}
      
      initial={{ rotate: rotation, opacity: 0, scale: 0 }}
      animate={{ 
        rotate: rotation, 
        opacity: 1, 
        scale: 1,
        zIndex: 10,
        filter: `drop-shadow(0px 0px 0px rgba(0,0,0,0))`
      }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      whileTap={{ scale: 0.95, zIndex: 50 }}
      whileDrag={{ 
        scale: 1.15, 
        rotate: rotation + 10,
        zIndex: 100,
        filter: `drop-shadow(15px 15px 0px rgba(0,0,0,0.5))`
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      
      onClick={handleClick}
      
      style={{
        left: initialLeft,
        top: initialTop,
        transformOrigin: "bottom right",
        touchAction: "none", 
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitUserDrag: "none"
      }}
    >
      {image && <img src={image} alt={title} draggable="false" style={{ pointerEvents: 'none' }} />}
      <span style={{ pointerEvents: 'none' }}>{title}</span>
    </motion.a>
  );
};

export default StickerLink;
