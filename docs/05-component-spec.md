# 组件清单

## 布局组件

### Sidebar
- 左侧导航组件
- 支持折叠
- 包含 Workbench、Task Library、My Workflows、Results Library、Skill Records、Membership

### Topbar
- 页面标题区
- 可放置当前页面说明、筛选入口或辅助操作

### PageShell
- 页面公共骨架
- 负责组合 Sidebar、Topbar 和主内容区

## 工作台组件

### BalloonWorkbench
- 工作台主容器
- 管理六个气球的布局与交互状态
- 负责重置逻辑

### Balloon
- 单个任务气球
- 展示任务名称、简短说明和 Skill 标签
- 支持悬停、剪断、离场状态

### StringLayer
- 负责渲染气球与中央聊天入口之间的绑线
- 支持悬停反馈与断开状态

### ChatEntry
- 中央聊天入口
- 在任务启动时高亮
- 作为工作流启动视觉中心

### ScissorsCursor
- 小剪刀光标组件
- 在气球或绑线上悬停时出现

## 工作流组件

### WorkflowModal
- 工作流弹层容器
- 在剪断动作后弹出

### WorkflowSteps
- 步骤容器
- 串联上下文构建、Prompt 预览、输出质检、版本优化

### ContextBuilder
- 上下文构建模块
- 用于补充目标、对象、背景、限制条件

### PromptPreview
- Prompt 预览模块
- 展示整理后的结构化 Prompt

### OutputCheck
- 输出质检模块
- 记录结果是否完整、清晰、有支撑

### VersionCards
- 版本优化模块
- 展示不同用途的输出版本

## 通用组件

### Button
- 通用按钮

### Tag
- 通用标签
- 可用于任务标签和 Skill 标签

### Card
- 通用信息卡片

### EmptyState
- 空状态占位组件

## 页面级内容模块

### Task Cards
- 用于 Task Library 页面

### Result Cards
- 用于 Results Library 页面

### Skill Record Sections
- 用于 Skill Records 页面
- 包含 Common Skills、Recent usage、Common issues、Reusable suggestions
