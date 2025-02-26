import './styles.css';
import goblin from './assets/goblin.png';

// Функция для создания игрового поля
function createGameBoard() {
  const gameBoard = document.createElement('div');
  gameBoard.id = 'game-board';
  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
  }
  return gameBoard;
}

// Функция для создания персонажа
function createCharacter() {
  const character = document.createElement('img');
  character.src = goblin; // Используем импортированное изображение
  character.classList.add('character');
  return character;
}

// Функция для размещения персонажа в случайной клетке
function placeCharacterRandomly(character, cells) {
  const randomCell = cells[Math.floor(Math.random() * cells.length)];
  randomCell.appendChild(character);
  return randomCell;
}

// Функция для перемещения персонажа
function moveCharacter(character, cells) {
  const currentCell = character.parentElement;
  let newCell;
  do {
    newCell = cells[Math.floor(Math.random() * cells.length)];
  } while (newCell === currentCell);

  newCell.appendChild(character);
}

// Инициализация игры
function initGame() {
  const gameBoard = createGameBoard();
  document.body.appendChild(gameBoard);

  const cells = document.querySelectorAll('.cell');
  const character = createCharacter();
  placeCharacterRandomly(character, cells);

  setInterval(() => {
    moveCharacter(character, cells);
  }, 1000);
}

// Запуск игры при загрузке страницы
initGame();