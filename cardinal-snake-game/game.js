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
const boardWrap = document.querySelector(".board-wrap");

const GRID_SIZE = 40;
const TILE_COUNT = canvas.width / GRID_SIZE;
const TICK_MS = 300;
const RANDOM_STAGE_BONUS_ADD_CHANCE = 0.08;
const START_POSITION = { x: 6, y: 6 };
const RIVER_START_POSITION = { x: 1, y: 6 };
const SWIPE_MIN_DISTANCE = 24;
const STAGES = [
  {
    name: "Stage 1: Apples",
    targetScore: 7,
    readyText: "Use the arrow keys, WASD, or swipe to guide the snake, collect apples, and reach at least the target score.",
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
    readyText: "Taking Add(\u200eא\u200e_0, \u200eא\u200e_3) adds \u200eא\u200e_3 many \u200eא\u200e_0-Cohen reals.",
    items: [
      { type: "exp", k: 1, n: 0 },
      { type: "exp", k: 1, n: 2 },
      { type: "add", i: 0, j: 3 },
    ],
  },
  {
    name: "Stage 3: Current",
    targetScore: 100,
    readyText: "Pay attention to the order in which you take the forcings!",
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
    name: "Special: River",
    targetScore: 13,
    startPosition: RIVER_START_POSITION,
    allowedDirections: ["upRight", "right", "downRight"],
    directionAliases: {
      up: "upRight",
      down: "downRight",
    },
    boardTheme: "river",
    readyText: "The river only carries you right-up, right, or right-down",
    items: [
      { type: "exp", k: 0, n: 1, x: 3, y: 6 },
      { type: "exp", k: 0, n: 2, x: 4, y: 5 },
      { type: "exp", k: 0, n: 3, x: 5, y: 4 },
      { type: "exp", k: 0, n: 2, x: 6, y: 5 },
      { type: "exp", k: 0, n: 1, x: 7, y: 6 },
      { type: "add", i: 0, j: 4, x: 8, y: 7 },
      { type: "exp", k: 0, n: 4, x: 9, y: 8 },
    ],
  },
  {
    name: "Special: Invariant",
    targetScore: 100,
    startPosition: RIVER_START_POSITION,
    allowedDirections: ["upRight", "right", "downRight"],
    directionAliases: {
      up: "upRight",
      down: "downRight",
    },
    boardTheme: "river",
    readyText: "Choose Cohen or Random, then collect non(M)",
    items: [
      { type: "add", i: 0, j: 100, x: 5, y: 5, invariantKey: "add" },
      { type: "r", i: 0, j: 100, x: 5, y: 7, invariantKey: "r" },
      { type: "non", x: 9, y: 6 },
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
  upRight: { x: 1, y: -1 },
  downRight: { x: 1, y: 1 },
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
let stageState;
let swipeStart = null;

function resetGame() {
  window.clearInterval(timerId);
  const startPosition = getStageStartPosition();
  snake = {
    segments: [
      { ...startPosition },
      { x: startPosition.x - 1, y: startPosition.y },
      { x: startPosition.x - 2, y: startPosition.y },
    ],
    expTable: new ExpTable(),
  };
  previousSnakeSegments = snake.segments.map((segment) => ({ ...segment }));
  direction = { ...DIRECTIONS.right };
  nextDirection = { ...DIRECTIONS.right };
  score = 0;
  lastTickAt = performance.now();
  scorePopups = [];
  stageState = {};
  isRunning = false;
  isGameOver = false;
  items = createInitialItems();
  updateDirectionButtons();
  updateScore();
  draw(performance.now());
  drawExpGraph();
  showOverlay("Ready", getCurrentStage().readyText ?? "Press arrow keys, WASD, or swipe to start", "Start");
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

  if (isScoringItem(eatenItem)) {
    const gainedScore = getItemScore(eatenItem);
    score += gainedScore;
    addScorePopup(gainedScore, nextHead);
    updateScore();
  }

  if (hasAddEffect(eatenItem)) {
    snake.expTable.add(eatenItem.i, eatenItem.j);
    rememberInvariantItem(eatenItem);
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

  if (isScoringItem(eatenItem)) {
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

function isScoringItem(item) {
  return item?.type === "exp" || item?.type === "non";
}

function getItemScore(item) {
  if (item.type === "non") {
    return stageState.lastInvariantItem === "r" ? 100 : 1;
  }

  return getExpValue(item.k, item.n);
}

function hasAddEffect(item) {
  return item?.type === "add" || item?.type === "r";
}

function rememberInvariantItem(item) {
  if (item.invariantKey) {
    stageState.lastInvariantItem = item.invariantKey;
  }
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
  if (item.type === "add" || item.type === "r") {
    return shouldCreateBonusRandomAdd(item) ? createAddItem(0, 50) : createAddEffectItem(item);
  }

  if (item.type === "non") {
    return placeItem({ ...item });
  }

  return createApple(item);
}

function shouldCreateBonusRandomAdd(item) {
  return getCurrentStage().refillItems
    && item.i === undefined
    && item.j === undefined
    && Math.random() < RANDOM_STAGE_BONUS_ADD_CHANCE;
}

function createApple(item) {
  return placeItem({
    ...item,
    type: "exp",
    k: item.k !== undefined ? item.k : randomInteger(1, 3),
    n: item.n !== undefined ? item.n : randomInteger(0, 7),
  });
}

function createAddItem(i, j) {
  return createAddEffectItem({ type: "add", i, j });
}

function createAddEffectItem(item) {
  const i = item.i !== undefined ? item.i : randomInteger(0, 5);
  return placeItem({
    ...item,
    type: item.type,
    i: i,
    j: item.j !== undefined ? item.j : i + randomInteger(0, 3),
  });
}

function placeItem(item) {
  if (item.x !== undefined && item.y !== undefined) {
    return { ...item };
  }

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
  return items.some((item) => item.type === "exp" || item.type === "non");
}

function getCurrentStage() {
  return STAGES[currentStageIndex];
}

function getStageStartPosition() {
  return getCurrentStage().startPosition ?? START_POSITION;
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
  const directionName = getStageDirectionName(name);
  const requested = DIRECTIONS[directionName];

  if (isGameOver) {
    return;
  }

  if (!requested || !isDirectionAllowed(directionName) || isOpposite(requested, direction)) {
    return;
  }

  nextDirection = { ...requested };
  startGame();
}

function getStageDirectionName(name) {
  return getCurrentStage().directionAliases?.[name] ?? name;
}

function isDirectionAllowed(name) {
  const allowedDirections = getCurrentStage().allowedDirections;

  return !allowedDirections || allowedDirections.includes(name);
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

function updateDirectionButtons() {
  directionButtons.forEach((button) => {
    const directionName = getStageDirectionName(button.dataset.dir);
    button.disabled = !isDirectionAllowed(directionName);
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
  drawBoardBackground(timestamp);
  drawGrid();
  drawItems();
  drawSnake(getMoveProgress(timestamp));
  drawScorePopups(timestamp);
}

function drawBoardBackground(timestamp) {
  if (getCurrentStage().boardTheme === "river") {
    drawRiverBackground(timestamp);
    return;
  }

  context.fillStyle = "rgba(24, 33, 31, 0.9)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRiverBackground(timestamp) {
  const offset = -((timestamp / 28) % GRID_SIZE);
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#17465c");
  gradient.addColorStop(0.48, "#1d7a90");
  gradient.addColorStop(1, "#123a54");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.lineWidth = 3;
  context.lineCap = "round";
  for (let y = 22; y < canvas.height; y += 48) {
    context.strokeStyle = y % 96 === 22 ? "rgba(203, 244, 255, 0.34)" : "rgba(114, 207, 226, 0.24)";
    context.beginPath();
    for (let x = offset; x <= canvas.width + GRID_SIZE; x += 16) {
      const waveY = y + Math.sin((x - timestamp / 18) / 26) * 5;
      if (x === offset) {
        context.moveTo(x, waveY);
      } else {
        context.lineTo(x, waveY);
      }
    }
    context.stroke();
  }
  context.restore();
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
    } else if (item.type === "r") {
      drawRItem(item, labels);
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

function drawRItem(item, labels) {
  const inset = 6;
  context.fillStyle = "#7dd3fc";
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

  if (item.type === "r") {
    return {
      item,
      lines: [`\u200eRandom(א\u200e_${item.j})\u200e`],
      background: "rgba(219, 246, 255, 0.93)",
      text: "#083344",
    };
  }

  if (item.type === "non") {
    return {
      item,
      lines: ["non(M)"],
      background: "rgba(255, 232, 228, 0.92)",
      text: "#6d1812",
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

function isInteractiveElement(element) {
  return element instanceof Element && Boolean(element.closest("button, select, input, textarea, a"));
}

function getSwipeDirection(deltaX, deltaY) {
  if (Math.hypot(deltaX, deltaY) < SWIPE_MIN_DISTANCE) {
    return null;
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? "right" : "left";
  }

  return deltaY > 0 ? "down" : "up";
}

document.addEventListener("keydown", (event) => {
  const directionName = KEYS[event.code];

  if (!directionName) {
    return;
  }

  event.preventDefault();
  setDirection(directionName);
});

boardWrap.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length !== 1 || isInteractiveElement(event.target)) {
      swipeStart = null;
      return;
    }

    const touch = event.touches[0];
    swipeStart = {
      x: touch.clientX,
      y: touch.clientY,
    };
  },
  { passive: true },
);

boardWrap.addEventListener(
  "touchmove",
  (event) => {
    if (!swipeStart) {
      return;
    }

    event.preventDefault();
  },
  { passive: false },
);

boardWrap.addEventListener(
  "touchend",
  (event) => {
    if (!swipeStart || event.changedTouches.length === 0) {
      swipeStart = null;
      return;
    }

    const touch = event.changedTouches[0];
    const directionName = getSwipeDirection(touch.clientX - swipeStart.x, touch.clientY - swipeStart.y);
    swipeStart = null;

    if (directionName) {
      event.preventDefault();
      setDirection(directionName);
    }
  },
  { passive: false },
);

boardWrap.addEventListener("touchcancel", () => {
  swipeStart = null;
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
