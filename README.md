# 星からの信号を解読せよ LP

静的サイト一式は `dist/` にあります。

## ローカル確認

```powershell
cd dist
python -m http.server 4173
```

ブラウザで `http://localhost:4173/` を開いてください。

## 主なファイル

- `dist/index.html` — ページ構成・掲載内容
- `dist/styles.css` — デザイン・レスポンシブ表示・アニメーション
- `dist/app.js` — ローディング、スクロール演出、星空、メニュー
- `dist/assets/` — LPで使用する画像素材

開催日、会場、予約方法は未確定のため、`index.html` の「開催情報」セクションで「近日公開」としています。
