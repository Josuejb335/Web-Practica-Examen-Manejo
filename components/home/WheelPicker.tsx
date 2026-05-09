'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface WheelPickerProps {
  min: number;
  max: number;
  defaultValue?: number;
  onChange: (value: number) => void;
  label?: string;
}

export function WheelPicker({
  min,
  max,
  defaultValue = Math.floor((min + max) / 2),
  onChange,
  label = 'Seleccionar',
}: WheelPickerProps) {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startValueRef = useRef(value);

  const itemHeight = 52;
  const visibleItems = 3;
  const range = max - min + 1;

  // Get visible items
  const visibleRange = [];
  for (let i = -1; i <= 1; i++) {
    let idx = (value - min + i + range) % range;
    visibleRange.push(min + idx);
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current?.contains(e.target as Node)) {
      setIsDragging(true);
      startYRef.current = e.clientY;
      startValueRef.current = value;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const delta = startYRef.current - e.clientY;
    const itemsMoved = Math.round(delta / itemHeight);
    let newValue = startValueRef.current + itemsMoved;

    // Wrap around
    while (newValue < min) newValue += range;
    while (newValue > max) newValue -= range;

    setValue(newValue);
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value]);

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
    startValueRef.current = value;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const delta = startYRef.current - e.touches[0].clientY;
    const itemsMoved = Math.round(delta / itemHeight);
    let newValue = startValueRef.current + itemsMoved;

    while (newValue < min) newValue += range;
    while (newValue > max) newValue -= range;

    setValue(newValue);
    onChange(newValue);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, value]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {label && (
        <motion.h2
          className="text-3xl font-bold text-gray-900 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {label}
        </motion.h2>
      )}

      <motion.div
        ref={containerRef}
        className="relative h-56 w-32 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
        </div>

        {/* Center highlight */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-14 border-2 border-indigo-300 rounded-2xl pointer-events-none z-5 shadow-lg shadow-indigo-200/50" />

        {/* Items */}
        <div className="flex flex-col items-center justify-center h-full relative z-0">
          {visibleRange.map((item, i) => (
            <motion.div
              key={item}
              className={`
                h-14 flex items-center justify-center font-bold transition-colors
                ${
                  item === value
                    ? 'text-3xl text-indigo-600'
                    : 'text-xl text-gray-400'
                }
              `}
              animate={{
                opacity: item === value ? 1 : 0.5,
                scale: item === value ? 1.1 : 0.9,
              }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Current value display */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-gray-600 text-sm mb-2">Preguntas seleccionadas</p>
        <p className="text-5xl font-bold text-indigo-600">{value}</p>
      </motion.div>

      {/* Help text */}
      <motion.p
        className="text-center text-sm text-gray-500 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Desliza hacia arriba o abajo para seleccionar
      </motion.p>
    </div>
  );
}
