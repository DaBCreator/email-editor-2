const patterns: { pattern: RegExp, replaceWith: string }[] = [
  // ─── Неразрывные дефисы ───
  // бренды Т-Банк, Т-Бизнес и др.
  { pattern: /(?<!&#8209;)(Т)-([А-ЯЁ])/g, replaceWith: "Т&#8209;$2" },

  // слова с -то, -либо, -нибудь, -ка, -таки
  { pattern: /(что|какой|какая|какое|какие|чей|чья|чьё|чьи|где|когда|куда|откуда|почему|зачем|сколько)-/g, replaceWith: "$1&#8209;" },
  { pattern: /-(то|либо|нибудь|таки|ка)(?=\s|\.|,|;|:|\?|!|$)/g, replaceWith: "&#8209;$1" },

  // устойчивые составные (интернет-, бизнес-)
  { pattern: /(интернет|бизнес|веб|медиа|пресс|арт)-/g, replaceWith: "$1&#8209;" },

  // ─── Простые пробелы перед знаками ───
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

  // ─── Союзы и предлоги 3+ символов ───
  { pattern: /(\s|^)для(?=\s)/g,   replaceWith: "$1для&nbsp;" },
  { pattern: /(\s|^)или(?=\s)/g,   replaceWith: "$1или&nbsp;" },
  { pattern: /(\s|^)при(?=\s)/g,   replaceWith: "$1при&nbsp;" },
  { pattern: /(\s|^)под(?=\s)/g,   replaceWith: "$1под&nbsp;" },
  { pattern: /(\s|^)над(?=\s)/g,   replaceWith: "$1над&nbsp;" },
  { pattern: /(\s|^)без(?=\s)/g,   replaceWith: "$1без&nbsp;" },
  { pattern: /(\s|^)про(?=\s)/g,   replaceWith: "$1про&nbsp;" },
  { pattern: /(\s|^)через(?=\s)/g, replaceWith: "$1через&nbsp;" },
  { pattern: /(\s|^)если(?=\s)/g,  replaceWith: "$1если&nbsp;" },
  { pattern: /(\s|^)чтобы(?=\s)/g, replaceWith: "$1чтобы&nbsp;" },
  { pattern: /(\s|^)что(?=\s)/g,   replaceWith: "$1что&nbsp;" },
  { pattern: /(\s|^)как(?=\s)/g,   replaceWith: "$1как&nbsp;" },

  // ─── Устойчивые сочетания ───
  { pattern: /так как/g,         replaceWith: "так&nbsp;как" },
  { pattern: /так же/g,          replaceWith: "так&nbsp;же" },
  { pattern: /то есть/g,         replaceWith: "то&nbsp;есть" },
  { pattern: /в том числе/g,     replaceWith: "в&nbsp;том&nbsp;числе" },
  { pattern: /по мере/g,         replaceWith: "по&nbsp;мере" },
  { pattern: /в течение/g,       replaceWith: "в&nbsp;течение" },
  { pattern: /в продолжение/g,   replaceWith: "в&nbsp;продолжение" },
  { pattern: /в связи/g,         replaceWith: "в&nbsp;связи" },
  { pattern: /в случае/g,        replaceWith: "в&nbsp;случае" },
  { pattern: /в целях/g,         replaceWith: "в&nbsp;целях" },
  { pattern: /на основании/g,    replaceWith: "на&nbsp;основании" },
  { pattern: /в соответствии/g,  replaceWith: "в&nbsp;соответствии" },

  // ─── Частицы ───
  { pattern: /(?<!&nbsp;)( бы)(?=\s|\.|,|;|:|\?|!|$)/g, replaceWith: "&nbsp;бы" },
  { pattern: /(?<!&nbsp;)( ли)(?=\s|\.|,|;|:|\?|!|$)/g, replaceWith: "&nbsp;ли" },
  { pattern: /(?<!&nbsp;)( же)(?=\s|\.|,|;|:|\?|!|$)/g, replaceWith: "&nbsp;же" },

  // ─── Короткие слова 1–2 символа (и, по, в, на и др.) ───
  { pattern: /(?<!\S)(?!бы|ли|же)([а-яА-ЯёЁ0-9a-zA-Z]{1,2})\s/g, replaceWith: "$1&nbsp;" },

  // ─── Проценты ───
  { pattern: /(?<!&nbsp;|\d) (?=\d+%)/g, replaceWith: "&nbsp;" },

  // ─── Инициалы ───
  { pattern: /(?<!\S)([А-ЯЁ])\.(?!&nbsp;) /g, replaceWith: "$1.&nbsp;" },

  // ─── ALL CAPS ───
  { pattern: /(?<!ALL&nbsp;)ALL /g, replaceWith: "ALL&nbsp;" },
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
