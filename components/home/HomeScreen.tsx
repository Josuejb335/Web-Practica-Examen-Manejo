'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WheelPicker } from '@/components/home/WheelPicker';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function HomeScreen() {
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [maxQuestions, setMaxQuestions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/questions/count');
        if (!response.ok) throw new Error('Failed to fetch question count');
        const data = await response.json();
        setMaxQuestions(Math.min(data.total, 50)); // Cap at 50 for demo
      } catch (err) {
        console.error(err);
        setMaxQuestions(25); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionCount();
  }, []);

  const handleStart = async () => {
    setIsStarting(true);
    // Small delay for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    router.push(`/exam?amount=${selectedAmount}`);
  };

  if (loading || maxQuestions === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.h1
            className="text-5xl font-bold text-gray-900 mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Examen Manejo
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Practica para tu examen teórico
          </motion.p>
        </motion.div>

        {/* Wheel Picker */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <WheelPicker
            min={1}
            max={maxQuestions}
            defaultValue={20}
            onChange={setSelectedAmount}
            label="¿Cuántas preguntas?"
          />
        </motion.div>

        {/* Start Button */}
        <motion.button
          onClick={handleStart}
          disabled={isStarting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`
            w-full px-6 py-4 rounded-2xl font-bold text-lg
            transition-all duration-300
            ${
              isStarting
                ? 'bg-indigo-600 text-white'
                : 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50'
            }
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isStarting ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              Cargando...
            </span>
          ) : (
            'Comenzar Examen'
          )}
        </motion.button>

        {/* Info */}
        <motion.div
          className="mt-8 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-600 text-center">
            📝 Tienes <span className="font-bold text-indigo-600">{selectedAmount}</span> preguntas seleccionadas
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            Las respuestas se mezclan aleatoriamente en cada intento
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
