import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const StickerLink = ({ title, url, image, colorClass, initialX, initialY, rotation }) => {
  const isDragging = useRef(false);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`sticker ${colorClass}`}
      drag
      dragMomentum={true}
      whileHover={{ scale: 1.1, rotate: rotation > 0 ? rotation + 5 : rotation - 5, zIndex: 50 }}
      whileTap={{ scale: 0.95, zIndex: 50 }}
      initial={{ x: initialX, y: initialY, rotate: rotation, opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDragging.current = false;
        }, 100);
      }}
      onClick={(e) => {
        if (isDragging.current) {
          e.preventDefault();
        }
      }}
    >
      {image && <img src={image} alt={title} draggable="false" />}
      <span>{title}</span>
    </motion.a>
  );
};

export default StickerLink;
