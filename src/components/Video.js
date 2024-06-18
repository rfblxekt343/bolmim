import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuestion, answerQuestion, setCurrentVideo, resetQuestion, setNextQuestion } from '../slices/quizSlice';
import Modal from './Modal';
import './Video.css';

const Video = () => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const { videos, currentVideo, currentQuestion } = useSelector((state) => state.quiz);
  const currentVideoData = videos.find(v => v.id === currentVideo);
  const [isPlaying, setIsPlaying] = useState(false);
  const [initialPlay, setInitialPlay] = useState(true);
  const [selectedOptionIndices, setSelectedOptionIndices] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const checkQuestionTime = () => {
      const currentTime = video.currentTime;

      if (currentVideoData && currentVideoData.questions) {
        const question = currentVideoData.questions.find(q => q.time <= currentTime && q.userAnswer === null);

        if (question) {
          video.pause();
          dispatch(setCurrentQuestion(question));
        }
      }
    };

    const handleVideoEnd = () => {
      if (currentVideoData && currentVideoData.nextVideoOnEnd) {
        dispatch(setCurrentVideo(currentVideoData.nextVideoOnEnd));
      } else if (currentVideo === 8) {
        setShowModal(true);
      }
    };

    if (video) {
      video.addEventListener('timeupdate', checkQuestionTime);
      video.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', checkQuestionTime);
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [currentVideoData, dispatch, currentVideo]);

  const handleOptionClick = (optionIndex) => {
    let updatedSelectedOptions;
    if (selectedOptionIndices.includes(optionIndex)) {
      updatedSelectedOptions = selectedOptionIndices.filter(index => index !== optionIndex);
    } else {
      updatedSelectedOptions = [...selectedOptionIndices, optionIndex];
    }
    setSelectedOptionIndices(updatedSelectedOptions);
  };

  const handleSubmitAnswer = () => {
    const question = currentQuestion;
    const isAnswerCorrect = question.correctAnswer.every(answer => selectedOptionIndices.includes(answer)) &&
                            question.correctAnswer.length === selectedOptionIndices.length;

    setIsCorrect(isAnswerCorrect);

    dispatch(answerQuestion({ questionId: question.id, answer: selectedOptionIndices }));

    // Update the option classes based on the correctness of the answers
    currentQuestion.options.forEach((option, index) => {
      const button = document.getElementById(`option-${index}`);
      if (selectedOptionIndices.includes(index)) {
        if (question.correctAnswer.includes(index)) {
          button.classList.add('correct');
          button.classList.remove('selected');
        } else {
          button.classList.add('incorrect');
          button.classList.remove('selected');
        }
      }
    });

    setTimeout(() => {
      if (isAnswerCorrect) {
        if (currentVideo === 7 && question.id === 8) {
          setShowModal(true);
        } else if (question.nextQuestion) {
          dispatch(setNextQuestion(question.nextQuestion));
        } else {
          dispatch(setCurrentVideo(question.nextVideoOnCorrect));
        }
      } else {
        dispatch(resetQuestion(question.id));
        if (question.nextVideoOnIncorrect !== null) {
          dispatch(setCurrentVideo(question.nextVideoOnIncorrect));
        } else {
          setIsReplaying(true);
          const video = videoRef.current;
          if (video) {
            dispatch(setCurrentQuestion(null));  // Reset current question before replay
            video.currentTime = 0;
            video.load();  // Ensure the video is loaded before playing
          }
        }
      }
      setSelectedOptionIndices([]);
      setIsCorrect(false);
    }, 2000); // Increase the delay to 2 seconds to allow the user to see the answer
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        if (!initialPlay && isReplaying) {
          video.play().catch(() => {
            setIsPlaying(false);
          });
          setIsReplaying(false);  // Reset replaying state after playing
        }
      };

      video.addEventListener('loadeddata', handleLoadedData);

      video.load();  // Load the video to ensure it's ready to play
      if (!initialPlay && !isReplaying) {
        video.play().catch(() => {
          setIsPlaying(false);
        });
      }

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [currentVideo, initialPlay, isReplaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    setInitialPlay(false);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset to initial state
    dispatch(setCurrentVideo(1));
    dispatch(setCurrentQuestion(null));
    setInitialPlay(true);
    setSelectedOptionIndices([]);
  };

  return (
    <div className="video-container">
      {initialPlay && (
        <div className="play-button-overlay">
          <button onClick={handlePlay}>אני רוצה להתחיל!</button>
        </div>
      )}
      <video ref={videoRef} controls style={{ display: initialPlay ? 'none' : 'block' }}>
        <source src={currentVideoData.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {currentQuestion && !isReplaying && (
        <div className="question-overlay">
          <h2 style={{ whiteSpace: 'pre-line' }}>{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option}
                id={`option-${index}`}
                onClick={() => handleOptionClick(index)}
                className={`${selectedOptionIndices.includes(index) ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
          <button 
            className="submit-button" 
            onClick={handleSubmitAnswer} 
            disabled={selectedOptionIndices.length === 0}
          >
            הגש תשובה
          </button>
        </div>
      )}
      <Modal show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Video;
