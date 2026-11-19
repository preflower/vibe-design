# 嵌套圆角 / Nested radius

ID: nested-radius
分类: 设计规范
标签: 圆角, 布局, CSS

圆角也有秩序：让内外轮廓拥有同一个圆心。

## 来源媒体
- [视频 · @Kubai087](https://x.com/Kubai087/status/2115469767650021796)

## 解释（本站整理）
当一个圆角容器包住另一个元素时，内层圆角应随内缩距离变小。对于等距内缩的普通圆角，内圆角 r = 外圆角 R − 间距 p。这样转角处的留白才会与直边处一样均匀。

## 适用场景
表单、嵌套面板、图片容器，以及带有内层按钮的卡片。

## 怎么用
- 先确定外层圆角和内边距，再计算内层。
- 例如外层 32px、间距 12px，内层使用 20px。
- R 小于 p 时用 0 作为下限；圆形、胶囊形和不同形状需要单独判断。

## 应避免的问题
给所有层级套同一个大圆角。这个公式适用于等距内缩的圆弧，不能直接保证所有超椭圆轮廓的等距。

## 作者原帖指令与提示词（@Kubai087）
Make the corner radii in this UI consistent, then switch them to continuous corners. Work on the screen or components I name; ask me if I have not named them. If the project has radius tokens, change those instead of hard-coding values.

Inner radius = outer radius - padding (r = R - p)
Go from the outside in: dialog or card -> panels, inputs, buttons -> chips and tags. A box p inside a container with radius R gets R - p, so both corners share one center. Example: dialog 32, padding 16 -> panels and buttons 16; a chip 8 inside a 16 panel -> 8.
Boxes on the same level share one radius. Never go below 4.

Pills and circles stay fully round.
Keep every padding, gap and radius on a 4px grid.
Continuous corners
Keep border-radius and add the curve as progressive enhancement: @ supports (corner-shape: superellipse(1.25)) { :where(*) { corner-shape: superellipse(1.25); } } Set corner-shape: round on pills and circles.

Chrome and Edge 139+ render it; Safari and Firefox skip the block and show the plain border-radius.
When done, list every radius you changed as "element: old -> new".

提示词原文：https://x.com/Kubai087/status/2115469767650021796

## 代码示意
```css
.outer { border-radius: 32px; padding: 12px; }
.inner { border-radius: 20px; }
```

## 来源
- 原帖: https://x.com/Kubai087/status/2115469767650021796
- 作者: 枯白 Kubai (@Kubai087)
- 发布: 2026-10-28
- 读取方式: 已通过 FxTwitter 逐条读取原帖文本
- 预览接口: https://api.fxtwitter.com/Kubai087/status/2115469767650021796
- 收录时间: 2026-11-19
- 文本来自公开帖子预览。笔记解释由本站整理；提示词和媒体分别标注作者与出处。

笔记解释由本站整理。
