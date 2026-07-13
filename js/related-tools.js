/**
 * シミュレーター一覧・関連シミュレーター・導線ガイドの共通データ
 * 新規シミュレーター追加時はこのファイルの TOOLS のみ編集してください。
 */
(function (global) {
  "use strict";

  var ARROW_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M9 20v-6h6v6"/></svg>',
    car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17h14"/><path d="M5 17a2 2 0 0 1-2-2v-3l2-5h14l2 5v3a2 2 0 0 1-2 2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>',
    chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-4"/><path d="M12 16V8"/><path d="M16 16v-6"/></svg>',
    education: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L1 9l4 2.18V17c0 2 3.5 4 7 4s7-2 7-4v-5.82L22 9z"/><path d="M12 3v6"/></svg>',
    retirement: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V4"/><path d="M4 20h16"/><path d="M18 8l-5 5-3-3-6 6"/></svg>'
  };

  /** @type {Array<object>} */
  var TOOLS = [
    {
      id: "mortgage",
      order: 1,
      title: "住宅ローン × 投資比較シミュレーター",
      description: "住宅ローンの繰上返済と投資、どちらを優先した場合に将来の資産が多くなるか比較できます。",
      descriptionShort: "繰上返済と投資、どちらが有利か比較できます。",
      href: "/simulator/mortgage-invest/",
      icon: "home",
      badges: [{ type: "recommended" }],
      recommendations: [
        "住宅ローンが残っている",
        "繰上返済を検討している",
        "投資とのバランスに悩んでいる"
      ],
      guideConcern: "住宅ローンが気になる方",
      guideLabel: "住宅ローン × 投資比較"
    },
    {
      id: "education",
      order: 2,
      title: "教育費シミュレーター",
      description: "子どもの大学進学に向けて、毎月の積立や運用を続けた場合の教育資金を試算できます。",
      descriptionShort: "子どもの教育資金を、積立・運用の目安から試算できます。",
      href: "/simulator/education/",
      icon: "education",
      recommendations: [
        "教育費の準備を始めたい",
        "子どもの大学資金が気になる",
        "毎月の積立額の目安を知りたい"
      ],
      guideConcern: "子どもの教育費が気になる方",
      guideLabel: "教育費シミュレーター"
    },
    {
      id: "asset",
      order: 3,
      title: "資産推移シミュレーター",
      description: "現在の資産や積立額から、将来の資産形成や老後資金の目安をシミュレーションできます。",
      descriptionShort: "資産や積立額から、将来の資産形成の目安を試算できます。",
      href: "/simulator/asset/",
      icon: "chart",
      recommendations: [
        "老後資金が気になる",
        "積立投資をしている",
        "将来の資産形成を確認したい"
      ],
      guideConcern: "老後資金や資産形成が気になる方",
      guideLabel: "資産推移シミュレーター"
    },
    {
      id: "retirement",
      order: 4,
      title: "老後資産取り崩しシミュレーター",
      description: "年金・生活費・資産額から、老後資金が何歳まで持つかを試算できます。80歳・90歳・100歳時点の残資産や、平均寿命まで資産が持つかも確認できます。",
      descriptionShort: "老後資金が何歳まで持つか、年金と資産から試算できます。",
      href: "/simulator/retirement/",
      icon: "retirement",
      linkText: "シミュレーターを使う",
      recommendations: [
        "老後資金の不足額を確認したい",
        "年金だけで生活できるか知りたい",
        "資産が何歳まで持つか試算したい"
      ],
      guideConcern: "老後資金が何歳まで持つか確認したい",
      guideLabel: "老後資産取り崩しシミュレーター"
    },
    {
      id: "car",
      order: 5,
      title: "車買い替えコスト比較シミュレーター",
      description: "車を買い替える場合と乗り続ける場合の総コストを比較し、どちらがお得か確認できます。",
      descriptionShort: "買い替えと乗り続け、どちらが総コストでお得か比較できます。",
      href: "/simulator/car/",
      icon: "car",
      recommendations: [
        "車の買い替えを検討している",
        "維持費を比較したい",
        "燃費改善効果を確認したい"
      ],
      guideConcern: "車の買い替えを検討中の方",
      guideLabel: "車買い替えコスト比較"
    }
  ];

  /** トップページと同じ表示順 */
  var ALL_TOOL_IDS = ["mortgage", "education", "asset", "retirement", "car"];

  /**
   * 各ページで表示する関連シミュレーター（ツール id の配列）
   * コラム・記事ページ追加時はここに1行追加してください。
   */
  var PAGE_RELATED = {
    "article/mortgage-prepay-vs-invest": ALL_TOOL_IDS.slice(),
    "article/education-fund-university-500man": ALL_TOOL_IDS.slice(),
    "article/high-dividend-investing-40s-50s": ["asset", "retirement", "mortgage", "education", "car"],
    "article/child-changed-my-life": ["education", "asset", "mortgage", "retirement", "car"],
    "article/money-isnt-the-most-important-after-child": ["education", "asset", "mortgage", "retirement", "car"]
  };

  var BADGE_LABELS = {
    popular: function (badge) {
      return badge.rank ? "🏆 人気No." + badge.rank : null;
    },
    recommended: function () {
      return "おすすめ";
    },
    new: function () {
      return "新着";
    }
  };

  function getToolsSorted() {
    return TOOLS.slice().sort(function (a, b) {
      return a.order - b.order;
    });
  }

  function getToolById(id) {
    for (var i = 0; i < TOOLS.length; i++) {
      if (TOOLS[i].id === id) return TOOLS[i];
    }
    return null;
  }

  function getToolsByIds(ids) {
    return ids.map(getToolById).filter(Boolean);
  }

  function getPageKey() {
    var path = window.location.pathname.replace(/^\/+|\/+$/g, "");
    if (!path || path === "index.html") return "index";
    path = path.replace(/\/index\.html$/, "");
    var articleIdx = path.indexOf("article/");
    if (articleIdx !== -1) {
      return path.slice(articleIdx);
    }
    return path;
  }

  function resolveRelatedIds(container) {
    var explicit = container.getAttribute("data-tool-ids");
    if (explicit) {
      return explicit.split(",").map(function (s) {
        return s.trim();
      }).filter(Boolean);
    }
    var pageKey = container.getAttribute("data-page-key") || getPageKey();
    var ids = PAGE_RELATED[pageKey];
    if (ids && ids.length) return ids;
    if (pageKey.indexOf("article/") === 0) {
      return getToolsSorted().map(function (tool) {
        return tool.id;
      });
    }
    return [];
  }

  function getBadgeLabel(badge) {
    if (badge.label) return badge.label;
    var resolver = BADGE_LABELS[badge.type];
    return resolver ? resolver(badge) : null;
  }

  function buildBadges(badges) {
    if (!badges || !badges.length) return "";

    var hasNote = false;
    var items = badges.map(function (badge) {
      var label = getBadgeLabel(badge);
      if (!label) return "";
      var html =
        '<span class="card-badge card-badge--' + badge.type + '">' +
        label +
        "</span>";
      if (badge.note) {
        hasNote = true;
        html += '<span class="card-badge-note">' + badge.note + "</span>";
      }
      return html;
    }).join("");

    if (!items) return "";
    return (
      '<div class="card-badges"' +
      (hasNote ? ' data-has-note="true"' : "") +
      ">" +
      items +
      "</div>"
    );
  }

  function hasBadgeNote(badges) {
    if (!badges || !badges.length) return false;
    return badges.some(function (badge) {
      return !!badge.note;
    });
  }

  function getBadgeAriaText(badges) {
    if (!badges || !badges.length) return "";
    var labels = badges.map(getBadgeLabel).filter(Boolean);
    return labels.length ? "（" + labels.join("、") + "）" : "";
  }

  function buildRecommend(items) {
    var lis = items.map(function (item) {
      return '<li><span class="check" aria-hidden="true">✓</span>' + item + "</li>";
    }).join("");
    return (
      '<div class="card-recommend">' +
      '<p class="card-recommend-title">こんな悩みありませんか？</p>' +
      "<ul>" + lis + "</ul>" +
      "</div>"
    );
  }

  function renderSimulatorGrid(container) {
    if (!container) return;
    container.innerHTML = "";

    getToolsSorted().forEach(function (tool) {
      var card = document.createElement("a");
      card.className =
        "simulator-card" +
        (tool.badges && tool.badges.length ? " has-badges" : "") +
        (hasBadgeNote(tool.badges) ? " has-badge-note" : "");
      card.href = tool.href;
      card.setAttribute(
        "aria-label",
        tool.title + "を開く" + getBadgeAriaText(tool.badges)
      );

      card.innerHTML =
        buildBadges(tool.badges) +
        '<div class="card-icon-wrap"><div class="card-icon">' +
        (ICONS[tool.icon] || "") +
        "</div></div>" +
        "<h3>" + tool.title + "</h3>" +
        '<p class="card-desc">' + (tool.descriptionShort || tool.description) + "</p>" +
        buildRecommend(tool.recommendations);

      container.appendChild(card);
    });
  }

  function renderGuide(container) {
    if (!container) return;
    container.innerHTML = "";

    getToolsSorted().forEach(function (tool) {
      if (!tool.guideConcern || !tool.guideLabel) return;

      var item = document.createElement("a");
      item.className = "guide-item";
      item.href = tool.href;
      item.innerHTML =
        '<span class="guide-concern">' + tool.guideConcern + "</span>" +
        '<span class="guide-target">' +
        tool.guideLabel +
        ARROW_SVG +
        "</span>";

      container.appendChild(item);
    });
  }

  function renderRelatedTools(container) {
    if (!container) return;
    container.innerHTML = "";

    var tools = getToolsByIds(resolveRelatedIds(container));
    if (!tools.length) return;

    tools.forEach(function (tool) {
      var card = document.createElement("a");
      card.className = "related-card";
      card.href = tool.href;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.setAttribute("aria-label", tool.title + "を開く");

      card.innerHTML =
        "<h3>" + tool.title + "</h3>" +
        "<p>" + tool.description + "</p>" +
        '<span class="related-link">' +
        (tool.linkText || "シミュレーターを使う") +
        ARROW_SVG +
        "</span>";

      container.appendChild(card);
    });
  }

  function init() {
    renderSimulatorGrid(document.getElementById("simulator-grid"));
    renderGuide(document.getElementById("guide-box"));
    var relatedContainers = document.querySelectorAll("[data-related-tools]");
    for (var i = 0; i < relatedContainers.length; i++) {
      renderRelatedTools(relatedContainers[i]);
    }
  }

  global.RelatedTools = {
    TOOLS: TOOLS,
    PAGE_RELATED: PAGE_RELATED,
    init: init,
    renderSimulatorGrid: renderSimulatorGrid,
    renderGuide: renderGuide,
    renderRelatedTools: renderRelatedTools,
    getToolsSorted: getToolsSorted,
    getToolById: getToolById
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
