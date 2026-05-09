'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAnswerStats } from '@/lib/utils';

interface ResultScreenProps {
  totalQuestions: number;
  correctCount: number;
  onRepeat: () => void;
}

export function ResultScreen({
  totalQuestions,
  correctCount,
  onRepeat,
}: ResultScreenProps) {
  const stats = getAnswerStats(totalQuestions, correctCount);
  const percentage = stats.percentage;

  let feedbackText = '';
  let feedbackEmoji = '';
  let feedbackColor = '';

  if (percentage === 100) {
    feedbackText = '¡Excelente!';
    feedbackEmoji = '🎉';
    feedbackColor = 'text-green-600';
  } else if (percentage >= 80) {
    feedbackText = '¡Muy bien!';
    feedbackEmoji = '😊';
    feedbackColor = 'text-indigo-600';
  } else if (percentage >= 60) {
    feedbackText = 'Buen intento';
    feedbackEmoji = '👍';
    feedbackColor = 'text-yellow-600';
  } else {
    feedbackText = 'Sigue practicando';
    feedbackEmoji = '💪';
    feedbackColor = 'text-orange-600';
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">{feedbackEmoji}</div>
          <h1 className={`text-4xl font-bold ${feedbackColor} mb-2`}>
            {feedbackText}
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 mb-8"
        >
          {/* Score Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 border border-gray-100">
            <div className="flex items-end justify-center gap-2 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-6xl font-bold text-indigo-600"
              >
                {percentage}
              </motion.div>
              <div className="text-2xl text-gray-500 mb-2">%</div>
            </div>
            <p className="text-gray-600 text-center font-medium">
              Calificación final
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200"
            >
              <p className="text-green-600 text-sm font-medium mb-1">
                Correctas
              </p>
              <p className="text-3xl font-bold text-green-700">{correctCount}</p>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-6 border border-red-200"
            >
              <p className="text-red-600 text-sm font-medium mb-1">
                Incorrectas
              </p>
              <p className="text-3xl font-bold text-red-700">
                {stats.incorrectCount}
              </p>
            </motion.div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 rounded-2xl p-6 border border-indigo-200 text-center">
            <p className="text-indigo-600 text-sm font-medium mb-1">Total</p>
            <p className="text-3xl font-bold text-indigo-700">
              {totalQuestions} preguntas
            </p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRepeat}
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40"
          >
            Intentar de nuevo
          </motion.button>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-white text-indigo-600 font-semibold rounded-2xl border-2 border-indigo-200 transition-all hover:bg-indigo-50"
            >
              Volver al inicio
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
