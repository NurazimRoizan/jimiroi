import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';

const StickerLink = ({ title, url, image, colorClass, initialX, initialY, rotation, containerRef }) => {
  const [isPeeling, setIsPeeling] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef(null);
  const dragControls = useDragControls();

  const handlePointerDown = (e) => {
    // Store the native event to pass to dragControls later
    const nativeEvent = e.nativeEvent;
    setIsPressed(true);

    timerRef.current = setTimeout(() => {
      setIsPeeling(true);
      // Start the drag programmatically after 1s
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
      
      drag
      dragControls={dragControls}
      dragListener={false} // We manually trigger drag
      dragConstraints={containerRef}
      dragMomentum={false} // No sliding after release as requested
      dragElastic={0} // Exact 1:1 following
      
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
        // When peeling, we simulate it being lifted by a drop-shadow
        filter: isPeeling ? `drop-shadow(15px 15px 0px rgba(0,0,0,0.5))` : `drop-shadow(0px 0px 0px rgba(0,0,0,0))`
      }}
      transition={{ 
        type: 'spring', 
        stiffness: isPeeling ? 300 : 200, 
        damping: isPeeling ? 15 : 15 
      }}
      
      onClick={(e) => {
        // If we peeled and dragged, prevent navigation
        if (isPeeling) {
          e.preventDefault();
        }
      }}
      
      style={{
        transformOrigin: "bottom right", // Peeling from bottom right
        touchAction: "none" // Prevent default browser panning on mobile
      }}
    >
      {image && <img src={image} alt={title} draggable="false" />}
      <span>{title}</span>
    </motion.a>
  );
};

export default StickerLink;
