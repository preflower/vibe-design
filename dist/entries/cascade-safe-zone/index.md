# 级联菜单安全区 / Menu aim

ID: cascade-safe-zone
分类: 设计技巧
标签: 菜单, 光标, 延时

给斜向移动的鼠标留一条进入子菜单的路。

## 来源媒体
- [视频 · @Kubai087](https://x.com/Kubai087/status/2114729985143677258)

## 解释（本站整理）
父菜单和子菜单横向分列时，指针可能斜穿过其他行。用指针前一位置与子菜单近侧两个角形成三角区，判断用户是否正在朝子菜单移动。Leyang 在作品复盘中举了一个例子：鼠标斜着移向子菜单时，让原菜单多等一下，指针就能穿过相邻行抵达目标。

## 适用场景
适合使用鼠标的桌面级联菜单。

## 怎么用
- 判断指针是否进入朝向子菜单的区域。
- 只在该区域内短暂延迟切换。
- 键盘用方向键进入与返回，触屏通过点击展开。

## 应避免的问题
把延时应用到所有路径，或把鼠标轨迹当作键盘操作的前置条件。

## 作者原帖指令与提示词（@Kubai087）
Define a cascading (nested) menu component that keeps its submenus steady: a safe zone plus three delays, so submenus open on purpose, survive diagonal moves toward them, and do not vanish on a brief slip out of the menu. If the project already has a menu or dropdown component, build this into its existing submenu logic and keep its API, keyboard support and accessibility as they are. Otherwise create one reusable CascadeMenu:

Props: an anchor (the trigger button that opens it on click) and a tree of items, each { label, icon?, href?, children? }. An item with children is a folder row; one without is a plain row that navigates on click.
Each level shows its folder's name as a small title above its rows.
Keyboard: arrow keys move through rows, Right/Enter opens a folder, Left goes back a level, Escape closes everything and returns focus to the anchor. Use menu / menuitem roles and aria-expanded on folder rows.
Behavior, with the values to use:

Open delay: hovering a row schedules it to take effect after 220ms: a folder row opens its submenu, a plain row closes any deeper submenu. Leaving the row before then cancels it. Touch input acts at once.
Safe zone: while a submenu is open, build a triangle from the pointer's previous position to the two corners of the submenu's near edge (the left edge's top and bottom for a submenu on the right). Track the last two pointermove positions and use the older one as the apex, so the triangle never collapses onto the current point. If the pointer is inside that triangle and within the parent's last min(90px, max(56px, 43% of the parent width)) toward the submenu, it is on its way there: rows it crosses must not highlight or open their own submenus.
Safe window: a row hovered inside the safe zone does not switch the submenu right away. Recheck every 80ms; switch once the pointer leaves the zone, or when 1200ms have passed since the hover began, so a pointer that simply stops there still gets its new submenu.
Close delay: when the pointer leaves the anchor, every open level and the safe zone, close the whole menu after 360ms. Coming back in time cancels the close. Clicking outside closes at once.
Dragging an item over a folder row opens it after 420ms instead of 220ms.
The pointer inside an open submenu ends all protection. Drive row highlight from component state (hovered, active, skipped), not from CSS :hover, or rows crossed inside the safe zone will still light up.
Geometry and motion:

Submenus open to the right, overlap their parent by 8px and align their first row with the parent row. Flip to the left when there is no room; the safe zone then uses the submenu's right edge.
Levels: 210-260px wide, sized to content, max height min(420px, 100vh - 24px) with their own scroll, 6px padding, 12px radius, 1px border, backdrop-filter blur(18px) saturate(135%).
Rows: 32px tall, 8px radius, 4px apart, 0 8px padding, 8px gap; 18px icon, 14px weight-500 label, a 16px chevron on folder rows. Level title: 11px, weight 600, quiet ink, padding 4px 8px 2px.
A submenu opens from its parent's edge: from translateX(-8px) scale(0.88, 0.98) and opacity 0, with opacity over 170ms and transform over 360ms on cubic-bezier(0.2, 1.45, 0.35, 1).
The root level opens the same way from its anchor: from translateY(-6px) scale(0.96, 0.86), top-left origin. Keep the overshoot curve: the slight spring is part of the feel.
A folder row's icon turns from a closed folder into an open one while its submenu is open, and back when it closes, over 460ms on cubic-bezier(0.22, 1, 0.36, 1). Morph the paths if the two glyphs share their structure; otherwise cross-fade them with a slight lift of the front panel.
Light and dark themes come from tokens, not separate components:

Light: surface rgba(255,255,255,.96), border rgba(0,0,0,.14), row ink #263140, row hover rgba(15,23,42,.07), quiet ink #7A8491, chevron #94A3B8, shadow 0 18px 34px rgba(15,23,42,.12), 0 2px 4px rgba(15,23,42,.05), inset 0 1px 0 rgba(255,255,255,.74).
Dark, neutral grays with no blue cast: surface rgba(34,34,34,.96), border rgba(255,255,255,.12), row ink #E4E4E4, row hover rgba(255,255,255,.08), quiet ink #9A9A9A, chevron #8A8A8A, shadow 0 18px 34px rgba(0,0,0,.42), 0 2px 4px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.06).
Monochrome brand icons invert in dark. Switching themes cross-fades colors, borders and shadows over about 500ms.
Keep every timing value as a named constant in one place, and keep the safe-zone math in a pure, unit-tested helper (point-in-triangle by the sign of the three edge cross products). Add an optional debug overlay that draws the zone (blue fill at 16%, dashed blue outline) and the running timer, off by default.

提示词原文：https://x.com/Kubai087/status/2114729985143677258

## 来源
- 原帖: https://x.com/Kubai087/status/2114729985143677258
- 作者: 枯白 Kubai (@Kubai087)
- 发布: 2026-10-26
- 读取方式: 已通过 FxTwitter 逐条读取原帖文本
- 预览接口: https://api.fxtwitter.com/Kubai087/status/2114729985143677258
- 收录时间: 2026-11-25
- 文本来自公开帖子预览。笔记解释由本站整理；提示词和媒体分别标注作者与出处。
- 相关来源: https://x.com/Kubai087/status/2124467225503645764

笔记解释由本站整理。
