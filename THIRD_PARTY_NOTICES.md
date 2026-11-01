# 许可证与第三方素材说明

本仓库自有代码、原创动画、样式和文案采用 **GNU AGPL-3.0-only**，完整条款见 [LICENSE](LICENSE)。Copyright (c) 2026 Redlnn and contributors。

下表列出的第三方素材保留原有授权，不因随本仓库分发而改授 AGPL。仓库是包含不同授权素材的集合，不能将全部文件视作 AGPL 素材。软件依赖同样保留各自许可证；使用 Remotion 时须遵守其官方许可条件。

| 文件                                                                                                                        | 作者 / 来源                                                      | 适用授权                                 |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------- |
| `public/dream-culture.mp3`                                                                                                  | Kevin MacLeod，《Dream Culture》                                 | CC BY 4.0                                |
| `public/bgm-dream-culture-even.mp3`                                                                                         | 上述原曲的剪辑版                                                 | CC BY 4.0                                |
| `public/GoogleSans.ttf`                                                                                                     | Copyright 2025 The Google Sans Project Authors                   | SIL OFL 1.1                              |
| `public/HarmonyOS_Sans_SC.ttf`                                                                                              | Copyright 2021–2023 Huawei Device Co., Ltd. All Rights Reserved. | HarmonyOS Sans Fonts License Agreement   |
| `public/lemon.svg`、`public/note.svg`                                                                                       | Lemon New Tab 项目                                               | GNU AGPL-3.0-only，与原项目 LICENSE 一致 |
| `public/baidu.svg`、`public/bili.svg`、`public/bing.svg`、`public/duckduckgo.svg`、`public/google.svg`、`public/yandex.svg` | 对应品牌的商标或 Logo                                            | 排除在本仓库开源授权之外，权利归各权利人 |
| `public/sound-design.wav` | Redlnn，本项目原创音效 | CC BY 4.0 |
| `sound-design.py` | Redlnn，音效生成脚本 | GNU AGPL-3.0-only |

## Dream Culture

“Dream Culture” by Kevin MacLeod (incompetech.com)。

- 原曲及授权来源：https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1300046
- 许可证：[CC BY 4.0 全文](licenses/CC-BY-4.0.txt)，https://creativecommons.org/licenses/by/4.0/
- 剪辑版处理：截取原曲约 00:27.429–01:07.429，保留原速，调整固定音量，添加首尾淡入淡出，以 320 kbps MP3 编码。
- 使用或发布包含此音乐的成片时，保留作者署名、原曲及许可链接，并说明修改；可使用 [CREDITS.md](CREDITS.md) 中的文字。

## 原创音效

`public/sound-design.wav` 由 Redlnn 创作，采用 **CC BY 4.0**，许可全文见 [CC-BY-4.0.txt](licenses/CC-BY-4.0.txt)。音效由 `sound-design.py` 合成，未使用第三方采样；生成脚本采用 **GNU AGPL-3.0-only**，见 [LICENSE](LICENSE)。脚本的 AGPL 授权不改变此处对输出 WAV 的 CC BY 4.0 授权。

复用音效时请署名 Redlnn，提供许可链接，并在修改时说明修改。建议署名：

> Sound effects: Redlnn — sound-design.wav, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Generated with sound-design.py from Lemon New Tab Video. Changes: none.

如有修改，请将 `Changes: none` 替换为实际修改说明，并附所获取仓库或源文件的链接。

## 字体

本项目使用 **Google Sans** 和 **HarmonyOS Sans SC**，字体文件均保留原样。

Google Sans 的原始授权全文见 [GoogleSans-OFL-1.1.txt](licenses/GoogleSans-OFL-1.1.txt)，来源为 Google Fonts 官方仓库：https://github.com/google/fonts/blob/main/ofl/googlesans/OFL.txt 。本地字体内嵌许可元数据也声明 OFL 1.1；该字体继续按 OFL 分发。

HarmonyOS Sans 的原始授权全文见 [HarmonyOS-Sans-License.txt](licenses/HarmonyOS-Sans-License.txt)，来源为 OpenHarmony 官方资源仓库：https://github.com/openharmony/resources/blob/master/LICENSE_Fonts 。上游许可文件附带 Copyright 2021 Huawei Device Co., Ltd.，本地字体内嵌版权为 2021–2023，均予以保留。

HarmonyOS Sans 使用专用授权：允许在其条件下随软件捆绑未修改字体，不允许修改字体或单独分发、销售字体。它不是按 AGPL 授权的开源字体。分发字体时须保留版权与协议，并显著说明使用了 HarmonyOS Sans；本说明及 README 提供该声明。使用字体生成的作品与字体软件本身应分别看待。

## 商标 SVG

上述第三方品牌 SVG 仅用于演示对应服务，不授予其著作权或商标使用许可，也不表示品牌背书。不得以本仓库的 AGPL 许可证作为复用这些商标或 Logo 的授权依据；使用者须自行确认适用许可或法律依据。此排除不撤销权利人已另行授予的任何许可。

`lemon.svg` 和 `note.svg` 按原项目 `F:/Projects/Npm/lemon-new-tab/LICENSE`（GNU AGPL v3）分发，完整协议保存在本仓库 LICENSE 中。

## 源码与成片

源码授权与第三方音乐、字体、商标权利分别适用。发布源码或成片时，保留适用的署名和许可；第三方素材的限制不会因渲染成视频而自动消失。不要将混合第三方素材的成片统一宣称为全部素材均按 AGPL 授权。
