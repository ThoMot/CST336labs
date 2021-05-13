// Game functions

var score = 0;
var results = [];

const populateResult = (questionNumber, result) => {
  results.push({
    question: questionNumber,
    correct: result
  });
  if (result) {
    score += 12.5;
  }
};

function validateRedColor(redAnswer) {
  let correct = 0;
  if (redAnswer.r > 250) {
    correct++;
  }
  if (redAnswer.g < 50) {
    correct++;
  }
  if (redAnswer.b < 50) {
    correct++;
  }
  return correct === 3;
}

function validateWhiteColor(whiteAnswer) {
  let correct = 0;
  if (whiteAnswer.r > 250) {
    correct++;
  }
  if (whiteAnswer.g > 250) {
    correct++;
  }
  if (whiteAnswer.b > 250) {
    correct++;
  }
  return correct === 3;
}

function validateBlueColor(blueAnswer) {
  let correct = 0;
  if (blueAnswer.r < 50) {
    correct++;
  }
  if (blueAnswer.g < 60) {
    correct++;
  }
  if (blueAnswer.b > 250) {
    correct++;
  }
  return correct === 3;
}

module.exports = gradeQuiz = questions => {
  const { q1, q2, q3, q4, q5, q6, q7, q8 } = questions;
  results = [];
  score = 0;
  // Question 1
  if (q1 === "sacramento") {
    populateResult(1, true);
  } else {
    populateResult(1, false);
  }

  // Question 2
  if (q2 === "mo") {
    populateResult(2, true);
  } else {
    populateResult(2, false);
  }

  // Question 3
  if (!q3._1 && !q3._2 && q3._3 && q3._4) {
    populateResult(3, true);
  } else {
    populateResult(3, false);
  }

  // Question 4
  if (q4 === "Rhode Island") {
    populateResult(4, true);
  } else {
    populateResult(4, false);
  }

  // Question 5
  const correctAnswer = "rgb(255, 255, 0)";
  if (q5 === correctAnswer) {
    populateResult(5, true);
  } else {
    populateResult(5, false);
  }

  //Question 6
  if (q6 == 4) {
    populateResult(6, true);
  } else {
    populateResult(6, false);
  }

  if (q7 == 0) {
    populateResult(7, true);
  } else {
    populateResult(7, false);
  }

  // Question 8
  const redAnswer = q8.red;
  const blueAnswer = q8.blue;
  const whiteAnswer = q8.white;
  if (
    validateRedColor(redAnswer) &&
    validateBlueColor(blueAnswer) &&
    validateWhiteColor(whiteAnswer)
  ) {
    populateResult(8, true);
  } else {
    populateResult(8, false);
  }

  results.push({
    score: score
  });
  return { results, score };
};
