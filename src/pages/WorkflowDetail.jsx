import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Tag from '../components/common/Tag';
import EmptyState from '../components/common/EmptyState';

function WorkflowDetail({ workflow, onBack, onResumeWorkflow, onOpenLinkedResult }) {
  if (!workflow) {
    return (
      <EmptyState
        title="还没有可查看的工作流详情"
        description="请先从 My Workflows 里选择一条记录，再查看它停留在哪一步、用过哪些方法，以及如何继续编辑。"
      />
    );
  }

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">Workflow Detail</h2>
        <p className="library-page__description">
          查看当前工作流保留下来的上下文、步骤位置、版本输出和下一次继续编辑的入口。
        </p>
      </div>

      <div className="library-list">
        <Card className="workflow-detail-card">
          <div className="workflow-detail-card__header">
            <div>
              <span className="workflow-detail-card__eyebrow">Workflow Resume</span>
              <h3 className="workflow-detail-card__title">{workflow.taskName}</h3>
            </div>
            <Tag>{workflow.status}</Tag>
          </div>

          <p className="workflow-detail-card__description">{workflow.summary}</p>

          <section className="workflow-detail-card__section">
            <span className="workflow-detail-card__label">流程信息</span>
            <div className="workflow-detail-card__meta">
              <p>当前停留：{workflow.currentStepLabel}</p>
              <p>最近保存：{workflow.savedAtLabel}</p>
              <p>来源入口：{workflow.sourceLabel}</p>
            </div>
          </section>

          <section className="workflow-detail-card__section">
            <span className="workflow-detail-card__label">已使用的 Skill</span>
            <div className="workflow-detail-card__panel">
              {(workflow.skillTags ?? []).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </section>

          <section className="workflow-detail-card__section">
            <span className="workflow-detail-card__label">上下文快照</span>
            <div className="workflow-detail-card__context">
              <p>项目名称：{workflow.contextValues?.projectName}</p>
              <p>任务目标：{workflow.contextValues?.taskGoal}</p>
              <p>执行动作：{workflow.contextValues?.executionActions}</p>
              <p>数据结果：{workflow.contextValues?.dataResults}</p>
              <p>下一步计划：{workflow.contextValues?.nextPlan}</p>
            </div>
          </section>

          <section className="workflow-detail-card__section">
            <span className="workflow-detail-card__label">已生成版本</span>
            <div className="workflow-detail-card__panel">
              {(workflow.generatedVersions?.length ?? 0) > 0 ? (
                workflow.generatedVersions.map((version) => (
                  <p key={version.id}>
                    {version.name}：{version.preview}
                  </p>
                ))
              ) : (
                <p>当前还没有生成额外版本，适合从 Version Optimization 继续扩写。</p>
              )}
            </div>
          </section>

          <div className="workflow-detail-card__actions">
            <Button variant="ghost" onClick={onBack}>
              返回 My Workflows
            </Button>
            <Button variant="ghost" onClick={() => onOpenLinkedResult?.(workflow)}>
              查看关联结果
            </Button>
            <Button onClick={() => onResumeWorkflow?.(workflow)}>继续编辑</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default WorkflowDetail;
