export const expandedEntries = [
  {
    "id": "tactile-buttons",
    "topic": "visual",
    "title": "有触感的按钮",
    "english": "Tactile buttons",
    "category": "technique",
    "visual": "tactile",
    "source": "s001",
    "tags": [
      "按钮",
      "拟物",
      "反馈"
    ],
    "summary": "用光影和按压状态，表现可以触碰的表面。",
    "definition": "按钮的实体感来自明暗、轮廓和按压反馈。原帖将同一语言应用到五种按钮层级，主要动作更突出，次要动作逐步减轻。",
    "when": "适合层级明确、希望建立触觉反馈的编辑器和播放器。",
    "steps": [
      "给主要操作保留最强对比。",
      "统一上方光源，用顶边高光和底部接触阴影塑造体积。",
      "按下时缩短阴影，并保留清晰的焦点边框。"
    ],
    "avoid": "用相同的体积强化所有按钮，或只靠阴影区别禁用状态。",
    "prompt": "检查现有按钮层级。复用现有组件，为主要和次要动作分别设计表面、按压与焦点状态；验证每种状态下的文字对比。",
    "related": [
      "skeuomorphism",
      "semantic-components"
    ]
  },
  {
    "id": "cascade-safe-zone",
    "topic": "components",
    "title": "级联菜单安全区",
    "english": "Menu aim",
    "category": "technique",
    "visual": "cascade",
    "source": "s002",
    "tags": [
      "菜单",
      "光标",
      "延时"
    ],
    "summary": "给斜向移动的鼠标留一条进入子菜单的路。",
    "definition": "父菜单和子菜单横向分列时，指针可能斜穿过其他行。用指针前一位置与子菜单近侧两个角形成三角区，判断用户是否正在朝子菜单移动。",
    "when": "适合使用鼠标的桌面级联菜单。",
    "steps": [
      "判断指针是否进入朝向子菜单的区域。",
      "只在该区域内短暂延迟切换。",
      "键盘用方向键进入与返回，触屏通过点击展开。"
    ],
    "avoid": "把延时应用到所有路径，或把鼠标轨迹当作键盘操作的前置条件。",
    "prompt": "检查现有级联菜单的斜向路径。给明确朝向子菜单的鼠标轨迹添加可取消的延时，并独立处理键盘和触摸输入。",
    "related": [
      "continuity",
      "overlay-choice"
    ]
  },
  {
    "id": "ordered-dither",
    "topic": "visual",
    "title": "有序抖动",
    "english": "Ordered dithering",
    "category": "technique",
    "visual": "dither",
    "source": "s003",
    "tags": [
      "Dither",
      "像素",
      "纹理"
    ],
    "summary": "用规则颗粒模拟有限色阶，保留明暗变化。",
    "definition": "有序抖动把图像限制在少数色阶，通过重复阈值图案分布亮暗像素。原帖使用 Bayer 矩阵，让颗粒尺寸与色阶数量可以独立调节。",
    "when": "适合像素风海报、背景纹理和低色阶视觉实验。",
    "steps": [
      "先决定保留多少明暗级别。",
      "用周期阈值调整每个像素的量化结果。",
      "把调节范围限定在能辨认主体并保持文字清晰的位置。"
    ],
    "avoid": "把抖动用于正文或功能图标，损失边缘辨识度。",
    "prompt": "给指定图像做有序抖动预览，提供开关与色阶数量控制。原图保留可访问名称，效果绑定在装饰图层。",
    "related": [
      "ascii",
      "graphic-halftone"
    ]
  },
  {
    "id": "mixed-typesetting",
    "topic": "layout",
    "title": "中英混排",
    "english": "Mixed-language typesetting",
    "category": "technique",
    "visual": "type",
    "source": "s007",
    "tags": [
      "排版",
      "i18n",
      "换行"
    ],
    "summary": "用真实文案检查中英文、长词与标点的断行。",
    "definition": "同一个容器在不同语言下会出现不同的字宽和断行。原帖建议结合实际布局选择文案，并用 CSS 处理对齐、句读与行宽。",
    "when": "适合国际化产品、按钮标签和窄屏正文。",
    "steps": [
      "用真实的双语内容走查最短和最长场景。",
      "对短标题评估平衡换行，正文保留自然换行。",
      "指定正确的 lang，针对浏览器支持情况测试避头尾和自动字间距。"
    ],
    "avoid": "用固定高度或禁止换行隐藏断行问题。",
    "prompt": "检查指定页面的中英混排。用长短文案和窄屏复现问题，先调整布局与措辞，再用渐进增强的排版属性补足。",
    "related": [
      "typography-scale",
      "alignment"
    ]
  },
  {
    "id": "wiki-navigation",
    "topic": "components",
    "title": "文档与章节导航",
    "english": "Documentation navigation",
    "category": "technique",
    "visual": "wiki",
    "source": "s008",
    "tags": [
      "Wiki",
      "目录",
      "响应式"
    ],
    "summary": "让长文档在宽屏和窄屏上都能快速跳转。",
    "definition": "把站点导航、当前文章和章节目录分开。桌面给较长目录独立滚动空间，移动端把章节入口收进容易找到的控件里。",
    "when": "适合多级帮助文档、指南与可深链的长文章。",
    "steps": [
      "使用真实标题与稳定锚点。",
      "在窄屏提供有名称的章节菜单，跳转后将焦点移到目标。",
      "长目录提示可继续滚动，文末给相关下一步。"
    ],
    "avoid": "做两个同时抢占屏幕的固定导航，或让跳转目标被固定栏盖住。",
    "prompt": "重排指定文档页导航。保留锚点 URL，分别验证桌面目录滚动、手机章节跳转、键盘焦点与文末相关入口。",
    "related": [
      "progressive-disclosure",
      "alignment"
    ]
  },
  {
    "id": "overlay-choice",
    "topic": "system",
    "title": "提示框、气泡与弹窗",
    "english": "Overlay choice",
    "category": "guideline",
    "visual": "overlay",
    "source": "s009",
    "tags": [
      "Tooltip",
      "Popover",
      "Dialog",
      "Drawer"
    ],
    "summary": "按内容和任务选浮层：解释、局部操作、确认或完整流程。",
    "definition": "Tooltip 提供简短说明。Popover 能承载局部操作。Dialog 用于需要集中处理的任务，Drawer 可在工作时保留上下文；主要任务也可以成为独立页面。",
    "when": "适合在各种浮层组件之间犹豫的产品界面。",
    "steps": [
      "先标清浮层是否包含操作。",
      "确认方式按操作后果和可撤销性选择。",
      "依赖背景信息的表单考虑侧栏，长流程优先给独立空间。"
    ],
    "avoid": "把按钮嵌入仅悬停可见的提示框，或为所有低风险操作加重确认。",
    "prompt": "审查指明的浮层，将短说明、互动面板、关键确认和长表单分别匹配组件。验证焦点、Esc、触屏和关闭后的返回位置。",
    "related": [
      "toast",
      "progressive-disclosure"
    ]
  },
  {
    "id": "liquid-glass",
    "topic": "visual",
    "title": "液态玻璃",
    "english": "Liquid glass",
    "category": "style",
    "visual": "glass",
    "source": "s010",
    "tags": [
      "玻璃",
      "折射",
      "材质"
    ],
    "summary": "层叠透色、边缘高光和折射，建立通透的界面材质。",
    "definition": "原帖将材质拆成背景处理、阴影、折射、着色、高光和文字处理。本站示意聚焦背景与层次，折射应依据平台和性能预算另外评估。",
    "when": "适合短时浮层或面积有限的播放控件。",
    "steps": [
      "先确定浅深背景的可读性。",
      "让边缘高光只提示材质厚度。",
      "低性能和高对比场景提供可读的实体填充。"
    ],
    "avoid": "在高速滚动的长列表或文字密集表面铺满高开销滤镜。",
    "prompt": "给指定控件设计玻璃材质和实体回退。记录每层的作用，在亮暗与复杂背景下量测文字对比，测试滚动性能。",
    "related": [
      "holographic",
      "skeuomorphism"
    ]
  },
  {
    "id": "motion-easing",
    "topic": "motion",
    "title": "动画缓动",
    "english": "Motion easing",
    "category": "term",
    "visual": "easing",
    "source": "s011",
    "tags": [
      "动画",
      "缓动",
      "速度曲线"
    ],
    "summary": "用速度变化让入场、位移和退场各有恰当节奏。",
    "definition": "缓动曲线决定时间与完成进度的关系。减速曲线可让浮层迅速出现后稳定落位，缓入缓出可让位置变化两端平稳。",
    "when": "适合菜单、选中指示条、通知和拖动归位。",
    "steps": [
      "从运动目的选择曲线。",
      "约束时长，确保下一次操作能立即响应。",
      "复用少量按角色命名的动效 token。"
    ],
    "avoid": "给弹窗、按钮和长时间循环套同一曲线，或夸大回弹幅度。",
    "prompt": "整理当前动效的目的与速度曲线，给入场、退场、位置切换各一个角色。验证快速反复操作与减少动态偏好。",
    "related": [
      "continuity",
      "drag-feedback"
    ]
  },
  {
    "id": "message-bubbles",
    "topic": "visual",
    "title": "消息气泡材质",
    "english": "Chat bubble material",
    "category": "style",
    "visual": "bubbles",
    "source": "s012",
    "tags": [
      "对话",
      "气泡",
      "材质"
    ],
    "summary": "给聊天界面选择一套表面语言和匹配的反馈。",
    "definition": "原帖以磨砂、像素、Aqua、共享渐变、拟物和纯色六种方案探索气泡。材质也要服务发言方识别、文本阅读和连续消息分组。",
    "when": "适合需要形成清晰视觉语言的聊天或 Agent 界面。",
    "steps": [
      "从纯色方案建立正文对比。",
      "连续同一发送方用一致的间距和形状关系。",
      "让等待、发送和流式更新保持布局稳定。"
    ],
    "avoid": "用材质颜色作为发言方的唯一标记，或让长文悬浮在复杂背景上。",
    "prompt": "为指定聊天界面提出纯色基线与一种有特色的表面，对照检查长文本、流式输出、深浅背景和减少动态模式。",
    "related": [
      "liquid-glass",
      "tactile-buttons"
    ]
  },
  {
    "id": "halo-ripple",
    "topic": "motion",
    "title": "扩散光环",
    "english": "Halo ripple",
    "category": "technique",
    "visual": "halo",
    "source": "s013",
    "tags": [
      "冲击波",
      "光环",
      "动效"
    ],
    "summary": "让光环从触发位置扩散，为低频动作提供空间反馈。",
    "definition": "原帖演示把光环、局部透镜扭曲、轻微色散与边线反光结合在一起。简化时可先用单层透明环表达扩散方向。",
    "when": "适合低频入口、展示场景或一次性的界面动作。",
    "steps": [
      "把中心放在触发位置。",
      "限定在内容区单次运行，并保留可读状态。",
      "减少动态时用短暂颜色变化或可见状态替代。"
    ],
    "avoid": "使用大面积高频亮度变化，或让动画挡住操作。",
    "prompt": "为指定动作设计一次轻量扩散反馈，用单层光环作为基础。保留真实状态与独立的减少动态路径，评估低端设备开销。",
    "related": [
      "continuity",
      "motion-easing"
    ]
  },
  {
    "id": "exit-motion",
    "topic": "motion",
    "title": "退场与补位",
    "english": "Exit motion",
    "category": "technique",
    "visual": "leaving",
    "source": "s014",
    "tags": [
      "退场",
      "删除",
      "列表"
    ],
    "summary": "元素退出时，让它的位置和相邻内容一起发生可追踪的变化。",
    "definition": "退场动效既描述移除对象，也交代空位如何被填补。原帖探索多种表现方式，日常列表可以用简短淡出和自然补位表达同一因果。",
    "when": "适合可删除的卡片、队列或临时浮层。",
    "steps": [
      "先决定删除后焦点去哪里。",
      "让离场与相邻元素补位连贯，并保留撤销入口。",
      "快速连续删除与减少动态时仍应可操作。"
    ],
    "avoid": "把删除变成必须等待的长动画，或让邻居重排时选错项目。",
    "prompt": "为指定列表设计退出与补位。将实际数据操作和动画分开，检查焦点、撤销、连续删除和减少动态时的表现。",
    "related": [
      "continuity",
      "motion-easing"
    ]
  },
  {
    "id": "loading-states",
    "topic": "feedback",
    "title": "等待状态",
    "english": "Loading states",
    "category": "guideline",
    "visual": "loading",
    "source": "s017",
    "tags": [
      "Skeleton",
      "Spinner",
      "Progress",
      "等待"
    ],
    "summary": "按任务时间和进度可知程度选择等待反馈。",
    "definition": "短操作适合在触发处标记忙碌，已知布局可用骨架占位，可量化的长任务显示真实进度。非常短的等待可延后提示出现，避免闪烁。",
    "when": "适合首次加载、文件导入、刷新、同步等异步任务。",
    "steps": [
      "在操作触发处表达请求已收到。",
      "让骨架与真实内容尺寸接近。",
      "区分等待、成功和失败，并允许取消可以取消的操作。"
    ],
    "avoid": "绘制虚假的百分比，或让短请求反复闪现加载指示器。",
    "prompt": "列出页面里的异步操作，按可量化进度、预计时长和是否占位选择等待方式。对照检查慢网、失败和取消。",
    "related": [
      "toast",
      "notification",
      "optimistic-ui"
    ]
  },
  {
    "id": "optimistic-ui",
    "topic": "feedback",
    "title": "乐观更新",
    "english": "Optimistic UI",
    "category": "technique",
    "visual": "toast",
    "source": "s017",
    "tags": [
      "异步",
      "回滚",
      "状态"
    ],
    "summary": "对可逆且成功率高的动作，先反馈，再与服务器确认。",
    "definition": "界面先显示预期结果，同时发送保存请求。若保存失败，恢复真实状态并说明如何重试。原帖把它归入等待体验的反馈策略。",
    "when": "适合收藏、赞或个人列表调整等低风险操作。",
    "steps": [
      "只对能安全回滚的变更采用。",
      "跟踪同一对象短时间内的多次请求。",
      "失败时恢复正确版本，并给出重试入口。"
    ],
    "avoid": "让资金、权限或不可逆操作提前显示为已成功。",
    "prompt": "评估指定操作能否乐观更新。实现等待、成功、请求乱序与失败回滚，保证重复操作后的界面和真实结果一致。",
    "related": [
      "loading-states",
      "toast"
    ]
  },
  {
    "id": "scroll-cards",
    "topic": "motion",
    "title": "卡片滚动叙事",
    "english": "Scroll-driven cards",
    "category": "technique",
    "visual": "stack",
    "source": "s019",
    "tags": [
      "滚动",
      "卡片",
      "作品集"
    ],
    "summary": "让卡片跟随滚动位置，展开、叠放或切换焦点。",
    "definition": "原帖展示层叠、飞出、横向展廊、封面轮播和图片展开。共同点是滚动进度直接决定画面，暂停时停在当前状态，反向时顺应回退。",
    "when": "适合产品功能演示或作品集中的短章节。",
    "steps": [
      "先让内容按自然顺序可读。",
      "挑一种能解释内容关系的运动。",
      "给触屏、键盘和减少动态模式保留完整内容。"
    ],
    "avoid": "劫持整页滚动或将重要信息放在必须操作特效才能到达的位置。",
    "prompt": "给指定卡片组增加一种滚动驱动效果，保持原生滚动、内容顺序和键盘可达。验证逆向滚动、窄屏及静态回退。",
    "related": [
      "continuity",
      "motion-easing"
    ]
  },
  {
    "id": "optical-alignment",
    "topic": "layout",
    "title": "光学对齐",
    "english": "Optical alignment",
    "category": "technique",
    "visual": "optical",
    "source": "optical",
    "tags": [
      "图标",
      "视觉重心",
      "对齐"
    ],
    "summary": "元素的几何中心与看起来的中心有时不在同一处。",
    "definition": "尖角、不对称轮廓和字形的视觉重量会偏离边界框中心。原帖推荐观察模糊后的形状，抓住较大的明暗区域再微调。",
    "when": "适合三角播放图标、文字与图标并排以及不规则品牌标志。",
    "steps": [
      "先用几何对齐建立基线。",
      "在目标大小比较视觉重量，做小幅偏移。",
      "保留点击区域与外部网格，只修正图形本身。"
    ],
    "avoid": "为每个形状使用同一个固定偏移，或同时移动整个点击区域。",
    "prompt": "检查指定图标在按钮中的视觉重心。输出几何居中与微调后的对比，保持点击区域、焦点轮廓与布局基线稳定。",
    "related": [
      "alignment",
      "tactile-buttons"
    ]
  },
  {
    "id": "onboarding-preview",
    "topic": "feedback",
    "title": "上手引导的实时预览",
    "english": "Live onboarding preview",
    "category": "technique",
    "visual": "wiki",
    "source": "onboarding",
    "tags": [
      "Onboarding",
      "预览",
      "步骤"
    ],
    "summary": "用户一选，预览就反映选择对产品的实际影响。",
    "definition": "原帖建议把选择与界面结果放在同一个过程里，并用步骤关系交代进度。实时反馈应回答「这个选项会改变什么」。",
    "when": "适合首次设置主题、工作区结构、偏好和功能组合。",
    "steps": [
      "让控件与预览使用同一份状态。",
      "用清楚的步骤名称展示进程。",
      "在移动端保持选择和结果相邻。"
    ],
    "avoid": "用固定轮播假装实时结果，或只给百分比而不告诉用户剩余任务。",
    "prompt": "为指定上手流程设计真实预览与命名步骤，支持回退、不丢失选择，并检查移动端预览是否贴近当前控件。",
    "related": [
      "wiki-navigation",
      "progressive-disclosure"
    ]
  },
  {
    "id": "bento-grid",
    "topic": "layout",
    "title": "动态便当布局",
    "english": "Animated Bento grid",
    "category": "technique",
    "visual": "bento",
    "source": "bento",
    "tags": [
      "Bento",
      "网格",
      "功能演示"
    ],
    "summary": "让每个格子说明一个真实功能，并用大小表达优先级。",
    "definition": "Bento 以共用网格组合大小不同的内容块。原帖给功能格加入小动画，用局部演示说明用户能完成什么。",
    "when": "适合产品功能页和少量彼此关联的功能说明。",
    "steps": [
      "先按重要度分配格子尺寸。",
      "每格配一段自足的标题与微型演示。",
      "窄屏保持有意义的阅读顺序。"
    ],
    "avoid": "填满等权格子或让所有动画同时争夺注意力。",
    "prompt": "将现有功能整理为 Bento 网格，按用户目标分组。用一种短动作呈现每格的真实用途，并提供静态可读版本。",
    "related": [
      "scroll-cards",
      "continuity"
    ]
  },
  {
    "id": "icon-states",
    "topic": "system",
    "title": "功能图标的状态",
    "english": "Icon states",
    "category": "guideline",
    "visual": "semantic",
    "source": "icons",
    "secondarySources": ["duotoneIcons"],
    "tags": [
      "图标",
      "开关",
      "语义"
    ],
    "summary": "用成组图形和明确名称表达开启、关闭、展开与禁用。",
    "definition": "功能图标延续控件语义。原帖提出用线性、实心和带斜线等变体表达状态，文字或辅助技术也应能读到状态。Kubai Icons 2.0 的原片展示了同组图标如何用双色区分图层，再让局部图形运动。",
    "when": "适合工具栏、收藏按钮、静音和显示开关。",
    "steps": [
      "为每个状态写下动作名称与可感知区别。",
      "在小尺寸检查同组图标的形状和一致性。",
      "给控件提供可访问名称与程序可读状态。"
    ],
    "avoid": "只改颜色或只换图形，不让键盘和辅助技术知道当前状态。",
    "prompt": "核对工具栏图标的状态，优先复用同组图标。验证高对比、小尺寸、键盘和辅助技术对未选中、选中与禁用的区分。",
    "related": [
      "semantic-components",
      "icon-simplification"
    ]
  },
  {
    "id": "icon-simplification",
    "topic": "visual",
    "title": "图标的体积与简化",
    "english": "Icon simplification",
    "category": "technique",
    "visual": "optical",
    "source": "iconsimple",
    "tags": [
      "图标",
      "渐变",
      "小尺寸"
    ],
    "summary": "减掉次要体积线索，让小图标保留清楚的主轮廓。",
    "definition": "原帖从 AI 生成图标出发，建议减少不必要的高光、阴影和纹理，用更简单的色阶建立主体。",
    "when": "适合小尺寸 App 图标和被过度渲染的图形。",
    "steps": [
      "先在实际使用尺寸辨认轮廓。",
      "精简光源与主要明暗层级。",
      "用目标圆角遮罩检查裁切和边缘空间。"
    ],
    "avoid": "只在放大画布比较精细度，或让背景材质压过主体。",
    "prompt": "重审指定图标的小尺寸可读性。给出主体简化方案、实际大小对比和不同系统裁切下的预览。",
    "related": [
      "icon-states",
      "skeuomorphism"
    ]
  },
  {
    "id": "glass-fallback",
    "topic": "visual",
    "title": "玻璃材质的回退",
    "english": "Glass effect fallback",
    "category": "technique",
    "visual": "glass",
    "source": "glasswork",
    "tags": [
      "玻璃",
      "兼容",
      "性能"
    ],
    "summary": "先让控件在基础样式中可读，再按能力增加材质效果。",
    "definition": "原帖介绍 Glasswork 对浏览器和视频背景的适配。本站把这一思路整理成层层增强的做法，先保证填充和文字，再加入滤镜等视觉层。",
    "when": "适合跨浏览器发布的玻璃浮层与媒体背景控件。",
    "steps": [
      "建立不依赖效果的表面。",
      "通过 CSS 能力检测逐层增强并检查目标设备。",
      "大面积视频背景测试低速设备与滚动。"
    ],
    "avoid": "只根据浏览器名称判断支持，或将背景模糊设为文字可读的必要条件。",
    "prompt": "为指定玻璃控件建立实体回退和增强层。列出已验证的浏览器与设备，对比复杂视频背景下的可读性和帧率。",
    "related": [
      "liquid-glass",
      "continuous-corners"
    ]
  },
  {
    "id": "graphic-halftone",
    "topic": "visual",
    "title": "半调纹理",
    "english": "Halftone texture",
    "category": "technique",
    "visual": "halftone",
    "source": "halftone",
    "tags": [
      "半调",
      "印刷",
      "图像"
    ],
    "summary": "用有限的点阵密度表达影调，呈现印刷式颗粒。",
    "definition": "半调用重复单元中的点大小、密度或覆盖面积表现明暗。Kubai 点评一组落地页卡片时，把半调和 ASCII、Dither 视作不同的纹理选项。",
    "when": "适合图片处理、海报和有印刷风格的局部背景。",
    "steps": [
      "选择轮廓明确的素材。",
      "确定点径与实际显示尺寸的关系。",
      "保持前景标题与纹理区域的对比。"
    ],
    "avoid": "把半调与抖动当成完全相同的算法，或在细小文字下铺高对比点纹。",
    "prompt": "给指定装饰图试做半调版本，提供纹理开关，在实际尺寸比较主体和文字可读性。",
    "related": [
      "ordered-dither",
      "ascii"
    ]
  },
  {
    id: 'choice-controls', topic: 'system', title: '选择控件的取舍', english: 'Choice controls', category: 'guideline', visual: 'semantic',
    source: 's020', tags: ['表单','开关','复选框','单选','下拉菜单','分段选择'],
    summary: '先看选择何时生效，再看它是设置一个值，还是执行一个动作。',
    definition: '在设置里拨动「允许通知」，用户预期它立即生效。表单里的订阅选项则可能要等保存后才生效。两者都只有选与不选两种状态，提交时机决定了控件给人的承诺。',
    when: '审查设置页、填写后统一提交的表单，以及工具栏里的下拉入口时。',
    steps: ['写下每个选择何时生效。独立且即时的开关项用 Switch，随表单保存的多选项用复选框。','区分值和动作。选语言后字段显示当前语言；选菜单里的「导出」则启动导出，入口名称保持原样。','比较选项数和长度。两到五个简短互斥项可平铺为分段选择；选项多或文字长时用下拉选择，必要时加入搜索和空状态。','需要同时展示所有候选项时，单选用 Radio，多选用复选框。若允许暂不决定，为单选题提供明确选项。'],
    avoid: '把「开」和「关」做成两枚单选按钮，或让本应随表单保存的选择悄悄立即生效。',
    related: ['semantic-components','overlay-choice','icon-states']
  },
  {
    id: 'ring-carousel', topic: 'motion', title: '景深环形卡片', english: 'Ring carousel', category: 'technique', visual: 'cards',
    source: 's021', tags: ['轮播','透视','景深','翻面','流体渐变'],
    summary: '沿弧线排列卡片，连续改变曲率，让视角从环内过渡到环外。',
    definition: '在 Kubai 的示例中，环内视角让两侧的卡更靠近观看者。转到环外时，正中的卡最清晰，两侧和后排逐渐失焦。两种视角共用同一条弧线，观看者可以跟住同一张卡。',
    when: '在作品集或图片浏览器里同时展示一组有前后关系的画面时。',
    steps: ['先用纯色卡片检查弧度和遮挡顺序。在环内视角下，两侧的卡应比中间的更大。','连续改变曲率切到环外，观察中心卡是否保持清晰，再给远处的卡加景深。','最后加上渐变和翻面。从中间向两边依次翻开，检查背面图片的方向。'],
    avoid: '用模糊掩盖卡片错位。先关闭景深检查几何关系，再恢复材质。',
    related: ['scroll-cards','motion-easing','parallax-card']
  },
  {
    id: 'parallax-card', topic: 'motion', title: '视差卡片', english: 'Parallax card', category: 'technique', visual: 'holo',
    source: 'parallaxCard', tags: ['卡片','视差','陀螺仪'],
    summary: '前景与背景随观看角度产生不同位移，一张平面卡片也能显出纵深。',
    definition: '前后两层移动的距离不同，眼睛就能感到它们之间有距离。Kubai 的纪念卡支持在手机上倾斜设备来改变视角，也可以把效果导出成视频或静态图片。',
    when: '展示徽章、收藏卡或纪念卡，希望用户能从不同角度观察图案时。',
    steps: ['挑一个轮廓清楚的前景，让它和背景在静止时也能区分。','缓慢改变视角，观察前景相对背景的位移。给背景留出余量，以免倾斜时露出空边。','把设备放平，检查名字与徽章是否仍然清楚，让静态卡片也能完整传达信息。'],
    avoid: '让文字移出阅读区域，或要求用户晃动设备才能读到关键信息。',
    prompt: '为现有收藏卡加入轻微的分层视差。保持卡框和文字可读，限制图案的移动范围，并提供静态呈现。',
    related: ['holographic','ring-carousel']
  },
  {
    id: 'empty-states', topic: 'feedback', title: '空状态', english: 'Empty states', category: 'guideline', visual: 'semantic', source: 's022',
    tags: ['空状态','无数据','搜索结果','首次使用','错误提示'],
    summary: '内容区空着时，告诉用户为什么是空的，以及现在能做什么。',
    definition: '刚注册的用户打开空白任务页，需要知道这里能放什么。已有任务的用户筛选出空列表，则需要知道哪些条件没有匹配。两人看到的都是零条记录，合适的标题和操作却不同。',
    when: '设计首次使用的页面、没有匹配项的搜索结果，或暂时无法显示内容的卡片时。',
    steps: ['先写出原因。首次使用可以给出「新建任务」，筛选无结果可以给出「清除筛选」，读取失败时提供重试。','再看空间。整页可用缩小的页面线框预告填充后的样子；对象明确时，一个文件或成员图标就够了。','卡片里把短标题和轻量操作排成一行。搜索下拉里保留原有行高，直接说明哪个关键词没有匹配项。'],
    avoid: '请求还在进行时就显示「暂无数据」，或者在多张空卡片里重复放醒目的主按钮。',
    related: ['loading-states','onboarding-preview','semantic-components']
  }
];
