const patterns: { pattern: RegExp, replaceWith: string }[] = [
  // ─── Неразрывные дефисы ───
  // Бренды Т-Банк / T-Bank и подобные (кириллица И латиница)
  { pattern: /(?<!&#8209;)([ТT])-([А-ЯЁA-Z])/g, replaceWith: "$1&#8209;$2" },

  // слова с -то, -либо, -нибудь, -ка, -таки
  { pattern: /(что|какой|какая|какое|какие|чей|чья|чьё|чьи|где|когда|куда|откуда|почему|зачем|сколько)-/g, replaceWith: "$1&#8209;" },
  { pattern: /-(то|либо|нибудь|таки|ка)(?=\s|\.|,|;|:|\?|!|$)/g, replaceWith: "&#8209;$1" },

  // устойчивые составные (интернет-, бизнес-)
  { pattern: /(интернет|бизнес|веб|медиа|пресс|арт|IT|HR|PR|SEO|IT)-/gi, replaceWith: "$1&#8209;" },

  // ─── Пробелы перед знаками ───
  { pattern: /(?<!&nbsp;) —/g, replaceWith: "&nbsp;—" },
  { pattern: /(?<!&nbsp;) →/g, replaceWith: "&nbsp;→" },
  { pattern: /(?<!&nbsp;) ₽/g, replaceWith: "&nbsp;₽" },
  { pattern: /(?<!&nbsp;) €/g, replaceWith: "&nbsp;€" },
  { pattern: /(?<!&nbsp;) ¥/g, replaceWith: "&nbsp;¥" },
  { pattern: /(?<!&nbsp;) \$/g, replaceWith: "&nbsp;$" },

  // ─── Числа с единицами ───
  { pattern: /(?<!&nbsp;) рублей/g, replaceWith: "&nbsp;рублей" },
  { pattern: /(?<!&nbsp;) 000/g, replaceWith: "&nbsp;000" },
  { pattern: /(?<!&nbsp;) тыс/g, replaceWith: "&nbsp;тыс" },
  { pattern: /(?<!&nbsp;) млн/g, replaceWith: "&nbsp;млн" },
  { pattern: /(?<!&nbsp;) млрд/g, replaceWith: "&nbsp;млрд" },
  { pattern: /(?<!&nbsp;) год/g, replaceWith: "&nbsp;год" },

  // ─── Союзы и предлоги 3+ символов (универсальные) ───
  { pattern: /(?<!&nbsp;)(\s|^)для(\s)/gi,   replaceWith: "$1для&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)или(\s)/gi,   replaceWith: "$1или&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)при(\s)/gi,   replaceWith: "$1при&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)под(\s)/gi,   replaceWith: "$1под&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)над(\s)/gi,   replaceWith: "$1над&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)без(\s)/gi,   replaceWith: "$1без&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)про(\s)/gi,   replaceWith: "$1про&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)через(\s)/gi, replaceWith: "$1через&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)если(\s)/gi,  replaceWith: "$1если&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)чтобы(\s)/gi, replaceWith: "$1чтобы&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)что(\s)/gi,   replaceWith: "$1что&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)как(\s)/gi,   replaceWith: "$1как&nbsp;" },

  // ─── Устойчивые сочетания ───
  { pattern: /(?<!&nbsp;)так как/g,         replaceWith: "так&nbsp;как" },
  { pattern: /(?<!&nbsp;)так же/g,          replaceWith: "так&nbsp;же" },
  { pattern: /(?<!&nbsp;)то есть/g,         replaceWith: "то&nbsp;есть" },
  { pattern: /(?<!&nbsp;)в том числе/g,     replaceWith: "в&nbsp;том&nbsp;числе" },
  { pattern: /(?<!&nbsp;)по мере/g,         replaceWith: "по&nbsp;мере" },
  { pattern: /(?<!&nbsp;)в течение/g,       replaceWith: "в&nbsp;течение" },
  { pattern: /(?<!&nbsp;)в продолжение/g,   replaceWith: "в&nbsp;продолжение" },
  { pattern: /(?<!&nbsp;)в связи/g,         replaceWith: "в&nbsp;связи" },
  { pattern: /(?<!&nbsp;)в случае/g,        replaceWith: "в&nbsp;случае" },
  { pattern: /(?<!&nbsp;)в целях/g,         replaceWith: "в&nbsp;целях" },
  { pattern: /(?<!&nbsp;)на основании/g,    replaceWith: "на&nbsp;основании" },
  { pattern: /(?<!&nbsp;)в соответствии/g,  replaceWith: "в&nbsp;соответствии" },

  // ─── Частицы ───
  { pattern: /(?<!&nbsp;)(\s)(бы)(?=\s|\.|,|;|:|\?|!|$)/gi, replaceWith: "$1бы&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s)(ли)(?=\s|\.|,|;|:|\?|!|$)/gi, replaceWith: "$1ли&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s)(же)(?=\s|\.|,|;|:|\?|!|$)/gi, replaceWith: "$1же&nbsp;" },

  // ─── Короткие слова 1–2 символа (кириллица + латиница) ───
  { pattern: /(?<!\S)(?!бы|ли|же)([а-яА-ЯёЁa-zA-Z0-9]{1,2})\s/g, replaceWith: "$1&nbsp;" },

  // ─── Проценты ───
  { pattern: /(?<!&nbsp;|\d) (?=\d+%)/g, replaceWith: "&nbsp;" },

  // ─── Инициалы (кириллица + латиница) ───
  { pattern: /(?<!\S)([А-ЯЁA-Z])\.(?!&nbsp;) /g, replaceWith: "$1.&nbsp;" },

  // ─── ALL CAPS ───
  { pattern: /(?<!ALL&nbsp;)ALL /gi, replaceWith: "ALL&nbsp;" },
];

export const nonbreak = (text: string): string => {
  const t = text.split(/(\[\%.*?\%\])/);
  t.forEach((e, r) => {
    if (e.startsWith("[%")) {
      t[r] = e;
    } else {
      t[r] = patterns.reduce(
        (acc: string, p) => acc.replace(p.pattern, p.replaceWith),
        e
      );
    }
  });
  return t.join("");
};
