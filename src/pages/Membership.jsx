import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const planOverview = [
  {
    label: '核心定位',
    value: '工作流工具',
    note: '围绕真实任务入口、上下文构建、结果质检和方法沉淀展开。',
  },
  {
    label: '重点能力',
    value: '结果沉淀',
    note: '支持多版本输出、Skill Records 复盘和模板回填恢复。',
  },
  {
    label: '适用对象',
    value: 'AI 新手职场者',
    note: '适合需要快速把真实工作任务接入 AI，但缺少稳定方法结构的人。',
  },
];

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '¥0 / 月',
    audience: '刚开始把 AI 用在真实任务中的个人用户',
    quota: '每月 12 次工作流 / 20 条结果保存',
    features: [
      '6 个高频任务入口',
      '基础 Context Builder 与 Prompt Preview',
      '基础结果保存与 Skill Records 记录',
    ],
    note: '适合先把任务入口、上下文补全和基础输出流程跑顺。',
    action: '当前方案',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '¥49 / 月',
    audience: '高频处理汇报、方案、纪要和分析任务的个人用户',
    quota: '每月 80 次工作流 / 200 条结果保存',
    features: [
      '多版本生成与继续编辑',
      'Skill Records 深度复盘',
      '自定义工作流模板与模板回填恢复',
    ],
    note: '适合把一次性任务逐步沉淀成稳定的个人工作方法。',
    action: '推荐方案',
    featured: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '¥149 / 月',
    audience: '需要共享方法模板、统一输出结构的小团队',
    quota: '每月 300 次工作流 / 团队共享结果库',
    features: [
      '团队共享模板入口',
      '统一版本输出口径',
      '共享 Skill Records 和可复用建议',
    ],
    note: '强调方法复用和协作口径统一，而不是做成重型后台系统。',
    action: '适合团队试用',
    featured: false,
  },
];

const capabilityGroups = [
  {
    title: '任务进入与上下文构建',
    description: '从高频工作任务开始，而不是从空白聊天框开始。',
    coverage: {
      free: '支持',
      pro: '支持',
      team: '支持',
    },
  },
  {
    title: '结果保存与继续编辑',
    description: '支持把进行中的流程和已生成结果继续回填、恢复和扩写。',
    coverage: {
      free: '基础保存',
      pro: '完整支持',
      team: '完整支持',
    },
  },
  {
    title: '模板沉淀与模板回流',
    description: '把上下文结构、版本输出和 Skill 记录反向沉淀为下次入口。',
    coverage: {
      free: '不强调',
      pro: '支持',
      team: '重点能力',
    },
  },
  {
    title: 'Skill Records 方法复盘',
    description: '记录真实任务中使用过的方法，帮助用户持续优化工作方式。',
    coverage: {
      free: '支持',
      pro: '支持',
      team: '支持',
    },
  },
];

const faqs = [
  {
    question: '为什么 Membership 不是等级页？',
    answer:
      'FlowPilot 的 Membership 用来说明不同方案覆盖的能力范围，而不是构建等级、积分或成长体系。',
  },
  {
    question: 'Pro 和 Team 的差别是什么？',
    answer:
      'Pro 更关注个人高频复用，Team 更强调团队内部共享模板、统一输出结构和方法沉淀口径。',
  },
  {
    question: '这页会接入支付或注册吗？',
    answer:
      '当前原型阶段不接入真实支付、登录或权限控制，这一页只展示商业化结构和能力层级。',
  },
];

function Membership() {
  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">会员方案</h2>
        <p className="library-page__description">
          升级后获得更多工作流额度、版本生成和结果沉淀能力。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">方案概览</h3>
              <span className="library-group__pill">非等级体系</span>
            </div>
            <p className="library-group__description">
              这里展示的是能力覆盖和适用场景，不包含等级、积分、徽章或任何游戏化成长机制。
            </p>
          </div>

          <div className="results-overview-grid">
            {planOverview.map((item) => (
              <Card key={item.label} className="results-overview-card">
                <span className="results-overview-card__label">{item.label}</span>
                <strong className="results-overview-card__value">{item.value}</strong>
                <p className="results-overview-card__note">{item.note}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">方案选择</h3>
              <span className="library-group__pill library-group__pill--soft">
                浅色专业风格
              </span>
            </div>
            <p className="library-group__description">
              页面重点展示商业化结构和能力差异，不做高饱和销售感，也不引入支付流程。
            </p>
          </div>

          <div className="flowpilot-page-grid flowpilot-page-grid--pricing">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flowpilot-pricing-card ${plan.featured ? 'is-featured' : ''}`}
              >
                <div className="flowpilot-pricing-card__top">
                  <div>
                    <h3 className="flowpilot-pricing-card__title">{plan.name}</h3>
                    <p className="flowpilot-pricing-card__price">{plan.price}</p>
                  </div>
                  {plan.featured && <span className="flowpilot-pricing-card__badge">Pro</span>}
                </div>

                <div className="flowpilot-pricing-card__block">
                  <span className="flowpilot-pricing-card__label">适合人群</span>
                  <p className="flowpilot-pricing-card__audience">{plan.audience}</p>
                </div>

                <div className="flowpilot-pricing-card__block">
                  <span className="flowpilot-pricing-card__label">使用额度</span>
                  <p className="flowpilot-pricing-card__quota">{plan.quota}</p>
                </div>

                <div className="flowpilot-pricing-card__block">
                  <span className="flowpilot-pricing-card__label">功能列表</span>
                  <ul className="flowpilot-pricing-card__features">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <p className="flowpilot-pricing-card__note">{plan.note}</p>

                <Button variant={plan.featured ? 'primary' : 'ghost'}>{plan.action}</Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">能力覆盖</h3>
              <span className="library-group__pill library-group__pill--soft">
                对应产品流程
              </span>
            </div>
            <p className="library-group__description">
              三档方案都围绕同一条工作流链路，只是在沉淀深度、模板能力和共享范围上有所差异。
            </p>
          </div>

          <div className="membership-coverage-grid">
            {capabilityGroups.map((group) => (
              <Card key={group.title} className="membership-card membership-card--coverage">
                <h3 className="membership-card__title">{group.title}</h3>
                <p className="membership-card__description">{group.description}</p>

                <div className="membership-coverage-list">
                  <div className="membership-coverage-row">
                    <strong>Free</strong>
                    <span>{group.coverage.free}</span>
                  </div>
                  <div className="membership-coverage-row">
                    <strong>Pro</strong>
                    <span>{group.coverage.pro}</span>
                  </div>
                  <div className="membership-coverage-row">
                    <strong>Team</strong>
                    <span>{group.coverage.team}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">常见问题</h3>
              <span className="library-group__pill library-group__pill--soft">
                页面边界说明
              </span>
            </div>
          </div>

          <div className="membership-faq-grid">
            {faqs.map((item) => (
              <Card key={item.question} className="membership-card membership-card--faq">
                <h3 className="membership-card__title">{item.question}</h3>
                <p className="membership-card__description">{item.answer}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Membership;
