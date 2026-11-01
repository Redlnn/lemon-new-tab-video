# 柠檬起始页宣传片

使用 Remotion 制作的 40 秒宣传片，分辨率为 3840 × 2160，帧率为 60 fps。

## 视频地址

[Bilibili](https://www.bilibili.com/video/BV1iEx46KE8M/)

## 本地预览

在项目根目录执行：

```sh
pnpm install
pnpm dev
```

打开 <http://localhost:3100/Lemon-Launch> 即可预览和拖动时间线。

## 导出视频

在根目录执行：

```sh
pnpm exec remotion render Lemon-Launch out/lemon-new-tab-4k.mp4
```

成片保存在 `out/lemon-new-tab-4k.mp4`。默认使用 H.265 Main10、Level 5.1、High tier、CRF 18、veryslow、yuv420p10le、BT.709，音频码率为 320 kbps。导出设置在 `remotion.config.ts` 中修改。

## 修改内容

- `src/Composition.tsx`：文字、分镜、动画和音轨。
- `src/style.css`：布局、颜色和样式。
- `public/`：图标、字体、背景音乐和音效。
- `sound-design.py`：生成转场和输入音效。
- `DESIGN.md`：视觉风格说明。

英文使用 Google Sans，中文回退到 HarmonyOS Sans SC。

## 音乐署名

背景音乐为 Kevin MacLeod 的《Dream Culture》。发布视频时，请将 [CREDITS.md](CREDITS.md) 中的音乐署名放入视频简介。

## 许可证

本项目自有代码和原创内容采用 [GNU AGPL-3.0](LICENSE)。音乐、字体及商标素材按各自授权使用，具体文件范围见 [第三方素材说明](THIRD_PARTY_NOTICES.md)。

本项目使用 Google Sans（SIL OFL 1.1）与 HarmonyOS Sans SC（HarmonyOS Sans Fonts License Agreement）。字体原始授权全文保存在 `licenses/` 中。第三方品牌商标和 Logo 不包含在本仓库的开源授权中；`lemon.svg` 和 `note.svg` 沿用原项目的 AGPL-3.0。

原创音效 `public/sound-design.wav` 采用 CC BY 4.0；生成脚本 `sound-design.py` 采用 AGPL-3.0。复用署名见 [CREDITS.md](CREDITS.md)。
