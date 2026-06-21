import React, { useMemo, useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Tag from '../components/common/Tag';
import EmptyState from '../components/common/EmptyState';

const statusOrder = ['全部', '进行中', '已保存', '待优化'];

const statusClassMap = {
  进行中: 'is-progress',
  已保存: 'is-saved',
  待优化: 'is-refine',
};

function MyWorkflows({ workflows, onOpenWorkflow, onOpenWorkflowDetail }) {
  const [activeStatus, setActiveStatus] = useState('全部');

  const visibleWorkflows = useMemo(() => {
    if (activeStatus === '全部') {
      return workflows;
    }

    return workflows.filter((workflow) => workflow.status === activeStatus);
  }, [activeStatus, workflows]);

  const stats = useMemo(
    () => ({
      inProgress: 3,
      saved: 8,
      optimizable: 5,
      weeklyNew: 4,
    }),
    [],
  );

  if (!workflows.length) {
    return (
      <EmptyState
        title="还没有工作流记录"
        description="从 Workbench 或 Task Library 开始一个任务后，这里会出现可继续编辑的流程。"
      />
    );
  }

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">我的工作流</h2>
        <p className="library-page__description">
          查看正在推进、已保存和可继续优化的 AI 工作流。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">流程总览</h3>
              <span className="library-group__pill">恢复详情 + 继续编辑</span>
            </div>
            <p className="library-group__description">
              每条记录都会保留来源任务、停留步骤、关键上下文和最近一次保存状态。
            </p>
          </div>

          <div className="flowpilot-stat-grid">
            <Card className="flowpilot-stat-card">
              <span className="flowpilot-stat-card__label">进行中</span>
              <strong className="flowpilot-stat-card__value">{stats.inProgress}</strong>
              <p className="flowpilot-stat-card__note">
                还在补上下文、检查输出或生成版本的流程。
              </p>
            </Card>
            <Card className="flowpilot-stat-card">
              <span className="flowpilot-stat-card__label">已保存</span>
              <strong className="flowpilot-stat-card__value">{stats.saved}</strong>
              <p className="flowpilot-stat-card__note">
                已经沉淀，可以从当前结构继续回看和复用。
              </p>
            </Card>
            <Card className="flowpilot-stat-card">
              <span className="flowpilot-stat-card__label">待优化</span>
              <strong className="flowpilot-stat-card__value">{stats.optimizable}</strong>
              <p className="flowpilot-stat-card__note">
                已有初稿或结果，但还值得补更多版本和结论。
              </p>
            </Card>
            <Card className="flowpilot-stat-card">
              <span className="flowpilot-stat-card__label">本周新增</span>
              <strong className="flowpilot-stat-card__value">{stats.weeklyNew}</strong>
              <p className="flowpilot-stat-card__note">
                本周新增的流程沉淀和可继续处理的记录数量。
              </p>
            </Card>
          </div>
        </section>

        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">流程记录</h3>
              <span className="library-group__pill library-group__pill--soft">
                当前显示 {visibleWorkflows.length} 条
              </span>
            </div>
            <p className="library-group__description">
              优先展示这条流程目前停在什么步骤、适合从哪里继续，以及已经用过哪些 Skill。
            </p>
          </div>

          <div className="flowpilot-filter-row">
            {statusOrder.map((status) => (
              <button
                key={status}
                type="button"
                className={`flowpilot-filter-chip ${
                  activeStatus === status ? 'is-active' : ''
                }`}
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flowpilot-stack-list">
            {visibleWorkflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="flowpilot-workflow-card flowpilot-workflow-card--refined"
              >
                <div className="flowpilot-card-kicker">
                  <span className="flowpilot-card-kicker__label">Workflow Resume</span>
                  <span
                    className={`flowpilot-status-badge ${
                      statusClassMap[workflow.status] || ''
                    }`}
                  >
                    {workflow.status}
                  </span>
                </div>

                <div className="flowpilot-card-heading">
                  <div>
                    <h3 className="flowpilot-workflow-card__title">{workflow.taskName}</h3>
                    <p className="flowpilot-workflow-card__subtitle">{workflow.summary}</p>
                  </div>
                </div>

                <div className="flowpilot-workflow-card__meta-grid">
                  <div>
                    <span>当前停留</span>
                    <strong>{workflow.currentStepLabel}</strong>
                  </div>
                  <div>
                    <span>最近保存</span>
                    <strong>{workflow.savedAtLabel}</strong>
                  </div>
                  <div>
                    <span>来源入口</span>
                    <strong>{workflow.sourceLabel}</strong>
                  </div>
                </div>

                <div className="flowpilot-card-section">
                  <span className="flowpilot-card-section__label">已使用的 Skill</span>
                  <div className="flowpilot-workflow-card__tags">
                    {(workflow.skillTags ?? []).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>

                <div className="flowpilot-card-actions">
                  <Button onClick={() => onOpenWorkflow?.(workflow)}>继续编辑</Button>
                  <Button variant="ghost" onClick={() => onOpenWorkflowDetail?.(workflow.id)}>
                    查看详情
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default MyWorkflows;
