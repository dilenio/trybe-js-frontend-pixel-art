// Starting Pixel Art
let currentSelectedColor = 'black';

function clearBoard() {
  const elementClearBoard = document.querySelector('#clear-board');
  elementClearBoard.addEventListener('click', function () {
    const clearPixel = document.querySelectorAll('.pixel');
    for (let index = 0; index < clearPixel.length; index += 1) {
      clearPixel[index].style.backgroundColor = 'white';
    }
  });
}

function generateRandomColorNumber() {
  return Math.ceil(Math.random() * 255);
}

function generateRandomColor() {
  const colorR = generateRandomColorNumber();
  const colorG = generateRandomColorNumber();
  const colorB = generateRandomColorNumber();
  const colorRGB = `rgb(${colorR}, ${colorG}, ${colorB})`;
  return colorRGB;
}

function handlePaletteItemEvent(event) {
  const oldSelectedDiv = document.querySelector('.selected');
  const currentSelectedDiv = event.target;

  oldSelectedDiv.classList.remove('selected');
  currentSelectedDiv.classList.add('selected');

  currentSelectedColor = window
    .getComputedStyle(currentSelectedDiv, null)
    .getPropertyValue('background-color');
}

function createPaletteItem(color) {
  const paletteItemDiv = document.createElement('div');
  paletteItemDiv.style.backgroundColor = color;
  paletteItemDiv.className = 'color';
  paletteItemDiv.addEventListener('click', handlePaletteItemEvent);

  if (color === 'black') {
    paletteItemDiv.classList.add('selected');
  }
  return paletteItemDiv;
}

function createColorPalette(colors) {
  const colorPaletteContainer = document.getElementById('color-palette');

  for (let index = 0; index < colors.length; index += 1) {
    const paletteItemDiv = createPaletteItem(colors[index]);
    colorPaletteContainer.appendChild(paletteItemDiv);
  }
}

function handlePixelEvent(event) {
  const divColorized = event.target;
  divColorized.style.backgroundColor = currentSelectedColor;
}

function createPixelsDiv(divClassName) {
  const pixelDiv = document.createElement('div');
  pixelDiv.className = divClassName;
  pixelDiv.addEventListener('click', handlePixelEvent);
  return pixelDiv;
}

function createPixelsBoardInit(size) {
  for (let index = 0; index < size; index += 1) {
    const rowCreateBoard = document.querySelector('#pixel-board');
    const div = document.createElement('div');
    const rowClass = `row-board${index}`;
    div.className = rowClass;
    rowCreateBoard.appendChild(div);
    for (let index2 = 0; index2 < size; index2 += 1) {
      const rowBoard = document.getElementsByClassName(rowClass)[0];
      rowBoard.appendChild(createPixelsDiv('pixel'));
    }
  }
}

function createPixelsBoard() {
  const elementCreateBoard = document.querySelector('#pixel-board');
  let inputCreateBoard = parseInt(document.getElementById('board-size').value, 10);
  const inputCreateBoardI = document.getElementById('board-size').value;
  if (inputCreateBoardI === '') {
    alert('Board inv??lido!');
    inputCreateBoard = 5;
  } else if (inputCreateBoard < 5) {
    inputCreateBoard = 5;
  } else if (inputCreateBoard > 50) {
    inputCreateBoard = 50;
  }
  elementCreateBoard.querySelectorAll('*').forEach((n) => n.remove());
  createPixelsBoardInit(inputCreateBoard);
}

function createBoard() {
  const btnVQV = document.querySelector('#generate-board');
  btnVQV.addEventListener('click', createPixelsBoard);
}

window.onload = function () {
  createColorPalette([
    'black',
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor(),
  ]);
  createPixelsBoardInit(5);
  clearBoard();
  createBoard();
};
