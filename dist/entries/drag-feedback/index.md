# 拖拽的反馈 / Drag feedback

ID: drag-feedback
分类: 设计技巧
标签: 拖拽, 动效, 反馈

拿起、经过、落下，每一步都告诉用户下一步会发生什么。

## 来源媒体
- [视频 · @Kubai087](https://x.com/Kubai087/status/2115823717024735708)

## 解释（本站整理）
可用的拖拽排序需要区分被拿起的对象、当前落点和附近对象的避让。动效表达空间关系，而排序结果仍然由明确的数据顺序控制。

## 适用场景
任务排序、图标排列、播放队列和可自定义的列表。

## 怎么用
- 拿起时强化当前对象，并显示明确的落点。
- 让附近对象用轻微位移预示排序结果。
- 提供按钮或键盘替代、取消操作，并播报最终顺序。

## 应避免的问题
只支持鼠标拖动，或让排序动画改变命中区域，造成落点来回跳动。

## 作者原帖指令与提示词（@Kubai087）
Make drag-to-reorder in my product feel like this. Apply it to the lists,
rows and docks I name, and reuse any drag helper the project already has.

1. Cursor: a pointing hand over anything draggable, a grabbing hand while
   dragging.
2. Lift: the picked item follows the pointer, raised off the list so it
   never hides where it will land: above a horizontal row, or pulled aside
   and shrunk to about 90% in a vertical list. Its old slot closes up.
3. Drop hint: a faint, thin line in the gap where it will land (vertical in
   a row, horizontal in a list), about 15% of the text color. It grows from
   its middle when it appears and glides to each new gap. No line over the
   item's own slot.
4. Ripple: items on both sides of the line lean away from it. Counting n
   from the line (0 = the item touching it), item n moves
   A x 0.7^n (A is about 10px for icons, 8px for cards)
   and starts 24ms x n later, on a quick spring that barely overshoots and
   settles in about 0.25s. Nearer items move sooner and further, so the
   push spreads out like a ripple.
5. Drop: the item takes the gap and every item springs into its new place.
   Escape or dropping outside the list cancels, and everything springs back.
6. Give each motion its own curve (hand-like for the pointer, a small pop
   for the lift, springs for settling) instead of one ease-out everywhere.

Move things with transforms, not layout. Let the keyboard reorder too, and
with reduced motion keep only the line.

提示词原文：https://x.com/Kubai087/status/2115823717024735708

## 来源
- 原帖: https://x.com/Kubai087/status/2115823717024735708
- 作者: 枯白 Kubai (@Kubai087)
- 发布: 2026-10-29
- 读取方式: 已通过 FxTwitter 逐条读取原帖文本
- 预览接口: https://api.fxtwitter.com/Kubai087/status/2115823717024735708
- 收录时间: 2026-11-21
- 文本来自公开帖子预览。笔记解释由本站整理；提示词和媒体分别标注作者与出处。

笔记解释由本站整理。
