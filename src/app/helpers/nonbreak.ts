const patterns: { pattern: RegExp, replaceWith: string }[] = [
  // ─── Неразрывные дефисы ───
  { pattern: /(?<!&#8209;)([ТT])-([А-ЯЁA-Z])/g, replaceWith: "$1&#8209;$2" },

  // слова с -то, -либо, -нибудь, -ка, -таки
  { pattern: /(что|какой|какая|какое|какие|чей|чья|чьё|чьи|где|когда|куда|откуда|почему|зачем|сколько)-/gi, replaceWith: "$1&#8209;" },
  { pattern: /-(то|либо|нибудь|таки|ка)(?=\s|\.|,|;|:|\?|!|$)/gi, replaceWith: "&#8209;$1" },

  // устойчивые составные (интернет-, бизнес-)
  { pattern: /(интернет|бизнес|веб|медиа|пресс|арт|IT|HR|PR|SEO)-/g, replaceWith: "$1&#8209;" },

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

  // ─── Союзы и предлоги 3+ символов ───
  // Универсальные: сохраняют регистр первой буквы через (Б|б)
  { pattern: /(?<!&nbsp;)(\s|^)(Д|д)ля(\s)/g,   replaceWith: "$1$2ля&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(И|и)ли(\s)/g,   replaceWith: "$1$2ли&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(П|п)ри(\s)/g,   replaceWith: "$1$2ри&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(П|п)од(\s)/g,   replaceWith: "$1$2од&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(Н|н)ад(\s)/g,   replaceWith: "$1$2ад&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(Б|б)ез(\s)/g,   replaceWith: "$1$2ез&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(П|п)ро(\s)/g,   replaceWith: "$1$2ро&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(Ч|ч)ерез(\s)/g, replaceWith: "$1$2ерез&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(Е|е)сли(\s)/g,  replaceWith: "$1$2сли&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(Ч|ч)тобы(\s)/g, replaceWith: "$1$2тобы&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(Ч|ч)то(\s)/g,   replaceWith: "$1$2то&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s|^)(К|к)ак(\s)/g,   replaceWith: "$1$2ак&nbsp;" },

  // ─── Устойчивые сочетания ───
  { pattern: /(?<!&nbsp;)так как/gi,         replaceWith: "так&nbsp;как" },
  { pattern: /(?<!&nbsp;)так же/gi,          replaceWith: "так&nbsp;же" },
  { pattern: /(?<!&nbsp;)то есть/gi,         replaceWith: "то&nbsp;есть" },
  { pattern: /(?<!&nbsp;)в том числе/gi,     replaceWith: "в&nbsp;том&nbsp;числе" },
  { pattern: /(?<!&nbsp;)по мере/gi,         replaceWith: "по&nbsp;мере" },
  { pattern: /(?<!&nbsp;)в течение/gi,       replaceWith: "в&nbsp;течение" },
  { pattern: /(?<!&nbsp;)в продолжение/gi,   replaceWith: "в&nbsp;продолжение" },
  { pattern: /(?<!&nbsp;)в связи/gi,         replaceWith: "в&nbsp;связи" },
  { pattern: /(?<!&nbsp;)в случае/gi,        replaceWith: "в&nbsp;случае" },
  { pattern: /(?<!&nbsp;)в целях/gi,         replaceWith: "в&nbsp;целях" },
  { pattern: /(?<!&nbsp;)на основании/gi,    replaceWith: "на&nbsp;основании" },
  { pattern: /(?<!&nbsp;)в соответствии/gi,  replaceWith: "в&nbsp;соответствии" },

  // ─── Частицы (сохраняют регистр) ───
  { pattern: /(?<!&nbsp;)(\s)(Б|б)ы(?=\s|\.|,|;|:|\?|!|$)/g, replaceWith: "$1$2ы&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s)(Л|л)и(?=\s|\.|,|;|:|\?|!|$)/g, replaceWith: "$1$2и&nbsp;" },
  { pattern: /(?<!&nbsp;)(\s)(Ж|ж)е(?=\s|\.|,|;|:|\?|!|$)/g, replaceWith: "$1$2е&nbsp;" },

  // ─── Короткие слова 1–2 символа (сохраняют регистр) ───
  { pattern: /(?<!\S)(?!бы|ли|же|Бы|Ли|Же)([а-яА-ЯёЁa-zA-Z0-9]{1,2})\s/g, replaceWith: "$1&nbsp;" },

  // ─── Проценты ───
  { pattern: /(?<!&nbsp;|\d) (?=\d+%)/g, replaceWith: "&nbsp;" },

  // ─── Инициалы ───
  { pattern: /(?<!\S)([А-ЯЁA-Z])\.(?!&nbsp;) /g, replaceWith: "$1.&nbsp;" },

  // ─── ALL CAPS (сохраняет регистр) ───
  { pattern: /(?<!&nbsp;)(ALL|All|all) /g, replaceWith: "$1&nbsp;" },
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
