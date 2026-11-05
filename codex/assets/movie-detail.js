(() => {
  const fallbackPalette = ["#39334d", "#16141c", "#75658b"];
  const fallbackMovie = {
    id: "",
    title: "电影详情",
    year: "",
    genre: "",
    image: "",
    palette: fallbackPalette,
    description: "海报信息暂时缺失，当前显示默认的深色电影氛围。",
  };
  const catalog = window.movieLibrary?.movies ?? [];
  const movieId = new URLSearchParams(window.location.search).get("movie");
  const movie = catalog.find((item) => item.id === movieId) ?? catalog[0] ?? fallbackMovie;

  document.title = `${movie.title} · 哎哟蔚的电影收藏`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = `哎哟蔚的电影收藏 · ${movie.title} 详情。`;

  const title = document.querySelector("#movieTitle");
  const description = document.querySelector("#movieDescription");
  const poster = document.querySelector("#movieHeroPoster");
  const posterImage = document.querySelector("#moviePosterImage");
  const posterTitle = document.querySelector("#moviePosterTitle");
  const posterCode = document.querySelector("#moviePosterCode");
  const movieYear = document.querySelector("#movieYear");
  const movieGenre = document.querySelector("#movieGenre");
  const actions = document.querySelector("#movieDetailActions");

  if (title) title.textContent = movie.title;
  if (description) description.textContent = movie.description;
  if (posterTitle) posterTitle.textContent = movie.title;
  if (movieYear) movieYear.textContent = movie.year || "年份占位";
  if (movieGenre) movieGenre.textContent = movie.genre || "类型占位";
  if (posterImage && movie.image) {
    posterImage.src = movie.image;
    posterImage.alt = `${movie.title} 海报`;
  }
  if (posterCode) {
    const index = catalog.findIndex((item) => item.id === movie.id);
    posterCode.textContent = `Poster placeholder / ${String(Math.max(index, 0) + 1).padStart(2, "0")}`;
  }

  if (actions) {
    actions.innerHTML = `
      <button class="movie-action" type="button" data-movie-action="want" data-movie-id="${movie.id}" aria-pressed="false">想看</button>
      <button class="movie-action" type="button" data-movie-action="watched" data-movie-id="${movie.id}" aria-pressed="false">已看过</button>
    `;
    window.movieLibrary?.refreshCollection();
  }

  const colorToRgb = (hex) => {
    const normalized = hex.replace("#", "");
    const full = normalized.length === 3
      ? normalized.split("").map((character) => character + character).join("")
      : normalized;
    const value = Number.parseInt(full, 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  };

  const rgbToHex = (red, green, blue) =>
    `#${[red, green, blue].map((value) => value.toString(16).padStart(2, "0")).join("")}`;

  const setPalette = (colors) => {
    const [primary, secondary, highlight] = colors;
    const root = document.documentElement.style;
    root.setProperty("--ambient-primary", colorToRgb(primary).join(" "));
    root.setProperty("--ambient-secondary", colorToRgb(secondary).join(" "));
    root.setProperty("--ambient-highlight", colorToRgb(highlight).join(" "));
  };

  const extractPalette = (image) => new Promise((resolve) => {
    if (!image?.naturalWidth) {
      resolve(null);
      return;
    }

    try {
      const sampleCanvas = document.createElement("canvas");
      const size = 72;
      sampleCanvas.width = size;
      sampleCanvas.height = size;
      const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) {
        resolve(null);
        return;
      }

      sampleContext.drawImage(image, 0, 0, size, size);
      const pixels = sampleContext.getImageData(0, 0, size, size).data;
      const buckets = new Map();

      for (let index = 0; index < pixels.length; index += 16) {
        const alpha = pixels[index + 3];
        if (alpha < 180) continue;

        const red = Math.min(240, Math.round(pixels[index] / 24) * 24);
        const green = Math.min(240, Math.round(pixels[index + 1] / 24) * 24);
        const blue = Math.min(240, Math.round(pixels[index + 2] / 24) * 24);
        const brightness = (red + green + blue) / 3;
        if (brightness < 18 || brightness > 242) continue;

        const key = `${red},${green},${blue}`;
        buckets.set(key, {
          count: (buckets.get(key)?.count ?? 0) + 1,
          red,
          green,
          blue,
        });
      }

      const colors = [...buckets.values()]
        .sort((left, right) => right.count - left.count)
        .slice(0, 8)
        .map(({ red, green, blue }) => rgbToHex(red, green, blue));

      if (colors.length < 2) {
        resolve(null);
        return;
      }
      resolve(colors);
    } catch {
      resolve(null);
    }
  });

  const choosePalette = (extracted) => {
    const candidate = extracted?.length >= 2 ? extracted : movie.palette;
    return candidate?.length >= 2 ? candidate.slice(0, 3) : fallbackPalette;
  };

  const initialPalette = choosePalette(null);
  setPalette(initialPalette);
  let particleColor = colorToRgb(initialPalette[2]);

  if (posterImage) {
    const runExtraction = async () => {
      const extracted = await extractPalette(posterImage);
      const resolved = choosePalette(extracted);
      setPalette(resolved);
      particleColor = colorToRgb(resolved[2]);
    };

    if (posterImage.complete) {
      runExtraction();
    } else {
      posterImage.addEventListener("load", runExtraction, { once: true });
      posterImage.addEventListener("error", () => {
        setPalette(fallbackPalette);
        particleColor = colorToRgb(fallbackPalette[2]);
      }, { once: true });
    }
  }

  const canvas = document.querySelector("#particleCanvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const particles = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let isRunning = true;

  const createParticles = () => {
    particles.length = 0;
    const count = window.innerWidth < 768 ? 12 : 20;
    for (let index = 0; index < count; index++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.55 + Math.random() * 0.7,
        speedX: -0.035 + Math.random() * 0.07,
        speedY: -0.045 + Math.random() * 0.09,
        alpha: 0.07 + Math.random() * 0.09,
      });
    }
  };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    createParticles();
  };

  const draw = () => {
    if (!isRunning) return;
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < -4) particle.x = width + 4;
      if (particle.x > width + 4) particle.x = -4;
      if (particle.y < -4) particle.y = height + 4;
      if (particle.y > height + 4) particle.y = -4;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particleColor.join(",")}, ${particle.alpha})`;
      context.fill();
    });

    frame = window.requestAnimationFrame(draw);
  };

  document.addEventListener("visibilitychange", () => {
    isRunning = !document.hidden;
    if (isRunning) {
      draw();
    } else {
      window.cancelAnimationFrame(frame);
    }
  });

  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
})();
