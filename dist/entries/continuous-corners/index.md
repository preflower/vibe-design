# 连续圆角 / Continuous corners

ID: continuous-corners
分类: 设计术语
标签: 超椭圆, CSS, 形状

让直边进入转角的过程更平顺，轮廓更柔和。

## 解释（本站整理）
普通圆角由直线接圆弧，连接处的曲率会发生跳变。连续圆角通过不同的曲线形状缓和这个变化。超椭圆是构建这类柔和轮廓的一种方法，并不代表任意参数都具备相同效果。

## 适用场景
应用图标、大型面板和需要柔和轮廓的容器。

## 怎么用
- 保留普通 border-radius 作为基础轮廓。
- 把 corner-shape 作为渐进增强，用 @supports 检测。
- 在目标浏览器检查实际轮廓，圆形和胶囊仍保留 round。

## 应避免的问题
把特定浏览器版本的兼容结论当作永久事实。本站用运行时能力检测，并展示明确的回退状态。

## 提示词（vibe-design 编写，非原帖摘录）
为指定容器添加连续圆角的渐进增强。先保留现有 border-radius，在 @supports 内设置 corner-shape。圆形与胶囊保持 round，并说明不支持时的回退外观。

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
- 收录时间: 2026-11-18
- 文本来自公开帖子预览。本站独立编写解释和示例，未重新发布原帖视频。

本站解释、示例和提示词为二次创作。
