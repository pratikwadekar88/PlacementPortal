import React from "react";
import { useDispatch } from "react-redux";
import { quizActions } from "../../redux/quiz/quizState";
import { useAppSelector } from "../../redux/store";
import styles from "./QuizMainMenu.module.css";

function QuizMainMenu() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.userState.topic);
 
  const handleStartQuiz = () => {
    dispatch(quizActions.setQuizState({ gameState: "quiz" }));
  };  

  return (
    <div className={styles.mainMenu}>
     
      <button
        type="button"
        onClick={handleStartQuiz}
        className={`default-button ${styles.startQuizButton}`}
      >
        Fill Form
      </button>
    </div>
  );
}

export default QuizMainMenu;
