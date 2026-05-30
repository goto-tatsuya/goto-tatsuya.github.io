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
const stageDescription = document.querySelector("#stage-description");

const GRID_SIZE = 40;
const DEFAULT_COLUMN_COUNT = canvas.width / GRID_SIZE;
const ROW_COUNT = canvas.height / GRID_SIZE;
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
    name: "Stage 3: Two Forcings",
    targetScore: 100,
    readyText: "Pay attention to the order in which you take the forcings!",
    items: [
      { type: "exp", k: 2, n: 0 },
      { type: "add", i: 0, j: 10 },
      { type: "add", i: 2, j: 100 },
    ],
  },
  {
    name: "Stage 4: Three Forcings",
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
    name: "Stage 5: River",
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
    name: "Stage 6: Invariant",
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
    name: "Stage 7: Proper",
    targetScore: 2,
    startPosition: { x: 0, y: 6 },
    allowedDirections: ["upRight", "right", "downRight"],
    directionAliases: {
      up: "upRight",
      down: "downRight",
    },
    boardTheme: "river",
    readyText: "Preserve \u200eא\u200e_1 and carefully look at the definition",
    descriptionLines: [
      "P = 1 if (\u200eא\u200e_2)^V < \u200eא\u200e_2, P = 0 otherwise.",
    ],
    items: [
      { type: "add", i: 0, j: 0, x: 2, y: 5, labelLines: ["Cohen"] },
      { type: "add", i: 0, j: 0, x: 2, y: 7, labelLines: ["Fn_{<\u200eא\u200e_0}(\u200eא\u200e_0, \u200eא\u200e_2)"], properKey: "P" },
      { type: "add", i: 0, j: 0, x: 5, y: 5, labelLines: ["random"] },
      { type: "add", i: 0, j: 0, x: 5, y: 7, labelLines: ["Namba"], properKey: "Namba" },
      {
        type: "exp",
        k: 0,
        n: 1,
        x: 7,
        y: 6,
        labelLines: ["|(\u200eא\u200e_1)^V|"],
        properScoreKey: "groundAleph1",
      },
      {
        type: "exp",
        k: 0,
        n: 2,
        x: 10,
        y: 6,
        labelLines: ["\u200eא\u200e_P"],
        properScoreKey: "chi",
      },
    ],
  },
  {
    name: "Stage 8: Easton",
    targetScore: 200,
    boardColumns: 20,
    startPosition: { x: 0, y: 6 },
    allowedDirections: ["upRight", "right", "downRight"],
    directionAliases: {
      up: "upRight",
      down: "downRight",
    },
    boardTheme: "river",
    readyText: "Follow the Easton products across the river.",
    items: [
      {
        type: "add",
        i: 0,
        j: 1,
        x: 3,
        y: 6,
        labelLines: ["∏_{n ∈ ω} Add", "(\u200eא\u200e_n, \u200eא\u200e_{2^n})"],
        eastonEffect: "powersOfTwo",
      },
      { type: "exp", k: 1, n: 0, x: 8, y: 6, labelLines: ["2^{\u200eא\u200e_0}"] },
      { type: "exp", k: 1, n: 1, x: 10, y: 6, labelLines: ["2^{\u200eא\u200e_1}"] },
      { type: "exp", k: 1, n: 2, x: 12, y: 6, labelLines: ["2^{\u200eא\u200e_2}"] },
      { type: "exp", k: 1, n: 3, x: 14, y: 6, labelLines: ["2^{\u200eא\u200e_3}"] },
      { type: "exp", k: 1, n: 4, x: 16, y: 6, labelLines: ["2^{\u200eא\u200e_4}"] },
      { type: "exp", k: 1, n: 5, x: 18, y: 6, labelLines: ["2^{\u200eא\u200e_5}"] },
      {
        type: "add",
        i: 0,
        j: 1,
        x: 3,
        y: 8,
        labelLines: ["∏_{n ∈ ω} Add", "(\u200eא\u200e_n, \u200eא\u200e_{(n+1)!})"],
        eastonEffect: "factorials",
      },
    ],
  },
  {
    name: "Stage 9: Conveyor",
    targetScore: 20,
    startPosition: { x: 0, y: 9 },
    readyText: "Walls block the route. Conveyor floors force the snake to move in the arrow direction.",
    walls: [
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 3, y: 6 },
      { x: 8, y: 5 },
      { x: 8, y: 6 },
      { x: 8, y: 7 },
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 4, y: 8 },
      { x: 5, y: 8 },
      { x: 6, y: 8 },
    ],
    conveyors: [
      { x: 2, y: 9, direction: "right" },
      { x: 3, y: 9, direction: "right" },
      { x: 4, y: 9, direction: "up" },
      { x: 4, y: 7, direction: "right" },
      { x: 5, y: 7, direction: "right" },
      { x: 6, y: 7, direction: "right" },
      { x: 7, y: 7, direction: "up" },
      { x: 7, y: 4, direction: "left" },
      { x: 6, y: 4, direction: "left" },
      { x: 5, y: 4, direction: "up" },
    ],
    items: [
      { type: "exp", k: 0, n: 3, x: 4, y: 6 },
      { type: "add", i: 0, j: 8, x: 7, y: 6 },
      { type: "exp", k: 1, n: 0, x: 7, y: 3 },
      { type: "exp", k: 0, n: 9, x: 2, y: 2 },
    ],
  },
  {
    name: "Stage 10: Which support",
    targetScore: 1,
    boardColumns: 23,
    boardViewColumns: 12,
    startPosition: { x: 0, y: 5 },
    readyText: "Ride through the Sacks supports and collect |(\u200eא\u200e_1)^V|.",
    walls: [
      ...createHorizontalCells(3, 22, 3),
      ...createHorizontalCells(3, 17, 5),
      ...createHorizontalCells(3, 22, 7),
    ],
    conveyors: [
      { x: 3, y: 4, direction: "right" },
      { x: 18, y: 4, direction: "right" },
      { x: 3, y: 6, direction: "right" },
      { x: 18, y: 6, direction: "right" },
    ],
    stageTexts: [
      { x: 0, y: 4, width: 3, text: "finite support iteration" },
      { x: 0, y: 6, width: 3, text: "countable support iteration" },
      { x: 15, y: 4, width: 3, text: "... (\u200eא\u200e_0 many)" },
      { x: 15, y: 6, width: 3, text: "... (\u200eא\u200e_0 many)" },
    ],
    items: [
      ...createHorizontalItems("sacks", 4, 14, 4, { supportLane: "finite" }),
      ...createHorizontalItems("sacks", 4, 14, 6, { supportLane: "countable" }),
      {
        type: "exp",
        k: 0,
        n: 1,
        x: 20,
        y: 5,
        labelLines: ["|(\u200eא\u200e_1)^V|"],
        supportScoreKey: "groundAleph1",
      },
    ],
  },
  {
    name: "Random Stage",
    refillItems: true,
    targetScore: null,
    readyText: "This stage has no clear condition.",
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
let currentCameraColumn = 0;

function resetGame() {
  window.clearInterval(timerId);
  updateBoardMetrics();
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
  currentCameraColumn = getCameraColumn(startPosition.x);
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
  updateStageDescription();
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
  endGame("Clear", `Score: ${score}; Target: ${getCurrentStage().targetScore}`);
  if (hasNextStage()) {
    nextStageButton.classList.remove("is-hidden");
  }
}

function tick() {
  const forcedDirection = getForcedDirection(snake.segments[0]);
  direction = forcedDirection ?? nextDirection;

  if (forcedDirection) {
    nextDirection = { ...forcedDirection };
  }

  previousSnakeSegments = snake.segments.map((segment) => ({ ...segment }));
  lastTickAt = performance.now();

  const head = snake.segments[0];
  const nextHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  if (hitsWall(nextHead)) {
    endGame("Game Over", `Reason: Hit a wall. Score ${score}`);
    return;
  }

  if (hitsSnake(nextHead)) {
    endGame("Game Over", `Reason: Hit yourself. Score ${score}`);
    return;
  }

  snake.segments.unshift(nextHead);

  const eatenItemIndex = items.findIndex((item) => sameCell(nextHead, item));
  const eatenItem = eatenItemIndex >= 0 ? items[eatenItemIndex] : null;

  rememberProperItem(eatenItem);
  rememberSupportItem(eatenItem);

  if (isScoringItem(eatenItem)) {
    const gainedScore = getItemScore(eatenItem);
    score += gainedScore;
    addScorePopup(gainedScore, nextHead);
    updateScore();
  }

  if (hasAddEffect(eatenItem)) {
    applyAddEffect(eatenItem);
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
      endGame("Game Over", `Reason: Not enough score. Score ${score} / ${targetScore}`);
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

  if (item.properScoreKey === "groundAleph1") {
    return stageState.properPSelected ? 0 : 1;
  }

  if (item.properScoreKey === "chi") {
    return stageState.properNambaSelected ? 1 : 0;
  }

  if (item.supportScoreKey === "groundAleph1") {
    return stageState.supportLane === "countable" ? 1 : 0;
  }

  return getExpValue(item.k, item.n);
}

function hasAddEffect(item) {
  return item?.type === "add" || item?.type === "r";
}

function applyAddEffect(item) {
  if (item.eastonEffect) {
    applyEastonEffect(item.eastonEffect);
    return;
  }

  snake.expTable.add(item.i, item.j);
}

function applyEastonEffect(effect) {
  const tableLength = 10;

  if (effect === "powersOfTwo") {
    snake.expTable.table = [...Array.from({ length: tableLength }, (_, index) => 2 ** index), Infinity];
    return;
  }

  if (effect === "factorials") {
    let value = 1;
    snake.expTable.table = [
      ...Array.from({ length: tableLength }, (_, index) => {
        value *= index + 1;
        return value;
      }),
      Infinity,
    ];
  }
}

function rememberInvariantItem(item) {
  if (item.invariantKey) {
    stageState.lastInvariantItem = item.invariantKey;
  }
}

function rememberProperItem(item) {
  if (item?.properKey === "P") {
    stageState.properPSelected = true;
  }

  if (item?.properKey === "Namba") {
    stageState.properNambaSelected = true;
  }
}

function rememberSupportItem(item) {
  if (item?.supportLane) {
    stageState.supportLane = item.supportLane;
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

  if (item.type === "non" || item.type === "sacks") {
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

  for (let y = 0; y < ROW_COUNT; y += 1) {
    for (let x = 0; x < getBoardColumnCount(); x += 1) {
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
  for (let y = 0; y < ROW_COUNT; y += 1) {
    for (let x = 0; x < getBoardColumnCount(); x += 1) {
      const candidate = { x, y };

      if (isEmptyCell(candidate)) {
        return candidate;
      }
    }
  }

  return { x: 0, y: 0 };
}

function isEdgeCell(cell) {
  return cell.x === 0 || cell.y === 0 || cell.x === getBoardColumnCount() - 1 || cell.y === ROW_COUNT - 1;
}

function isEmptyCell(cell) {
  const onSnake = snake.segments.some((segment) => sameCell(segment, cell));
  const onItem = items.some((item) => sameCell(item, cell));

  return !onSnake && !onItem && !hitsWall(cell) && !getStageConveyors().some((conveyor) => sameCell(conveyor, cell));
}

function hasApple() {
  return items.some((item) => item.type === "exp" || item.type === "non");
}

function getCurrentStage() {
  return STAGES[currentStageIndex];
}

function getStageWalls() {
  return getCurrentStage().walls ?? [];
}

function getStageConveyors() {
  return getCurrentStage().conveyors ?? [];
}

function getStageTexts() {
  return getCurrentStage().stageTexts ?? [];
}

function getForcedDirection(cell) {
  const conveyor = getStageConveyors().find((floor) => sameCell(floor, cell));
  const directionName = conveyor?.direction;

  return directionName ? DIRECTIONS[directionName] : null;
}

function getBoardColumnCount() {
  return getCurrentStage().boardColumns ?? DEFAULT_COLUMN_COUNT;
}

function getBoardViewColumnCount() {
  return getCurrentStage().boardViewColumns ?? getBoardColumnCount();
}

function getCameraColumn(centerX = snake?.segments?.[0]?.x ?? getStageStartPosition().x) {
  const boardColumns = getBoardColumnCount();
  const viewColumns = getBoardViewColumnCount();

  if (boardColumns <= viewColumns) {
    return 0;
  }

  const centeredColumn = centerX - (viewColumns - 1) / 2;

  return clamp(centeredColumn, 0, boardColumns - viewColumns);
}

function updateBoardMetrics() {
  const columnCount = getBoardViewColumnCount();
  canvas.width = columnCount * GRID_SIZE;
  boardWrap.style.aspectRatio = `${columnCount} / ${ROW_COUNT}`;
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createHorizontalCells(startX, endX, y) {
  return Array.from({ length: endX - startX + 1 }, (_, index) => ({ x: startX + index, y }));
}

function createHorizontalItems(type, startX, endX, y, itemData = {}) {
  return createHorizontalCells(startX, endX, y).map((cell) => ({ type, ...itemData, ...cell }));
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
  return isOutOfBounds(cell) || getStageWalls().some((wall) => sameCell(wall, cell));
}

function isOutOfBounds(cell) {
  return cell.x < 0 || cell.y < 0 || cell.x >= getBoardColumnCount() || cell.y >= ROW_COUNT;
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

function updateStageDescription() {
  const descriptionLines = getCurrentStage().descriptionLines;
  stageDescription.replaceChildren();
  stageDescription.classList.toggle("is-hidden", !descriptionLines);

  if (!descriptionLines) {
    return;
  }

  descriptionLines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    stageDescription.append(paragraph);
  });
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
  const progress = getMoveProgress(timestamp);

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoardBackground(timestamp);
  currentCameraColumn = getCameraColumn(getAnimatedHeadCellX(progress));
  context.save();
  context.translate(-currentCameraColumn * GRID_SIZE, 0);
  drawStageTerrain();
  drawGrid();
  drawStageTexts();
  drawItems();
  drawSnake(progress);
  drawScorePopups(timestamp);
  context.restore();
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

function getAnimatedHeadCellX(progress) {
  const head = snake.segments[0];
  const previousHead = previousSnakeSegments[0] ?? head;

  return previousHead.x + (head.x - previousHead.x) * progress;
}

function render(timestamp) {
  draw(timestamp);
  window.requestAnimationFrame(render);
}

function drawExpGraph() {
  const values = Array.from({ length: getBoardColumnCount() }, (_, index) => snake.expTable.get(index));
  const infinityIndex = values.findIndex((value) => value === Infinity);
  const graphValues = infinityIndex >= 0 ? values.slice(0, infinityIndex) : values;
  const maxIndex = values.length - 1;
  const maxValue = Math.max(...graphValues, 1);
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

  graphValues.forEach((value, index) => {
    const x = padding + (index / maxIndex) * graphWidth;
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
  graphContext.fillText(String(maxIndex), graphCanvas.width - padding + 4, graphCanvas.height - padding - 6);
  graphContext.fillText(String(maxValue), 6, padding - 6);
}

function drawGrid() {
  context.strokeStyle = "rgba(39, 53, 49, 0.62)";
  context.lineWidth = 1;

  for (let x = 0; x <= getBoardColumnCount(); x += 1) {
    const position = x * GRID_SIZE + 0.5;
    context.beginPath();
    context.moveTo(position, 0);
    context.lineTo(position, canvas.height);
    context.stroke();
  }

  for (let y = 0; y <= ROW_COUNT; y += 1) {
    const position = y * GRID_SIZE + 0.5;
    context.beginPath();
    context.moveTo(0, position);
    context.lineTo(canvas.width, position);
    context.stroke();
  }
}

function drawStageTerrain() {
  getStageConveyors().forEach(drawConveyor);
  getStageWalls().forEach(drawWall);
}

function drawWall(wall) {
  const x = wall.x * GRID_SIZE;
  const y = wall.y * GRID_SIZE;
  const inset = 3;

  context.fillStyle = "#3c4642";
  context.fillRect(x + inset, y + inset, GRID_SIZE - inset * 2, GRID_SIZE - inset * 2);

  context.fillStyle = "#242d2a";
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 2; column += 1) {
      const brickX = x + inset + column * 17 + (row % 2) * 8;
      const brickY = y + inset + row * 11;
      context.fillRect(brickX, brickY, 13, 7);
    }
  }

  context.strokeStyle = "rgba(238, 245, 240, 0.2)";
  context.lineWidth = 1;
  context.strokeRect(x + inset + 0.5, y + inset + 0.5, GRID_SIZE - inset * 2 - 1, GRID_SIZE - inset * 2 - 1);
}

function drawConveyor(conveyor) {
  const directionVector = DIRECTIONS[conveyor.direction];

  if (!directionVector) {
    return;
  }

  const centerX = conveyor.x * GRID_SIZE + GRID_SIZE / 2;
  const centerY = conveyor.y * GRID_SIZE + GRID_SIZE / 2;
  const inset = 5;
  const x = conveyor.x * GRID_SIZE + inset;
  const y = conveyor.y * GRID_SIZE + inset;
  const size = GRID_SIZE - inset * 2;

  context.fillStyle = "rgba(89, 169, 255, 0.28)";
  context.fillRect(x, y, size, size);
  context.strokeStyle = "rgba(185, 225, 255, 0.7)";
  context.lineWidth = 2;
  context.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);

  context.save();
  context.translate(centerX, centerY);
  context.rotate(Math.atan2(directionVector.y, directionVector.x));
  context.fillStyle = "#d8f0ff";
  context.beginPath();
  context.moveTo(11, 0);
  context.lineTo(-5, -9);
  context.lineTo(-5, -4);
  context.lineTo(-13, -4);
  context.lineTo(-13, 4);
  context.lineTo(-5, 4);
  context.lineTo(-5, 9);
  context.closePath();
  context.fill();
  context.restore();
}

function drawStageTexts() {
  getStageTexts().forEach(drawStageText);
}

function drawStageText(stageText) {
  const width = (stageText.width ?? 1) * GRID_SIZE;
  const centerX = stageText.x * GRID_SIZE + width / 2;
  const centerY = stageText.y * GRID_SIZE + GRID_SIZE / 2;
  const fontSize = stageText.fontSize ?? 11;

  context.save();
  context.font = `800 ${fontSize}px system-ui, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineWidth = 4;
  context.strokeStyle = "rgba(16, 21, 20, 0.88)";
  context.fillStyle = "#eef5f0";
  context.strokeText(stageText.text, centerX, centerY, width - 6);
  context.fillText(stageText.text, centerX, centerY, width - 6);
  context.restore();
}

function drawItems() {
  const labels = [];

  items.forEach((item) => {
    if (item.type === "add") {
      drawAddItem(item, labels);
    } else if (item.type === "r") {
      drawRItem(item, labels);
    } else if (item.type === "sacks") {
      drawSacksItem(item);
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

function drawSacksItem(item) {
  const inset = 4;
  const x = item.x * GRID_SIZE + inset;
  const y = item.y * GRID_SIZE + inset;
  const size = GRID_SIZE - inset * 2;

  context.fillStyle = "#c7b7ff";
  context.fillRect(x, y, size, size);
  context.strokeStyle = "#5b4b91";
  context.lineWidth = 2;
  context.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);

  context.fillStyle = "#241a4a";
  context.font = "800 10px system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Sacks", item.x * GRID_SIZE + GRID_SIZE / 2, item.y * GRID_SIZE + GRID_SIZE / 2);
}

function getItemLabelData(item) {
  if (item.type === "add") {
    return {
      item,
      lines: item.labelLines ?? ["Add", `\u200e(א\u200e_${item.i},א\u200e_${item.j})\u200e`],
      background: "rgba(255, 244, 200, 0.93)",
      text: "#4a3500",
    };
  }

  if (item.type === "r") {
    return {
      item,
      lines: item.labelLines ?? [`\u200eRandom(א\u200e_${item.j})\u200e`],
      background: "rgba(219, 246, 255, 0.93)",
      text: "#083344",
    };
  }

  if (item.type === "non") {
    return {
      item,
      lines: item.labelLines ?? ["non(M)"],
      background: "rgba(255, 232, 228, 0.92)",
      text: "#6d1812",
    };
  }

  return {
    item,
    lines: item.labelLines ?? getAppleLabelLines(item),
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
  const rect = {
    x: centerX - labelWidth / 2,
    y: centerY - labelHeight / 2,
    width: labelWidth,
    height: labelHeight,
  };
  const overflow = getOverflowArea(rect);
  const overlap = placedRects.reduce((total, placedRect) => total + getOverlapArea(rect, placedRect), 0);

  return {
    ...rect,
    score: overflow * 1000 + overlap * 80,
  };
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
  const visibleLeft = currentCameraColumn * GRID_SIZE;
  const visibleRight = visibleLeft + canvas.width;
  const overflowX = Math.max(0, visibleLeft - rect.x) + Math.max(0, rect.x + rect.width - visibleRight);
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
