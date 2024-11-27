export const QuizFormData = {
  question: '',
  answer: '',
  detailedSolution: '',
  wrongOption1: '',
  wrongOption2: '',
  wrongOption3: '',
  topic: '',
  difficulty: 0,
};

export const QuizGetData = {
  question: '',
  answer: '',
  detailedSolution: '',
  wrongOption1: '',
  wrongOption2: '',
  wrongOption3: '',
  topic: '',
  difficulty: 0,
};

export const QuizData = {
  question: '',
  answer: '',
  detailedSolution: '',
  wrongOption1: '',
  wrongOption2: '',
  wrongOption3: '',
  topic: '',
  difficulty: 0,
  options: [],
};

export const QuizSubmitData = {
  topic: null,
  totalQuestionsCount: 0,
  correctAnswerCount: 0,
};

export const QuizGameState = 'menu' | 'quiz' | 'endScreen';
export const QuizReduxState = {
  gameState: QuizGameState,
  topic: null,
  isLoading: false,
  isError: false,
  quizQuestions: null,
  currentQuestion: 0,
  isQuestionAnswered: false,
  optionSelected: null,
  totalQuestionsCount: 0,
  correctAnswerCount: 0,
};
