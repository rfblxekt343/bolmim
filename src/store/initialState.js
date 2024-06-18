import video1 from "../media/video1.mp4";
import video2 from "../media/video2.mp4";
import video3 from "../media/video3.mp4";
import video4 from "../media/video4.mp4";
import video5 from "../media/video5.mp4";
import video6 from "../media/video6.mp4";
import video7 from "../media/video7.mp4";
import video8 from "../media/video8.mp4";

const initialState = {
  videos: [
    {
      id: 1,
      src: video1,
      questions: [
        {
          id: 1,
          time: 40,
          question: "כיצד הייתם מתמודדים עם סוג בולם זה?",
          options: [
            "מתן עובדות והוכחות, שאלות פתוחות, תמיכה רבה",
            "עלייה לרמה העקרונית, מתן עובדות והוכחות, שאלות סגורות",
            "שאלות סגורות, סבלנות והצעות לייעול",
            "הכלה, הצעות לייעול ותמיכה רבה",
          ],
          correctAnswer: [1],
          nextVideoOnCorrect: 3,
          nextVideoOnIncorrect: 2,
          userAnswer: null,
          multipleSelection: false,
          nextQuestion: null,
        },
      ],
    },
    {
      id: 2,
      src: video2,
      questions: [
        {
          id: 2,
          time: 36,
          question: "כיצד הייתם מתמודדים עם סוג בולם זה?",
          options: [
            "מתן עובדות והוכחות, שאלות פתוחות, תמיכה רבה",
            "עלייה לרמה העקרונית, מתן עובדות והוכחות, שאלות סגורות",
            "שאלות סגורות, סבלנות והצעות לייעול",
            "הכלה, הצעות לייעול ותמיכה רבה",
          ],
          correctAnswer: [1],
          nextVideoOnCorrect: 3,
          nextVideoOnIncorrect: 3,
          userAnswer: null,
          multipleSelection: false,
          nextQuestion: null,
        },
      ],
    },
    {
      id: 3,
      src: video3,
      questions: [
        {
          id: 3,
          time: 37,
          question: "בחר בדרך התמודדות שאינה נכונה לבולם מסוג זה",
          options: [
            "חיזוקים",
            "נסיון אישי",
            "דוגמאות מעולם תוכן אחר",
            "תמיכה רבה",
            "שאלות נוקבות",
          ],
          correctAnswer: [4],
          nextVideoOnCorrect: null, // Move to the next question, not video
          nextVideoOnIncorrect: 3,
          userAnswer: null,
          multipleSelection: true,
          nextQuestion: 4, // Points to the next question in the same video
        },
        {
          id: 4,
          time: 60, // Assuming the next question appears at this time
          question: "איזה בולם מוצג בסרטון?",
          options: [
            "מסכים לכאורה",
            "בטחון עצמי גבוה",
            "מוותר מהר",
            "בטחון עצמי נמוך",
          ],
          correctAnswer: [3],
          nextVideoOnCorrect: 4,
          nextVideoOnIncorrect: 4,
          userAnswer: null,
          multipleSelection: true,
          nextQuestion: null,
        },
      ],
    },
    {
      id: 4,
      src: video4,
      nextVideoOnEnd: 5, // Specify the next video when this video ends
      questions: [], // No questions for this video
    },
    {
      id: 5,
      src: video5,
      questions: [
        {
          id: 5,
          time: 30,
          question:
            "בחר 2 מתוך 4 אפשרויות:\nאילו מאפיינים יש לבולם מסוג 'מסכים לכאורה'?",
          options: ["הנהון ראש", "מסכים ללא מחשבה", "לא מקשיב", "הקשבה רבה"],
          correctAnswer: [1, 2],
          nextVideoOnCorrect: 6,
          nextVideoOnIncorrect: 5,
          userAnswer: null,
          multipleSelection: true,
          nextQuestion: 6,
        },
        {
          id: 6,
          time: 32, // Assuming the next question appears at this time
          question: "בחרו 2 דרכי התמודדות אפשריים לבולם מסוג זה",
          options: [
            "הצגת עמדה הפוכה מהמצופה",
            "תנועות ידיים מרובות",
            "שאלות פתוחות",
            "הנהון רציף",
          ],
          correctAnswer: [0, 2],
          nextVideoOnCorrect: 7,
          nextVideoOnIncorrect: 6,
          userAnswer: null,
          multipleSelection: true,
          nextQuestion: null,
        },
      ],
    },
    {
      id: 6,
      src: video6,
      nextVideoOnEnd: 7, // Specify the next video when this video ends
      questions: [], // No questions for this video
    },
    {
      id: 7,
      src: video7,
      questions: [
        {
          id: 7,
          time: 41,
          question: "איזה בולם מוצג בסרטון?",
          options: [
            "מסכים לכאורה",
            "בטחון עצמי גבוה",
            "מוותר מהר",
            "בטחון עצמי נמוך",
          ],
          correctAnswer: [1],
          nextVideoOnCorrect: null,
          nextVideoOnIncorrect: 7,
          userAnswer: null,
          multipleSelection: true,
          nextQuestion: 8,
        },
        {
          id: 8,
          time: 41,
          question: "כיצד הייתם מתמודדים עם בולם מסוג זה? סמן את 4 דרכי ההתמודדות",
          options: ["מתן עובדות ודוגמאות", "שימוש בנסיון אישי ומקצועי", "סיטואציות שונות", "העלאה לרמה המקצועית", "מגע פיזי", "הימנעות מקשר עין"],
          correctAnswer: [0, 1, 2, 3],
          nextVideoOnCorrect: null,//change this so when the user is right it shoes the modal
          nextVideoOnIncorrect: 8, // Set the next video to 8 on incorrect answer
          nextQuestion: null,
        }
      ],
    },
    {
      id: 8,
      src: video8,
      nextVideoOnEnd: null,
    }
  ],
  currentVideo:1,
  currentQuestion: null,
};

export default initialState;
