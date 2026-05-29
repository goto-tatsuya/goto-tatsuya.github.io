const canvas = document.querySelector("#game-board");
const context = canvas.getContext("2d");
const graphCanvas = document.querySelector("#exp-graph");
const graphContext = graphCanvas.getContext("2d");
const scoreElement = document.querySelector("#score");
const targetScoreElement = document.querySelector("#target-score");
const stageSelect = document.querySelector("#stage-select");
const overlay = document.querySelector("#overlay");
const overlayTitle = document.querySelector("#overlay-title");
const overlayText = document.querySelector("#overlay-text");
const startButton = document.querySelector("#start-button");
const nextStageButton = document.querySelector("#next-stage-button");
const directionButtons = document.querySelectorAll("[data-dir]");

const GRID_SIZE = 40;
const TILE_COUNT = canvas.width / GRID_SIZE;
const TICK_MS = 300;
const RANDOM_STAGE_BONUS_ADD_CHANCE = 0.08;
const START_POSITION = { x: 6, y: 6 };
const STAGES = [
  {
    name: "Stage 1: Apples",
    targetScore: 7,
    items: [
      { type: "exp", k: 0, n: 0 },
      { type: "exp", k: 0, n: 1 },
      { type: "exp", k: 0, n: 1 },
      { type: "exp", k: 0, n: 1 },
      { type: "exp", k: 0, n: 2 },
      { type: "exp", k: 0, n: 2 },
    ],
  },
  {
    name: "Stage 2: Warmup",
    targetScore: 6,
    items: [
      { type: "exp", k: 1, n: 0 },
      { type: "exp", k: 1, n: 2 },
      { type: "add", i: 0, j: 3 },
    ],
  },
  {
    name: "Stage 3: Current",
    targetScore: 100,
    items: [
      { type: "exp", k: 2, n: 0 },
      { type: "add", i: 0, j: 10 },
      { type: "add", i: 2, j: 100 },
    ],
  },
  {
    name: "Stage 4: Ladder",
    targetScore: 250,
    items: [
      { type: "add", i: 3, j: 100 },
      { type: "add", i: 2, j: 80 },
      { type: "add", i: 0, j: 30 },
      { type: "exp", k: 3, n: 0 },
      { type: "exp", k: 2, n: 1 },
      { type: "exp", k: 1, n: 2 },
    ],
  },
  {
    name: "Random Stage",
    refillItems: true,
    targetScore: null,
    items: [
      { type: "add" },
      { type: "add" },
      { type: "add" },
      { type: "exp" },
      { type: "exp" },
      { type: "exp" },
      { type: "exp" },
    ],
  },
];
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const KEYS = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

let snake;
let previousSnakeSegments;
let items;
let direction;
let nextDirection;
let score;
let timerId;
let lastTickAt;
let isRunning;
let isGameOver;
let currentStageIndex = 0;
let scorePopups;

function resetGame() {
  window.clearInterval(timerId);
  snake = {
    segments: [
      { ...START_POSITION },
      { x: START_POSITION.x - 1, y: START_POSITION.y },
      { x: START_POSITION.x - 2, y: START_POSITION.y },
    ],
    expTable: new ExpTable(),
  };
  previousSnakeSegments = snake.segments.map((segment) => ({ ...segment }));
  direction = { ...DIRECTIONS.right };
  nextDirection = { ...DIRECTIONS.right };
  score = 0;
  lastTickAt = performance.now();
  scorePopups = [];
  isRunning = false;
  isGameOver = false;
  items = createInitialItems();
  updateScore();
  draw(performance.now());
  drawExpGraph();
  showOverlay("Ready", "Press arrow keys or WASD to start", "Start");
}

function startGame() {
  if (isRunning) {
    return;
  }

  if (isGameOver) {
    resetGame();
  }

  isRunning = true;
  lastTickAt = performance.now();
  previousSnakeSegments = snake.segments.map((segment) => ({ ...segment }));
  hideOverlay();
  timerId = window.setInterval(tick, TICK_MS);
}

function endGame(title = "Game Over", text = `Score ${score}`) {
  window.clearInterval(timerId);
  isRunning = false;
  isGameOver = true;
  updateScore();
  showOverlay(title, text, "Restart", false);
}

function clearGame() {
  endGame("Clear", `Score ${score} / ${getCurrentStage().targetScore}`);
  if (hasNextStage()) {
    nextStageButton.classList.remove("is-hidden");
  }
}

function tick() {
  direction = nextDirection;
  previousSnakeSegments = snake.segments.map((segment) => ({ ...segment }));
  lastTickAt = performance.now();

  const head = snake.segments[0];
  const nextHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  if (hitsWall(nextHead) || hitsSnake(nextHead)) {
    endGame();
    return;
  }

  snake.segments.unshift(nextHead);

  const eatenItemIndex = items.findIndex((item) => sameCell(nextHead, item));
  const eatenItem = eatenItemIndex >= 0 ? items[eatenItemIndex] : null;

  if (eatenItem?.type === "exp") {
    const gainedScore = getExpValue(eatenItem.k, eatenItem.n);
    score += gainedScore;
    addScorePopup(gainedScore, nextHead);
    updateScore();
  }

  if (eatenItem?.type === "add") {
    snake.expTable.add(eatenItem.i, eatenItem.j);
    drawExpGraph();
  }

  if (eatenItem) {
    items.splice(eatenItemIndex, 1);
    if (getCurrentStage().refillItems) {
      items.push(createStageItem({ type: eatenItem.type }));
    }
  }

  if (!eatenItem) {
    snake.segments.pop();
  }

  draw(performance.now());

  if (eatenItem?.type === "exp") {
    const targetScore = getCurrentStage().targetScore;

    if (targetScore !== null && score >= targetScore) {
      clearGame();
    } else if (targetScore !== null && !hasApple()) {
      endGame("Game Over", `Score ${score} / ${targetScore}`);
    }
  }
}

function addScorePopup(value, cell) {
  scorePopups.push({
    value,
    x: cell.x * GRID_SIZE + GRID_SIZE / 2,
    y: cell.y * GRID_SIZE + GRID_SIZE / 2,
    createdAt: performance.now(),
    duration: 900,
  });
}

function createInitialItems() {
  const initialItems = [];

  items = initialItems;

  getCurrentStage().items.forEach((item) => {
    initialItems.push(createStageItem(item));
  });

  return initialItems;
}

function createStageItem(item) {
  if (item.type === "add") {
    return shouldCreateBonusRandomAdd(item) ? createAddItem(0, 50) : createAddItem(item.i, item.j);
  }

  return createApple(item.k, item.n);
}

function shouldCreateBonusRandomAdd(item) {
  return getCurrentStage().refillItems
    && item.i === undefined
    && item.j === undefined
    && Math.random() < RANDOM_STAGE_BONUS_ADD_CHANCE;
}

function createApple(k, n) {
  return placeItem({
    type: "exp",
    k: k !== undefined ? k : randomInteger(1, 3),
    n: n !== undefined ? n : randomInteger(0, 7),
  });
}

function createAddItem(i, j) {
  i = i !== undefined ? i : randomInteger(0, 5);
  return placeItem({
    type: "add",
    i: i,
    j: j !== undefined ? j : i + randomInteger(0, 3),
  });
}

function placeItem(item) {
  return {
    ...item,
    ...chooseItemCell(item),
  };
}

function chooseItemCell(item) {
  const placedLabelRects = getPlacedItemLabelRects();
  const candidates = [];

  for (let y = 0; y < TILE_COUNT; y += 1) {
    for (let x = 0; x < TILE_COUNT; x += 1) {
      const candidate = { x, y };

      if (!isEmptyCell(candidate)) {
        continue;
      }

      const candidateItem = { ...item, ...candidate };
      const label = getItemLabelData(candidateItem);
      const labelRect = chooseItemLabelRect(label, placedLabelRects);
      const edgePenalty = isEdgeCell(candidate) ? 80 : 0;
      const score = labelRect.score + edgePenalty;

      candidates.push({ ...candidate, score });
    }
  }

  if (candidates.length === 0) {
    return createFallbackCell();
  }

  candidates.sort((first, second) => first.score - second.score);

  const bestScore = candidates[0].score;
  const goodCandidates = candidates.filter((candidate) => candidate.score <= bestScore + 120);

  return goodCandidates[randomInteger(0, goodCandidates.length - 1)];
}

function getPlacedItemLabelRects() {
  const placedRects = [];

  items.forEach((item) => {
    const label = getItemLabelData(item);
    const rect = chooseItemLabelRect(label, placedRects);
    placedRects.push(rect);
  });

  return placedRects;
}

function createFallbackCell() {
  for (let y = 0; y < TILE_COUNT; y += 1) {
    for (let x = 0; x < TILE_COUNT; x += 1) {
      const candidate = { x, y };

      if (isEmptyCell(candidate)) {
        return candidate;
      }
    }
  }

  return { x: 0, y: 0 };
}

function isEdgeCell(cell) {
  return cell.x === 0 || cell.y === 0 || cell.x === TILE_COUNT - 1 || cell.y === TILE_COUNT - 1;
}

function isEmptyCell(cell) {
  const onSnake = snake.segments.some((segment) => sameCell(segment, cell));
  const onItem = items.some((item) => sameCell(item, cell));

  return !onSnake && !onItem;
}

function hasApple() {
  return items.some((item) => item.type === "exp");
}

function getCurrentStage() {
  return STAGES[currentStageIndex];
}

function hasNextStage() {
  return currentStageIndex < STAGES.length - 1;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getExpValue(k, n) {
  let value = n;

  for (let count = 0; count < k; count += 1) {
    value = snake.expTable.get(value);
  }

  return value;
}

function setDirection(name) {
  const requested = DIRECTIONS[name];

  if (isGameOver) {
    return;
  }

  if (!requested || isOpposite(requested, direction)) {
    return;
  }

  nextDirection = { ...requested };
  startGame();
}

function isOpposite(first, second) {
  return first.x + second.x === 0 && first.y + second.y === 0;
}

function hitsWall(cell) {
  return cell.x < 0 || cell.y < 0 || cell.x >= TILE_COUNT || cell.y >= TILE_COUNT;
}

function hitsSnake(cell) {
  return snake.segments.some((segment) => sameCell(segment, cell));
}

function sameCell(first, second) {
  return first.x === second.x && first.y === second.y;
}

function updateScore() {
  scoreElement.textContent = score;
  targetScoreElement.textContent = getCurrentStage().targetScore ?? "None";
}

function setupStageSelect() {
  STAGES.forEach((stage, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = stage.name;
    stageSelect.append(option);
  });

  stageSelect.value = String(currentStageIndex);
  stageSelect.addEventListener("change", () => {
    currentStageIndex = Number(stageSelect.value);
    resetGame();
  });
}

function showOverlay(title, text, buttonText, showNextStage = false) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  startButton.textContent = buttonText;
  nextStageButton.classList.toggle("is-hidden", !showNextStage);
  overlay.classList.add("is-visible");
}

function hideOverlay() {
  overlay.classList.remove("is-visible");
}

function draw(timestamp = performance.now()) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(24, 33, 31, 0.9)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawItems();
  drawSnake(getMoveProgress(timestamp));
  drawScorePopups(timestamp);
}

function getMoveProgress(timestamp) {
  if (!isRunning) {
    return 1;
  }

  return Math.min(1, Math.max(0, (timestamp - lastTickAt) / TICK_MS));
}

function render(timestamp) {
  draw(timestamp);
  window.requestAnimationFrame(render);
}

function drawExpGraph() {
  const values = Array.from({ length: TILE_COUNT }, (_, index) => snake.expTable.get(index));
  const maxValue = Math.max(...values, 1);
  const padding = 18;
  const graphWidth = graphCanvas.width - padding * 2;
  const graphHeight = graphCanvas.height - padding * 2;

  graphContext.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  graphContext.fillStyle = "rgba(16, 21, 20, 0.72)";
  graphContext.fillRect(0, 0, graphCanvas.width, graphCanvas.height);

  graphContext.strokeStyle = "rgba(159, 176, 170, 0.22)";
  graphContext.lineWidth = 1;
  for (let index = 0; index <= 4; index += 1) {
    const y = padding + (index / 4) * graphHeight;
    graphContext.beginPath();
    graphContext.moveTo(padding, y);
    graphContext.lineTo(graphCanvas.width - padding, y);
    graphContext.stroke();
  }
  for (let index = 0; index <= 6; index += 1) {
    const x = padding + (index / 6) * graphWidth;
    graphContext.beginPath();
    graphContext.moveTo(x, padding);
    graphContext.lineTo(x, graphCanvas.height - padding);
    graphContext.stroke();
  }

  graphContext.lineWidth = 3;
  graphContext.lineJoin = "round";
  graphContext.lineCap = "round";
  graphContext.strokeStyle = "#f1c84b";
  graphContext.beginPath();

  values.forEach((value, index) => {
    const x = padding + (index / (values.length - 1)) * graphWidth;
    const y = graphCanvas.height - padding - (value / maxValue) * graphHeight;

    if (index === 0) {
      graphContext.moveTo(x, y);
    } else {
      graphContext.lineTo(x, y);
    }
  });

  graphContext.stroke();

  graphContext.fillStyle = "#9fb0aa";
  graphContext.font = "700 10px system-ui, sans-serif";
  graphContext.textAlign = "left";
  graphContext.textBaseline = "top";
  graphContext.fillText("n", graphCanvas.width - padding + 4, graphCanvas.height - padding - 6);
  graphContext.fillText(String(maxValue), 6, padding - 6);
}

function drawGrid() {
  context.strokeStyle = "rgba(39, 53, 49, 0.62)";
  context.lineWidth = 1;

  for (let index = 0; index <= TILE_COUNT; index += 1) {
    const position = index * GRID_SIZE + 0.5;
    context.beginPath();
    context.moveTo(position, 0);
    context.lineTo(position, canvas.height);
    context.stroke();

    context.beginPath();
    context.moveTo(0, position);
    context.lineTo(canvas.width, position);
    context.stroke();
  }
}

function drawItems() {
  const labels = [];

  items.forEach((item) => {
    if (item.type === "add") {
      drawAddItem(item, labels);
    } else {
      drawApple(item, labels);
    }
  });

  drawItemLabels(labels);
}

function drawApple(item, labels) {
  const inset = 7;
  context.fillStyle = "#e13f33";
  context.fillRect(
    item.x * GRID_SIZE + inset,
    item.y * GRID_SIZE + inset,
    GRID_SIZE - inset * 2,
    GRID_SIZE - inset * 2,
  );
  labels.push(getItemLabelData(item));
}

function drawAddItem(item, labels) {
  const inset = 6;
  context.fillStyle = "#f1c84b";
  context.fillRect(
    item.x * GRID_SIZE + inset,
    item.y * GRID_SIZE + inset,
    GRID_SIZE - inset * 2,
    GRID_SIZE - inset * 2,
  );
  labels.push(getItemLabelData(item));
}

function getItemLabelData(item) {
  if (item.type === "add") {
    return {
      item,
      lines: ["Add", `\u200e(א\u200e_${item.i},א\u200e_${item.j})\u200e`],
      background: "rgba(255, 244, 200, 0.93)",
      text: "#4a3500",
    };
  }

  return {
    item,
    lines: getAppleLabelLines(item),
    background: "rgba(255, 232, 228, 0.92)",
    text: "#6d1812",
  };
}

function getAppleLabelLines(item) {
  if (item.k === 0) {
    return [`\u200eא\u200e_${item.n}`];
  }

  if (item.k === 1) {
    return [`\u200e2^(א\u200e_${item.n})\u200e`];
  }

  return [`\u200eexp_${item.k}`, `\u200e(א\u200e_${item.n})\u200e`];
}

function drawItemLabels(labels) {
  const placedRects = [];

  labels.forEach((label) => {
    const rect = chooseItemLabelRect(label, placedRects);
    drawItemLabel(label, rect);
    placedRects.push(rect);
  });
}

function chooseItemLabelRect(label, placedRects) {
  const centerX = label.item.x * GRID_SIZE + GRID_SIZE / 2;
  const centerY = label.item.y * GRID_SIZE + GRID_SIZE / 2;
  const lineHeight = 15;
  const fontSize = 14;

  context.font = `900 ${fontSize}px system-ui, sans-serif`;
  context.direction = "ltr";
  const widths = label.lines.map((line) => context.measureText(line).width);
  const labelWidth = Math.max(...widths) + 10;
  const labelHeight = label.lines.length * lineHeight + 6;
  const gap = 2;
  const candidates = [
    { x: centerX - labelWidth / 2, y: centerY - labelHeight / 2, distance: 0 },
    { x: centerX - labelWidth / 2, y: centerY - GRID_SIZE / 2 - labelHeight - gap, distance: 1 },
    { x: centerX - labelWidth / 2, y: centerY + GRID_SIZE / 2 + gap, distance: 1 },
    { x: centerX - GRID_SIZE / 2 - labelWidth - gap, y: centerY - labelHeight / 2, distance: 1 },
    { x: centerX + GRID_SIZE / 2 + gap, y: centerY - labelHeight / 2, distance: 1 },
  ];

  return candidates
    .map((candidate) => {
      const rect = {
        x: candidate.x,
        y: candidate.y,
        width: labelWidth,
        height: labelHeight,
      };
      const overflow = getOverflowArea(rect);
      const overlap = placedRects.reduce((total, placedRect) => total + getOverlapArea(rect, placedRect), 0);
      const score = overflow * 1000 + overlap * 80 + candidate.distance * 300;

      return { ...rect, score };
    })
    .sort((first, second) => first.score - second.score)[0];
}

function drawItemLabel(label, rect) {
  const lineHeight = 15;
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;

  context.fillStyle = label.background;
  context.fillRect(rect.x, rect.y, rect.width, rect.height);

  context.fillStyle = label.text;
  context.textAlign = "center";
  context.textBaseline = "middle";
  const firstLineY = centerY - ((label.lines.length - 1) * lineHeight) / 2;

  label.lines.forEach((line, index) => {
    context.fillText(line, centerX, firstLineY + index * lineHeight);
  });
}

function getOverflowArea(rect) {
  const overflowX = Math.max(0, -rect.x) + Math.max(0, rect.x + rect.width - canvas.width);
  const overflowY = Math.max(0, -rect.y) + Math.max(0, rect.y + rect.height - canvas.height);

  return overflowX * rect.height + overflowY * rect.width;
}

function getOverlapArea(first, second) {
  const width = Math.max(0, Math.min(first.x + first.width, second.x + second.width) - Math.max(first.x, second.x));
  const height = Math.max(0, Math.min(first.y + first.height, second.y + second.height) - Math.max(first.y, second.y));

  return width * height;
}

function drawSnake(progress) {
  if (snake.segments.length === 0) {
    return;
  }

  const path = getAnimatedSnakePath(progress);

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = GRID_SIZE * 0.58;
  context.strokeStyle = "#46b980";
  context.beginPath();

  path.forEach((point, index) => {
    if (index === 0) {
      context.moveTo(point.x, point.y);
    } else {
      context.lineTo(point.x, point.y);
    }
  });

  context.stroke();
  drawSnakeHead(path[0]);
  context.restore();
}

function getAnimatedSnakePath(progress) {
  const head = snake.segments[0];
  const previousHead = previousSnakeSegments[0] ?? head;
  const headX = interpolateCellPosition(previousHead.x, head.x, progress);
  const headY = interpolateCellPosition(previousHead.y, head.y, progress);
  const path = [{ x: headX, y: headY }];

  snake.segments.slice(1).forEach((segment) => {
    path.push(getCellCenter(segment));
  });

  if (snake.segments.length === previousSnakeSegments.length && previousSnakeSegments.length > 0) {
    const currentTail = snake.segments[snake.segments.length - 1];
    const previousTail = previousSnakeSegments[previousSnakeSegments.length - 1];
    path.push({
      x: interpolateCellPosition(previousTail.x, currentTail.x, progress),
      y: interpolateCellPosition(previousTail.y, currentTail.y, progress),
    });
  }

  return path;
}

function interpolateCellPosition(from, to, progress) {
  return (from + (to - from) * progress) * GRID_SIZE + GRID_SIZE / 2;
}

function getCellCenter(cell) {
  return {
    x: cell.x * GRID_SIZE + GRID_SIZE / 2,
    y: cell.y * GRID_SIZE + GRID_SIZE / 2,
  };
}

function drawSnakeHead(head) {
  const centerX = head.x;
  const centerY = head.y;
  const radius = GRID_SIZE * 0.36;

  context.fillStyle = "#eef5f0";
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#101514";
  context.beginPath();
  context.arc(centerX + direction.x * 5 - direction.y * 5, centerY + direction.y * 5 - direction.x * 5, 2.5, 0, Math.PI * 2);
  context.arc(centerX + direction.x * 5 + direction.y * 5, centerY + direction.y * 5 + direction.x * 5, 2.5, 0, Math.PI * 2);
  context.fill();
}

function drawScorePopups(timestamp) {
  scorePopups = scorePopups.filter((popup) => timestamp - popup.createdAt < popup.duration);

  scorePopups.forEach((popup) => {
    const progress = (timestamp - popup.createdAt) / popup.duration;
    const y = popup.y - 18 - progress * 18;

    context.save();
    context.globalAlpha = 1 - progress;
    context.font = "900 18px system-ui, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.lineWidth = 4;
    context.strokeStyle = "rgba(16, 21, 20, 0.9)";
    context.fillStyle = "#eef5f0";
    context.strokeText(`+${popup.value}`, popup.x, y);
    context.fillText(`+${popup.value}`, popup.x, y);
    context.restore();
  });
}

document.addEventListener("keydown", (event) => {
  const directionName = KEYS[event.code];

  if (!directionName) {
    return;
  }

  event.preventDefault();
  setDirection(directionName);
});

startButton.addEventListener("click", startGame);

nextStageButton.addEventListener("click", () => {
  if (!hasNextStage()) {
    return;
  }

  currentStageIndex += 1;
  stageSelect.value = String(currentStageIndex);
  resetGame();
});

directionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setDirection(button.dataset.dir);
  });
});

setupStageSelect();
resetGame();
window.requestAnimationFrame(render);
