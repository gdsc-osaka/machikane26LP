# 星からの信号を解析せよ — LP用レイヤー素材キット

このZIPには、参考の縦長キービジュアルをWebで再構成するための独立素材が入っています。
参考画像：941×1672 px。

## contents
- sprites/ : 透過PNG。ロゴ、女の子、男の子、青い惑星、観測施設、星座・レーダー・装飾。
- ui/ : 透過PNG。予約ボタン（元画像からの参考切り抜き・新規クリーン版）、謎解き脱出ゲームのラベル、SCROLL表示。
- animation/ : 透明背景の流れ星 GIF、画質の良い透明背景WebP、静止透過PNG。
- background/ : 宇宙背景。背景自体は不透明のPNGです。
- preview/ : 組み合わせ例と透過確認一覧。

## 大切な注意
**元画像は統合された1枚絵**のため、完全なPSDの分離や、人物・建物の隠れた部分の厳密な復元はできません。
`sprites/`のキャラクター、ロゴ、惑星、施設は、制作過程で別途生成された透明素材を再利用しています。元の最終合成画面と完全に一致するピクセル分離ではなく、構図・ディテールが一部異なります。
`ui/01_reserve_button_sample.png`と`ui/02_era_label_sample.png`は元の合成から手作業でマスクしたサンプルなので、内側の背景が少し含まれます。実装時のボタンは本当のHTML `<a>` 要素を推奨します。

## 推奨レイヤー順（背面 → 前面）
1. `background/00_starfield_portrait.png`
2. `sprites/04_blue_planet_orbits.png`
3. `sprites/05_observatory_foreground.png`
4. `sprites/06_constellation_orbits.png` （必要に応じて薄く）
5. `sprites/01_main_logo.png` 
6. `sprites/02_girl.png`、`sprites/03_boy.png`
7. `animation/01_shooting_stars_transparent.gif` またはWebP
8. UIボタンとSCROLL（画像参考にHTML/CSSリンクを推奨）

## Figma Makeへ渡す短い指示
「参考の縦長キービジュアルはそのまま貼らず、添付した透明PNGのロゴ・男女キャラクター・惑星・施設を独立して重ねてください。`preview/layered_mobile_example.jpg`は配置の参考です。流れ星は`animation/02_shooting_stars_transparent.webp`（GIF互換が必要ならGIF）を絶対配置の透明オーバーレイにし、`pointer-events:none`にしてください。ロゴはテキストで再現しない。予約するはリンクとして実装し、SCROLLは次のセクションへ移動する本物のボタンにしてください。390px幅を最優先、横スクロール禁止。`prefers-reduced-motion`で流れ星は静止か非表示。」

## GIFとWebP
- GIFは透明度1bitのため、周辺の細かい発光が少し硬くなることがあります。
- WebPはRGBAの透過を維持できるので、スマホWebの通常表示はこちらが高画質です。
- 現状の流れ星は、もとの絵に埋め込まれた星とは**別レイヤーのアニメーション**です。

## サイズ目安
制作画像の元データはpng個別素材です。`preview`はデモで、実際のサイトでは各要素の配置とサイズをCSSで指定してください。
