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

## 予約ページの連携

予約ページ完成後、`dist/index.html` にある次の設定の `content` にURLを入力してください。

```html
<meta name="reservation-url" content="https://example.com/reservation">
```

トップ、開催情報、ページ最下部の3つの予約ボタンへ同じURLが自動反映され、新しいタブで開きます。URLが空の間、トップの予約ボタンは開催情報へ移動します。

開催日は11月1日〜11月3日、会場は学生会館 集会室1です。
