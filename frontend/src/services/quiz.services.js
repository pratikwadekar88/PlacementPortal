import axios from "axios";
import { BASE_API_URL } from "./serverConfig";
import React from "react";

export const createQuizQuestion = async (data) => {
  const url = `${BASE_API_URL}/quiz`;
  return await axios
    .post(url, data, { withCredentials: true })
    .then((response) => response.data);
};

export const getQuizQuestions = async (topic, count) => {
  const url = `${BASE_API_URL}/quiz`;
  const options = {
    params: {
      topic,
      count,
    },
    withCredentials: true,
  };
  return await axios.get(url, options).then((response) => {
    const questionList = response.data.data;
    return questionList.map((question) => {
      const optionsData = [
        question.answer,
        question.wrongOption1,
        question.wrongOption2,
        question.wrongOption3,
      ];

      const quizOptions = optionsData
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      return { ...question, options: quizOptions };
    });
  });
};

export const submitQuizResult = async (data) => {
  const url = `${BASE_API_URL}/quiz/submit`;
  return await axios
    .post(url, data, { withCredentials: true })
    .then((response) => response.data);
};

export const getStreak = async (userId) => {
  const url = `${BASE_API_URL}/quiz/streak`;
  const options = {
    params: {
      userId,
    },
  };

  return await axios.get(url, options).then((response) => response.data);
};
