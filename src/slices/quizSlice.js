import { createSlice } from '@reduxjs/toolkit';
import initialState from '../store/initialState';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: initialState,
  reducers: {
    setCurrentQuestion(state, action) {
      state.currentQuestion = action.payload;
    },
    answerQuestion(state, action) {
      const { questionId, answer } = action.payload;
      const question = state.videos
        .flatMap(video => video.questions)
        .find(q => q.id === questionId);
      if (question) {
        question.userAnswer = answer;
      }
    },
    setCurrentVideo(state, action) {
      state.currentVideo = action.payload;
      state.currentQuestion = null;
    },
    setNextQuestion(state, action) {
      state.currentQuestion = state.videos
        .flatMap(video => video.questions)
        .find(q => q.id === action.payload);
    },
    resetQuestion(state, action) {
      const question = state.videos
        .flatMap(video => video.questions)
        .find(q => q.id === action.payload);
      if (question) {
        question.userAnswer = null;
      }
    },
  },
});

export const { setCurrentQuestion, answerQuestion, setCurrentVideo, setNextQuestion, resetQuestion } = quizSlice.actions;
export default quizSlice.reducer;
