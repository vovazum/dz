const { createGameBoard, createCharacter, placeCharacterRandomly, moveCharacter } = require('../src/index');

describe('Game Functions', () => {
  let gameBoard;
  let character;
  let cells;

  beforeEach(() => {
    // Создаем игровое поле и персонажа перед каждым тестом
    gameBoard = createGameBoard();
    character = createCharacter();
    cells = gameBoard.querySelectorAll('.cell');
  });

  test('createGameBoard creates a 4x4 grid', () => {
    expect(gameBoard.children.length).toBe(16); // Проверяем, что создано 16 клеток
    expect(gameBoard.querySelectorAll('.cell').length).toBe(16); // Проверяем, что все клетки имеют класс .cell
  });

  test('createCharacter creates an img element with class "character"', () => {
    expect(character.tagName).toBe('IMG'); // Проверяем, что это элемент img
    expect(character.classList.contains('character')).toBe(true); // Проверяем, что у него есть класс .character
  });

  test('placeCharacterRandomly places the character in a random cell', () => {
    placeCharacterRandomly(character, cells);

    // Проверяем, что персонаж был добавлен в одну из клеток
    expect(Array.from(cells).some(cell => cell.contains(character))).toBe(true);
  });

  test('moveCharacter moves the character to a new cell', () => {
    // Размещаем персонажа в начальной клетке
    placeCharacterRandomly(character, cells);
    const initialCell = character.parentElement;

    // Перемещаем персонажа
    moveCharacter(character, cells);
    const newCell = character.parentElement;

    // Проверяем, что персонаж переместился в другую клетку
    expect(newCell).not.toBe(initialCell);
    expect(newCell.contains(character)).toBe(true);
  });
});