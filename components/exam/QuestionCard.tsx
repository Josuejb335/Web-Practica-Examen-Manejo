'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShuffledQuestion } from '@/lib/types';
import { ProgressBar } from './ProgressBar';
import { AnswerButton } from './AnswerButton';
import { useState, useEffect } from 'react';

interface QuestionCardProps {
  question: ShuffledQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
  showResult?: boolean;
  isCorrect?: boolean;
}

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  disabled = false,
  showResult = false,
  isCorrect = false,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [question.id]);

  const handleAnswer = (index: number) => {
    if (selectedIndex === null && !disabled) {
      setSelectedIndex(index);
      onAnswer(index);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 50, x: isCorrect ? 100 : -100 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: -50, x: isCorrect ? 100 : -100 }}
        transition={{
          duration: showResult ? 0.4 : 0.5,
          ease: 'easeOut',
        }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="space-y-6">
          {/* Progress */}
          <ProgressBar current={questionIndex + 1} total={totalQuestions} />

          {/* Card */}
          <motion.div
            className={`
              p-6 rounded-3xl backdrop-blur-md border transition-all duration-300
              ${
                showResult && isCorrect
                  ? 'bg-gradient-to-br from-green-50 to-green-100/50 border-green-200'
                  : showResult && !isCorrect
                    ? 'bg-gradient-to-br from-red-50 to-red-100/50 border-red-200'
                    : 'bg-white/80 border-gray-100 shadow-lg shadow-black/5'
              }
            `}
            layout
            animate={{
              scale: showResult ? 0.98 : 1,
              rotateZ: showResult && !isCorrect ? -1 : showResult && isCorrect ? 1 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Topic Badge */}
            <div className="mb-4 flex items-center gap-2">
              <motion.div
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {question.topic}
              </motion.div>
            </div>

            {/* Question */}
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {question.question}
            </motion.h2>

            {/* Answers */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, staggerChildren: 0.05 }}
            >
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                >
                  <AnswerButton
                    text={option}
                    index={index}
                    onClick={() => handleAnswer(index)}
                    disabled={disabled || selectedIndex !== null}
                    isSelected={selectedIndex === index}
                    isCorrect={index === question.correctIndex}
                    showResult={showResult}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  className={`
                    mt-6 p-4 rounded-2xl text-center font-medium
                    ${
                      isCorrect
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }
                  `}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
