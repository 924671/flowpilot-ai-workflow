import React, { useMemo } from 'react';
import Card from '../components/common/Card';
import Tag from '../components/common/Tag';
import Button from '../components/common/Button';

const taskDetailContent = {
  'project-review': {
    summary:
      '适合项目结项、阶段复盘和团队经验沉淀场景，帮助你把零散信息整理成清晰、可汇报、可复用的复盘结构。',
    userRole: '项目负责人、产品经理、运营负责人、需要做阶段复盘的协作者',
    useMoment: '项目收尾、阶段里程碑结束、复盘会前、需要沉淀团队经验时',
    scenarios: [
      '项目收尾后，需要整理结果、问题和后续动作',
      '阶段复盘会上，需要快速形成一版可直接讲述的结果',
      '想把一次项目经验沉淀成下次还能继续复用的方法入口',
    ],
    inputs: [
      '项目名称、项目背景和本次复盘目标',
      '关键动作、阶段产出、数据结果和成果表现',
      '遇到的问题、原因分析和下一步计划',
      '汇报对象和希望输出的语气风格',
    ],
    outputs: ['结构化项目复盘报告', '领导汇报版摘要', '团队同步版结论与行动项'],
    checks: ['数据是否足够支撑结论', '问题与原因是否对应', '下一步计划是否可执行'],
    suggestions: [
      '优先补齐结果数据和汇报对象，避免复盘内容空泛',
      '如果要沉淀成模板，建议同时保留 Context Builder 的输入结果',
    ],
  },
  'weekly-report': {
    summary:
      '把一周或一个月内的零散进展整理成清晰结构，减少重复组织内容的时间，并支持继续转成不同对象的汇报版本。',
    userRole: '内容运营、项目经理、团队负责人、需要定期同步进展的职场用户',
    useMoment: '周会前、月度同步前、向直属主管汇报前',
    scenarios: [
      '每周例行汇报，需要统一输出格式',
      '月报沉淀时，需要把多个项目进展合并整理',
      '同一份内容要转成领导版和团队版两种表达',
    ],
    inputs: [
      '本周期已完成事项和阶段进展',
      '问题阻塞、风险项和处理动作',
      '下周期重点计划、责任人和协同需求',
      '汇报对象、篇幅要求和语气风格',
    ],
    outputs: ['周报结构稿', '月报摘要版', '领导简报版'],
    checks: ['时间线是否清楚', '结果是否有数据依据', '下周期动作是否明确'],
    suggestions: [
      '适合搭配 Version Optimization，把同一份内容转成多个沟通版本',
      '先整理时间线和结果证据，能明显提升可读性',
    ],
  },
  'campaign-plan': {
    summary:
      '帮助你从目标、人群、节奏、资源和协作几个维度搭建一版可执行的活动运营方案，适合作为评审和落地前的结构骨架。',
    userRole: '运营策划、活动负责人、市场团队、需要搭建活动方案的人',
    useMoment: '活动立项前、资源评审前、跨团队协同前',
    scenarios: [
      '活动立项时，需要快速形成方案骨架',
      '跨团队协同时，需要明确节奏、责任和资源配置',
      '方案汇报前，需要一版结构清晰的提案底稿',
    ],
    inputs: [
      '活动目标、目标人群和核心主题',
      '关键节点、渠道动作和资源约束',
      '协作角色、预算范围和风险项',
      '预期结果与衡量方式',
    ],
    outputs: ['活动运营方案', '执行排期版', '提案汇报版大纲'],
    checks: ['目标是否明确', '用户分层是否清楚', '资源和节奏是否能落地'],
    suggestions: [
      '先明确目标与衡量方式，再让 AI 扩展动作和节奏',
      '如果场景复杂，建议先在 Context Builder 中拆清角色与限制条件',
    ],
  },
  'meeting-notes': {
    summary:
      '把会议中的讨论内容压缩成结论、待办和责任人，适合会后快速同步，并减少后续反复确认成本。',
    userRole: '项目经理、业务接口人、客户沟通负责人、会议组织者',
    useMoment: '项目例会后、客户会议后、跨部门同步后',
    scenarios: [
      '项目例会后，需要快速整理纪要并同步团队',
      '跨部门沟通后，需要形成清晰待办和责任人',
      '客户会议后，需要提炼结论和下一步动作',
    ],
    inputs: [
      '会议主题、参会对象和背景',
      '讨论重点、结论和关键分歧点',
      '待办事项、截止时间和责任人',
      '是否需要对外同步或生成正式版纪要',
    ],
    outputs: ['会议纪要初稿', '待办清单版', '会后同步版'],
    checks: ['责任人是否明确', '截止时间是否完整', '结论与行动项是否分开'],
    suggestions: [
      '先整理结论和待办，不要只复制原始记录',
      'Output Check 特别适合检查责任人与时间节点是否清楚',
    ],
  },
  'competitor-analysis': {
    summary:
      '帮助你先搭好分析维度和结论骨架，再逐步补充观点、证据和输出版本，适合做内部策略讨论前的结构准备。',
    userRole: '产品经理、策略分析、运营研究、需要做竞品观察的人',
    useMoment: '竞品研究前、评审会前、市场策略讨论前',
    scenarios: [
      '准备竞品研究或市场观察汇报',
      '需要快速搭建一个可继续补充的分析框架',
      '想把一次分析逻辑沉淀成后续可复用模板',
    ],
    inputs: [
      '竞品对象、分析目的和汇报对象',
      '希望比较的维度，例如功能、体验、策略、价格',
      '已有素材、数据或主观看法',
      '输出形式，例如报告、备忘录或 PPT 大纲',
    ],
    outputs: ['竞品分析框架', '对比结论版', '汇报结构版'],
    checks: ['分析维度是否稳定', '结论是否有依据', '输出对象是否匹配'],
    suggestions: [
      '先明确分析目的，再决定比较维度，否则容易只得到杂乱罗列',
      'Prompt Structure 和 Output Check 组合使用效果最好',
    ],
  },
  'ppt-outline': {
    summary:
      '把主题拆成可直接进入制作阶段的汇报结构，适合先搭页面逻辑，再补文案和数据支撑。',
    userRole: '产品经理、汇报准备者、项目负责人、需要做演示文稿的人',
    useMoment: '汇报前、评审前、需要把复杂资料梳理成演示结构时',
    scenarios: [
      '领导汇报前，需要快速形成 PPT 页面结构',
      '已有很多材料，但还没有清晰的叙事顺序',
      '同一主题需要输出简版和正式版两种演示结构',
    ],
    inputs: [
      '汇报主题、对象和使用场景',
      '核心结论、支撑信息和页数预期',
      '已有文档、纪要或结果材料',
      '希望输出的语气和结构风格',
    ],
    outputs: ['PPT 大纲版', '领导汇报结构版', '摘要版页面顺序'],
    checks: ['对象是否明确', '页数是否合理', '每页结论是否够集中'],
    suggestions: [
      '先明确对象和篇幅，不同对象会直接影响页面层级和重点',
      'Version Optimization 可以把同一份内容拆成不同版本的大纲',
    ],
  },
};

const stepPreview = [
  '补充上下文',
  '生成 Prompt',
  'AI 输出初稿',
  'Output Check',
  '版本优化',
  '保存工作流',
];

function TaskDetail({ task, onBack, onOpenWorkflow }) {
  const detail = useMemo(
    () => taskDetailContent[task?.id] ?? taskDetailContent['project-review'],
    [task?.id],
  );

  if (!task) {
    return null;
  }

  return (
    <section className="task-detail-page">
      <header className="task-detail-page__hero">
        <div className="task-detail-page__hero-copy">
          <span className="task-detail-page__eyebrow">Task Detail</span>
          <h2 className="task-detail-page__title">{task.name}</h2>
          <p className="task-detail-page__subtitle">{task.subtitle}</p>
          <p className="task-detail-page__description">{detail.summary}</p>
          <div className="task-detail-page__tags">
            {task.skillTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        <div className="task-detail-page__hero-actions">
          <Button variant="ghost" onClick={onBack}>
            返回任务库
          </Button>
          <Button onClick={() => onOpenWorkflow?.(task.id)}>开始工作流</Button>
        </div>
      </header>

      <div className="task-detail-layout">
        <div className="task-detail-layout__main">
          <Card className="task-detail-card">
            <h3 className="task-detail-card__title">任务定位</h3>
            <div className="task-detail-card__meta-grid">
              <div className="task-detail-card__meta-item">
                <span>适合谁用</span>
                <p>{detail.userRole}</p>
              </div>
              <div className="task-detail-card__meta-item">
                <span>什么时候用</span>
                <p>{detail.useMoment}</p>
              </div>
              <div className="task-detail-card__meta-item">
                <span>预计流程</span>
                <p>{task.expectedFlow}</p>
              </div>
            </div>
          </Card>

          <Card className="task-detail-card">
            <h3 className="task-detail-card__title">适用场景</h3>
            <ul className="task-detail-card__list">
              {detail.scenarios.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="task-detail-card">
            <h3 className="task-detail-card__title">建议输入内容</h3>
            <ul className="task-detail-card__list">
              {detail.inputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="task-detail-card">
            <h3 className="task-detail-card__title">预期输出</h3>
            <div className="task-detail-card__chips">
              {detail.outputs.map((item) => (
                <span key={item} className="task-detail-card__chip">
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <aside className="task-detail-layout__aside">
          <Card className="task-detail-sidecard">
            <h3 className="task-detail-sidecard__title">工作流预览</h3>
            <ol className="task-detail-sidecard__steps">
              {stepPreview.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="task-detail-sidecard">
            <h3 className="task-detail-sidecard__title">推荐 Skill</h3>
            <div className="task-detail-sidecard__tags">
              {task.skillTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <p className="task-detail-sidecard__copy">
              这些 Skill 会在执行过程中作为方法提示出现，并在任务完成后沉淀到
              Skill Records。
            </p>
          </Card>

          <Card className="task-detail-sidecard">
            <h3 className="task-detail-sidecard__title">输出检查重点</h3>
            <ul className="task-detail-sidecard__notes">
              {detail.checks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="task-detail-sidecard">
            <h3 className="task-detail-sidecard__title">使用建议</h3>
            <ul className="task-detail-sidecard__notes">
              {detail.suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </section>
  );
}

export default TaskDetail;
