# AI Trend Note Archive Design System

## 0. Research Log

- Concrete references: the seven approved card-news covers in the workspace are the visual contract. The archive borrows their warm paper, charcoal type, pale coral, sky, butter, mint, and lilac accents without reproducing card artwork in the surrounding UI.
- Style reference: `minimalist-skill.md` for an editorial, low-chrome reading surface. The card image remains the main object.
- Interaction references: beui.dev `cylinder-carousel` source was reviewed for drag, arrow-key navigation, snap behavior, and reduced-motion handling. The archive uses the mechanism in a flat single-card viewer rather than the cylinder treatment. The `action-swap` source was reviewed for copy-button idle and completed states; this archive keeps the response restrained and swaps only the label and icon.
- Imagen and lazyweb were skipped because approved card art already provides a concrete visual reference.

## 1. Atmosphere & Identity

The archive should feel like a light weekly notebook that happens to be digital: calm, warm, and easy to return to. The signature is a quiet pastel index tab beside unframed card art. The website supports the cards and never competes with them.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---|---|
| Page | `--color-page` | `#f8f5ef` | Warm page background |
| Paper | `--color-paper` | `#fffdf9` | Navigation and card surfaces |
| Ink | `--color-ink` | `#2d2a28` | Headlines and primary text |
| Muted | `--color-muted` | `#6f6963` | Dates and supporting text |
| Line | `--color-line` | `#ded8cf` | Hairline dividers |
| Line strong | `--color-line-strong` | `#c9c0b6` | Focused separators |
| Coral | `--color-coral` | `#f1aeb9` | Weekly filter and selected state |
| Sky | `--color-sky` | `#cfe6f3` | Model and product tags |
| Butter | `--color-butter` | `#f7e7a9` | Research tags |
| Mint | `--color-mint` | `#cfe8d7` | Korean AI tags |
| Lilac | `--color-lilac` | `#ddd4ee` | Security and agent tags |
| Focus | `--color-focus` | `#665d91` | Keyboard focus ring |
| White | `--color-white` | `#ffffff` | Button contrast |

Rules: page chrome uses paper and charcoal; pastel colors mark categories and selection only. No dark mode, gradients, neon, or heavy blocks.

## 3. Typography

Primary stack: `Apple SD Gothic Neo`, `Pretendard`, `Noto Sans KR`, system sans-serif. No remote font request.

| Level | Token | Size | Weight | Line height | Usage |
|---|---|---:|---:|---:|---|
| Display | `--type-display` | `clamp(2.25rem, 6vw, 4.5rem)` | 800 | 1.04 | Archive title |
| Page title | `--type-title` | `clamp(1.75rem, 3vw, 2rem)` | 800 | 1.15 | News title |
| Section | `--type-section` | `clamp(1.35rem, 2.5vw, 1.75rem)` | 750 | 1.25 | Section title |
| Card title | `--type-card` | `clamp(1.1rem, 2vw, 1.35rem)` | 750 | 1.35 | Archive tile title |
| Lead | `--type-lead` | `clamp(1rem, 1.8vw, 1.15rem)` | 450 | 1.75 | Page introduction |
| Body | `--type-body` | `1rem` | 450 | 1.7 | Default body |
| Small | `--type-small` | `0.875rem` | 500 | 1.55 | Metadata |
| Label | `--type-label` | `0.75rem` | 750 | 1.4 | Category labels |

Korean phrases may not break inside a word. Use balanced wrapping for archive headings, `text-wrap: pretty` for news titles, and `word-break: keep-all` throughout.

## 4. Spacing & Layout

Base unit: 4px.

| Token | Value |
|---|---:|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |

Card composition tokens use container-query units so the exported 4:5 sheet and the responsive viewer share one geometry: `--card-copy-panel-height` is 86cqw for a standard story, `--card-copy-panel-height-compact` is 102cqw, and `--card-footer-mask-height` is 8cqw.

Maximum archive width is 1184px. Mobile and tablet gutters are 16px; the maximum width creates wider outer margins on large screens. The home grid is one column through 640px, two columns through 900px, and three columns above 900px.

The detail page starts with a viewport-aware Reader Stage. Its toolbar, card, controls, and direct selectors fit within the initial dynamic viewport on common portrait mobile, tablet, and desktop screens. The card is at most 680px wide and may shrink according to viewport height. On screens wider than 960px, the card sits beside a 320–360px news summary. Below that width, the card comes first and the summary follows it. The document remains the only vertical scroll owner; the carousel track and selector rail own horizontal movement only.

## 5. Components

### Site Header
- Structure: home link, short description, category navigation.
- States: default, hover, focus, current section.
- Accessibility: semantic header and nav; 44px minimum control height.
- Motion: color and underline opacity only.

### Filter Bar
- Structure: four filter buttons and a labelled search field. `모델 소식`은 새로 공개되거나 출시된 AI 모델 하나를 중심으로 다룬 기사에만 사용한다. 모델이 일부 언급되더라도 제품·사건·보안 분석이 중심이면 `짧막 뉴스`에 둔다.
- States: default, hover, selected, focus, empty result.
- Accessibility: pressed state via `aria-pressed`; search has a visible label; 44px targets.
- Motion: selected background fades over the standard duration.

### Archive Tile
- Structure: 4:5 cover image, category/date, title, summary, tags, link.
- Variants: weekly, brief, model. Existing URLs remain unchanged when an older brief is reclassified as model news.
- States: default, hover, focus.
- Accessibility: one descriptive link per tile; image has exact dimensions and informative alt text.
- Motion: image translates upward 4px on hover; reduced-motion removes the translation.

### Card Viewer
- Structure: compact toolbar, scroll-snap track, slide figures, previous/next buttons, page counter, keyboard hint, direct selector rail.
- States: first, middle, last, dragging, focus, reduced motion.
- Accessibility: swipe, ArrowLeft, ArrowRight, Space, Home, End; live counter; 44px controls; no control overlays the card image.
- Motion: native swipe and scroll use snap; direct controls move immediately so artwork, counter, and selector stay in sync.

### Editorial Card Overlay
- Structure: the approved artwork remains the background layer. A warm translucent upper paper panel carries eyebrow, title, short body copy, and one closing label as live HTML text; the lower and right artwork windows keep the original illustration, logo, or diagram visible. A strongly blurred, low-opacity crop from the lower illustration sits inside the paper so color and shape remain faintly visible without reviving the old raster copy.
- Typography: model and product names use the primary sans stack at 800 weight; specifications sit one step below; explanations use the smallest readable card size. Thin rules and spacing separate multiple items.
- Variants: cover and standard story use an `84cqw` paper width. Compact, model-list, and evidence-chart cards retain `92cqw` so dense copy stays readable. All variants share the same paper opacity, blur, border, radius, and shadow tokens.
- Accessibility: meaningful card copy stays selectable and readable by assistive technology. Decorative background artwork uses an empty alt when the same information is present in the live text layer.
- Export: the browser composition remains the source of truth and can be captured at 1080×1350 for messenger or image sharing.
- Archive rule: every archived detail card uses the same live text layer over a text-free watercolor background. Seven shared subjects—security, models, research, coding, media, robotics, and productivity—may repeat when the news topic matches, while article-list thumbnails keep their original cover art. The source background must never contain readable copy. The content-led warm-paper panel leaves the right and lower watercolor visible and uses one restrained accent color per card.
- Evidence chart variant: one cited chart or document excerpt may sit inside the paper panel with a visible source caption. The media uses `object-fit: contain`, keeps its original aspect ratio, and never replaces the card title or written explanation.
- Solar Pro 4 detail: the last card places the full supplied Artificial Analysis chart inside the paper at its original wide aspect ratio; a pair of cropped bars is not an acceptable substitute. On a small screen, the chart is followed by readable `Solar Pro 4 42점` and `Solar Pro 3 14점` labels.

### Reader Stage
- Structure: archive back-link, category/date/card count, share action, Card Viewer, and news summary.
- Responsive order: desktop pairs the viewer with the summary; mobile and tablet show the complete first card before the title and summary.
- Height rule: the first card must be visible without scrolling on common portrait viewports. The image width responds to both container width and dynamic viewport height.
- Accessibility: one document scroll owner; no sticky or fixed element may cover card artwork; every toolbar control is at least 44px.
- Surface: a restrained paper field and one pastel index strip support the image without imitating the artwork.

### Card Detail Panel
- Structure: active card number/category, active card title, one short explanatory paragraph, up to two compact key points, and one to three card-specific source links.
- Fallback: cards without authored details continue to show the news-level title, summary, and tags.
- States: default news summary and active-card detail; content changes with the Card Viewer position.
- Hierarchy: typography, spacing, and hairline dividers do the grouping. Source type badges share one restrained treatment; the panel does not repeat the card artwork's multiple pastel colors.
- Accessibility: the panel is a polite live region, preserves the page heading id when content changes, and keeps external link purpose visible.
- Responsive order: desktop keeps the panel beside the card; mobile and tablet place it after the complete card viewer.
- Height rule: on desktop the complete panel must fit inside the Reader Stage's initial viewport. It uses compact source rows and never pushes its final link below the visible stage.

### News Navigation
- Structure: previous news, archive link, next news.
- States: present, missing end item, hover, focus.
- Accessibility: actual links with the destination title in the accessible name.
- Motion: background-color only.

### Related News
- Structure: up to three archive tiles chosen by shared tags.
- States: one to three results; omitted only when no related item exists.
- Accessibility: section heading and clear link purpose.

### Source List
- Structure: heading and external links.
- States: default, hover, focus.
- Accessibility: links include the source name; external target is stated visually.

### Share Button
- Structure: copy icon, short label, and the canonical URL stored in `data-copy-url`.
- Placement: below a news summary on archive tiles and in the detail Reader Stage toolbar; never over card artwork.
- States: idle, copied, failed, focus.
- Accessibility: semantic button with a 44px minimum target; status text uses a polite live region.
- Motion: label and icon state change without layout movement; reduced motion requires no alternate treatment.

## 6. Motion & Interaction

| Token | Duration | Easing | Usage |
|---|---:|---|---|
| `--motion-micro` | 120ms | ease-out | Button press |
| `--motion-standard` | 180ms | cubic-bezier(0.22, 1, 0.36, 1) | Hover and filter state |
| `--motion-scroll` | native scroll | browser | Swipe and track movement |

Only `transform`, `opacity`, background-color, and color transition. The viewer tracks pointer/touch through native horizontal scroll and scroll snap. No autoplay. `prefers-reduced-motion: reduce` disables smooth scroll and decorative movement.

## 7. Depth & Surface

Strategy: borders with one restrained paper shadow for the large card image only. Archive tiles use a 1px line and no shadow. The card viewer may use `0 16px 48px rgba(57, 47, 39, 0.10)` to separate the physical-looking sheet from the page; no nested shadow stacks.

## 8. Accessibility Constraints & Accepted Debt

Target WCAG 2.2 AA. Body contrast is at least 4.5:1; large type at least 3:1. Every interactive target is at least 44×44px, has a visible focus ring, and is reachable by keyboard. Card images never sit behind controls. Headings use natural Korean wrapping. Image dimensions are declared to avoid layout shift. No accepted accessibility debt at launch.
