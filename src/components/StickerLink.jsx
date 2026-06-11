import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';

const StickerLink = ({ title, url, image, colorClass, initialX, initialY, rotation, containerRef }) => {
  const [isPeeling, setIsPeeling] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef(null);
  const dragControls = useDragControls();

  const handlePointerDown = (e) => {
    // We only want left clicks or primary touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    
    const nativeEvent = e.nativeEvent;
    setIsPressed(true);

    timerRef.current = setTimeout(() => {
      setIsPeeling(true);
      dragControls.start(nativeEvent);
    }, 1000);
  };

  const handlePointerUp = () => {
    clearTimeout(timerRef.current);
    setIsPressed(false);
    setIsPeeling(false);
  };

  return (
    <motion.a
      href={url}
      target={isPeeling ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`sticker ${colorClass}`}
      
      // Prevent native browser dragging of the link
      draggable={false}
      // Prevent the context menu on long press (mobile)
      onContextMenu={(e) => e.preventDefault()}
      
      drag
      dragControls={dragControls}
      dragListener={false} 
      dragConstraints={containerRef}
      dragMomentum={false} 
      dragElastic={0} 
      
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      
      initial={{ x: initialX, y: initialY, rotate: rotation, opacity: 0, scale: 0 }}
      animate={{ 
        rotate: isPeeling ? rotation + 10 : rotation, 
        opacity: 1, 
        scale: isPeeling ? 1.15 : (isPressed ? 0.95 : 1),
        zIndex: isPeeling ? 100 : 10,
        filter: isPeeling ? `drop-shadow(15px 15px 0px rgba(0,0,0,0.5))` : `drop-shadow(0px 0px 0px rgba(0,0,0,0))`
      }}
      transition={{ 
        type: 'spring', 
        stiffness: isPeeling ? 300 : 200, 
        damping: isPeeling ? 15 : 15 
      }}
      
      onClick={(e) => {
        if (isPeeling) {
          e.preventDefault();
        }
      }}
      
      style={{
        transformOrigin: "bottom right",
        touchAction: "none", 
        // CSS overrides to prevent native iOS callouts and selection
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
