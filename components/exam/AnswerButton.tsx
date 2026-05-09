'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnswerButtonProps {
  text: string;
  index: number;
  onClick: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
}

export function AnswerButton({
  text,
  index,
  onClick,
  disabled = false,
  isSelected = false,
  isCorrect = false,
  showResult = false,
}: AnswerButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  let bgColor = 'bg-white hover:bg-gray-50';
  let borderColor = 'border-gray-200';
  let textColor = 'text-gray-900';

  if (showResult) {
    if (isSelected && isCorrect) {
      bgColor = 'bg-green-50';
      borderColor = 'border-green-300';
      textColor = 'text-green-900';
    } else if (isSelected && !isCorrect) {
      bgColor = 'bg-red-50';
      borderColor = 'border-red-300';
      textColor = 'text-red-900';
    } else if (isCorrect) {
      bgColor = 'bg-green-50';
      borderColor = 'border-green-300';
      textColor = 'text-green-900';
    }
  } else if (isSelected) {
    bgColor = 'bg-indigo-50 hover:bg-indigo-100';
    borderColor = 'border-indigo-300';
    textColor = 'text-indigo-900';
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        w-full p-4 rounded-2xl border-2 transition-all duration-200
        ${bgColor} ${borderColor} ${textColor}
        font-medium text-left
        disabled:opacity-50 disabled:cursor-not-allowed
        relative overflow-hidden
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${
              isSelected
                ? 'border-indigo-500 bg-indigo-500'
                : showResult && isCorrect
                  ? 'border-green-500 bg-green-500'
                  : showResult && isSelected && !isCorrect
                    ? 'border-red-500 bg-red-500'
                    : 'border-gray-300'
            }
          `}
        >
          {isSelected && (
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            />
          )}
          {showResult && isCorrect && !isSelected && (
            <motion.div
              className="text-white text-sm font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ✓
            </motion.div>
          )}
          {showResult && isSelected && !isCorrect && (
            <motion.div
              className="text-white text-sm font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ✗
            </motion.div>
          )}
        </div>
        <span className="flex-1">{text}</span>
      </div>

      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 bg-white/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );
}
