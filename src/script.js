import './style.css';

const gameID = 'TqB6XYxl89cR2vfmQY7m';
const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
const url = `${api}/${gameID}/scores/`;

const getScores = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const array = await data.result;

  return array;
};

const buildUI = (arr) => {
  const scoresList = document.querySelector('ul');
  scoresList.innerHTML = '';

  arr.sort((a, b) => b.score - a.score);

  arr.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'score';

    li.textContent = `${item.user}: ${item.score === '100' ? '100 🏆' : item.score}`;
    scoresList.appendChild(li);

    if (index % 2 === 1) {
      li.classList.add('odd');
    }
  });
};

const builderFunc = () => {
  getScores().then((arr) => {
    buildUI(arr);
  });
};

const refreshFunc = () => {
  const refreshBtn = document.querySelector('.refresh');

  refreshBtn.addEventListener('click', () => {
    builderFunc();
  });
};

const submit = () => {
  const submitBtn = document.querySelector('.submit');
  const nameInput = document.querySelector('.name-input');
  const scoreInput = document.querySelector('.score-input');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const user = nameInput.value;
    const score = scoreInput.value;

    if ((user) && (score <= 100) && (score >= 0)) {
      const data = { user, score };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(() => {
        builderFunc();
        nameInput.value = '';
        scoreInput.value = '';
      });
    }
  });
};

builderFunc();
refreshFunc();
submit();
