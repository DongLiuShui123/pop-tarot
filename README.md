# Pop Tarot

Pop Tarot 是一个使用 React、TypeScript 和 Vite 构建的现代塔罗抽卡应用。用户可以输入问题、选择牌阵、抽取塔罗牌，并获得基于 DeepSeek API 的 AI 解读。未配置 API Key 时，项目会使用内置牌义生成本地演示解读，方便展示和部署。

## 功能

- 三种牌阵：单张指引、时间流牌阵、爱之维纳斯
- 78 张塔罗牌数据与本地牌面图片
- 抽牌、翻牌、逆位和洗牌动效
- DeepSeek AI 解读，可通过环境变量配置
- 用户昵称、卡背偏好和占卜历史本地保存
- GitHub Pages 自动部署工作流

## 技术栈

- React 19
- TypeScript
- Vite
- React Router
- React Markdown
- Lucide React
- Tailwind CSS

## 本地运行

请使用 Node.js 20.19 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开终端输出的本地地址，默认是 `http://localhost:3000`。

## 环境变量

复制 `.env.example` 为 `.env.local`，然后填入你的 DeepSeek Key。

```bash
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
VITE_DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
```

说明：

- `VITE_DEEPSEEK_API_KEY`：DeepSeek API Key。
- `VITE_DEEPSEEK_API_URL`：DeepSeek Chat Completions 接口地址，可不改。
- 如果不配置 Key，应用仍可运行，但会显示本地演示解读。

## 常用命令

```bash
npm run dev        # 启动开发服务器
npm run typecheck  # TypeScript 类型检查
npm run build      # 构建生产版本
npm run preview    # 预览构建结果
npm run check      # 类型检查 + 构建
```

## GitHub Pages 部署

项目已经包含 `.github/workflows/deploy.yml`。推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

部署前建议：

1. 打开 GitHub 仓库的 `Settings > Pages`，将 Source 选择为 `GitHub Actions`。
2. 推送代码到 `main` 分支。
3. 等待 Actions 完成后，在 Pages 页面查看部署地址。

注意：GitHub Pages 是纯前端部署，不能安全保存 API Key。当前工作流默认不注入 `VITE_DEEPSEEK_API_KEY`，线上演示会使用本地牌义解读。若要上线 AI 解读，建议增加一个后端代理服务，由后端保存 DeepSeek API Key，再让前端请求该代理接口。

## 项目结构

```text
.
├── components/       # 页面通用组件
├── data/             # 塔罗牌与牌阵数据
├── images/           # 卡背图片
├── pages/            # 页面
├── services/         # AI 解读服务
├── store/            # 用户状态与历史记录
├── tarot-cards/      # 78 张塔罗牌图片
├── App.tsx
├── index.html
├── index.tsx
└── vite.config.ts
```


