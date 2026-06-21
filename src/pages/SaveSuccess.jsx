import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Tag from '../components/common/Tag';

function SaveSuccess({
  task,
  bundle,
  onOpenResults,
  onOpenWorkflows,
  onOpenSkills,
  onBackWorkbench,
}) {
  const versions = bundle?.resultEntry?.generatedVersions ?? [];

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">保存完成</h2>
        <p className="library-page__description">
          当前任务已经完成保存，你可以继续查看结果详情、恢复工作流，或回到工作台开始下一项任务。
        </p>
      </div>

      <div className="library-list">
        <Card className="save-success-card">
          <div className="save-success-card__header">
            <div>
              <span className="save-success-card__eyebrow">Success</span>
              <h3 className="save-success-card__title">{task?.name} 已完成保存</h3>
            </div>
            <Tag>{bundle?.savedAtLabel}</Tag>
          </div>

          <p className="save-success-card__description">
            这次任务的结果、流程记录和方法记录已经同时沉淀，后续可以继续复用、生成新版本或回填恢复。
          </p>

          <div className="save-success-grid">
            <div className="save-success-panel">
              <strong>已保存到 Results Library</strong>
              <p>{bundle?.resultEntry?.title}</p>
            </div>
            <div className="save-success-panel">
              <strong>已保存到 My Workflows</strong>
              <p>{bundle?.workflowEntry?.currentStepLabel}</p>
            </div>
            <div className="save-success-panel">
              <strong>已记录到 Skill Records</strong>
              <p>{bundle?.skillRecordEntry?.records?.[0]}</p>
            </div>
          </div>

          <section className="save-success-card__section">
            <span className="save-success-card__label">本次产出版本</span>
            <div className="save-success-card__tags">
              {versions.length > 0 ? (
                versions.map((version) => <Tag key={version.id}>{version.name}</Tag>)
              ) : (
                <Tag>正式结果</Tag>
              )}
            </div>
          </section>

          <div className="save-success-card__actions">
            <Button onClick={onOpenResults}>查看结果详情</Button>
            <Button variant="ghost" onClick={onOpenWorkflows}>
              查看工作流记录
            </Button>
            <Button variant="ghost" onClick={onOpenSkills}>
              查看 Skill Records
            </Button>
            <Button variant="ghost" onClick={onBackWorkbench}>
              返回 Workbench
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default SaveSuccess;
