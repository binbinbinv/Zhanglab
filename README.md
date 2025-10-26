# Zhanglab
the website for Zhang lab

## 本地预览
这是一个纯静态站点（HTML/CSS/图片）。在项目根目录下你可以用一个轻量静态服务器本地查看效果：

使用 Python 3：（浏览器打开 http://localhost:8000 ）

```bash
python -m http.server 8000
```

实时热重载（可选）：安装 `live-server`（需 Node.js）

```bash
npm install -g live-server
live-server --port=8080
```

## 本次改动摘要
- 将页面内联脚本抽到 `js/main.js`（改善维护与缓存）
- 为两份页面添加 favicon (`favicon.svg`) 和 Open Graph meta（改善分享）
- 增加导航与轮播无障碍属性（ARIA），并在 JS 中同步状态
- 微调 header 在滚动时的阴影（更轻量）

如果需要，我可以继续：添加自动化部署说明、改进 SEO、或将样式拆分成更小的文件并添加简单构建脚本。
