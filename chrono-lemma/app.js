const PROBLEM_SETS = [
  {
    id: "math-logic",
    title: "数学と論理",
    initialIds: ["goedel-completeness"],
    roundIds: [
      "euclid-primes",
      "cantor-uncountable",
      "fermat-little",
      "incompleteness",
      "euler-polyhedra",
      "church-turing",
      "pythagoras",
      "four-color",
      "fermat-last",
    ],
    theorems: [
      {
        id: "euclid-primes",
        year: -300,
        era: "紀元前300年ごろ",
        title: "素数は無限個存在する",
        statement: "任意に有限個の素数を挙げても、それらでは割り切れない数を作れる。",
        explanation: "ユークリッド『原論』に見られる古典的な証明で、数論の最初期の大定理の一つです。",
      },
      {
        id: "pythagoras",
        year: -500,
        era: "紀元前500年ごろ",
        title: "直角三角形では斜辺の二乗が他二辺の二乗和に等しい",
        statement: "ユークリッド幾何におけるピタゴラスの定理。",
        explanation: "古代から知られ、ギリシア数学で体系化された幾何学の基本定理です。",
      },
      {
        id: "fermat-little",
        year: 1640,
        era: "1640年",
        title: "フェルマーの小定理",
        statement: "pが素数でaがpで割り切れないなら、aのp-1乗は1に合同になる。",
        explanation: "近代的な数論の発展を支えた合同式の基本定理です。",
      },
      {
        id: "euler-polyhedra",
        year: 1758,
        era: "1758年",
        title: "凸多面体では V - E + F = 2",
        statement: "頂点数、辺数、面数の間に成り立つオイラーの多面体公式。",
        explanation: "幾何から位相へ向かう考え方を促した、組合せ的な不変量の代表例です。",
      },
      {
        id: "cantor-uncountable",
        year: 1874,
        era: "1874年",
        title: "実数全体の集合の濃度は自然数全体の集合の濃度より大きい",
        statement: "実数は可算列では尽くせず、無限にも大きさの違いがある。",
        explanation: "カントールの結果は集合論を生み、無限を比較する数学的な道具を与えました。",
      },
      {
        id: "goedel-completeness",
        year: 1929,
        era: "1929年",
        title: "一階述語の理論は無矛盾ならばそのモデルが存在する",
        statement: "一階述語論理の完全性定理。意味論的帰結と証明可能性が対応する。",
        explanation: "ゲーデルの完全性定理はモデル理論の出発点となる、論理学の中心定理です。",
      },
      {
        id: "incompleteness",
        year: 1931,
        era: "1931年",
        title: "十分強い形式体系には、真だが証明できない命題がある",
        statement: "ゲーデルの第一不完全性定理。",
        explanation: "算術を含む無矛盾な体系の限界を示し、20世紀の基礎論を大きく変えました。",
      },
      {
        id: "church-turing",
        year: 1936,
        era: "1936年",
        title: "一般の停止性判定アルゴリズムは存在しない",
        statement: "任意のプログラムが停止するかを常に判定する手続きは作れない。",
        explanation: "チャーチとチューリングの仕事は計算可能性理論とコンピュータ科学の基礎です。",
      },
      {
        id: "four-color",
        year: 1976,
        era: "1976年",
        title: "平面地図は4色で塗り分けられる",
        statement: "隣接する領域が同じ色にならないよう、4色で十分に塗り分けられる。",
        explanation: "四色定理は、コンピュータ支援証明が大きな注目を集めた初期の例です。",
      },
      {
        id: "fermat-last",
        year: 1994,
        era: "1994年",
        title: "nが3以上なら x^n + y^n = z^n の自然数解は存在しない",
        statement: "フェルマーの最終定理。",
        explanation: "ワイルズによる証明は楕円曲線やモジュラー形式と深く結びついています。",
      },
    ],
  },
  {
    id: "general-math",
    title: "数学全般",
    initialIds: ["fundamental-theorem-algebra-general"],
    roundIds: [
      "euclid-primes-general",
      "euler-formula-general",
      "pythagorean-general",
      "bayes-theorem-general",
      "four-color-general",
      "quadratic-formula-general",
      "cantor-uncountable-general",
      "fermat-little-general",
      "fundamental-theorem-calculus-general",
      "noether-theorem-general",
    ],
    theorems: [
      {
        id: "pythagorean-general",
        year: -500,
        era: "紀元前500年ごろ",
        title: "直角三角形では a^2 + b^2 = c^2 が成り立つ",
        statement: "直角三角形の斜辺の長さを c、他の二辺を a, b とすると、a^2 + b^2 = c^2。",
        explanation: "ピタゴラスの定理は、幾何と数式が直接結びつく最も有名な定理の一つです。",
      },
      {
        id: "euclid-primes-general",
        year: -300,
        era: "紀元前300年ごろ",
        title: "素数は無限個存在する",
        statement: "どれだけ多くの素数を集めても、それで素数をすべて尽くすことはできない。",
        explanation: "ユークリッドの古典的な証明は短く、背理法の代表例としてもよく知られています。",
      },
      {
        id: "quadratic-formula-general",
        year: 628,
        era: "628年ごろ",
        title: "二次方程式には解の公式がある",
        statement: "ax^2 + bx + c = 0 の解は、係数 a, b, c から平方根を使って表せる。",
        explanation: "二次方程式の一般解法は古代から発展し、ブラーマグプタらの仕事で体系的に扱われました。",
      },
      {
        id: "fermat-little-general",
        year: 1640,
        era: "1640年",
        title: "フェルマーの小定理",
        statement: "p が素数で a が p で割り切れないなら、a^(p-1) は p で割ると 1 余る。",
        explanation: "素数と余りの計算を結ぶ定理で、暗号理論にもつながる初等整数論の基本結果です。",
      },
      {
        id: "fundamental-theorem-calculus-general",
        year: 1668,
        era: "1668年ごろ",
        title: "微分と積分は互いに逆の操作である",
        statement: "関数の変化率を調べる微分と、面積を足し合わせる積分は基本的に逆向きの関係にある。",
        explanation: "微積分学の基本定理は、ニュートンとライプニッツ以降の解析学を支える中心的な考え方です。",
      },
      {
        id: "euler-formula-general",
        year: 1748,
        era: "1748年",
        title: "e^(iπ) + 1 = 0",
        statement: "指数関数、三角関数、複素数を結ぶオイラーの公式から現れる恒等式。",
        explanation: "解析学の基本定数 e, i, π, 1, 0 が一つの式に現れるため、非常に有名です。",
      },
      {
        id: "bayes-theorem-general",
        year: 1763,
        era: "1763年",
        title: "条件付き確率はベイズの定理で更新できる",
        statement: "観測した情報を使って、ある仮説の確率を計算し直すことができる。",
        explanation: "ベイズの定理は、統計、機械学習、意思決定で広く使われる確率の基本公式です。",
      },
      {
        id: "fundamental-theorem-algebra-general",
        year: 1799,
        era: "1799年",
        title: "複素数まで広げると多項式方程式は必ず根を持つ",
        statement: "次数が1以上の複素係数多項式は、少なくとも一つの複素数解を持つ。",
        explanation: "代数学の基本定理は、複素数の世界が多項式方程式に対して閉じていることを示します。",
      },
      {
        id: "cantor-uncountable-general",
        year: 1874,
        era: "1874年",
        title: "実数は自然数よりも多い",
        statement: "自然数をどれだけ並べても、実数全体を一列に数え尽くすことはできない。",
        explanation: "カントールの結果は、無限にも大きさの違いがあることをはっきり示しました。",
      },
      {
        id: "noether-theorem-general",
        year: 1918,
        era: "1918年",
        title: "対称性から保存則が生まれる",
        statement: "物理法則の連続的な対称性には、それに対応する保存量が存在する。",
        explanation: "ネーターの定理は数学と物理を結ぶ深い定理で、エネルギー保存や運動量保存の背景にあります。",
      },
      {
        id: "four-color-general",
        year: 1976,
        era: "1976年",
        title: "平面地図は4色で塗り分けられる",
        statement: "隣り合う地域が同じ色にならないように、どんな平面地図も4色で塗り分けられる。",
        explanation: "四色定理は主張がわかりやすい一方、証明にはコンピュータ支援が使われたことで有名です。",
      },
    ],
  },
  {
    id: "axiomatic-set-theory",
    title: "公理的集合論",
    initialIds: ["godel-constructible-gch"],
    roundIds: ["silver-singular-cardinal",
      "solovay-measurable-reals",
      "martin-steel-projective-determinacy",
      "scott-measurable-not-l",
      "jensen-diamond",
      "aspero-schindler-mm-star",
      "cohen-ch-independence",
      "martins-maximum",
      "shelah-proper-forcing",
      "martin-borel-determinacy"],
    theorems: [
      {
        id: "godel-constructible-gch",
        year: 1940,
        era: "1940年",
        title: "構成可能宇宙 L では AC と GCH が成り立つ",
        statement: "L は ZF の内部モデルであり、そこでは選択公理と一般連続体仮説が成立する。",
        explanation: "ゲーデルの構成可能宇宙は、CH/GCH が ZF から反証できないことを示す標準的な内的モデルを与えました。",
      },
      {
        id: "scott-measurable-not-l",
        year: 1961,
        era: "1961年",
        title: "可測基数が存在すれば V = L ではない",
        statement: "可測基数の存在は構成可能性公理と両立しない。",
        explanation: "Scott の定理は、大きな基数が L の細構造的な最小性を超えることを示す初期の重要結果です。",
      },
      {
        id: "cohen-ch-independence",
        year: 1963,
        era: "1963年",
        title: "連続体仮説は ZFC から独立である",
        statement: "強制法により、CH もその否定も ZFC の相対無矛盾性の範囲で実現できる。",
        explanation: "Cohen の強制法は、独立性証明の標準技法となり、その後の集合論の方法論を大きく変えました。",
      },
      {
        id: "solovay-measurable-reals",
        year: 1970,
        era: "1970年",
        title: "すべての実数集合がルベーグ可測な ZF + DC モデルがある",
        statement: "到達不能基数の存在を仮定して、ZF + DC かつ実数の全ての集合が可測なモデルを構成できる。",
        explanation: "Solovay モデルは、選択公理と実解析の正則性性質の緊張関係を明確にした古典的結果です。",
      },
      {
        id: "jensen-diamond",
        year: 1972,
        era: "1972年",
        title: "L ではダイヤモンド原理が成り立つ",
        statement: "構成可能宇宙では、ω1 上の集合を定常的に予測する ◇ が成立する。",
        explanation: "Jensen の fine structure から現れる ◇ は、Suslin 木や各種構成のための代表的な組合せ原理です。",
      },
      {
        id: "silver-singular-cardinal",
        year: 1974,
        era: "1974年",
        title: "Silver の特異基数定理",
        statement: "非可算共終数の特異基数で GCH が初めて破れることはない。",
        explanation: "特異基数問題を大きく前進させ、後の pcf 理論へつながる基数算術の基本結果です。",
      },
      {
        id: "martin-borel-determinacy",
        year: 1975,
        era: "1975年",
        title: "すべての Borel ゲームは決定的である",
        statement: "Borel 集合を勝利条件とする完全情報無限ゲームでは、どちらか一方に必勝戦略がある。",
        explanation: "Martin の Borel determinacy は ZFC の定理で、記述集合論と公理的集合論の境界にある標準結果です。",
      },
      {
        id: "shelah-proper-forcing",
        year: 1982,
        era: "1982年",
        title: "可算サポート反復は proper forcing を保つ",
        statement: "proper forcing の可算サポート反復は proper であり、ω1 を保存する反復理論が成立する。",
        explanation: "Shelah の proper forcing 理論は、PFA などの強制公理を扱う基盤になりました。",
      },
      {
        id: "martins-maximum",
        year: 1988,
        era: "1988年",
        title: "Martin's Maximum は相対無矛盾である",
        statement: "十分強い大きな基数を仮定すると、定常集合保存強制に対する最大級の強制公理 MM のモデルを作れる。",
        explanation: "Foreman、Magidor、Shelah による MM は、PFA を超える強制公理として多くの構造的帰結を持ちます。",
      },
      {
        id: "martin-steel-projective-determinacy",
        year: 1989,
        era: "1989年",
        title: "十分多くの Woodin 基数から射影決定性が従う",
        statement: "Woodin 基数列とその上の可測基数から、すべての射影集合のゲーム決定性が導かれる。",
        explanation: "Martin-Steel の定理は、大きな基数と記述集合論の正則性性質を結ぶ中心的な結果です。",
      },
      {
        id: "aspero-schindler-mm-star",
        year: 2021,
        era: "2021年",
        title: "MM++ は Woodin の公理 (*) を含意する",
        statement: "強い形の Martin's Maximum から、Pmax と非可算集合論を結ぶ Woodin の公理 (*) が従う。",
        explanation: "Aspero-Schindler の結果は、強制公理と Woodin の Pmax プログラムの関係を近年大きく整理しました。",
      },
    ],
  },
  {
    id: "axiomatic-set-theory-extreme",
    title: "公理的集合論・激ムズ",
    initialIds: ["kunen-inconsistency"],
    roundIds: [
      "easton-continuum-function",
      "jensen-covering",
      "magidor-strong-compact",
      "laver-indestructibility",
      "dodd-jensen-core-model",
      "baumgartner-pfa",
      "foreman-magidor-shelah-ns",
      "shelah-pcf-theory",
      "woodin-pmax-star",
      "aspero-schindler-mm-star-extreme",
    ],
    theorems: [
      {
        id: "easton-continuum-function",
        year: 1970,
        era: "1970年",
        title: "Easton の定理",
        statement: "正則基数上の連続体関数は、単調性と共終性制約を満たす限り、強制法でかなり自由に指定できる。",
        explanation: "Cohen 以後の強制法が、CH だけでなく広範な基数算術を制御できることを示した代表的結果です。",
      },
      {
        id: "kunen-inconsistency",
        year: 1971,
        era: "1971年",
        title: "Kunen の非存在定理",
        statement: "選択公理の下では、宇宙 V から V 自身への非自明な初等埋め込み j: V -> V は存在しない。",
        explanation: "Reinhardt 基数型の極端な大きな基数仮説を ZFC で排除し、大きな基数階層の上限を鋭くしました。",
      },
      {
        id: "jensen-covering",
        year: 1974,
        era: "1974年",
        title: "Jensen の covering theorem",
        statement: "0# が存在しなければ、任意の非可算な順序数集合は同じ濃度の構成可能集合で被覆される。",
        explanation: "V と L の距離を大きな基数の不在から測る細構造理論の核心的結果です。",
      },
      {
        id: "magidor-strong-compact",
        year: 1976,
        era: "1976年",
        title: "最初の強コンパクト基数の相対的一貫性現象",
        statement: "大きな基数仮定の下で、最初の強コンパクト基数の位置は最初の可測基数や最初の超コンパクト基数と一致し得る。",
        explanation: "Magidor の結果は、強コンパクト性と超コンパクト性の関係が単純な絶対的順序ではないことを示しました。",
      },
      {
        id: "laver-indestructibility",
        year: 1978,
        era: "1978年",
        title: "Laver の超コンパクト性の indestructibility",
        statement: "超コンパクト基数は準備強制により、以後の <kappa-directed closed forcing で破壊されないようにできる。",
        explanation: "Laver preparation は、強制法と大きな基数を同時に扱う現代集合論の基本技術です。",
      },
      {
        id: "dodd-jensen-core-model",
        year: 1982,
        era: "1982年",
        title: "Dodd-Jensen の core model K",
        statement: "可測基数の内的モデルがない状況で、L を拡張する fine structural core model が covering 性質を満たす。",
        explanation: "Core model 理論は、内的モデルによって大きな基数の不在を精密に解析する標準的枠組みになりました。",
      },
      {
        id: "baumgartner-pfa",
        year: 1984,
        era: "1984年",
        title: "Proper Forcing Axiom",
        statement: "proper forcing と高々 aleph_1 個の稠密集合に対するフィルターの存在を主張する強制公理が定式化された。",
        explanation: "PFA は CH の否定や構造的反映原理を導く強力な公理で、proper forcing 理論の中心的対象です。",
      },
      {
        id: "foreman-magidor-shelah-ns",
        year: 1988,
        era: "1988年",
        title: "Martin's Maximum と NS_{omega_1} の飽和",
        statement: "Foreman-Magidor-Shelah は Martin's Maximum を導入し、関連する非定常イデアルの飽和現象を解析した。",
        explanation: "MM は PFA を拡張する最大級の強制公理で、定常集合保存強制に対する一貫性理論を大きく進めました。",
      },
      {
        id: "shelah-pcf-theory",
        year: 1994,
        era: "1994年",
        title: "Shelah の pcf 理論による特異基数算術の制約",
        statement: "可能共終性の理論により、特異基数のべき集合関数には ZFC だけで強い上限制約があることが示された。",
        explanation: "pcf 理論は、強制法に頼らず特異基数算術を制御する深い組合せ的道具を提供しました。",
      },
      {
        id: "woodin-pmax-star",
        year: 1999,
        era: "1999年",
        title: "Woodin の Pmax と公理 (*)",
        statement: "AD^{L(R)} の下で Pmax 拡大を用い、H(omega_2) の強い構造理論を与える公理 (*) が定式化された。",
        explanation: "Pmax プログラムは、決定性公理、強制公理、連続体問題を結ぶ Woodin の中心的構想です。",
      },
      {
        id: "aspero-schindler-mm-star-extreme",
        year: 2021,
        era: "2021年",
        title: "MM++ は Woodin の公理 (*) を含意する",
        statement: "強い形の Martin's Maximum から、Pmax と H(omega_2) の理論を結ぶ Woodin の公理 (*) が従う。",
        explanation: "Aspero-Schindler の定理は、強制公理路線と Pmax 路線が予想以上に近いことを示した近年の重要結果です。",
      },
    ],
  },
];

const DEFAULT_PROBLEM_SET_ID = "math-logic";

const state = {
  problemSetId: DEFAULT_PROBLEM_SET_ID,
  hasStarted: false,
  timeline: [],
  deck: [],
  current: null,
  locked: false,
  round: 1,
  score: 0,
};

const timelineEl = document.querySelector("#timeline");
const challengePanelEl = document.querySelector("#challenge-panel");
const timelinePanelEl = document.querySelector("#timeline-panel");
const problemSetOptionsEl = document.querySelector("#problem-set-options");
const startButtonEl = document.querySelector("#start-button");
const statsEl = document.querySelector("#stats");
const roundEl = document.querySelector("#round");
const scoreEl = document.querySelector("#score");
const candidateEraEl = document.querySelector("#candidate-era");
const candidateTitleEl = document.querySelector("#candidate-title");
const candidateStatementEl = document.querySelector("#candidate-statement");
const remainingCountEl = document.querySelector("#remaining-count");
const resultPanelEl = document.querySelector("#result-panel");
const resultIconEl = document.querySelector("#result-icon");
const resultLabelEl = document.querySelector("#result-label");
const resultCopyEl = document.querySelector("#result-copy");
const nextButtonEl = document.querySelector("#next-button");
const restartButtonEl = document.querySelector("#restart-button");
const shareButtonEl = document.querySelector("#share-button");
const confettiLayerEl = document.querySelector("#confetti-layer");

function setupProblemSetSelect() {
  problemSetOptionsEl.replaceChildren(
    ...PROBLEM_SETS.map((problemSet) => {
      const label = document.createElement("label");
      label.className = "set-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "problem-set";
      input.value = problemSet.id;
      input.checked = problemSet.id === state.problemSetId;
      input.disabled = problemSet.roundIds.length === 0;

      const title = document.createElement("span");
      title.textContent = problemSet.title;

      label.append(input, title);
      return label;
    }),
  );
}

function getSelectedProblemSetId() {
  return problemSetOptionsEl.querySelector('input[name="problem-set"]:checked')?.value ?? state.problemSetId;
}

function selectProblemSetRadio(problemSetId) {
  const input = problemSetOptionsEl.querySelector(`input[name="problem-set"][value="${problemSetId}"]`);
  if (input) {
    input.checked = true;
  }
}

function showStartScreen(problemSetId = state.problemSetId) {
  state.problemSetId = problemSetId;
  state.hasStarted = false;
  state.timeline = [];
  state.deck = [];
  state.current = null;
  state.locked = false;
  state.round = 1;
  state.score = 0;

  selectProblemSetRadio(state.problemSetId);
  challengePanelEl.hidden = true;
  timelinePanelEl.hidden = true;
  statsEl.hidden = true;
  startButtonEl.hidden = false;
  shareButtonEl.hidden = true;
  resultPanelEl.hidden = true;
  timelineEl.replaceChildren();
  roundEl.textContent = "-";
  scoreEl.textContent = "0";
}

function startGame(problemSetId = state.problemSetId) {
  const problemSet = getProblemSet(problemSetId);
  const byId = createTheoremMap(problemSet);

  state.problemSetId = problemSet.id;
  state.hasStarted = true;
  selectProblemSetRadio(problemSet.id);
  state.timeline = problemSet.initialIds.map((id) => byId.get(id)).filter(Boolean).sort(compareByYear);
  state.deck = problemSet.roundIds.map((id) => byId.get(id)).filter(Boolean);
  state.current = null;
  state.locked = false;
  state.round = 1;
  state.score = 0;
  challengePanelEl.hidden = false;
  timelinePanelEl.hidden = false;
  statsEl.hidden = false;
  startButtonEl.hidden = true;
  shareButtonEl.hidden = true;
  resultPanelEl.hidden = true;
  drawNextCard();
}

function getProblemSet(problemSetId) {
  return PROBLEM_SETS.find((problemSet) => problemSet.id === problemSetId) ?? PROBLEM_SETS[0];
}

function createTheoremMap(problemSet) {
  return new Map(problemSet.theorems.map((theorem) => [theorem.id, theorem]));
}

function drawNextCard() {
  state.current = state.deck.shift() ?? null;
  state.locked = false;
  resultPanelEl.hidden = true;
  render();
}

function compareByYear(a, b) {
  return a.year - b.year;
}

function correctInsertIndex(theorem) {
  return state.timeline.findIndex((item) => theorem.year < item.year);
}

function normalizedIndex(index) {
  const result = correctInsertIndex(state.current);
  return result === -1 ? state.timeline.length : result;
}

function attemptInsert(index) {
  if (state.locked || !state.current) return;

  const correctIndex = normalizedIndex(index);
  const isCorrect = index === correctIndex;
  state.locked = true;

  state.timeline.splice(correctIndex, 0, state.current);
  if (isCorrect) {
    state.score += 1;
  }

  playResultSound(isCorrect);
  showResult(isCorrect, correctIndex);
  render();
}

function playResultSound(isCorrect) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();
  if (isCorrect) {
    playTone(audioContext, 880, 0, 0.12, "sine");
    playTone(audioContext, 1320, 0.13, 0.16, "sine");
  } else {
    playTone(audioContext, 180, 0, 0.18, "sawtooth");
    playTone(audioContext, 120, 0.18, 0.22, "sawtooth");
  }
}

function playFanfareSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();
  playTone(audioContext, 523.25, 0, 0.14, "triangle");
  playTone(audioContext, 659.25, 0.12, 0.14, "triangle");
  playTone(audioContext, 783.99, 0.24, 0.14, "triangle");
  playTone(audioContext, 1046.5, 0.38, 0.22, "triangle");
  playTone(audioContext, 1318.51, 0.56, 0.18, "sine");
  playTone(audioContext, 1567.98, 0.7, 0.18, "sine");
  playTone(audioContext, 783.99, 0.92, 0.18, "triangle");
  playTone(audioContext, 1046.5, 0.92, 0.18, "sine");
  playTone(audioContext, 1318.51, 0.92, 0.18, "sine");
  playTone(audioContext, 1046.5, 1.16, 0.16, "triangle");
  playTone(audioContext, 1318.51, 1.3, 0.16, "sine");
  playTone(audioContext, 1567.98, 1.44, 0.16, "sine");
  playTone(audioContext, 1046.5, 1.64, 0.55, "triangle");
  playTone(audioContext, 1318.51, 1.64, 0.55, "sine");
  playTone(audioContext, 1567.98, 1.64, 0.55, "sine");
}

function playCompletionSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();
  playTone(audioContext, 392, 0, 0.16, "triangle");
  playTone(audioContext, 523.25, 0.16, 0.2, "triangle");
  playTone(audioContext, 659.25, 0.36, 0.28, "sine");
}

function playTone(audioContext, frequency, delay, duration, type) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const startAt = audioContext.currentTime + delay;
  const stopAt = startAt + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(0.16, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, stopAt);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startAt);
  oscillator.stop(stopAt);
}

function launchConfetti() {
  const colors = ["#246b63", "#b6842c", "#1167c4", "#d94f30", "#f3c84b", "#7b4ab8"];
  confettiLayerEl.replaceChildren();

  for (let index = 0; index < 96; index += 1) {
    const piece = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 180 + Math.random() * 360;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 80;

    piece.className = "confetti-piece";
    piece.style.setProperty("--x", `${x}px`);
    piece.style.setProperty("--y", `${y}px`);
    piece.style.setProperty("--rotation", `${Math.random() * 720 - 360}deg`);
    piece.style.setProperty("--delay", `${Math.random() * 0.18}s`);
    piece.style.background = colors[index % colors.length];
    confettiLayerEl.append(piece);
  }

  window.setTimeout(() => confettiLayerEl.replaceChildren(), 2600);
}

function showResult(isCorrect, correctIndex) {
  resultPanelEl.hidden = false;
  resultPanelEl.classList.toggle("error", !isCorrect);
  resultIconEl.textContent = isCorrect ? "⭕️" : "✕";
  resultLabelEl.textContent = isCorrect ? "正解" : "不正解";
  resultCopyEl.textContent = isCorrect
    ? "カードをタイムラインに追加しました。年代と解説は最後にまとめて表示します。"
    : `正しい位置は${correctIndex + 1}番目です。年代と解説は最後にまとめて表示します。`;
  nextButtonEl.textContent = state.deck.length > 0 ? "次へ" : "結果を見る";
}

function render() {
  const isComplete = !state.current;
  roundEl.textContent = state.current ? String(state.round) : "-";
  scoreEl.textContent = String(state.score);

  if (state.current) {
    candidateEraEl.textContent = "年代は最後に表示";
    candidateTitleEl.textContent = state.current.title;
    candidateStatementEl.textContent = state.current.statement;
    remainingCountEl.textContent = `残り ${state.deck.length + 1} 枚`;
    challengePanelEl.draggable = !state.locked;
    challengePanelEl.classList.toggle("draggable-card", !state.locked);
  } else {
    candidateEraEl.textContent = "完了";
    candidateTitleEl.textContent = "すべてのカードを並べました";
    candidateStatementEl.textContent = `${state.score}問正解しました。`;
    remainingCountEl.textContent = "";
    challengePanelEl.draggable = false;
    challengePanelEl.classList.remove("draggable-card");
    shareButtonEl.hidden = false;
  }

  timelineEl.replaceChildren();

  const slotCount = isComplete ? state.timeline.length : state.timeline.length + 1;

  for (let index = 0; index < slotCount; index += 1) {
    const slot = document.createElement("li");
    slot.className = "slot";

    if (!isComplete) {
      const insertButton = document.createElement("button");
      insertButton.className = "insert-button";
      insertButton.type = "button";
      insertButton.textContent = insertLabel(index);
      insertButton.disabled = state.locked || !state.current;
      insertButton.addEventListener("click", () => attemptInsert(index));
      insertButton.addEventListener("dragover", handleInsertDragOver);
      insertButton.addEventListener("dragleave", handleInsertDragLeave);
      insertButton.addEventListener("drop", (event) => handleInsertDrop(event, index));
      slot.append(insertButton);
    }

    const theorem = state.timeline[index];
    if (theorem) {
      slot.append(createCard(theorem, isComplete));
    }

    timelineEl.append(slot);
  }
}

function handleCandidateDragStart(event) {
  if (state.locked || !state.current) {
    event.preventDefault();
    return;
  }
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", state.current.id);
  challengePanelEl.classList.add("is-dragging");
}

function handleCandidateDragEnd() {
  challengePanelEl.classList.remove("is-dragging");
  document.querySelectorAll(".insert-button.drag-over").forEach((button) => {
    button.classList.remove("drag-over");
  });
}

function handleInsertDragOver(event) {
  if (state.locked || !state.current) return;
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
  event.dataTransfer.dropEffect = "move";
}

function handleInsertDragLeave(event) {
  event.currentTarget.classList.remove("drag-over");
}

function handleInsertDrop(event, index) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");
  if (state.locked || !state.current) return;
  attemptInsert(index);
}

function insertLabel(index) {
  const position = index + 1;
  if (index === 0) return `${position}番目に挿入: 最初`;
  if (index === state.timeline.length) return `${position}番目に挿入: 最後`;
  return `${position}番目に挿入`;
}

function createCard(theorem, showDetails) {
  const card = document.createElement("article");
  card.className = "card";
  if (state.locked && state.current?.id === theorem.id) {
    card.classList.add("correct-position");
  }

  const body = document.createElement("div");

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = theorem.title;

  const statement = document.createElement("div");
  statement.className = "card-statement";
  statement.textContent = theorem.statement;

  if (showDetails) {
    const explanation = document.createElement("div");
    explanation.className = "card-explanation";
    explanation.textContent = theorem.explanation;
    body.append(title, statement, explanation);
  } else {
    body.append(title, statement);
  }

  card.append(body);

  if (showDetails) {
    const year = document.createElement("div");
    year.className = "card-year";
    year.textContent = theorem.era;
    card.append(year);
  }

  return card;
}

nextButtonEl.addEventListener("click", () => {
  if (state.deck.length === 0) {
    const isPerfect = state.score === getProblemSet(state.problemSetId).roundIds.length;
    state.current = null;
    state.locked = true;
    resultPanelEl.hidden = true;
    render();
    if (isPerfect) {
      launchConfetti();
      playFanfareSound();
    } else {
      playCompletionSound();
    }
    return;
  }
  state.round += 1;
  drawNextCard();
});

shareButtonEl.addEventListener("click", () => {
  const problemSet = getProblemSet(state.problemSetId);
  const total = problemSet.roundIds.length;
  const text = `Chrono Lemma「${problemSet.title}」で${total}問中${state.score}問正解しました。\n${window.location.href}`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

challengePanelEl.addEventListener("dragstart", handleCandidateDragStart);
challengePanelEl.addEventListener("dragend", handleCandidateDragEnd);
restartButtonEl.addEventListener("click", () => startGame());
startButtonEl.addEventListener("click", () => startGame(getSelectedProblemSetId()));
problemSetOptionsEl.addEventListener("change", (event) => {
  if (event.target.matches('input[name="problem-set"]')) {
    showStartScreen(event.target.value);
  }
});

setupProblemSetSelect();
showStartScreen();
