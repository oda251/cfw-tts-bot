import qa1 from "../../assets/QA1.json";
import qa2 from "../../assets/QA2.json";

interface Quiz {
  question: string;
  answer: string;
}

export function getRandomTtsQuiz(): Quiz {
  const maxSize = qa1.length + qa2.length;
  const randomIndex = Math.floor(Math.random() * maxSize);
  if (randomIndex < qa1.length) {
    return qa1[randomIndex];
  } else {
    return qa2[randomIndex - qa1.length];
  }
}
