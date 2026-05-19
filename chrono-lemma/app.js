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
      "laver-borel-conjecture-consistency",
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
        id: "laver-borel-conjecture-consistency",
        year: 1976,
        era: "1976年",
        title: "Laver による Borel 予想の無矛盾性",
        statement: "可算サポート反復を用いて、すべての強測度零集合が可算であるという Borel 予想の ZFC との相対無矛盾性が示された。",
        explanation: "Laver のモデルは、実数直線上の小さい集合の性質と proper forcing の反復技法を結びつける古典的結果です。",
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
    ],
  },
];

const DEFAULT_PROBLEM_SET_ID = "math-logic";
const DEFAULT_LANGUAGE = "ja";

const FALSE_PROPOSITIONS = {
  "math-logic": {
    id: "false-math-logic-finite-model-compactness",
    isFalse: true,
    title: "有限モデルコンパクト性定理",
    statement: "一階理論のすべての有限部分が有限モデルを持つなら、その理論全体も有限モデルを持つ。",
    explanation: "一階論理のコンパクト性はモデルの存在を保証しますが、有限モデルであることは保存しません。任意に大きな有限モデルを要求する理論は反例になります。",
  },
  "general-math": {
    id: "false-general-math-continuous-finitely-nondifferentiable",
    isFalse: true,
    title: "連続関数は高々有限個の点を除いて微分可能である",
    statement: "グラフが途切れずにつながっていれば、尖った点や折れ曲がりは有限個しか現れない。",
    explanation: "連続だが無限個の点で微分不能な関数や、至るところ微分不能な連続関数が存在します。",
  },
  "axiomatic-set-theory": {
    id: "false-set-theory-countably-complete-ultrafilter-omega",
    isFalse: true,
    title: "ω 上には可算完備な非主超フィルターが存在する",
    statement: "自然数全体の上でも、可算個の交わりに閉じた非自明な超フィルターを取ることができる。",
    explanation: "ω 上の可算完備な超フィルターは主超フィルターになります。非主なものは存在しません。",
  },
  "axiomatic-set-theory-extreme": {
    id: "false-set-theory-absolute-suslin-hypothesis",
    isFalse: true,
    title: "絶対 Suslin 仮説定理",
    statement: "ZFC では、可算鎖条件を満たす完備稠密線型順序はすべて可分である。",
    explanation: "これは Suslin 仮説を ZFC の定理として主張していますが、Suslin 仮説は ZFC から独立です。",
  },
};

const UI_TEXT = {
  ja: {
    appStatusLabel: "ゲーム状況",
    cardLabel: "今回のカード",
    timelineLabel: "タイムライン",
    tagline: "定理や発見を、成立した時代順に並べる。",
    languageLegend: "言語",
    problemSetLegend: "問題セット",
    falseModeLabel: "偽な命題が混ざるモード",
    start: "開始",
    roundLabel: "ラウンド",
    scoreLabel: "正解",
    restart: "最初から",
    share: "Xに投稿する",
    eraHidden: "年代は最後に表示",
    completeEra: "完了",
    completeTitle: "すべてのカードを並べました",
    completeStatement: (score, total) => `${total}問中${score}問正解しました。`,
    remaining: (count) => `残り ${count} 枚`,
    correct: "正解",
    incorrect: "不正解",
    correctCopy: "カードをタイムラインに追加しました。年代と解説は最後にまとめて表示します。",
    incorrectCopy: (position) => `正しい位置は${position}番目です。年代と解説は最後にまとめて表示します。`,
    falseCorrectCopy: "偽な命題として宣言しました。解説は最後にまとめて表示します。",
    falseIncorrectCopy: "この命題は偽でした。「偽である」に入れる必要があります。",
    falseDeclarationIncorrectCopy: (position) =>
      `この命題は真です。タイムライン上の正しい位置は${position}番目です。`,
    next: "次へ",
    showResults: "結果を見る",
    declareFalse: "偽である",
    declaredFalseTitle: "偽と宣言した命題",
    declaredFalseEmpty: "偽な命題をここに入れる",
    insertFirst: (position) => `${position}番目に挿入: 最初`,
    insertLast: (position) => `${position}番目に挿入: 最後`,
    insert: (position) => `${position}番目に挿入`,
    shareText: (setTitle, score, total, url) =>
      `Chrono Lemma「${setTitle}」で${total}問中${score}問正解しました。\n${url}`,
  },
  en: {
    appStatusLabel: "Game status",
    cardLabel: "Current card",
    timelineLabel: "Timeline",
    tagline: "Place theorems and discoveries in the order they appeared.",
    languageLegend: "Language",
    problemSetLegend: "Problem set",
    falseModeLabel: "Mix in one false proposition",
    start: "Start",
    roundLabel: "round",
    scoreLabel: "correct",
    restart: "Restart",
    share: "Post to X",
    eraHidden: "Era shown at the end",
    completeEra: "Complete",
    completeTitle: "All cards have been placed",
    completeStatement: (score, total) => `You got ${score} of ${total} correct.`,
    remaining: (count) => `${count} card${count === 1 ? "" : "s"} left`,
    correct: "Correct",
    incorrect: "Incorrect",
    correctCopy: "The card was added to the timeline. Dates and explanations appear in the final view.",
    incorrectCopy: (position) =>
      `The correct position was ${position}. Dates and explanations appear in the final view.`,
    falseCorrectCopy: "Declared as false. The explanation appears in the final view.",
    falseIncorrectCopy: "This proposition was false. It belongs in the false declaration box.",
    falseDeclarationIncorrectCopy: (position) =>
      `This proposition is true. Its correct timeline position was ${position}.`,
    next: "Next",
    showResults: "See results",
    declareFalse: "False",
    declaredFalseTitle: "Propositions declared false",
    declaredFalseEmpty: "Drop false propositions here",
    insertFirst: (position) => `Insert at position ${position}: first`,
    insertLast: (position) => `Insert at position ${position}: last`,
    insert: (position) => `Insert at position ${position}`,
    shareText: (setTitle, score, total, url) =>
      `I got ${score} of ${total} correct in Chrono Lemma: ${setTitle}.\n${url}`,
  },
};

const SET_TRANSLATIONS = {
  en: {
    "math-logic": "Mathematics and Logic",
    "general-math": "General Mathematics",
    "axiomatic-set-theory": "Axiomatic Set Theory",
    "axiomatic-set-theory-extreme": "Axiomatic Set Theory: Extreme",
  },
};

const THEOREM_TRANSLATIONS = {
  en: {
    "euclid-primes": {
      era: "around 300 BCE",
      title: "There are infinitely many prime numbers",
      statement: "Given any finite list of primes, one can construct a number not divisible by any of them.",
      explanation: "This classical proof from Euclid's Elements is one of the earliest major theorems in number theory.",
    },
    pythagoras: {
      era: "around 500 BCE",
      title: "In a right triangle, the square of the hypotenuse equals the sum of the squares of the other sides",
      statement: "The Pythagorean theorem in Euclidean geometry.",
      explanation: "Known since antiquity and systematized in Greek mathematics, it is a basic theorem of geometry.",
    },
    "fermat-little": {
      era: "1640",
      title: "Fermat's little theorem",
      statement: "If p is prime and a is not divisible by p, then a to the p - 1 power is congruent to 1.",
      explanation: "A fundamental congruence theorem that supported the development of modern number theory.",
    },
    "euler-polyhedra": {
      era: "1758",
      title: "For convex polyhedra, V - E + F = 2",
      statement: "Euler's polyhedron formula relating the numbers of vertices, edges, and faces.",
      explanation: "A representative combinatorial invariant that helped move mathematical thinking from geometry toward topology.",
    },
    "cantor-uncountable": {
      era: "1874",
      title: "The set of real numbers has greater cardinality than the set of natural numbers",
      statement: "The real numbers cannot be exhausted by a countable sequence; infinities can have different sizes.",
      explanation: "Cantor's result created set theory and gave mathematics tools for comparing infinities.",
    },
    "goedel-completeness": {
      era: "1929",
      title: "Every consistent first-order theory has a model",
      statement: "Godel's completeness theorem for first-order logic: semantic consequence matches provability.",
      explanation: "Godel's completeness theorem is a central result in logic and a starting point for model theory.",
    },
    incompleteness: {
      era: "1931",
      title: "Every sufficiently strong formal system has true but unprovable statements",
      statement: "Godel's first incompleteness theorem.",
      explanation: "It revealed limits of consistent systems containing arithmetic and reshaped twentieth-century foundations.",
    },
    "church-turing": {
      era: "1936",
      title: "There is no general algorithm for the halting problem",
      statement: "No procedure can always decide whether an arbitrary program will halt.",
      explanation: "The work of Church and Turing underlies computability theory and computer science.",
    },
    "four-color": {
      era: "1976",
      title: "Planar maps can be colored with four colors",
      statement: "Four colors suffice so that adjacent regions never share the same color.",
      explanation: "The four color theorem was an early, prominent example of a computer-assisted proof.",
    },
    "fermat-last": {
      era: "1994",
      title: "For n at least 3, x^n + y^n = z^n has no positive integer solutions",
      statement: "Fermat's last theorem.",
      explanation: "Wiles's proof is deeply connected with elliptic curves and modular forms.",
    },
    "pythagorean-general": {
      era: "around 500 BCE",
      title: "A right triangle satisfies a^2 + b^2 = c^2",
      statement: "If c is the hypotenuse and a, b are the other sides, then a^2 + b^2 = c^2.",
      explanation: "The Pythagorean theorem is one of the best-known results linking geometry and formulas directly.",
    },
    "euclid-primes-general": {
      era: "around 300 BCE",
      title: "There are infinitely many prime numbers",
      statement: "No matter how many primes you collect, they cannot exhaust all primes.",
      explanation: "Euclid's short classical proof is also a famous example of proof by contradiction.",
    },
    "quadratic-formula-general": {
      era: "around 628",
      title: "Quadratic equations have a formula for their solutions",
      statement: "The solutions of ax^2 + bx + c = 0 can be expressed from a, b, and c using square roots.",
      explanation: "General methods for quadratics developed from antiquity and were treated systematically by Brahmagupta and others.",
    },
    "fermat-little-general": {
      era: "1640",
      title: "Fermat's little theorem",
      statement: "If p is prime and a is not divisible by p, then a^(p-1) leaves remainder 1 when divided by p.",
      explanation: "This basic result of elementary number theory connects primes with modular arithmetic and later cryptography.",
    },
    "fundamental-theorem-calculus-general": {
      era: "around 1668",
      title: "Differentiation and integration are inverse operations",
      statement: "Differentiation measures rate of change, while integration accumulates area; fundamentally they run in opposite directions.",
      explanation: "The fundamental theorem of calculus is a central idea supporting analysis after Newton and Leibniz.",
    },
    "euler-formula-general": {
      era: "1748",
      title: "e^(iπ) + 1 = 0",
      statement: "An identity arising from Euler's formula, connecting exponentials, trigonometric functions, and complex numbers.",
      explanation: "It is famous because the constants e, i, π, 1, and 0 appear in one compact equation.",
    },
    "bayes-theorem-general": {
      era: "1763",
      title: "Conditional probabilities can be updated with Bayes' theorem",
      statement: "Observed evidence can be used to recompute the probability of a hypothesis.",
      explanation: "Bayes' theorem is a basic probability formula used widely in statistics, machine learning, and decision-making.",
    },
    "fundamental-theorem-algebra-general": {
      era: "1799",
      title: "Over the complex numbers, every polynomial equation has a root",
      statement: "Every nonconstant polynomial with complex coefficients has at least one complex solution.",
      explanation: "The fundamental theorem of algebra shows that the complex numbers are closed under polynomial equations.",
    },
    "cantor-uncountable-general": {
      era: "1874",
      title: "There are more real numbers than natural numbers",
      statement: "No listing of natural numbers can count through all real numbers.",
      explanation: "Cantor's result made clear that infinities can have different sizes.",
    },
    "noether-theorem-general": {
      era: "1918",
      title: "Conservation laws arise from symmetries",
      statement: "Every continuous symmetry of physical laws has a corresponding conserved quantity.",
      explanation: "Noether's theorem deeply links mathematics and physics, explaining conservation of energy and momentum.",
    },
    "four-color-general": {
      era: "1976",
      title: "Planar maps can be colored with four colors",
      statement: "Any planar map can be colored with four colors so adjacent regions never share a color.",
      explanation: "The four color theorem has a simple statement but became famous for its use of computer-assisted proof.",
    },
    "godel-constructible-gch": {
      era: "1940",
      title: "AC and GCH hold in the constructible universe L",
      statement: "L is an inner model of ZF in which the axiom of choice and the generalized continuum hypothesis hold.",
      explanation: "Godel's constructible universe gave a standard inner model showing that CH and GCH cannot be refuted from ZF.",
    },
    "scott-measurable-not-l": {
      era: "1961",
      title: "If a measurable cardinal exists, then V is not L",
      statement: "The existence of a measurable cardinal is incompatible with the axiom of constructibility.",
      explanation: "Scott's theorem was an early important result showing that large cardinals exceed the minimal fine structure of L.",
    },
    "cohen-ch-independence": {
      era: "1963",
      title: "The continuum hypothesis is independent of ZFC",
      statement: "Forcing can realize both CH and its negation within relative consistency over ZFC.",
      explanation: "Cohen's forcing became the standard technique for independence proofs and transformed set-theoretic method.",
    },
    "solovay-measurable-reals": {
      era: "1970",
      title: "There is a ZF + DC model where every set of reals is Lebesgue measurable",
      statement: "Assuming an inaccessible cardinal, one can build a model of ZF + DC in which all sets of reals are measurable.",
      explanation: "The Solovay model clarified the tension between choice and regularity properties in real analysis.",
    },
    "jensen-diamond": {
      era: "1972",
      title: "The diamond principle holds in L",
      statement: "In the constructible universe, diamond on omega_1 predicts subsets of omega_1 stationarily often.",
      explanation: "Jensen's fine structure yields diamond, a key combinatorial principle for Suslin trees and many constructions.",
    },
    "silver-singular-cardinal": {
      era: "1974",
      title: "Silver's singular cardinal theorem",
      statement: "GCH cannot first fail at a singular cardinal of uncountable cofinality.",
      explanation: "This result advanced the singular cardinal problem and led toward later pcf theory.",
    },
    "martin-borel-determinacy": {
      era: "1975",
      title: "Every Borel game is determined",
      statement: "For infinite perfect-information games with a Borel winning set, one of the players has a winning strategy.",
      explanation: "Martin's Borel determinacy is a theorem of ZFC at the boundary of descriptive set theory and axiomatic set theory.",
    },
    "shelah-proper-forcing": {
      era: "1982",
      title: "Countable support iterations preserve proper forcing",
      statement: "Countable support iterations of proper forcing are proper and preserve omega_1.",
      explanation: "Shelah's proper forcing theory became a foundation for forcing axioms such as PFA.",
    },
    "martins-maximum": {
      era: "1988",
      title: "Martin's Maximum is relatively consistent",
      statement: "Assuming sufficiently strong large cardinals, one can build models of MM, a maximal forcing axiom for stationary-set-preserving forcing.",
      explanation: "The MM of Foreman, Magidor, and Shelah extends PFA and has many structural consequences.",
    },
    "martin-steel-projective-determinacy": {
      era: "1989",
      title: "Projective determinacy follows from sufficiently many Woodin cardinals",
      statement: "A sequence of Woodin cardinals with a measurable cardinal above implies determinacy for all projective sets.",
      explanation: "The Martin-Steel theorem is central in linking large cardinals with regularity properties in descriptive set theory.",
    },
    "aspero-schindler-mm-star": {
      era: "2021",
      title: "MM++ implies Woodin's axiom (*)",
      statement: "A strong form of Martin's Maximum implies Woodin's axiom (*), connecting Pmax with uncountable set theory.",
      explanation: "The Aspero-Schindler result recently clarified the relationship between forcing axioms and Woodin's Pmax program.",
    },
    "easton-continuum-function": {
      era: "1970",
      title: "Easton's theorem",
      statement: "On regular cardinals, the continuum function can be forced quite freely subject to monotonicity and cofinality constraints.",
      explanation: "This result showed that post-Cohen forcing can control broad cardinal arithmetic, not just CH.",
    },
    "kunen-inconsistency": {
      era: "1971",
      title: "Kunen's inconsistency theorem",
      statement: "Under choice, there is no nontrivial elementary embedding j: V -> V from the universe to itself.",
      explanation: "It ruled out Reinhardt-style extreme large cardinal hypotheses in ZFC and sharpened the upper end of the hierarchy.",
    },
    "jensen-covering": {
      era: "1974",
      title: "Jensen's covering theorem",
      statement: "If 0# does not exist, every uncountable set of ordinals is covered by a constructible set of the same cardinality.",
      explanation: "This core fine-structure result measures the distance between V and L from the absence of large cardinals.",
    },
    "magidor-strong-compact": {
      era: "1976",
      title: "Relative consistency phenomena for the first strongly compact cardinal",
      statement: "Under large cardinal assumptions, the first strongly compact cardinal can coincide with the first measurable or the first supercompact.",
      explanation: "Magidor's result showed that strong compactness and supercompactness do not have a simple absolute ordering.",
    },
    "laver-borel-conjecture-consistency": {
      era: "1976",
      title: "Laver's consistency proof of Borel's conjecture",
      statement: "Using countable support iteration, the statement that every strong measure zero set is countable was shown relatively consistent with ZFC.",
      explanation: "Laver's model links small sets of reals with iteration techniques in proper forcing.",
    },
    "laver-indestructibility": {
      era: "1978",
      title: "Laver indestructibility of supercompactness",
      statement: "A supercompact cardinal can be prepared so later <kappa-directed closed forcing does not destroy its supercompactness.",
      explanation: "Laver preparation is a basic modern technique for handling forcing and large cardinals together.",
    },
    "dodd-jensen-core-model": {
      era: "1982",
      title: "The Dodd-Jensen core model K",
      statement: "When there is no inner model with a measurable cardinal, a fine-structural core model extending L satisfies covering.",
      explanation: "Core model theory became a standard framework for analyzing the absence of large cardinals through inner models.",
    },
    "baumgartner-pfa": {
      era: "1984",
      title: "Proper Forcing Axiom",
      statement: "A forcing axiom asserting filters for proper forcing notions and at most aleph_1 many dense sets was formulated.",
      explanation: "PFA is a powerful axiom implying not-CH and structural reflection principles, central to proper forcing theory.",
    },
    "foreman-magidor-shelah-ns": {
      era: "1988",
      title: "Martin's Maximum and saturation of NS_{omega_1}",
      statement: "Foreman, Magidor, and Shelah introduced Martin's Maximum and analyzed related saturation phenomena for the nonstationary ideal.",
      explanation: "MM extends PFA into a maximal forcing axiom with a rich consistency theory for stationary-set-preserving forcing.",
    },
    "shelah-pcf-theory": {
      era: "1994",
      title: "Shelah's pcf theory constrains singular cardinal arithmetic",
      statement: "Possible cofinality theory gives strong ZFC upper bounds on power-set behavior at singular cardinals.",
      explanation: "pcf theory provides deep combinatorial tools for controlling singular cardinal arithmetic without forcing.",
    },
    "woodin-pmax-star": {
      era: "1999",
      title: "Woodin's Pmax and axiom (*)",
      statement: "Under AD in L(R), Pmax extensions formulate axiom (*), a strong structural theory of H(omega_2).",
      explanation: "The Pmax program is Woodin's central framework connecting determinacy, forcing axioms, and the continuum problem.",
    },
    "false-math-logic-finite-model-compactness": {
      title: "Finite model compactness theorem",
      statement: "If every finite subset of a first-order theory has a finite model, then the whole theory has a finite model.",
      explanation: "First-order compactness preserves the existence of a model, but not the existence of a finite model. Theories requiring arbitrarily large finite models give counterexamples.",
    },
    "false-general-math-continuous-finitely-nondifferentiable": {
      title: "A continuous function is differentiable except at finitely many points",
      statement: "If a graph has no breaks, then it can only have finitely many corners or bends.",
      explanation: "There are continuous functions that fail to be differentiable at infinitely many points, and even everywhere.",
    },
    "false-set-theory-countably-complete-ultrafilter-omega": {
      title: "There is a countably complete nonprincipal ultrafilter on omega",
      statement: "Even on the natural numbers, one can take a nontrivial ultrafilter closed under countable intersections.",
      explanation: "Every countably complete ultrafilter on omega is principal. A nonprincipal one cannot exist.",
    },
    "false-set-theory-absolute-suslin-hypothesis": {
      title: "Absolute Suslin hypothesis theorem",
      statement: "ZFC proves that every complete dense linear order with the countable chain condition is separable.",
      explanation: "This asserts Suslin's hypothesis as a theorem of ZFC, but Suslin's hypothesis is independent of ZFC.",
    },
  },
};

const state = {
  language: DEFAULT_LANGUAGE,
  problemSetId: DEFAULT_PROBLEM_SET_ID,
  falseMode: false,
  hasStarted: false,
  timeline: [],
  falseDeclarations: [],
  deck: [],
  current: null,
  locked: false,
  round: 1,
  score: 0,
  totalRounds: 0,
  lastResult: null,
};

const timelineEl = document.querySelector("#timeline");
const challengePanelEl = document.querySelector("#challenge-panel");
const timelinePanelEl = document.querySelector("#timeline-panel");
const languageOptionsEl = document.querySelector(".language-options");
const problemSetOptionsEl = document.querySelector("#problem-set-options");
const falseModeCheckboxEl = document.querySelector("#false-mode-checkbox");
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
const falseZoneEl = document.querySelector("#false-zone");
const falseDropButtonEl = document.querySelector("#false-drop-button");
const falseListEl = document.querySelector("#false-list");
const confettiLayerEl = document.querySelector("#confetti-layer");

function t(key, ...args) {
  const text = UI_TEXT[state.language][key] ?? UI_TEXT[DEFAULT_LANGUAGE][key];
  return typeof text === "function" ? text(...args) : text;
}

function localizeProblemSetTitle(problemSet) {
  return SET_TRANSLATIONS[state.language]?.[problemSet.id] ?? problemSet.title;
}

function localizeTheorem(theorem) {
  return {
    ...theorem,
    ...(THEOREM_TRANSLATIONS[state.language]?.[theorem.id] ?? {}),
  };
}

function applyStaticText() {
  document.documentElement.lang = state.language;
  document.querySelector(".topbar").setAttribute("aria-label", t("appStatusLabel"));
  challengePanelEl.setAttribute("aria-label", t("cardLabel"));
  timelinePanelEl.setAttribute("aria-label", t("timelineLabel"));
  falseZoneEl.setAttribute("aria-label", t("declareFalse"));
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
}

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
      title.textContent = localizeProblemSetTitle(problemSet);

      label.append(input, title);
      return label;
    }),
  );
}

function selectLanguageRadio(language) {
  const input = languageOptionsEl.querySelector(`input[name="language"][value="${language}"]`);
  if (input) {
    input.checked = true;
  }
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
  state.falseMode = falseModeCheckboxEl.checked;
  state.hasStarted = false;
  state.timeline = [];
  state.falseDeclarations = [];
  state.deck = [];
  state.current = null;
  state.locked = false;
  state.round = 1;
  state.score = 0;
  state.totalRounds = 0;
  state.lastResult = null;

  selectProblemSetRadio(state.problemSetId);
  falseModeCheckboxEl.checked = state.falseMode;
  falseModeCheckboxEl.disabled = false;
  challengePanelEl.hidden = true;
  timelinePanelEl.hidden = true;
  statsEl.hidden = true;
  startButtonEl.hidden = false;
  shareButtonEl.hidden = true;
  resultPanelEl.hidden = true;
  falseZoneEl.hidden = true;
  falseListEl.replaceChildren();
  timelineEl.replaceChildren();
  roundEl.textContent = "-";
  scoreEl.textContent = "0";
}

function startGame(problemSetId = state.problemSetId) {
  const problemSet = getProblemSet(problemSetId);
  const byId = createTheoremMap(problemSet);

  state.problemSetId = problemSet.id;
  state.falseMode = falseModeCheckboxEl.checked;
  state.hasStarted = true;
  selectProblemSetRadio(problemSet.id);
  state.timeline = problemSet.initialIds.map((id) => byId.get(id)).filter(Boolean).sort(compareByYear);
  state.falseDeclarations = [];
  state.deck = problemSet.roundIds.map((id) => byId.get(id)).filter(Boolean);
  if (state.falseMode) {
    const falseProposition = getFalseProposition(problemSet.id);
    if (falseProposition) {
      insertAtRandomPosition(state.deck, falseProposition);
    }
  }
  state.current = null;
  state.locked = false;
  state.round = 1;
  state.score = 0;
  state.totalRounds = state.deck.length;
  state.lastResult = null;
  challengePanelEl.hidden = false;
  timelinePanelEl.hidden = false;
  statsEl.hidden = false;
  falseModeCheckboxEl.disabled = true;
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

function getFalseProposition(problemSetId) {
  const proposition = FALSE_PROPOSITIONS[problemSetId];
  return proposition ? { ...proposition } : null;
}

function insertAtRandomPosition(items, item) {
  const index = Math.floor(Math.random() * (items.length + 1));
  items.splice(index, 0, item);
}

function drawNextCard() {
  state.current = state.deck.shift() ?? null;
  state.locked = false;
  state.lastResult = null;
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

  if (state.current.isFalse) {
    state.locked = true;
    state.falseDeclarations.push(state.current);
    playResultSound(false);
    showResult(false, { kind: "false-target" });
    render();
    return;
  }

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

function attemptFalseDeclaration() {
  if (state.locked || !state.current) return;

  if (state.current.isFalse) {
    state.locked = true;
    state.falseDeclarations.push(state.current);
    state.score += 1;
    playResultSound(true);
    showResult(true, { kind: "false-target" });
    render();
    return;
  }

  const correctIndex = normalizedIndex();
  state.locked = true;
  state.timeline.splice(correctIndex, 0, state.current);
  playResultSound(false);
  showResult(false, { kind: "timeline", correctIndex, declaredFalse: true });
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

function showResult(isCorrect, resultDetail) {
  const detail =
    typeof resultDetail === "number"
      ? { kind: "timeline", correctIndex: resultDetail }
      : resultDetail;
  state.lastResult = { isCorrect, detail };
  resultPanelEl.hidden = false;
  resultPanelEl.classList.toggle("error", !isCorrect);
  resultIconEl.textContent = isCorrect ? "⭕️" : "✕";
  resultLabelEl.textContent = isCorrect ? t("correct") : t("incorrect");
  if (detail?.kind === "false-target") {
    resultCopyEl.textContent = isCorrect ? t("falseCorrectCopy") : t("falseIncorrectCopy");
  } else if (detail?.declaredFalse) {
    resultCopyEl.textContent = t("falseDeclarationIncorrectCopy", detail.correctIndex + 1);
  } else {
    resultCopyEl.textContent = isCorrect
      ? t("correctCopy")
      : t("incorrectCopy", detail.correctIndex + 1);
  }
  nextButtonEl.textContent = state.deck.length > 0 ? t("next") : t("showResults");
}

function render() {
  const isComplete = !state.current;
  roundEl.textContent = state.current ? String(state.round) : "-";
  scoreEl.textContent = String(state.score);

  if (state.current) {
    const current = localizeTheorem(state.current);
    candidateEraEl.textContent = t("eraHidden");
    candidateTitleEl.textContent = current.title;
    candidateStatementEl.textContent = current.statement;
    remainingCountEl.textContent = t("remaining", state.deck.length + 1);
    challengePanelEl.draggable = !state.locked;
    challengePanelEl.classList.toggle("draggable-card", !state.locked);
  } else {
    candidateEraEl.textContent = t("completeEra");
    candidateTitleEl.textContent = t("completeTitle");
    candidateStatementEl.textContent = t("completeStatement", state.score, state.totalRounds);
    remainingCountEl.textContent = "";
    challengePanelEl.draggable = false;
    challengePanelEl.classList.remove("draggable-card");
    shareButtonEl.hidden = false;
  }

  renderFalseZone(isComplete);
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

function renderFalseZone(isComplete) {
  falseZoneEl.hidden = !state.falseMode;
  if (!state.falseMode) return;

  falseDropButtonEl.disabled = isComplete || state.locked || !state.current;
  falseDropButtonEl.classList.toggle("correct-position", state.locked && state.current?.isFalse);
  falseDropButtonEl.textContent = t("declareFalse");
  falseDropButtonEl.setAttribute("aria-label", t("declareFalse"));
  falseListEl.replaceChildren();

  if (state.falseDeclarations.length === 0) {
    const empty = document.createElement("p");
    empty.className = "false-empty";
    empty.textContent = t("declaredFalseEmpty");
    falseListEl.append(empty);
    return;
  }

  const heading = document.createElement("h3");
  heading.textContent = t("declaredFalseTitle");
  falseListEl.append(heading);

  state.falseDeclarations.forEach((theorem) => {
    falseListEl.append(createCard(theorem, isComplete));
  });
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
  document.querySelectorAll(".insert-button.drag-over, .false-drop-button.drag-over").forEach((button) => {
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

function handleFalseDragOver(event) {
  if (state.locked || !state.current) return;
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
  event.dataTransfer.dropEffect = "move";
}

function handleFalseDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");
  if (state.locked || !state.current) return;
  attemptFalseDeclaration();
}

function insertLabel(index) {
  const position = index + 1;
  if (index === 0) return t("insertFirst", position);
  if (index === state.timeline.length) return t("insertLast", position);
  return t("insert", position);
}

function createCard(theorem, showDetails) {
  const localizedTheorem = localizeTheorem(theorem);
  const card = document.createElement("article");
  card.className = "card";
  if (state.locked && state.current?.id === theorem.id) {
    card.classList.add("correct-position");
  }

  const body = document.createElement("div");

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = localizedTheorem.title;

  const statement = document.createElement("div");
  statement.className = "card-statement";
  statement.textContent = localizedTheorem.statement;

  if (showDetails) {
    const explanation = document.createElement("div");
    explanation.className = "card-explanation";
    explanation.textContent = localizedTheorem.explanation;
    body.append(title, statement, explanation);
  } else {
    body.append(title, statement);
  }

  card.append(body);

  if (showDetails) {
    const year = document.createElement("div");
    year.className = "card-year";
    year.textContent = theorem.isFalse ? t("declareFalse") : localizedTheorem.era;
    card.append(year);
  }

  return card;
}

nextButtonEl.addEventListener("click", () => {
  if (state.deck.length === 0) {
    const isPerfect = state.score === state.totalRounds;
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
  const total = state.totalRounds || problemSet.roundIds.length;
  const text = t("shareText", localizeProblemSetTitle(problemSet), state.score, total, window.location.href);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

challengePanelEl.addEventListener("dragstart", handleCandidateDragStart);
challengePanelEl.addEventListener("dragend", handleCandidateDragEnd);
falseDropButtonEl.addEventListener("click", attemptFalseDeclaration);
falseDropButtonEl.addEventListener("dragover", handleFalseDragOver);
falseDropButtonEl.addEventListener("dragleave", handleInsertDragLeave);
falseDropButtonEl.addEventListener("drop", handleFalseDrop);
restartButtonEl.addEventListener("click", () => startGame());
startButtonEl.addEventListener("click", () => startGame(getSelectedProblemSetId()));
problemSetOptionsEl.addEventListener("change", (event) => {
  if (event.target.matches('input[name="problem-set"]')) {
    showStartScreen(event.target.value);
  }
});
languageOptionsEl.addEventListener("change", (event) => {
  if (event.target.matches('input[name="language"]')) {
    state.language = event.target.value;
    applyStaticText();
    setupProblemSetSelect();
    selectProblemSetRadio(state.problemSetId);
    if (state.hasStarted) {
      render();
    }
    if (!resultPanelEl.hidden && state.lastResult) {
      showResult(state.lastResult.isCorrect, state.lastResult.detail);
    }
  }
});

applyStaticText();
selectLanguageRadio(state.language);
setupProblemSetSelect();
showStartScreen();
