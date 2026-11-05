# 哎哟蔚的电影收藏

纯静态电影片库网站，使用 HTML、Tailwind CSS 和原生 JavaScript，不需要后端或构建步骤。

## 目录结构

```text
.
├── index.html
├── library.html
├── favorites.html
├── movie.html
├── vercel.json
├── assets/
│   ├── movies.js
│   ├── daily-quote.js
│   ├── characters.js
│   └── ...
└── posters/
    ├── rear-window.svg
    ├── the-lion-king.svg
    └── ...
```

## 本地预览

直接双击 `index.html` 即可打开。网站内的 CSS、JavaScript 和图片均使用相对路径。

## 修改电影数据

在 `assets/movies.js` 中维护影片信息。每条数据包含：

```js
{
  id: "unique-id",
  title: "电影名称",
  year: "2025",
  genre: "悬疑",
  image: "./posters/your-poster.svg",
  palette: ["#主色", "#氛围色", "#高光色"],
  description: "影片简介"
}
```

将真实海报放入根目录的 `posters/` 文件夹，并更新 `image` 相对路径即可。详情页会尝试从海报图片提取主色，提取失败时使用 `palette` 作为兜底。

收藏数据保存在浏览器 `localStorage`，键名为 `aiyowei-film-library-v1`，不会上传到服务器。

## 部署到 Vercel

项目根目录已经包含 `vercel.json`，无需构建命令。

### 方式一：Vercel 控制台

将整个项目文件夹导入 Vercel。Framework Preset 选择 `Other`，Build Command 与 Output Directory 保持默认即可。

### 方式二：Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

`cleanUrls` 已启用，因此也可以使用 `/library`、`/favorites` 和 `/movie?movie=rear-window` 这样的干净地址访问。
