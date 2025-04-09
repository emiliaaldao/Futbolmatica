
let currentQuestion = {};
let streak = 0;

function generateQuestion() {
  const operations = ['+', '-', '*', '/'];
  const a = Math.floor(Math.random() * 10 + 1);
  const b = Math.floor(Math.random() * 10 + 1);
  const op = operations[Math.floor(Math.random() * operations.length)];
  let correctAnswer;
  if (op === '+') correctAnswer = a + b;
  else if (op === '-') correctAnswer = a - b;
  else if (op === '*') correctAnswer = a * b;
  else if (op === '/') {
    correctAnswer = a;
    currentQuestion = { a: a * b, b, op: '/', correctAnswer };
    document.getElementById('question').textContent = `¿Cuánto es ${a * b} / ${b}?`;
    return;
  }
  currentQuestion = { a, b, op, correctAnswer };
  document.getElementById('question').textContent = `¿Cuánto es ${a} ${op} ${b}?`;
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  const feedback = document.getElementById('feedback');
  if (userAnswer === currentQuestion.correctAnswer) {
    feedback.textContent = "¡Correcto! ⚽";
    streak++;
    if (streak === 5) {
      document.getElementById('reward').classList.remove('hidden');
      streak = 0;
    }
  } else {
    feedback.textContent = `Incorrecto. La respuesta era ${currentQuestion.correctAnswer}`;
    streak = 0;
  }
  document.getElementById('answer').value = '';
  generateQuestion();
}

window.onload = generateQuestion;
