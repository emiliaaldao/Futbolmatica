
let currentQuestion = {};
let streak = 0;
let failCount = 0;

const goalSound = new Audio('goal.mp3');
const whistleSound = new Audio('whistle.mp3');

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
  const yellowCard = document.getElementById('yellow-card');
  if (userAnswer === currentQuestion.correctAnswer) {
    feedback.textContent = "¡Correcto! ⚽";
    goalSound.play();
    streak++;
    failCount = 0;
    yellowCard.textContent = '';
    if (streak === 5) {
      document.getElementById('reward').classList.remove('hidden');
      streak = 0;
    }
  } else {
    feedback.textContent = `Incorrecto. La respuesta era ${currentQuestion.correctAnswer}`;
    whistleSound.play();
    streak = 0;
    failCount++;
    if (failCount === 3) {
      yellowCard.textContent = "🟨 ¡Tarjeta amarilla!";
    }
  }
  document.getElementById('answer').value = '';
  generateQuestion();
}

window.onload = generateQuestion;
