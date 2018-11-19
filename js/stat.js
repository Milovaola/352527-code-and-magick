'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 15;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  var offset = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - offset);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + offset);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

var getBestTime = function (times) {
  var bestTime = times[0];

  for (var i = 0; i < times.length; i++) {
    if (times[i] > bestTime) {
      bestTime = times[i];
    }
  }

  return bestTime;
};

var getTextX = function (index) {
  return CLOUD_X + GAP + ((GAP + BAR_WIDTH) * index);
};

var TEXT_Y = CLOUD_HEIGHT - CLOUD_Y - FONT_GAP;

var getColumnX = function (index) {
  return CLOUD_X + GAP + ((GAP + BAR_WIDTH) * index);
};

var COLUMN_Y = CLOUD_HEIGHT - CLOUD_Y - GAP + FONT_GAP;

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fillText('Ура вы победили!', 110, 30);
  ctx.fillText('Список результатов:', 110, 45);
  ctx.textBaseline = 'hanging';

  var bestTime = getBestTime(times);

  var getColumnHeight = function (index) {
    return (BAR_HEIGHT * times[index]) / bestTime;
  };

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(' + 55 + ',' + 101 + ',' + 165 + ',' + Math.random().toFixed(1) + ')';

    ctx.fillRect(getColumnX(i), COLUMN_Y, BAR_WIDTH, -getColumnHeight(i));
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], getTextX(i), TEXT_Y);
    ctx.fillText(Math.round(times[i]), getTextX(i), CLOUD_HEIGHT - getColumnHeight(i) - FONT_GAP - GAP);
  }
};
