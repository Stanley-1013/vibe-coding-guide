# 開發文件

## 技術選型

### 核心技術棧
- **HTML5 + CSS3 + Vanilla JavaScript**
- 無框架依賴，純原生實現
- 完全靜態，可直接部署到 GitHub Pages

### 設計原則
- **語義化標籤**: 使用 `<article>`, `<section>`, `<nav>` 等提升可讀性
- **CSS Variables**: 統一管理顏色、間距、字型等設計系統
- **模組化 JS**: 分離關注點，便於維護與擴展
- **SVG 圖示**: 手工繪製，確保視覺一致性與效能

---

## 架構設計

### 檔案結構

```
vibe_coding_guide/
├── index.html              # 主頁面（一頁式設計）
├── css/
│   ├── variables.css       # CSS 設計系統（顏色、間距、字型等）
│   ├── base.css           # 基礎樣式（reset, typography）
│   ├── layout.css         # 佈局系統（grid, flex）
│   ├── components.css     # 元件樣式（按鈕、卡片、手風琴等）
│   └── animations.css     # 動畫效果
├── js/
│   ├── navigation.js      # 導航列互動（滾動偵測、平滑滾動）
│   ├── interactions.js    # 互動元件（手風琴、tabs、tooltips）
│   ├── animations.js      # 動畫控制（Intersection Observer）
│   └── app.js            # 主程式入口
├── assets/
│   └── svg/              # SVG 圖示庫
│       ├── icons/        # 功能性圖示
│       └── illustrations/ # 裝飾性插圖
├── docs/
│   └── DEVELOPMENT.md    # 本文件
└── README.md             # 專案說明
```

---

## CSS 設計系統

### 變數系統 (css/variables.css)

#### 顏色系統
```css
:root {
  /* Primary - 主色調（紫色系） */
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --color-accent: #f093fb;

  /* Text - 文字顏色 */
  --color-text: #2d3748;
  --color-text-light: #718096;

  /* Background - 背景色 */
  --color-bg: #ffffff;
  --color-bg-light: #f7fafc;

  /* Borders */
  --color-border: #e2e8f0;
}
```

#### 間距系統
- `--space-xs`: 0.5rem (8px)
- `--space-sm`: 1rem (16px)
- `--space-md`: 2rem (32px)
- `--space-lg`: 4rem (64px)
- `--space-xl`: 6rem (96px)

#### 字型系統
- `--font-sans`: Inter（主要字型）
- `--font-mono`: Fira Code（程式碼區塊）

### 模組化設計

每個 CSS 檔案負責單一職責：
- **variables.css**: 設計變數（顏色、間距、字型）
- **base.css**: 基礎樣式（reset、全域字型、連結）
- **layout.css**: 佈局系統（container、grid、flex utilities）
- **components.css**: 可重用元件（按鈕、卡片、手風琴）
- **animations.css**: 過場動畫與互動效果

---

## JavaScript 模組化

### 模組分工

#### navigation.js
- 滾動偵測（spy scrolling）
- 平滑滾動到章節
- 導航列背景變化

#### interactions.js
- 手風琴展開/收合
- Tab 切換
- Tooltip 顯示/隱藏

#### animations.js
- Intersection Observer 初始化
- 滾動觸發動畫
- 淡入/滑入效果

#### app.js
- 統一初始化所有模組
- 全域事件監聽
- 錯誤處理

### 模組匯入範例

```javascript
// app.js
import { initNavigation } from './navigation.js';
import { initInteractions } from './interactions.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initInteractions();
  initAnimations();
});
```

---

## 內容規劃

### 一頁式設計

整合 8 個章節到單一頁面，使用以下策略：

1. **Hero Section**: 主視覺 + 核心訴求
2. **8 個章節**: 每個章節使用 `<section id="章節名">`
3. **手風琴/Details**: 收納完整內容，避免頁面過長
4. **固定導航列**: 快速跳轉章節

### 內容結構範例

```html
<section id="chapter-1" class="chapter">
  <h2>AI 開發基本心態</h2>
  <p class="chapter-intro">簡短引言（100字內）</p>

  <details>
    <summary>了解更多</summary>
    <div class="chapter-content">
      <!-- 完整內容 -->
    </div>
  </details>
</section>
```

### 寫作語氣

- **第一人稱**: 使用「我」、「我的經驗」建立親切感
- **新手友善**: 避免術語，必要時附上解釋
- **實戰導向**: 分享具體案例與可執行步驟

---

## 開發流程

### Local Development

```bash
# 直接開啟 index.html
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# 或使用簡易伺服器（可選）
python -m http.server 8000
```

### Deployment (GitHub Pages)

1. Push 到 GitHub
   ```bash
   git add .
   git commit -m "feat: update content"
   git push origin main
   ```

2. 啟用 GitHub Pages
   - Repository Settings → Pages
   - Source: `main` branch, `/` (root)
   - 等待幾分鐘後即可訪問

### 版本控制

- **Main branch**: 穩定版本，直接部署
- **Commit message**: 遵循 Conventional Commits
  - `feat:` 新功能
  - `fix:` 修復
  - `docs:` 文件更新
  - `style:` 樣式調整

---

## 效能優化

### 靜態資源
- CSS/JS 合併與最小化（部署前）
- SVG 檔案優化（移除不必要的 metadata）
- 使用 CDN 載入字型（Inter, Fira Code）

### 載入策略
- 延遲載入非首屏內容（Intersection Observer）
- CSS 在 `<head>` 中載入
- JS 使用 `<script type="module">` 或 `defer`

### 可訪問性 (A11y)
- 語義化標籤
- 鍵盤導航支援（Tab, Enter, Space）
- ARIA 標籤（必要時）
- 顏色對比度符合 WCAG AA 標準

---

## 下一步開發計畫

### Wave 1: 基礎建設 ✅
- [x] Git 初始化與 GitHub 連接
- [x] 目錄結構與開發文件
- [x] CSS 變數系統

### Wave 2: 核心架構
- [ ] HTML 骨架（語義化標籤）
- [ ] CSS 基礎樣式與佈局
- [ ] JS 模組初始化

### Wave 3: 視覺設計
- [ ] 設計系統實作（按鈕、卡片、手風琴）
- [ ] SVG 圖示繪製
- [ ] 動畫效果

### Wave 4: 內容填充
- [ ] 8 個章節文字內容
- [ ] 程式碼範例與截圖
- [ ] 最終調整與測試

---

## 技術參考

### 字型
- [Inter](https://fonts.google.com/specimen/Inter) - 主要字型
- [Fira Code](https://fonts.google.com/specimen/Fira+Code) - 程式碼字型

### 工具
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG 優化
- [Can I Use](https://caniuse.com/) - 瀏覽器相容性檢查

### 設計靈感
- [Stripe](https://stripe.com/) - 簡潔現代的文案設計
- [Linear](https://linear.app/) - 優雅的動畫效果
