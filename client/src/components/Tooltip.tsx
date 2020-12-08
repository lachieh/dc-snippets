import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface Props {
  text: string;
  isVisible: boolean;
}

export default function Tooltip({ text, isVisible }: Props) {
  const transition = {
    default: { duration: 0.2 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: '-0.25rem', x: '-50%' }}
          animate={{ scale: 1, opacity: 1, y: '-0.25rem', x: '-50%' }}
          exit={{ scale: 0, opacity: 0, y: '-0.25rem', x: '-50%' }}
          transition={transition}
          className="absolute bg-black text-white text-xs rounded py-1 px-4 left-1/2 bottom-full origin-bottom"
        >
          {text}
          <svg
            className="absolute text-black h-2 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
