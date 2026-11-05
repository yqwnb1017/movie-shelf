// 真实经典影片示例数据。
// 添加影片时请保持字段完整，并将海报图片放在项目根目录的 posters/ 文件夹。
const movies = [
  {
    id: "rear-window",
    title: "后窗",
    year: "1954",
    genre: "悬疑",
    image: "./posters/rear-window.svg",
    palette: ["#405c68", "#121b20", "#86a2ac"],
    description: "摄影师杰弗里斯因腿伤在家休养，透过窗户观察邻居，并逐渐怀疑对面房间发生了一桩谋杀。",
  },
  {
    id: "witness-for-the-prosecution",
    title: "控方证人",
    year: "1957",
    genre: "悬疑",
    image: "./posters/witness-for-the-prosecution.svg",
    palette: ["#8b7358", "#211b16", "#c3aa85"],
    description: "伦敦律师威尔弗莱德为一桩谋杀案被告辩护，案件因被告妻子的证词变得扑朔迷离。",
  },
  {
    id: "the-lion-king",
    title: "狮子王",
    year: "1994",
    genre: "动画",
    image: "./posters/the-lion-king.svg",
    palette: ["#a86e45", "#2d1b12", "#dfad70"],
    description: "小狮子辛巴在父亲遇害后离开家园，长大后重返荣耀石夺回王位。",
  },
  {
    id: "toy-story",
    title: "玩具总动员",
    year: "1995",
    genre: "动画",
    image: "./posters/toy-story.svg",
    palette: ["#4e7f9a", "#14232d", "#d2a657"],
    description: "牛仔胡迪与太空骑警巴斯光年起初互不相让，却在意外中学会成为朋友。",
  },
  {
    id: "se7en",
    title: "七宗罪",
    year: "1995",
    genre: "悬疑",
    image: "./posters/se7en.svg",
    palette: ["#605f49", "#151610", "#a19c76"],
    description: "即将退休的警探萨默塞特与年轻警探米尔斯追查一宗以七宗罪为主题的连环凶案。",
  },
  {
    id: "spirited-away",
    title: "千与千寻",
    year: "2001",
    genre: "动画",
    image: "./posters/spirited-away.svg",
    palette: ["#4e7774", "#14201f", "#d38565"],
    description: "少女千寻误入神灵世界，为救回父母而在汤屋工作，并寻找回家的路。",
  },
];

const storageKey = "aiyowei-film-library-v1";
const currentFilter = { year: "all", genre: "all" };
let memoryState = {};

const matchesFilter = (movie) =>
  (currentFilter.year === "all" || movie.year === currentFilter.year) &&
  (currentFilter.genre === "all" || movie.genre === currentFilter.genre);

const readCollection = () => {
  try {
    const stored = window.localStorage.getItem(storageKey);
    const parsed = stored ? JSON.parse(stored) : {};
    if (!parsed || typeof parsed !== "object") return {};

    const validIds = new Set(movies.map((movie) => movie.id));
    return Object.fromEntries(
      Object.entries(parsed).filter(([movieId, value]) =>
        validIds.has(movieId) && (value === "want" || value === "watched"),
      ),
    );
  } catch {
    return { ...memoryState };
  }
};

const saveCollection = (state) => {
  memoryState = { ...state };
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Memory fallback keeps interactions working when storage is unavailable.
  }
};

const movieCardTemplate = (movie, index) => `
  <article class="movie-card reveal" data-movie-card="${movie.id}">
    <a class="movie-poster-link" href="./movie.html?movie=${movie.id}" aria-label="查看《${movie.title}》详情">
      <div class="poster-art" role="img" aria-label="${movie.title} 海报">
        <img src="${movie.image}" alt="${movie.title} 海报" width="800" height="1200" loading="lazy" />
        <span class="poster-code">POSTER / ${String(index + 1).padStart(2, "0")}</span>
        <span class="poster-mark">${movie.year} · ${movie.genre}</span>
      </div>
    </a>
    <div class="movie-card-body">
      <h3 class="movie-card-title" title="${movie.title}"><a href="./movie.html?movie=${movie.id}">${movie.title}</a></h3>
      <div class="movie-actions" aria-label="${movie.title} 收藏状态">
        <button class="movie-action" type="button" data-movie-action="want" data-movie-id="${movie.id}" aria-pressed="false">想看</button>
        <button class="movie-action" type="button" data-movie-action="watched" data-movie-id="${movie.id}" aria-pressed="false">已看过</button>
      </div>
    </div>
  </article>
`;

const getMovieById = (movieId) => movies.find((movie) => movie.id === movieId);

const updateButtons = (state) => {
  document.querySelectorAll("[data-movie-action]").forEach((button) => {
    const isActive = state[button.dataset.movieId] === button.dataset.movieAction;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const updateCounts = (state) => {
  const knownMovies = new Set(movies.map((movie) => movie.id));
  const validEntries = Object.entries(state)
    .filter(([movieId]) => knownMovies.has(movieId))
    .map(([, value]) => value);
  const want = validEntries.filter((value) => value === "want").length;
  const watched = validEntries.filter((value) => value === "watched").length;

  document.querySelectorAll("[data-stat-total]").forEach((node) => {
    node.textContent = String(movies.length);
  });
  document.querySelectorAll("[data-stat-want]").forEach((node) => {
    node.textContent = String(want);
  });
  document.querySelectorAll("[data-stat-watched]").forEach((node) => {
    node.textContent = String(watched);
  });
  document.querySelectorAll("[data-profile-count]").forEach((node) => {
    node.textContent = `${movies.length} 部影片 · ${validEntries.length} 部已标记`;
  });
};

const observeNewCards = (container) => {
  const cards = [...container.querySelectorAll(".reveal")];
  if (!cards.length) return;

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
  );

  cards.forEach((card) => observer.observe(card));
};

const renderFilterOptions = () => {
  const years = [...new Set(movies.map((movie) => movie.year))].sort();
  const genres = ["悬疑", "动画"].filter((genre) => movies.some((movie) => movie.genre === genre));
  const groups = { year: years, genre: genres };

  document.querySelectorAll("[data-filter-options]").forEach((container) => {
    const group = container.dataset.filterOptions;
    const values = ["all", ...(groups[group] ?? [])];
    container.innerHTML = values
      .map((value) => {
        const label = value === "all" ? "全部" : value;
        return `<button class="filter-chip" type="button" data-filter="${group}" data-value="${value}" aria-pressed="false">${label}</button>`;
      })
      .join("");
  });
};

const renderLibrary = () => {
  const grid = document.querySelector("[data-all-movies]");
  if (!grid) return;

  const filtered = movies.filter(matchesFilter);
  grid.innerHTML = filtered
    .map((movie) => movieCardTemplate(movie, movies.indexOf(movie)))
    .join("");
  grid.hidden = filtered.length === 0;

  const empty = document.querySelector("[data-library-empty]");
  if (empty) {
    empty.hidden = filtered.length > 0;
    empty.textContent = "当前筛选条件下没有电影，试试切换年份或类型。";
  }

  const result = document.querySelector("[data-filter-result]");
  if (result) result.textContent = `当前显示 ${filtered.length} 部`;
  observeNewCards(grid);
};

const showToast = (message) => {
  const toast = document.querySelector("#toast");
  if (!toast) return;

  window.clearTimeout(showToast.timer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2000);
};

const renderFavorites = (state) => {
  document.querySelectorAll("[data-favorites-group]").forEach((container) => {
    const group = container.dataset.favoritesGroup;
    const grid = container.querySelector("[data-favorites-grid]");
    const empty = container.querySelector("[data-favorites-empty]");
    const count = container.querySelector("[data-group-count]");
    if (!grid || !empty) return;

    const collection = movies.filter((movie) => state[movie.id] === group && matchesFilter(movie));
    grid.innerHTML = collection
      .map((movie) => movieCardTemplate(movie, movies.indexOf(movie)))
      .join("");
    empty.hidden = collection.length > 0;
    grid.hidden = collection.length === 0;
    if (count) count.textContent = `${collection.length} 部`;
    observeNewCards(grid);
  });
};

const syncFilters = () => {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const group = button.dataset.filter;
    const isActive = currentFilter[group] === button.dataset.value;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const refreshCollectionUI = () => {
  const state = readCollection();
  updateButtons(state);
  updateCounts(state);
  renderLibrary();
  renderFavorites(state);
};

renderFilterOptions();
syncFilters();
refreshCollectionUI();

document.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    currentFilter[filterButton.dataset.filter] = filterButton.dataset.value;
    syncFilters();
    refreshCollectionUI();
    return;
  }

  const actionButton = event.target.closest("[data-movie-action]");
  if (!actionButton) return;

  const movie = getMovieById(actionButton.dataset.movieId);
  if (!movie) return;

  const action = actionButton.dataset.movieAction;
  const nextState = { ...readCollection() };
  const removed = nextState[movie.id] === action;

  if (removed) {
    delete nextState[movie.id];
  } else {
    nextState[movie.id] = action;
  }

  saveCollection(nextState);
  updateButtons(nextState);
  updateCounts(nextState);
  renderFavorites(nextState);

  const message = removed
    ? `已从收藏中移除《${movie.title}》`
    : action === "want"
      ? `《${movie.title}》已加入想看`
      : `《${movie.title}》已标记为看过`;
  showToast(message);
});

window.addEventListener("storage", (event) => {
  if (event.key !== storageKey) return;
  const state = readCollection();
  updateButtons(state);
  updateCounts(state);
  renderFavorites(state);
});

window.movieLibrary = {
  movies,
  getMovieById,
  readCollection,
  refreshCollection: refreshCollectionUI,
};
