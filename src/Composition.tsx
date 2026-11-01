import { loadFont } from '@remotion/fonts'
import { Audio } from '@remotion/media'
import React from 'react'
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import './style.css'

// Convert design coordinates to native 4K pixels before browser layout.
const pixelProperties = new Set([
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'top',
  'right',
  'bottom',
  'left',
  'inset',
  'fontSize',
  'letterSpacing',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'gap',
  'rowGap',
  'columnGap',
  'borderRadius',
  'borderWidth',
  'perspective',
])
function nativeStyle(style: React.CSSProperties): React.CSSProperties {
  const result: Record<string, string | number | undefined> = {}
  for (const key of Object.keys(style)) {
    const value = style[key as keyof React.CSSProperties]
    result[key] =
      typeof value === 'number' && pixelProperties.has(key)
        ? value * 2
        : typeof value === 'string'
          ? value.replace(/(-?\d*\.?\d+)px/g, (_, pixels) => String(Number(pixels) * 2) + 'px')
          : value
  }
  return result as React.CSSProperties
}

loadFont({
  family: 'Google Sans',
  url: staticFile('GoogleSans.ttf'),
  weight: '400 700',
  display: 'block',
})

loadFont({
  family: 'HarmonyOS Sans SC',
  url: staticFile('HarmonyOS_Sans_SC.ttf'),
  weight: '40 900',
  display: 'block',
})

const ease = Easing.bezier(0.16, 1, 0.3, 1)
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const
const tween = (t: number, a: number, b: number, x: number, y: number) =>
  interpolate(t, [a, b], [x, y], { ...clamp, easing: ease })
const useTime = () => useCurrentFrame() / useVideoConfig().fps
const FilmTimeContext = React.createContext(0)
const icons = ['google', 'bing', 'bili', 'duckduckgo', 'note', 'baidu', 'yandex']
const labels = ['Google', 'Bing', '哔哩哔哩', 'DuckDuckGo', '便签', '百度', 'Yandex']
function Grain() {
  return <div className="grain" />
}
function Stage({ children, tone = 0 }: { children: React.ReactNode; tone?: number }) {
  const t = React.useContext(FilmTimeContext)
  return (
    <AbsoluteFill className="stage">
      <div
        className="halo"
        style={nativeStyle({
          transform: `translate(${Math.sin(t * 0.35) * 100}px,${Math.cos(t * 0.3) * 50}px)`,
          filter: `hue-rotate(${tone}deg)`,
        })}
      />
      <Grain />
      {children}
    </AbsoluteFill>
  )
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>
}
function Reveal({
  children,
  delay = 0,
  size = 112,
  color,
}: {
  children: React.ReactNode
  delay?: number
  size?: number
  color?: string
}) {
  const t = useTime()
  return (
    <div style={nativeStyle({ overflow: 'hidden', paddingBottom: 14 })}>
      <div
        className="display"
        style={nativeStyle({
          fontSize: size,
          color,
          transform: `translateY(${tween(t, delay, delay + 0.65, 135, 0)}%)`,
          opacity: tween(t, delay, delay + 0.35, 0, 1),
        })}
      >
        {children}
      </div>
    </div>
  )
}
function Wallpaper({ hue = 0, moving = false }: { hue?: number; moving?: boolean }) {
  const t = useTime()
  return (
    <div className="wallpaper" style={nativeStyle({ filter: `hue-rotate(${hue}deg)` })}>
      <div className="wallpaper-glow" />
      <svg
        viewBox="0 0 1400 800"
        className="ribbons"
        style={nativeStyle({
          transform: `translate(${moving ? Math.sin(t * 0.55) * 24 : 0}px,${moving ? Math.cos(t * 0.45) * 14 : 0}px) scale(1.08)`,
        })}
      >
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff2b1" />
            <stop offset=".28" stopColor="#bb902a" />
            <stop offset=".58" stopColor="#32271b" />
            <stop offset="1" stopColor="#090b10" />
          </linearGradient>
          <linearGradient id="edge">
            <stop stopColor="#f9df81" stopOpacity="0" />
            <stop offset=".5" stopColor="#f9df81" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-300 850 C150 50 470 1100 790 410 S1400 -200 1700 200 L1700 1000 Z"
          fill="url(#gold)"
        />
        <path
          d="M-300 850 C150 50 470 1100 790 410 S1400 -200 1700 200"
          fill="none"
          stroke="url(#edge)"
          strokeWidth="2"
        />
        <path
          d="M-300 1050 C170 200 520 1230 900 560 S1450 -50 1800 400 L1700 1200 Z"
          fill="#080b11"
          fillOpacity=".78"
        />
      </svg>
    </div>
  )
}
function SearchIcon() {
  return (
    <svg className="search-symbol" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function SearchBox({
  query = '',
  engine = 'bing',
  large = false,
  engineProgress = 1,
}: {
  query?: string
  engine?: string
  large?: boolean
  engineProgress?: number
}) {
  return (
    <div className={`search-box ${large ? 'search-large' : ''}`}>
      <Img
        src={staticFile(`${engine}.svg`)}
        style={nativeStyle({
          opacity: engineProgress,
          transform: `scale(${0.65 + engineProgress * 0.35}) rotate(${(1 - engineProgress) * -20}deg)`,
        })}
      />
      <span style={nativeStyle({ color: query ? '#f4f4ef' : '#a7a7ab' })}>
        {query || '搜索你想要的内容'}
      </span>
      <span className="search-action">
        <SearchIcon />
      </span>
    </div>
  )
}
function AppIcon({
  index,
  size = 55,
  glass = 0,
}: {
  index: number
  size?: number
  glass?: number
}) {
  return (
    <div
      className="app-icon"
      style={nativeStyle({
        width: size,
        height: size,
        borderRadius: size * 0.24,
        background: `linear-gradient(135deg,rgba(250,250,246,${1 - glass * 0.78}),rgba(212,213,215,${1 - glass * 0.88}))`,
        border: glass ? '1px solid #ffffff35' : undefined,
        boxShadow: glass ? '0 12px 25px #0003, inset 0 1px 0 #ffffff24' : undefined,
      })}
    >
      <Img
        src={staticFile(`${icons[index % icons.length]}.svg`)}
        style={nativeStyle({ width: size * 0.62, height: size * 0.62 })}
      />
    </div>
  )
}
function Dock() {
  return (
    <div className="dock">
      {icons.map((_, i) => (
        <AppIcon key={i} index={i} />
      ))}
    </div>
  )
}
function HomeUI({
  hue = 0,
  split = 0,
  moving = false,
}: {
  hue?: number
  split?: number
  moving?: boolean
}) {
  return (
    <div className="home-ui" style={nativeStyle({ transformStyle: 'preserve-3d' })}>
      <Wallpaper hue={hue} moving={moving} />
      <div className="home-tools">⌑ &nbsp; ⚙</div>
      <div
        className="clock-ui"
        style={nativeStyle({
          transform: `translateZ(${split * 190}px)`,
          color: '#fff2c1',
          filter: `hue-rotate(${hue}deg)`,
          textShadow: `0 ${split * 24}px ${split * 32}px #0009`,
        })}
      >
        <b>10:24</b>
        <div>2026年11月11日 星期日</div>
      </div>
      <div
        className="home-search"
        style={nativeStyle({
          transform: `translateZ(${split * 340}px) translateX(${-split * 90}px)`,
          boxShadow: `0 ${split * 35}px ${split * 50}px #0009`,
          borderRadius: 40,
        })}
      >
        <SearchBox />
      </div>
      <div className="home-quote" style={nativeStyle({ transform: `translateZ(${split * 60}px)` })}>
        「 把每一个平凡的日子，过成喜欢的样子。 」
      </div>
      <div
        className="home-dock"
        style={nativeStyle({
          transform: `translateZ(${split * 480}px) translateX(${-split * 170}px)`,
        })}
      >
        <Dock />
      </div>
    </div>
  )
}
function Window({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="window" style={style}>
      <div className="window-bar">
        <div className="traffic">
          <i />
          <i />
          <i />
        </div>
        <span>柠檬起始页</span>
        <span>＋</span>
      </div>
      {children}
    </div>
  )
}
function Opening() {
  const t = useTime()
  return (
    <Stage>
      <div
        className="opening-ring"
        style={nativeStyle({
          scale: tween(t, 0, 2.8, 0.45, 1.15),
          opacity: tween(t, 0, 0.8, 0, 0.8),
        })}
      />
      <div
        className="center"
        style={nativeStyle({
          transform: `scale(${interpolate(t, [2.55, 3], [1, 1.5], {
            ...clamp,
            easing: Easing.bezier(0.65, 0, 0.9, 0.35),
          })})`,
          opacity: interpolate(t, [2.8, 3], [1, 0], {
            ...clamp,
            easing: Easing.in(Easing.quad),
          }),
        })}
      >
        <Eyebrow>LEMON NEW TAB</Eyebrow>
        <Reveal size={238}>打开</Reveal>
        <div
          className="opening-sub"
          style={nativeStyle({
            opacity: tween(t, 0.9, 1.3, 0, 1),
            translate: `0 ${tween(t, 0.9, 1.6, 30, 0)}px`,
          })}
        >
          属于你的开始
        </div>
      </div>
    </Stage>
  )
}
function Hero() {
  const t = useTime()
  const float = interpolate(t, [0, 2.4], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.sin),
  })
  const phase = t * 1.8
  return (
    <Stage>
      <div className="hero-title">
        <Eyebrow>A FRESH START</Eyebrow>
        <Reveal size={84}>柠檬起始页</Reveal>
      </div>
      <div className="perspective">
        <Window
          style={nativeStyle({
            left: 260,
            top: 250,
            transform: `translateX(${Math.sin(phase * 0.8) * 2.5 * float}px) translateY(${tween(t, 0, 1.3, 230, 0) + Math.sin(phase) * 4 * float}px) rotateX(${tween(t, 0, 2.8, 22, 3) + Math.sin(phase * 0.85) * 0.3 * float}deg) rotateY(${tween(t, 0, 2.8, -32, -4) + Math.sin(phase * 0.7) * 0.4 * float}deg) rotateZ(${tween(t, 0, 2.8, -7, -1) + Math.sin(phase) * 0.15 * float}deg) scale(${tween(t, 0, 3.8, 0.78, 0.88)})`,
            opacity: tween(t, 0, 0.5, 0, 1),
          })}
        >
          <HomeUI />
        </Window>
      </div>
    </Stage>
  )
}
function SearchScene() {
  const t = useTime()
  const candidates = ['下一站，灵感', '下一站，新的想法', '下一站，更多可能']
  const candidateIndex = t < 2.25 ? 0 : t < 3.15 ? 1 : t < 4.15 ? 2 : 0
  const query =
    t < 1.35
      ? candidates[0].slice(0, Math.max(0, Math.floor((t - 0.6) * 7)))
      : candidates[candidateIndex]
  const engines = ['bing', 'google', 'duckduckgo', 'yandex']
  const engineStarts = [0, 1.8, 2.6, 3.4, 4.2]
  const engineIndex = engineStarts.filter((start) => t >= start).length - 1
  const engine = engines[engineIndex]
  const engineProgress =
    engineIndex === 0
      ? 1
      : tween(t, engineStarts[engineIndex], engineStarts[engineIndex] + 0.3, 0, 1)
  return (
    <Stage>
      <div className="scene-heading">
        <Eyebrow>FIND YOUR FLOW</Eyebrow>
        <div style={nativeStyle({ display: 'grid', overflow: 'hidden', paddingBottom: 14 })}>
          <div
            style={nativeStyle({
              gridArea: '1 / 1',
              transform: `translateY(${tween(t, 2.25, 2.65, 0, -110)}%)`,
              opacity: tween(t, 2.25, 2.55, 1, 0),
            })}
          >
            <Reveal size={104}>想找的</Reveal>
          </div>
          <div
            className="display"
            style={nativeStyle({
              gridArea: '1 / 1',
              fontSize: 104,
              transform: `translateY(${tween(t, 2.4, 2.95, 110, 0)}%)`,
              opacity: tween(t, 2.4, 2.8, 0, 1),
            })}
          >
            顺手就到
          </div>
        </div>
      </div>
      <div
        className="search-stage"
        style={nativeStyle({
          transform: `perspective(1800px) rotateY(${tween(t, 0, 1.3, -12, 0)}deg) translateY(${tween(t, 0, 1, 100, 0)}px)`,
          opacity: tween(t, 0, 0.4, 0, 1),
        })}
      >
        <SearchBox query={query} engine={engine} engineProgress={engineProgress} large />
        <div
          className="suggestions"
          style={nativeStyle({
            opacity: tween(t, 1, 1.4, 0, 1),
            translate: `0 ${tween(t, 1, 1.5, -20, 0)}px`,
          })}
        >
          {candidates.map((s, i) => {
            const start = [1.35, 2.25, 3.15][i]
            const end = [2.25, 3.15, 4.15][i]
            const active =
              tween(t, start, start + 0.22, 0, 1) -
              tween(t, end, end + 0.22, 0, 1) +
              (i === 0 ? tween(t, 4.15, 4.37, 0, 1) : 0)
            return (
              <div
                key={s}
                className="suggestion-row"
                style={nativeStyle({ background: `rgba(245,200,66,${active * 0.09})` })}
              >
                <span
                  className="suggestion-text"
                  style={nativeStyle({
                    translate: `${active * 24}px 0`,
                    color: active > 0.5 ? '#f4df9a' : '#b9bab9',
                  })}
                >
                  {s}
                </span>
              </div>
            )
          })}
        </div>
        <div className="engine-row">
          {engines.map((e, i) => (
            <div
              key={e}
              className={engine === e ? 'engine-active' : ''}
              style={nativeStyle({
                transform: `translateY(${-8 * (tween(t, engineStarts[i], engineStarts[i] + 0.3, 0, 1) - (i < engines.length - 1 ? tween(t, engineStarts[i + 1], engineStarts[i + 1] + 0.3, 0, 1) : 0))}px)`,
              })}
            >
              <Img src={staticFile(`${e}.svg`)} />
            </div>
          ))}
          <span>熟悉的搜索方式，随你选择</span>
        </div>
      </div>
    </Stage>
  )
}
function Navigation() {
  const t = useTime()
  const grid = tween(t, 0, 1.2, 1, 0)
  const launch = tween(t, 2.3, 3.2, 0, 1)
  const bookmarks = tween(t, 3.5, 4.2, 0, 1)
  return (
    <Stage>
      <div className="scene-heading">
        <Eyebrow>EVERYTHING WITHIN REACH</Eyebrow>
        <Reveal size={100}>常用的，就在眼前</Reveal>
      </div>
      <div
        className="nav-space"
        style={nativeStyle({
          transform: `perspective(1800px) rotateX(${tween(t, 0, 2, 18, 0)}deg) rotateY(${tween(t, 0, 2, -12, 0)}deg)`,
          transformOrigin: 'left center',
        })}
      >
        <div
          className="dock-tray"
          style={nativeStyle({ opacity: 1 - launch, scale: 1 - grid * 0.12 })}
        />
        {Array.from({ length: 7 }, (_, i) => {
          const dockX = 310 + i * 155
          const gridX = 350 + (i % 4) * 250
          const gridY = Math.floor(i / 4) * 230
          return (
            <div
              key={i}
              className="nav-icon"
              style={nativeStyle({
                left: dockX + (gridX - dockX) * Math.max(grid, launch),
                top: 120 + (gridY - 100) * Math.max(grid, launch),
                transform: `translateY(${tween(t, i * 0.055, 0.65 + i * 0.055, 260, 0)}px) scale(${1 + launch * 0.1})`,
              })}
            >
              <AppIcon index={i} size={100} glass={Math.max(grid, launch)} />
              <span style={nativeStyle({ opacity: launch })}>{labels[i]}</span>
            </div>
          )
        })}
      </div>
      <div className="nav-caption">
        <span className={t < 2.3 ? 'yellow' : ''}>Dock / Launchpad</span>
        <i />
        <span className={t >= 2.3 && t < 3.5 ? 'yellow' : ''}>快速导航</span>
        <i />
        <span className={t >= 3.5 ? 'yellow' : ''}>浏览器书签</span>
      </div>
      {t > 3.5 && (
        <div
          className="bookmark-card"
          style={nativeStyle({
            translate: `${(1 - bookmarks) * 650}px 0`,
            opacity: bookmarks,
            rotate: '-4deg',
          })}
        >
          <BookmarkPanel />
        </div>
      )}
    </Stage>
  )
}
function BookmarkPanel() {
  return (
    <>
      <div className="bookmark-title">
        <svg className="bookmark-title-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        我的书签
      </div>
      {['设计灵感', '开发工具', '稍后阅读', '常用网站'].map((name) => (
        <p className="bookmark-item" key={name}>
          {name}
        </p>
      ))}
    </>
  )
}
function SettingCard() {
  return (
    <div className="settings-card">
      <div className="settings-sidebar">
        <Img src={staticFile('lemon.svg')} />
        {['主题', '布局', '时钟', '搜索', '背景', '快速导航', 'Dock'].map((x, i) => (
          <div className={i === 0 ? 'settings-active' : ''} key={x}>
            {x}
          </div>
        ))}
      </div>
      <div className="settings-main">
        <b>主题</b>
        <div className="setting-section">
          <small>深色模式</small>
          <div className="mode-choices">
            <span>跟随系统</span>
            <span className="active">始终开启</span>
            <span>始终关闭</span>
          </div>
        </div>
        <div className="setting-section">
          <small>外观</small>
          <div className="setting-line">
            动态主题色 <i className="switch" />
          </div>
          <p>从壁纸中提取主题色</p>
          <div className="swatches">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="setting-line">
            全局色彩 <i className="switch switch--off" />
          </div>
        </div>
      </div>
    </div>
  )
}
function Personalize() {
  const t = useTime()
  const colorStart = 1.4
  const layoutStart = 3.5
  const titleStarts = [0, colorStart, layoutStart]
  const hue = interpolate(
    t,
    [0, colorStart, 1.65, 1.85, 2.1, 2.3, 2.55, 2.75, 3, 7],
    [0, 0, 65, 65, 165, 165, 235, 235, 300, 300],
    { ...clamp, easing: ease },
  )
  const split = tween(t, layoutStart, layoutStart + 1, 0, 1) - tween(t, 5.7, 6.8, 0, 1)
  return (
    <Stage tone={hue * 0.3}>
      <div className="personal-heading">
        <Eyebrow>MAKE IT YOURS</Eyebrow>
        <Reveal size={105}>
          你的
          <span style={{ display: 'inline-grid', overflow: 'hidden', verticalAlign: 'bottom' }}>
            {['壁纸', '颜色', '布局'].map((word, i) => {
              const enter = i === 0 ? 1 : tween(t, titleStarts[i], titleStarts[i] + 0.45, 0, 1)
              const exit =
                i === 2 ? 0 : tween(t, titleStarts[i + 1], titleStarts[i + 1] + 0.4, 0, 1)
              return (
                <span
                  key={word}
                  style={{
                    gridArea: '1 / 1',
                    transform: `translateY(${(1 - enter) * 110 - exit * 110}%)`,
                    opacity: enter * (1 - exit),
                  }}
                >
                  {word}
                </span>
              )
            })}
          </span>
        </Reveal>
      </div>
      <div className="perspective">
        <div
          style={nativeStyle({
            position: 'absolute',
            left: 520,
            top: 310,
            transformStyle: 'preserve-3d',
            transform: `scale(.79) rotateX(${tween(t, layoutStart + 0.1, layoutStart + 1.3, 3, 15) - tween(t, 5.6, 6.9, 0, 15)}deg) rotateY(${tween(t, 0, 1.3, -16, -9) + split * -17}deg) rotateZ(${-2 + split * 3}deg)`,
          })}
        >
          <HomeUI hue={hue} split={split} />
        </div>
      </div>
      <div
        style={nativeStyle({
          position: 'absolute',
          left: 150,
          top: 400,
          transform: `perspective(1800px) rotateY(12deg) rotateZ(-3deg) translateX(${tween(t, 0, 1, -400, 0) - tween(t, layoutStart - 0.2, layoutStart + 0.5, 0, 600)}px)`,
          opacity: tween(t, 0, 0.6, 0, 1) * (1 - tween(t, layoutStart - 0.2, layoutStart + 0.3, 0, 1)),
        })}
      >
        <SettingCard />
      </div>
      <div className="layer-label" style={nativeStyle({ opacity: split, left: 180, top: 500 })}>
        时钟
        <br />
        <span>搜索</span>
        <br />
        快速导航
      </div>
      <div className="small-bottom">动态取色 · 自定义布局 · 图片与视频壁纸</div>
    </Stage>
  )
}
function Calm() {
  const t = useTime()
  return (
    <AbsoluteFill className="stage">
      <div
        style={nativeStyle({
          position: 'absolute',
          inset: -30,
          transform: `scale(${1 + t * 0.01})`,
        })}
      >
        <Wallpaper moving />
      </div>
      <Grain />
      <div className="calm-clock" style={nativeStyle({ opacity: tween(t, 0, 0.6, 0, 1) })}>
        10:24
      </div>
      <div className="calm-title">
        <Reveal size={102}>好看，也自在</Reveal>
        <div style={nativeStyle({ opacity: tween(t, 0.8, 1.5, 0, 1) })}>
          「 把每一个平凡的日子，过成喜欢的样子。 」
        </div>
      </div>
      <div className="calm-dock">
        <Dock />
      </div>
    </AbsoluteFill>
  )
}
function Values() {
  const t = useTime()
  const n = t < 1.25 ? 0 : t < 2.5 ? 1 : 2
  const elapsed = t - [0, 1.25, 2.5][n]
  return (
    <Stage>
      <div className="values-index">0{n + 1} / 03</div>
      <div className="center">
        <Eyebrow>BUILT AROUND YOU</Eyebrow>
        <div
          className="value-word"
          style={nativeStyle({
            scale: tween(elapsed, 0, 0.55, 1.28, 1),
            opacity: tween(elapsed, 0, 0.15, 0, 1),
            filter: `blur(${tween(elapsed, 0, 0.25, 15, 0)}px)`,
          })}
        >
          {['本地优先', '无需额外账号', '完整开源'][n]}
        </div>
        <div className="value-detail">
          {
            [
              '核心设置与个性化内容，保存在浏览器中',
              '打开，就能开始',
              'AGPL-3.0 · 为喜欢它的人，一起变得更好',
            ][n]
          }
        </div>
      </div>
      <div
        className="value-line"
        style={nativeStyle({
          width: (n + tween(elapsed, 0, 0.5, 0, 1)) * 560,
        })}
      />
    </Stage>
  )
}
function Creator() {
  const t = useTime()
  return (
    <Stage>
      <div className="creator-copy">
        <Eyebrow>MADE FOR MY EVERYDAY. AND YOURS.</Eyebrow>
        <Reveal size={115}>不止为你</Reveal>
        <Reveal size={115} delay={0.65}>
          我自己<span className="yellow">也在用</span>
        </Reveal>
        <div className="signature" style={nativeStyle({ opacity: tween(t, 1.4, 2, 0, 1) })}>
          Redlnn <span>个人开发者</span>
        </div>
      </div>
      <div
        style={nativeStyle({
          position: 'absolute',
          left: 1040,
          top: 260,
          transform: `perspective(1800px) rotateY(-19deg) rotateZ(7deg) scale(.64) translateY(${tween(t, 0, 3, 60, 0)}px)`,
          transformOrigin: 'left center',
        })}
      >
        <Window>
          <HomeUI moving />
        </Window>
      </div>
    </Stage>
  )
}
function End() {
  const t = useTime()
  return (
    <Stage>
      <div
        className="end-center"
        style={nativeStyle({
          opacity: tween(t, 0, 0.55, 0, 1),
          translate: `0 ${tween(t, 0, 1, 70, 0)}px`,
        })}
      >
        <Img
          src={staticFile('lemon.svg')}
          className="end-logo"
          style={nativeStyle({ rotate: `${tween(t, 0, 1.1, -70, 0)}deg` })}
        />
        <div className="end-name">柠檬起始页</div>
        <div className="end-tagline">每一次打开，都更像你</div>
        <div className="end-url">
          lemon.redlnn.top <span>↗</span>
        </div>
        <div className="browsers">CHROME &nbsp; / &nbsp; EDGE &nbsp; / &nbsp; FIREFOX</div>
      </div>
    </Stage>
  )
}
function CutAccents() {
  const t = useTime()
  const cuts = [3, 7, 12, 17, 24, 28, 32, 36]
  const cut = cuts.find((c) => t > c - (c === 3 ? 0.4 : 0.18) && t < c + 0.23)
  if (cut === undefined) return null
  const lead = cut === 3 ? 0.4 : 0.18
  const p = (t - cut + lead) / (lead + 0.23)
  return (
    <AbsoluteFill style={nativeStyle({ pointerEvents: 'none', zIndex: 30 })}>
      <div
        style={nativeStyle({
          position: 'absolute',
          top: -200,
          bottom: -200,
          width: 450,
          left: interpolate(p, [0, 1], [-800, 2300]),
          transform: 'skewX(-18deg)',
          background: 'linear-gradient(90deg,transparent,#f5c84235,#fff6c875,transparent)',
          filter: 'blur(24px)',
        })}
      />
    </AbsoluteFill>
  )
}
export const LemonFilm = () => {
  const { fps } = useVideoConfig()
  const t = useTime()
  return (
    <FilmTimeContext.Provider value={t}>
      <AbsoluteFill
        className="film"
        style={nativeStyle({
          width: 1920,
          height: 1080,
        })}
      >
        <Sequence name="01 / 打开" durationInFrames={3 * fps} premountFor={fps}>
          <Opening />
        </Sequence>
        <Sequence
          name="02 / 柠檬起始页"
          from={3 * fps}
          durationInFrames={4 * fps}
          premountFor={fps}
        >
          <Hero />
        </Sequence>
        <Sequence name="03 / 搜索" from={7 * fps} durationInFrames={5 * fps} premountFor={fps}>
          <SearchScene />
        </Sequence>
        <Sequence name="04 / 快速导航" from={12 * fps} durationInFrames={5 * fps} premountFor={fps}>
          <Navigation />
        </Sequence>
        <Sequence name="05 / 个性化" from={17 * fps} durationInFrames={7 * fps} premountFor={fps}>
          <Personalize />
        </Sequence>
        <Sequence name="06 / 自在" from={24 * fps} durationInFrames={4 * fps} premountFor={fps}>
          <Calm />
        </Sequence>
        <Sequence
          name="07 / 本地与开源"
          from={28 * fps}
          durationInFrames={4 * fps}
          premountFor={fps}
        >
          <Values />
        </Sequence>
        <Sequence name="08 / 开发者" from={32 * fps} durationInFrames={4 * fps} premountFor={fps}>
          <Creator />
        </Sequence>
        <Sequence name="09 / 品牌收尾" from={36 * fps} durationInFrames={4 * fps} premountFor={fps}>
          <End />
        </Sequence>
        <Audio src={staticFile('bgm-dream-culture-even.mp3')} premountFor={fps} />
        <Audio src={staticFile('sound-design.wav')} volume={0.45} premountFor={fps} />
        <CutAccents />
      </AbsoluteFill>
    </FilmTimeContext.Provider>
  )
}
export const MyComposition = () => (
  <Composition
    id="Lemon-Launch"
    component={LemonFilm}
    durationInFrames={2400}
    fps={60}
    width={3840}
    height={2160}
  />
)
