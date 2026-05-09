'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShuffledQuestion } from '@/lib/types';
import { QuestionCard } from './QuestionCard';
import { ResultScreen } from '@/components/results/ResultScreen';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface ExamScreenProps {
  amount: number;
}

export function ExamScreen({ amount }: ExamScreenProps) {
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/exam?amount=${amount}`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [amount]);

  const handleAnswer = (selectedIndex: number) => {
    const question = questions[currentIndex];
    const isCorrect = selectedIndex === question.correctIndex;

    setAnswers([...answers, isCorrect]);
    setShowResult(true);

    // Wait before moving to next question
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowResult(false);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  const handleRepeat = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setShowResult(false);
    setIsFinished(false);
    setLoading(true);

    // Refetch questions
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/exam?amount=${amount}`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (isFinished) {
    const correctCount = answers.filter((a) => a).length;
    return (
      <ResultScreen
        totalQuestions={amount}
        correctCount={correctCount}
        onRepeat={handleRepeat}
      />
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionIndex={currentIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            disabled={showResult}
            showResult={showResult}
            isCorrect={answers[currentIndex]}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
