import { Question, ShuffledQuestion } from './types';

/**
 * Shuffle answers and track which index is correct
 * Assumes options[0] is the correct answer
 */
export function shuffleAnswers(question: Question): ShuffledQuestion {
  const options = [...question.options];
  const correctAnswer = options[0];
  
  // Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  const correctIndex = options.indexOf(correctAnswer);
  
  return {
    ...question,
    options,
    correctIndex,
  };
}

export function shuffleMultipleQuestions(questions: Question[]): ShuffledQuestion[] {
  return questions.map(shuffleAnswers);
}

export function getAnswerStats(
  totalQuestions: number,
  correctCount: number
) {
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const score = Math.round((correctCount / totalQuestions) * 100);
  
  return {
    totalQuestions,
    correctCount,
    incorrectCount: totalQuestions - correctCount,
    percentage,
    score,
  };
}
