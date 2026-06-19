# 09 Component References

## 使用说明

本文档只用于整理 FlowPilot 的组件参考方向，帮助后续收集截图、拆解结构和统一借鉴标准。

限制说明：
- 不修改现有功能代码。
- 不修改 Workbench 页面实现。
- 不下载图片，本次只定义参考方向和保存位置。
- 不引入等级、Lv、XP、积分、徽章、排行榜。
- 不把 Skill 做成成长等级、游戏化徽章或课程进度。
- 不把工作台入口改成普通卡片列表。

推荐优先参考的开源组件库：
- Ant Design
- Arco Design
- Semi Design
- shadcn/ui
- Radix UI
- Mantine
- TDesign

---

## 1. Task Entry Components

- 组件用途：用于表达 Task Library、My Workflows、Results Library 等页面中的任务入口、方法入口、可复用流程入口，承载标题、简介、标签、状态说明和操作入口。
- 出现在哪些页面：Task Library、My Workflows、Results Library、Membership。
- 推荐参考的开源组件库：Ant Design Card / List、Arco Design Card、Semi Design Card、Mantine Cards、TDesign Cards。
- 推荐搜索关键词：
  - `task entry card productivity app`
  - `workflow entry card desktop ui`
  - `method library item design`
  - `template card saas dashboard`
  - `content action card enterprise ui`
- 适合借鉴的点：
  - 标题、摘要、标签、次级说明的层级组织
  - 卡片信息密度的控制
  - hover 态下的轻量反馈和操作显隐
  - 列表和卡片混排时的节奏感
  - 操作入口与信息区的清晰分层
- 不要照搬的点：
  - 过强营销感的封面卡片
  - 电商式大图主导布局
  - 游戏化任务进度、奖励点数、勋章提示
  - 把 Workbench 主入口替换成普通卡片宫格
- 图片或截图应该保存到哪个文件夹：`src/assets/references/components/task-entry`

## 2. Balloon Interaction Components

- 组件用途：用于整理气球、绳线、hover、剪断、上浮、重置等交互参考，服务于 FlowPilot 工作台核心记忆点，但仅作为交互资料存档，不改现有 Workbench。
- 出现在哪些页面：Workbench。
- 推荐参考的开源组件库：Radix UI Hover Card、shadcn/ui Hover Card、Ant Design Motion 相关示例、Semi Design Motion 规范、Mantine Transition。
- 推荐搜索关键词：
  - `floating balloon interaction ui`
  - `cut rope interface motion`
  - `hover tether object animation`
  - `soft floating object desktop web`
  - `scissors cursor interaction`
- 适合借鉴的点：
  - 轻量漂浮感和缓慢节奏
  - hover 区域的可感知性
  - 绳线与主体之间的视觉关联
  - 触发前后状态切换的清晰度
  - 动效中的克制感和专业感
- 不要照搬的点：
  - 卡通派对气球质感
  - 过强 3D 玩具感
  - 烟花、粒子、庆祝喷射类反馈
  - 夸张弹跳和娱乐化演出
- 图片或截图应该保存到哪个文件夹：`src/assets/references/components/balloon-interaction`

## 3. Chat Entry Components

- 组件用途：用于整理中心聊天入口、命令式输入入口、任务启动入口、提示性输入区等参考，强调“启动工作流”而不是“闲聊对话”。
- 出现在哪些页面：Workbench，必要时也可延展到 Task Library 或 My Workflows 的顶部快捷入口。
- 推荐参考的开源组件库：shadcn/ui Command、Radix UI Dialog、Ant Design Input / AutoComplete、Arco Design Input Search、Mantine Spotlight。
- 推荐搜索关键词：
  - `command entry desktop ui`
  - `ai workflow input panel`
  - `command center productivity app`
  - `task launch input module`
  - `assistant workbench entry`
- 适合借鉴的点：
  - 中心入口的视觉聚焦方式
  - 输入区、提示区、快捷动作之间的层级关系
  - 高亮态与默认态之间的细微区分
  - 让输入区看起来像工作入口而不是聊天窗口
  - 文案提示与占位信息的专业语气
- 不要照搬的点：
  - 标准 IM 聊天气泡结构
  - 过强机器人感、头像感、语音助手感
  - 社交产品式的消息流首页
  - 霓虹渐变和过度发光效果
- 图片或截图应该保存到哪个文件夹：`src/assets/references/components/chat-entry`

## 4. Workflow Step Components

- 组件用途：用于整理多步骤工作流、步骤导航、阶段切换、侧边说明、主内容区等组件参考，支持执行流程的清晰推进。
- 出现在哪些页面：My Workflows、Results Library、Membership 中涉及流程说明的区域；也可作为执行面板的结构参考。
- 推荐参考的开源组件库：Ant Design Steps、Arco Design Steps, Semi Design Steps、TDesign Steps、Mantine Stepper、shadcn/ui Tabs + Separator 组合。
- 推荐搜索关键词：
  - `workflow stepper desktop ui`
  - `guided task flow interface`
  - `multi step panel saas`
  - `structured workflow modal`
  - `review refine process ui`
- 适合借鉴的点：
  - 当前步骤、已完成步骤、待开始步骤的区分
  - 步骤区与主操作区之间的布局关系
  - 信息量较大时的分区和留白
  - 表单、说明、预览三者的并置方式
  - 长流程中的阅读节奏
- 不要照搬的点：
  - 培训课程式闯关步骤条
  - onboarding 教学流程风格过重
  - 复杂流程图替代实际步骤面板
  - 完成后奖励反馈或等级增长提示
- 图片或截图应该保存到哪个文件夹：`src/assets/references/components/workflow-steps`

## 5. Context Builder Components

- 组件用途：用于整理目标、对象、背景、限制、素材补充等上下文构建模块参考，帮助 FlowPilot 体现“把任务说清楚”的方法价值。
- 出现在哪些页面：My Workflows、Results Library、Skill Records。
- 推荐参考的开源组件库：Ant Design Form、Arco Design Form、Semi Design Form、TDesign Form、Mantine Input / Tags Input、Radix UI Popover。
- 推荐搜索关键词：
  - `context builder form ui`
  - `brief builder productivity app`
  - `structured input panel desktop`
  - `prompt context form design`
  - `goal audience constraints form`
- 适合借鉴的点：
  - 分组表单的清晰结构
  - 标签、说明、示例文案的配合方式
  - 长文本输入与结构化字段的组合
  - 可折叠补充项和高级项的组织方式
  - 让用户感到是在补全工作上下文，而不是填写冗长问卷
- 不要照搬的点：
  - 调研问卷式密集表单
  - 课程作业式分章节填写体验
  - 复杂低效的必填项堆叠
  - 学习打卡、成长值、任务积分提示
- 图片或截图应该保存到哪个文件夹：`src/assets/references/components/context-builder`

## 6. Output Check Components

- 组件用途：用于整理结果核对、问题提示、缺失项检查、质量说明、修订建议等参考，突出 FlowPilot 的输出检查能力。
- 出现在哪些页面：Results Library、My Workflows、Skill Records。
- 推荐参考的开源组件库：Ant Design Alert / Collapse / Table、Arco Design Alert、Semi Design Banner / Collapse、shadcn/ui Alert / Accordion、Mantine Alert / Spoiler。
- 推荐搜索关键词：
  - `output review panel ui`
  - `quality check card desktop`
  - `review checklist productivity app`
  - `content audit result interface`
  - `issue summary card saas`
- 适合借鉴的点：
  - 问题项、风险项、建议项的分层表达
  - “发现问题”与“如何修改”之间的对应关系
  - 文本型审查结果的可读性
  - 适度强调重点，不靠大面积警示色制造压力
  - 检查结果与后续修订动作之间的衔接
- 不要照搬的点：
  - 安全告警中心式高压氛围
  - 纯技术审计面板风格
  - 全屏红色告警或大量状态灯
  - 分数、星级、排行榜式质量表达
- 图片或截图应该保存到哪个文件夹：`src/assets/references/components/output-check`

## 7. Result / Workflow Card Components

- 组件用途：用于整理结果卡片、版本卡片、流程卡片、复用卡片等参考，支持展示一个任务的不同输出版本、用途和后续动作。
- 出现在哪些页面：Results Library、My Workflows、Task Library。
- 推荐参考的开源组件库：Ant Design Card / Tabs、Arco Design Card / Descriptions、Semi Design Card、shadcn/ui Card、Mantine Paper / Badge、TDesign Card。
- 推荐搜索关键词：
  - `result version card ui`
  - `workflow summary card saas`
  - `document variant card productivity`
  - `template output card design`
  - `reuse result library card`
- 适合借鉴的点：
  - 一个结果下多版本内容的归组方式
  - 摘要、适用对象、时间、标签的布局方法
  - 卡片内操作的轻量化安排
  - 版本差异与使用场景的清晰呈现
  - 文档资产感而非文件管理器感
- 不要照搬的点：
  - 云盘文件列表的机械感
  - 资讯流、社交瀑布流布局
  - 课程目录卡片或学习成就卡片
  - 收藏排行、热门榜单、积分兑换式表达
- 图片或截图应该保存到哪个文件夹：`src/assets/references/components/result-workflow-cards`

## 8. Skill Record Components

- 组件用途：用于整理 Skill Records 页面中常用方法、最近使用、常见问题、可复用建议等模块参考，强调方法复盘和记录沉淀。
- 出现在哪些页面：Skill Records。
- 推荐参考的开源组件库：Ant Design Collapse / List / Tag、Arco Design List / Statistic、Semi Design Typography / Tag / Banner、shadcn/ui Accordion / Badge、Mantine Timeline / Card、TDesign List。
- 推荐搜索关键词：
  - `method record dashboard`
  - `knowledge pattern ui`
  - `usage insights panel`
  - `workflow notes library`
  - `professional review records interface`
- 适合借鉴的点：
  - 方法记录的模块化拆分
  - 文本总结、标签、案例说明的组合方式
  - 最近使用与常见问题的阅读效率
  - 可复用建议的归档感与专业感
  - 轻量信息标签而非强游戏反馈
- 不要照搬的点：
  - 等级、Lv、XP、积分、徽章、排行榜
  - 成就墙、连续签到、成长地图
  - 课程章节进度条和训练营结构
  - 社区荣誉榜和竞技式展示
- 图片或截图应该保存到哪个文件夹：`src/assets/references/components/skill-records`

---

## 统一筛选标准

- 优先选择桌面端、专业工具型、信息结构清晰的参考。
- 优先选择低饱和、留白充足、交互反馈克制的参考。
- 可以借鉴布局、层级、信息组织、hover 和状态反馈，但不要整页照搬。
- 如果参考案例明显偏课程平台、游戏化产品、普通聊天工具或内容社区，不建议纳入。
- 所有截图后续统一按组件方向保存到对应文件夹，方便持续补充。
