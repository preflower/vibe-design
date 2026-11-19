import originalPrompts from './original-prompts.json' with { type: 'json' };
import { expandedEntries } from './expanded.mjs';
import { sources, series } from './sources.mjs';
export { sources, series, coverage } from './sources.mjs';

export const updated = '2026-11-19';
export const origin = 'https://vibe-design.carefulgardenia8.chatgpt.site';
export const topics = { all:'全部内容', layout:'布局与排版', visual:'视觉表现', components:'交互模式', feedback:'交互反馈', motion:'动效设计', system:'设计系统与规范' };
export const topicHints = {
  layout:'页面怎么排，标题和正文怎么分层',
  visual:'外观怎么做，怎样表现光影和材质',
  components:'怎样展开内容、浏览章节或操作多级菜单',
  feedback:'操作后怎么反馈，让人知道进度和结果',
  motion:'元素怎么动，展开和退出怎样衔接',
  system:'怎样让不同页面遵循同一套规则，包括字号、间距、组件选用和状态表达'
};
export const categories = { all: '全部内容', term: '设计术语', style: '设计风格', guideline: '设计规范', technique: '设计技巧' };
export const entries = [
  {
    id: 'nested-radius', topic: 'system', title: '嵌套圆角', english: 'Nested radius', category: 'guideline', visual: 'radius', source: 's004', tags: ['圆角','布局','CSS'],
    summary: '圆角也有秩序：让内外轮廓拥有同一个圆心。',
    definition: '当一个圆角容器包住另一个元素时，内层圆角应随内缩距离变小。对于等距内缩的普通圆角，内圆角 r = 外圆角 R − 间距 p。这样转角处的留白才会与直边处一样均匀。',
    when: '表单、嵌套面板、图片容器，以及带有内层按钮的卡片。',
    steps: ['先确定外层圆角和内边距，再计算内层。','例如外层 32px、间距 12px，内层使用 20px。','R 小于 p 时用 0 作为下限；圆形、胶囊形和不同形状需要单独判断。'],
    avoid: '给所有层级套同一个大圆角。这个公式适用于等距内缩的圆弧，不能直接保证所有超椭圆轮廓的等距。',
    prompt: '检查我指定组件的嵌套圆角。先读取现有圆角与间距 token；对等距内缩的普通圆角使用 r = max(0, R - p)。保留圆形和胶囊形语义，逐项报告计算依据与修改前后的数值。',
    code: '.outer { border-radius: 32px; padding: 12px; }\n.inner { border-radius: 20px; }', related: ['continuous-corners','spacing-scale','design-tokens']
  },
  {
    id: 'design-tokens', topic: 'system', title: '设计变量', english: 'Design tokens', category: 'term', visual: 'tokens', source: 'system', tags: ['系统','一致性','变量'],
    summary: '为颜色、间距和圆角命名，让设计拥有共同的词汇。',
    definition: 'Design Token 是具有名字的设计决策，例如 surface、text-muted、space-4。组件引用名字，而不是各自写一套数值。修改一个语义变量，可以让相关组件保持一致。',
    when: '同一种颜色、间距或状态在多个组件里反复出现时。',
    steps: ['先收集界面中实际重复的值。','区分原始数值与用途名称，例如紫色与主要操作色。','让组件引用用途名称，再检查交互状态是否完整。'],
    avoid: '只把每一个硬编码数值改成变量，却仍然留下数十个含义相同的名字。',
    prompt: '审查当前页面重复的颜色、间距、圆角与字体样式。复用现有变量，合并语义相同的值，给出最小 token 集及组件引用关系；检查悬停、焦点、禁用与错误状态。',
    code: ':root {\n  --space-3: 12px;\n  --radius-control: 8px;\n  --color-action: oklch(0.5 0.2 295);\n}\n.button { border-radius: var(--radius-control); }', related: ['spacing-scale','semantic-components']
  },
  {
    id: 'skeuomorphism', topic: 'visual', title: '拟物设计', english: 'Skeuomorphism', category: 'style', visual: 'skeuo', source: 'skeuo', tags: ['材质','光影','层次'],
    summary: '用真实世界的光、边缘和材质，解释一个数字物件。',
    definition: '拟物设计借用实体物件的外观线索，让数字界面具有可感知的材质和层次。本站从 Kubai 对 Portrait 界面的点评出发，演示描边、浅渐变和光影怎样共同建立体积。',
    when: '需要触感的播放器、工具按钮、仪表或具有鲜明性格的小型界面。',
    steps: ['先确定统一光源，所有明暗遵守同一方向。','用细描边明确边界，用低强度渐变交代曲面。','保留足够的文字对比度，让操作含义优先于装饰。'],
    avoid: '每个元素都使用厚重投影和高光，造成多个互相冲突的光源。',
    prompt: '为指定控件增加克制的拟物质感。沿用现有尺寸和语义，统一上方光源，用细边缘、轻微表面渐变与接触阴影区分层次。给出普通、按下和键盘焦点状态。',
    related: ['holographic','design-tokens']
  },
  {
    id: 'continuous-corners', topic: 'visual', title: '连续圆角', english: 'Continuous corners', category: 'term', visual: 'corners', source: 's004', tags: ['超椭圆','CSS','形状'],
    summary: '让直边进入转角的过程更平顺，轮廓更柔和。',
    definition: '普通圆角由直线接圆弧，连接处的曲率会发生跳变。连续圆角通过不同的曲线形状缓和这个变化。超椭圆是构建这类柔和轮廓的一种方法，并不代表任意参数都具备相同效果。',
    when: '应用图标、大型面板和需要柔和轮廓的容器。',
    steps: ['保留普通 border-radius 作为基础轮廓。','把 corner-shape 作为渐进增强，用 @supports 检测。','在目标浏览器检查实际轮廓，圆形和胶囊仍保留 round。'],
    avoid: '把特定浏览器版本的兼容结论当作永久事实。本站用运行时能力检测，并展示明确的回退状态。',
    prompt: '为指定容器添加连续圆角的渐进增强。先保留现有 border-radius，在 @supports 内设置 corner-shape。圆形与胶囊保持 round，并说明不支持时的回退外观。',
    code: '.shape { border-radius: 32px; }\n@supports (corner-shape: superellipse(1.25)) {\n  .shape { corner-shape: superellipse(1.25); }\n}', related: ['nested-radius']
  },
  {
    id: 'spacing-scale', topic: 'system', title: '间距体系', english: 'Spacing scale', category: 'guideline', visual: 'spacing', source: 'system', tags: ['间距','布局','亲密性'],
    summary: '距离表达关系。相关的靠近，不相关的留出呼吸。',
    definition: '间距体系是一组有限、重复使用的距离。4px 可以作为基础单位，但真正决定距离的是信息之间的关系：标签和输入框更近，两组表单更远，页面章节之间最远。',
    when: '页面间距零碎、分组模糊，或多个组件看起来来自不同系统时。',
    steps: ['从 4、8、12、16、24、32、48 等数值中选出够用的一组。','先确定信息分组，再分配组内与组间距离。','结合文字行高检查视觉留白，而不是只看盒模型。'],
    avoid: '把所有 gap 都统一成同一个值，导致标题、段落和不同分组失去层次。',
    prompt: '根据页面的信息关系整理间距。复用现有 spacing token；没有体系时以 4px 为基础建立最小刻度。区分组内、组间与章节距离，说明每次调整服务于哪一层信息关系。',
    related: ['design-tokens','nested-radius','alignment']
  },
  {
    id: 'continuity', topic: 'motion', title: '界面连续性', english: 'UI continuity', category: 'guideline', visual: 'continuity', source: 's015', secondarySources: ['continuity','menuAnchor'], tags: ['动效','状态','交互'],
    summary: '状态变了，用户仍然知道自己刚刚操作了什么。',
    definition: '界面连续性让用户在状态切换时保留对元素身份、位置和关系的理解。例如按钮展开成菜单时，菜单从触发位置生长出来，比远处突然出现一个面板更容易追踪。',
    when: '菜单、抽屉、手风琴、详情展开，以及其他会改变空间关系的交互。',
    steps: ['识别状态变化前后仍然属于同一个对象的元素。','菜单在按钮下方打开时，让缩放原点靠近按钮。若菜单翻到按钮上方，原点也移到菜单下缘。','检查周围内容的变化，并提供减少动态效果的版本。'],
    avoid: '把所有出现和消失都处理成淡入淡出，或者为了过渡延迟用户操作。',
    prompt: '检查指定流程的状态切换，找出丢失空间锚点和对象身份的位置。优先用 transform 与 opacity 建立短而可打断的过渡，处理快速反复操作与 reduced-motion。',
    related: ['book-reveal','drag-feedback','toast']
  },
  {
    id: 'toast', topic: 'feedback', title: '轻提示', english: 'Toast', category: 'term', visual: 'toast', source: 's016', tags: ['反馈','提示','交互'],
    summary: '告诉用户「刚才的操作有结果了」，然后轻轻离开。',
    definition: 'Toast 是与当前操作紧密相关的短暂反馈，例如复制完成。它通常自动消失，可以附带撤销入口。对用户必须处理的问题，应使用持续可见的提示，而不是让信息随 Toast 一起消失。',
    when: '保存完成、复制成功，以及无需持续处理的操作结果。',
    steps: ['用一句简短文案明确发生了什么。','非紧急反馈通过 status 区域礼貌播报。','关键撤销操作提供足够时间，并考虑持久入口。'],
    avoid: '用短暂提示承载无法恢复的错误、必填问题或用户必须阅读的重要信息。',
    prompt: '逐条检查当前操作反馈。只把短暂且无需继续处理的结果用作 Toast；必须解决的错误留在对应字段附近。实现礼貌播报，避免抢走键盘焦点。',
    related: ['notification','semantic-components']
  },
  {
    id: 'notification', topic: 'feedback', title: '通知', english: 'Notification', category: 'term', visual: 'notification', source: 's016', tags: ['反馈','信息','状态'],
    summary: '事情值得你知道，但不一定值得打断你。',
    definition: '通知可以由系统事件或他人的动作触发，与当前操作不一定直接相关。这里讨论的是产品内通知：消息会保留到用户处理或关闭，必要时可以在通知中心再次找到。',
    when: '协作消息、后台任务完成，以及可以稍后查看的系统动态。',
    steps: ['说明事件主体、发生了什么，以及可以采取的行动。','把关闭、已读和已处理作为不同状态设计。','重要消息提供可回看的位置，限制重复打扰。'],
    avoid: '把所有消息都变成弹窗，或者把产品内通知与浏览器系统通知的权限混为一谈。',
    prompt: '整理产品中的异步消息，区分产品内通知与系统通知。对需要保留的事件提供关闭、已读和回看方式，明确哪些消息值得主动打扰用户。',
    related: ['toast','progressive-disclosure']
  },
  {
    id: 'holographic', topic: 'visual', title: '镭射质感', english: 'Holographic', category: 'technique', visual: 'holo', source: 's018', tags: ['光影','3D','材质'],
    summary: '把角度变成颜色，让一张卡片像真实藏品。',
    definition: '界面中的镭射效果通过随观察角度变化的色彩与高光，模拟全息箔材质。Kubai 的卡片案例把倾斜、亮边和深度层次组合在一起。',
    when: '数字门票、纪念卡、收藏卡和需要被特别看见的物件。',
    steps: ['先建立稳定的底色和清晰内容，再添加色彩层。','让高光跟随指针，控制倾斜幅度。','给触屏和键盘用户可用的替代交互，减少动态时保持静态。'],
    avoid: '让反光覆盖关键信息，或在大面积阅读区域持续自动晃动。',
    prompt: '为指定纪念卡实现 CSS 镭射材质，保留文字对比度。让反光位置随指针变化，倾斜不超过 12 度，并为键盘、触屏与 reduced-motion 提供等效可用状态。',
    related: ['skeuomorphism','continuity']
  },
  {
    id: 'ascii', topic: 'visual', title: '字符艺术', english: 'ASCII art', category: 'style', visual: 'ascii', source: 's003', secondarySources: ['ascii'], tags: ['字符','复古','图像'],
    summary: '用有限的字符密度，重建图像的明暗和轮廓。',
    definition: '字符艺术用字形代替像素。把图像切成采样格，再根据每格亮度选择疏密不同的字符，就能保留轮廓。原帖第 003 期说明了字符采样，并提供可调参数。Kubai 另转引 @imperry 的首页动画作为应用案例。',
    when: '实验性个人站、技术主题视觉，以及少量具有性格的装饰。',
    steps: ['先选择清晰、明暗对比明确的素材。','用等宽字体并补偿字符格的宽高比例。','让画面保持装饰语义，提供文本说明与静态版本。'],
    avoid: '用字符图替代正文、持续刷新大面积 DOM，或让屏幕阅读器逐字朗读图案。',
    prompt: '将我提供且有权使用的素材转换为字符画。按亮度采样字符，保持等宽布局和原始比例；图案标记为装饰并提供文本描述。动画仅在可见时运行，减少动态时显示静帧。',
    related: ['book-reveal','typography-scale']
  },
  {
    id: 'alignment', topic: 'layout', title: '对齐的秩序', english: 'Alignment', category: 'guideline', visual: 'alignment', source: 'type', tags: ['对齐','布局','排版'],
    summary: '先建立一条共同的线，信息就有了可以依靠的骨架。',
    definition: '对齐给元素建立共同的边缘或基线。列表里的标题、说明与操作如果共享稳定的对齐规则，读者就能更快地扫读和比较。这是本站对原帖排版建议的延伸讲解。',
    when: '列表、表单、多列内容和文字层级繁多的界面。',
    steps: ['找出属于同一层级或同一组的元素。','为它们选择统一的左边缘、中心线或文字基线。','检查图标形状带来的视觉偏差，需要时进行少量光学校正。'],
    avoid: '把不同关系的信息强行居中，或只看几何坐标忽略文字与图形的视觉重量。',
    prompt: '检查指定页面的对齐关系。按信息层级和分组识别共同边缘与文字基线，修正无意义的偏移；对图标单独检查视觉重心，解释必要的光学校正。',
    related: ['typography-scale','spacing-scale']
  },
  {
    id: 'typography-scale', topic: 'system', title: '字号与层级', english: 'Type scale', category: 'guideline', visual: 'type', source: 'type', tags: ['字体','排版','层级'],
    summary: '用有限的文字角色，让重要的先被看见。',
    definition: '字号体系把标题、正文、标签和辅助信息分配到有限的文字角色。层级由字号、字重、行高和空间共同建立，不能只靠把所有标题放大。本站将原帖的字号建议整理为实践步骤。',
    when: '页面字号过多、标题与正文难区分，或辅助文字喧宾夺主时。',
    steps: ['先列出文字的角色，再确定角色需要的视觉权重。','参考适合自己内容密度的成熟产品，建立少量可复用样式。','用真实中文、英文与长标题检查换行和行高。'],
    avoid: '机械照搬其他产品的像素数值，或通过过小、过淡的文字制造所谓高级感。',
    prompt: '审查页面的文字角色，整理标题、正文、标签与辅助说明的字号、字重和行高。保留最小必要层级，以真实的中英文长内容检查可读性和换行。',
    related: ['alignment','design-tokens']
  },
  {
    id: 'progressive-disclosure', topic: 'components', title: '渐进披露', english: 'Progressive disclosure', category: 'technique', visual: 'disclosure', source: 'system', tags: ['文案','认知负担','交互'],
    summary: '先给足以开始的信息，再让细节在需要时出现。',
    definition: '渐进披露把低频细节放到后续层级，让当前任务保持清楚。本站从原帖关于说明文案的建议延伸这一概念：关键操作条件必须可见，补充背景则可以按需展开。',
    when: '高级设置、补充说明和低频选项占据了主要任务区域时。',
    steps: ['分清开始任务前必须知道的信息与补充背景。','把后者放到含义明确的展开入口中。','确保键盘与触屏都能打开，并保留展开后的阅读位置。'],
    avoid: '把费用、限制、错误原因等关键决策信息藏在 tooltip 里。',
    prompt: '按用户完成当前任务所需的信息整理文案。保留影响决策与操作的关键条件，将低频背景放入可访问的展开区域。不要把重要信息放进仅悬停可见的提示。',
    related: ['notification','semantic-components']
  },
  {
    id: 'drag-feedback', topic: 'feedback', title: '拖拽的反馈', english: 'Drag feedback', category: 'technique', visual: 'drag', source: 's005', tags: ['拖拽','动效','反馈'],
    summary: '拿起、经过、落下，每一步都告诉用户下一步会发生什么。',
    definition: '可用的拖拽排序需要区分被拿起的对象、当前落点和附近对象的避让。动效表达空间关系，而排序结果仍然由明确的数据顺序控制。',
    when: '任务排序、图标排列、播放队列和可自定义的列表。',
    steps: ['拿起时强化当前对象，并显示明确的落点。','让附近对象用轻微位移预示排序结果。','提供按钮或键盘替代、取消操作，并播报最终顺序。'],
    avoid: '只支持鼠标拖动，或让排序动画改变命中区域，造成落点来回跳动。',
    prompt: '完善指定列表的排序反馈。复用现有拖拽实现，区分拿起、落点、提交与取消。用 transform 表现位移，并提供键盘上下移动、Esc 取消和排序结果播报。',
    related: ['continuity','semantic-components']
  },
  {
    id: 'book-reveal', topic: 'motion', title: '翻页式展开', english: 'Book reveal', category: 'technique', visual: 'book', source: 's006', tags: ['动效','3D','卡片'],
    summary: '把预览藏在封面之后，用翻开这个动作表达更多内容。',
    definition: '翻页式展开把卡片分成封面与内页，以书脊为转轴产生层次。封面先动、内页随后展开，形成内容藏在物件内部的空间暗示。',
    when: '书籍、文档、作品集与具有真实预览内容的卡片。',
    steps: ['把可点击区域固定在静止的外层。','页面用不同角度与短延迟依次展开。','键盘焦点也能预览，触屏第一次点击仍完成主要操作。'],
    avoid: '让封面移动时命中区域也跟着移动，或在减少动态模式里仍然大幅旋转。',
    prompt: '为指定卡片加入翻页预览，保持外层命中区域与布局不变。封面和内页按层次用 transform 展开，兼容键盘焦点；触屏主要操作不增加额外点击，减少动态时显示静态预览。',
    related: ['continuity','ascii','skeuomorphism']
  },
  {
    id: 'semantic-components', topic: 'system', title: '按语义选组件', english: 'Semantic components', category: 'guideline', visual: 'semantic', source: 'system', tags: ['组件','语义','UX'],
    summary: '先说清用户在做什么，再决定界面应该长什么样。',
    definition: '组件的形状之外，还有交互承诺：链接去往一个位置，按钮触发一个动作，开关改变一个持续状态。本站以原帖关于组件语义的建议为起点，补充常见选择规则。',
    when: '界面外观统一，但点击、导航和状态变化的行为仍然令人困惑时。',
    steps: ['先用动词写出用户操作和预期结果。','导航使用链接，动作使用按钮，持续开关使用对应表单控件。','补全焦点、禁用、错误与辅助技术可识别的名称。'],
    avoid: '把所有能点击的东西都写成 div，再用样式模拟按钮。',
    prompt: '审查指定组件的任务语义。区分导航、动作、提交与持续状态，使用原生 HTML 元素或项目已有的可访问组件，补全键盘行为和可访问名称，并列出修改理由。',
    related: ['toast','notification','progressive-disclosure']
  },
  ...expandedEntries
].map((entry, index) => {
  const source = sources[entry.source];
  const original = originalPrompts[source.id];
  return {
    ...entry,
    number: String(index + 1).padStart(2, '0'),
    contentType: 'editorial-explanation',
    prompt: original?.text ?? entry.prompt,
    promptAuthor: original ? source.handle : 'vibe-design',
    promptKind: original ? (original.kind || 'original') : 'editorial',
    promptSourceUrls: original?.urls ?? [],
    episode: series.find(issue => issue.entries.includes(entry.id))?.number ?? null,
    source,
    secondarySources: (entry.secondarySources || []).map(key => sources[key])
  };
});
