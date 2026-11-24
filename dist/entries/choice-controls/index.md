# 选择控件的取舍 / Choice controls

ID: choice-controls
分类: 设计规范
标签: 表单, 开关, 复选框, 单选, 下拉菜单, 分段选择

先看选择何时生效，再看它是设置一个值，还是执行一个动作。

## 来源媒体
- [视频 · @Kubai087](https://x.com/Kubai087/status/2123217190052827633)

## 解释（本站整理）
在设置里拨动「允许通知」，用户预期它立即生效。表单里的订阅选项则可能要等保存后才生效。两者都只有选与不选两种状态，提交时机决定了控件给人的承诺。

## 适用场景
审查设置页、填写后统一提交的表单，以及工具栏里的下拉入口时。

## 怎么用
- 写下每个选择何时生效。独立且即时的开关项用 Switch，随表单保存的多选项用复选框。
- 区分值和动作。选语言后字段显示当前语言；选菜单里的「导出」则启动导出，入口名称保持原样。
- 比较选项数和长度。两到五个简短互斥项可平铺为分段选择；选项多或文字长时用下拉选择，必要时加入搜索和空状态。
- 需要同时展示所有候选项时，单选用 Radio，多选用复选框。若允许暂不决定，为单选题提供明确选项。

## 应避免的问题
把「开」和「关」做成两枚单选按钮，或让本应随表单保存的选择悄悄立即生效。

## 作者原帖指令与提示词（@Kubai087）
Review the choice controls in my product (switches, checkboxes, radio buttons, segmented controls, selects and dropdown menus) and decide for each one whether it is the right control. Diagnose first; change only what I approve, in my own code and components, without new dependencies.

1. Read the product
Find every place a person picks something, turns something on or off, or runs an action from a list. For each, note what it sets or does, how many options it has, how many can be picked, and whether it takes effect at once or on Save.

2. How to choose
a. Switch or checkbox: when it takes effect.
- Switch: takes effect the moment it is flipped (settings that save on their own, no Save button).
- Checkbox: one answer in a form, applied on Submit or Save.
- One thing on or off is one switch, never two radios (On / Off). If both sides have names of their own (Light / Dark), it is a choice of one: see (c).

b. Select or dropdown menu: a value or an action.
- Select: holds a value; after a pick the field shows it, and the picked option has a tick in the list.
- Dropdown menu: holds actions (Export, Duplicate, Delete). A pick runs it, the button keeps its name, and the result shows elsewhere. Menus go in page headers, toolbars and row ends, not among form fields. A split button pairs a main action with a menu of related ones (Send, with Send later and Save as draft beside it).
- Tabs switch to other content and set nothing; a segmented control sets a value or the view of the same content.

c. One of several: by the number of options.
- 2 to 5 short options: a segmented control.
- 2 to 5 that each need a line: radio buttons, stacked under the label.
- 6 or more, or labels that change or grow (names, dates, items people add): a select, so the layout never shifts.
- Hundreds (time zones, countries, people): a select with search, and a clear message when nothing matches.

d. Radio or checkbox: how many can be picked.
- Radio: exactly one, all options in view, as in a survey question. It can't be cleared once picked, so add a "none" option (Not sure yet) when that is a fair answer.
- Checkbox: any number, none included.
- Inside a select: a tick for one value, never radio circles; a checkbox before each option for several, with the picks shown as chips in the field.

3. Report before changing
Give me a table, one row per control: where, what it sets or does, the control now, the control it should be (or "right as it is"), why in one line, and anything else that changes (a Save button, a "none" option, an action moved out of a form). Flag every change in behaviour, ask about cases that could go either way, and wait for me to choose.

4. Change what I approve
Use my components, or the platform's own controls when I have none. Keep the values people already saved. Check that switches act at once and checkboxes on submit, selects show their value, menu buttons keep their name, and everything works by keyboard and screen reader.

提示词原文：https://x.com/Kubai087/status/2123219668165140511

## 来源
- 原帖: https://x.com/Kubai087/status/2123217190052827633
- 作者: 枯白 Kubai (@Kubai087)
- 发布: 2026-11-19
- 读取方式: 已通过 FxTwitter 逐条读取原帖文本
- 预览接口: https://api.fxtwitter.com/Kubai087/status/2123217190052827633
- 收录时间: 2026-11-24
- 文本来自公开帖子预览。笔记解释由本站整理；提示词和媒体分别标注作者与出处。

笔记解释由本站整理。
