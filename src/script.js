import './style.css';

const scoresArray = [
  { name: 'John', score: 100 },
  { name: 'Jane', score: 90 },
  { name: 'Jack', score: 80 },
  { name: 'Jill', score: 70 },
  { name: 'Jenny', score: 60 },
  { name: 'Jen', score: 50 },
  { name: 'Jenny', score: 40 },
];

scoresArray.forEach((score, index) => {
  const scoreElement = document.createElement('li');
  scoreElement.className = 'score';
  scoreElement.innerHTML = `${score.name}: ${score.score}`;
  document.querySelector('ul').appendChild(scoreElement);

  if (index % 2 === 1) {
    scoreElement.classList.add('odd');
  }
});
