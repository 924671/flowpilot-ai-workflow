import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Tag from '../components/common/Tag';
import EmptyState from '../components/common/EmptyState';

function ResultDetail({ result, onBack, onContinueResult, onCreateTemplate }) {
  if (!result) {
    return (
      <EmptyState
        title="还没有可查看的结果详情"
        description="请先从成果库里选择一条结果，再查看它的版本、上下文和后续复用方式。"
      />
    );
  }

  const versions =
    result.generatedVersions?.length > 0
      ? result.generatedVersions
      : [
          {
            id: 'default-version',
            name: result.versionLabel,
            scene: '当前结果已保存为可直接查看和继续复用的正式版本。',
            preview: result.summary,
          },
        ];

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">成果详情</h2>
        <p className="library-page__description">
          查看当前结果的来源工作流、版本输出、质检结论，以及可继续复用的上下文结构。
        </p>
      </div>

      <div className="library-list">
        <Card className="result-detail-card">
          <div className="result-detail-card__header">
            <div>
              <span className="result-detail-card__eyebrow">{result.resultType}</span>
              <h3 className="result-detail-card__title">{result.title}</h3>
            </div>
            <Tag>{result.versionLabel}</Tag>
          </div>

          <p className="result-detail-card__description">{result.summary}</p>

          <section className="result-detail-card__section">
            <span className="result-detail-card__label">结果信息</span>
            <div className="result-detail-card__meta">
              <p>来源工作流：{result.taskName}</p>
              <p>保存时间：{result.savedAtLabel}</p>
              <p>来源入口：{result.sourceLabel}</p>
              <p>适用对象：{result.audience}</p>
            </div>
          </section>

          <section className="result-detail-card__section">
            <span className="result-detail-card__label">质检结论</span>
            <div className="result-detail-card__panel">
              <p>{result.qualitySummary}</p>
              <p>下一步：{result.nextPlan}</p>
            </div>
          </section>

          <section className="result-detail-card__section">
            <span className="result-detail-card__label">核心上下文</span>
            <div className="result-detail-card__context">
              <p>项目名称：{result.contextValues?.projectName}</p>
              <p>任务背景：{result.contextValues?.projectBackground}</p>
              <p>任务目标：{result.contextValues?.taskGoal}</p>
              <p>数据结果：{result.contextValues?.dataResults}</p>
              <p>汇报对象：{result.contextValues?.reportAudience}</p>
            </div>
          </section>

          <section className="result-detail-card__section">
            <span className="result-detail-card__label">版本输出</span>
            <div className="result-version-list">
              {versions.map((version) => (
                <div key={version.id} className="result-version-item">
                  <strong>{version.name}</strong>
                  <span>{version.scene}</span>
                  <span>{version.preview}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="result-detail-card__actions">
            <Button variant="ghost" onClick={onBack}>
              返回成果库
            </Button>
            <Button variant="ghost" onClick={() => onCreateTemplate?.(result)}>
              复用为模板
            </Button>
            <Button onClick={() => onContinueResult?.(result)}>继续生成新版本</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default ResultDetail;
