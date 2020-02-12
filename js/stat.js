'use strict';
var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; //  высота облка
var CLOUD_X = 100; // положение облака по оси Х
var CLOUD_Y = 10; //  положение облака по оси У
var GAP = 10; //  используется при создании отступов
var CLOUD_COLOR = '#fff'; //  цвет облака
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0,3)'; // цвет тени
var DISTANCE_BETWEEN_COLUMS = 50; // расстояние между колонками диаграмы
var COLUMN_WIDTH = 40; // ширина колонки
var TEXT_HEIGHT = 40; // высота строки текста
var COLUMN_MAX_HEIGTH = 150; // максимальная высота колонки
var onePtSize = 0; // размер одного пикселя в ед. измерения времени (рассчитывается ниже)
var maxTime = 0; // максимальное время прохождения игры, (рассчитывается ниже)
var currentPositionColumn = 0; // текущее положение колонки (рассчитывается ниже)

var renderCloud = function (ctx, x, y, color) { //  функция отрисовывающая облако
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW); // отрисовка облака
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR); // отрисовка тени

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, COLUMN_WIDTH);
  ctx.fillText('Список результатов:', 120, COLUMN_WIDTH + GAP + GAP);

  for (var y = 0; y < times.length; y++) {
    if (maxTime < times[y]) {
      maxTime = times[y];
    } //  находим самое большое время
  }

  onePtSize = maxTime / COLUMN_MAX_HEIGTH; // определяем размер одного PT исходя из размера максимального времени

  for (var i = 0; i < times.length; i++) {
    if (i === 0) {
      currentPositionColumn = CLOUD_X + DISTANCE_BETWEEN_COLUMS;
    }

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    }

    ctx.fillRect(currentPositionColumn, CLOUD_HEIGHT - (TEXT_HEIGHT / 2) - times[i] / onePtSize, COLUMN_WIDTH, times[i] / onePtSize);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], currentPositionColumn, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), currentPositionColumn, CLOUD_HEIGHT - TEXT_HEIGHT - times[i] / onePtSize);
    currentPositionColumn += (COLUMN_WIDTH + DISTANCE_BETWEEN_COLUMS);
  }
};
