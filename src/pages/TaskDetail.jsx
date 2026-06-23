import React from 'react';
import Card from '../components/common/Card';
import Tag from '../components/common/Tag';
import Button from '../components/common/Button';

const stepPreview = [
  '补充上下文',
  '生成 Prompt',
  'AI 协作整理',
  '输出质检',
  '版本优化',
  '保存工作流',
];

function TaskDetail({ task, onBack, onOpenWorkflow }) {
  if (!task) {
    return null;
  }

  return (
    <section className="task-detail-page">
      <header className="task-detail-page__hero">
        <div className="task-detail-page__hero-copy">
          <span className="task-detail-page__eyebrow">任务详情</span>
          <h2 className="task-detail-page__title">{task.name}</h2>
          <p className="task-detail-page__subtitle">{task.subtitle}</p>
          <p className="task-detail-page__description">
            {task.description} 这个任务会从上下文构建开始，引导用户补充背景、目标、素材、数据结果和汇报对象，再进入 Prompt、AI 协作、质检和版本优化。
          </p>
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
                <span>适用场景</span>
                <p>{task.scene}</p>
              </div>
              <div className="task-detail-card__meta-item">
                <span>预计流程</span>
                <p>{task.expectedFlow}</p>
              </div>
              <div className="task-detail-card__meta-item">
                <span>推荐 Skill</span>
                <p>{task.skillTags.join(' · ')}</p>
              </div>
            </div>
          </Card>

          <Card className="task-detail-card">
            <h3 className="task-detail-card__title">建议输入内容</h3>
            <ul className="task-detail-card__list">
              <li>任务背景、目标和最终汇报对象。</li>
              <li>已完成动作、关键素材和数据结果。</li>
              <li>遇到的问题、原因分析和下一步计划。</li>
              <li>希望输出的版本类型，例如领导汇报版、团队同步版或 PPT 大纲版。</li>
            </ul>
          </Card>

          <Card className="task-detail-card">
            <h3 className="task-detail-card__title">预期输出</h3>
            <div className="task-detail-card__chips">
              <span className="task-detail-card__chip">结构化初稿</span>
              <span className="task-detail-card__chip">质检结论</span>
              <span className="task-detail-card__chip">多版本输出</span>
              <span className="task-detail-card__chip">可复用方法记录</span>
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
            <h3 className="task-detail-sidecard__title">输出检查重点</h3>
            <ul className="task-detail-sidecard__notes">
              <li>数据是否足够支撑结论。</li>
              <li>输出对象是否明确。</li>
              <li>下一步计划是否可执行。</li>
            </ul>
          </Card>
        </aside>
      </div>
    </section>
  );
}

export default TaskDetail;
