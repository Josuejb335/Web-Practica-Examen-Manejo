export interface Question {
  id: number;
  question: string;
  options: string[];
  topic: string;
}

export interface ShuffledQuestion extends Question {
  correctIndex: number;
}

export interface ExamAnswer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface ExamState {
  questions: ShuffledQuestion[];
  answers: ExamAnswer[];
  currentQuestionIndex: number;
  isFinished: boolean;
  totalScore: number;
}

export interface ApiQuestion {
  id: number;
  question: string;
  options: string[];
  topic: string;
}
