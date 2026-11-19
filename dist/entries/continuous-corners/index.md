# 连续圆角 / Continuous corners

ID: continuous-corners
分类: 设计规范
标签: 超椭圆, CSS, 形状

在设计规范里约定哪些组件使用连续圆角，让同类组件在各页面保持相同的轮廓。

## 来源媒体
- [视频 · @Kubai087](https://x.com/Kubai087/status/2115469767650021796)

## 解释（本站整理）
普通圆角由直线接圆弧，连接处的曲率会发生跳变。连续圆角通过不同的曲线形状缓和这个变化。超椭圆是构建这类柔和轮廓的一种方法，并不代表任意参数都具备相同效果。

## 适用场景
应用图标、大型面板和需要柔和轮廓的容器。

## 怎么用
- 先约定采用连续圆角的组件，例如大面板；这些组件共用同一曲线，并保留普通圆角作为回退。
- 把 corner-shape 作为渐进增强，用 @supports 检测。
- 在目标浏览器检查实际轮廓，圆形和胶囊仍保留 round。

## 应避免的问题
把特定浏览器版本的兼容结论当作永久事实。本站用运行时能力检测，并展示明确的回退状态。

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
.shape { border-radius: 32px; }
@supports (corner-shape: superellipse(1.25)) {
  .shape { corner-shape: superellipse(1.25); }
}
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
