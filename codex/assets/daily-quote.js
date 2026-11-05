// 台词库格式：
// 中文台词：{ lang: "zh", text: "中文台词", movie: "电影名" }
// 英文台词：{ lang: "en", text: "Original line", translation: "中文翻译", movie: "电影名" }
const dailyQuotes = [
  {
    lang: "zh",
    text: "生活就像一盒巧克力，你永远不知道下一颗是什么味道。",
    movie: "阿甘正传",
  },
  {
    lang: "en",
    text: "Here's looking at you, kid.",
    translation: "永志不忘。",
    movie: "卡萨布兰卡",
  },
  {
    lang: "zh",
    text: "希望是美好的，也许是人间至善。",
    movie: "肖申克的救赎",
  },
  {
    lang: "en",
    text: "There's no place like home.",
    translation: "没有什么地方比得上家。",
    movie: "绿野仙踪",
  },
  {
    lang: "zh",
    text: "爱是唯一可以超越时间与空间的事物。",
    movie: "星际穿越",
  },
  {
    lang: "en",
    text: "After all, tomorrow is another day.",
    translation: "毕竟，明天又是新的一天。",
    movie: "乱世佳人",
  },
  {
    lang: "zh",
    text: "不管前方的路有多苦，只要走的方向正确，都比站在原地更接近幸福。",
    movie: "千与千寻",
  },
  {
    lang: "en",
    text: "Get busy living or get busy dying.",
    translation: "要么忙着活，要么忙着死。",
    movie: "肖申克的救赎",
  },
  {
    lang: "zh",
    text: "不疯魔，不成活。",
    movie: "霸王别姬",
  },
  {
    lang: "en",
    text: "Even the smallest person can change the course of the future.",
    translation: "即使是最渺小的人，也能改变未来的走向。",
    movie: "指环王",
  },
  {
    lang: "zh",
    text: "如果多一张船票，你会不会跟我走？",
    movie: "花样年华",
  },
  {
    lang: "en",
    text: "Carpe diem. Seize the day, boys.",
    translation: "及时行乐。抓住今天，少年们。",
    movie: "死亡诗社",
  },
  {
    lang: "zh",
    text: "生活不是目标，生活本身就是生活。",
    movie: "心灵奇旅",
  },
  {
    lang: "en",
    text: "Here's to the fools who dream.",
    translation: "敬那些做梦的傻瓜。",
    movie: "爱乐之城",
  },
  {
    lang: "zh",
    text: "有时候，正是那些无人看好的人，能取得无人能及的成就。",
    movie: "模仿游戏",
  },
  {
    lang: "en",
    text: "Good morning, and in case I don't see ya, good afternoon, good evening, and good night!",
    translation: "早上好！假如再也见不到你，祝你午安、晚安，以及夜安！",
    movie: "楚门的世界",
  },
];

const getDailyQuoteForDate = (date = new Date()) => {
  if (!dailyQuotes.length) return null;

  const localDay = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000,
  );
  return dailyQuotes[((localDay % dailyQuotes.length) + dailyQuotes.length) % dailyQuotes.length];
};

const quoteText = document.querySelector("#dailyQuoteText");
const quoteTranslation = document.querySelector("#dailyQuoteTranslation");
const quoteMovie = document.querySelector("#dailyQuoteMovie");
const quoteDate = document.querySelector("#dailyQuoteDate");
const quoteContent = document.querySelector("#dailyQuoteContent");
let currentDayKey = null;

const paintDailyQuote = () => {
  if (!quoteText || !quoteTranslation || !quoteMovie || !quoteDate || !quoteContent) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const dayKey = `${year}-${month + 1}-${day}`;
  if (currentDayKey === dayKey) return;

  const applyQuote = () => {
    const quote = getDailyQuoteForDate(now);
    if (!quote) return;

    const isEnglish = quote.lang === "en";
    quoteText.textContent = `“${quote.text}”`;
    quoteText.lang = isEnglish ? "en" : "zh-CN";
    quoteTranslation.textContent = isEnglish ? quote.translation : "";
    quoteTranslation.hidden = !isEnglish;
    quoteMovie.textContent = `《${quote.movie}》`;
    quoteDate.textContent = `${month + 1} 月 ${day} 日`;
    quoteDate.dateTime = [
      year,
      String(month + 1).padStart(2, "0"),
      String(day).padStart(2, "0"),
    ].join("-");
    currentDayKey = dayKey;
  };

  if (currentDayKey === null) {
    applyQuote();
    return;
  }

  quoteContent.classList.add("is-fading");
  window.setTimeout(() => {
    applyQuote();
    window.requestAnimationFrame(() => quoteContent.classList.remove("is-fading"));
  }, 430);
};

paintDailyQuote();
window.setInterval(paintDailyQuote, 60000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) paintDailyQuote();
});

window.dailyQuoteLibrary = {
  quotes: dailyQuotes,
  getForDate: getDailyQuoteForDate,
};
