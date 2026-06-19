import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import Tag from '../components/common/Tag';

function MyWorkflows({ workflows, onOpenWorkflow }) {
  const [searchValue, setSearchValue] = useState('');
  const [filterKey, setFilterKey] = useState('all');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(workflows[0]?.id ?? '');

  const stats = useMemo(() => {
    const totalVersions = workflows.reduce(
      (count, item) => count + (item.generatedVersions?.length ?? 0),
      0,
    );
    const completedCount = workflows.filter(
      (item) => item.currentStepId === 'save-result',
    ).length;

    return {
      total: workflows.length,
      totalVersions,
      completedCount,
    };
  }, [workflows]);

  const visibleWorkflows = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return workflows.filter((workflow) => {
      const haystack = [
        workflow.taskName,
        workflow.summary,
        workflow.currentStepLabel,
        workflow.sourceLabel,
        workflow.contextValues?.projectName,
        ...(workflow.generatedVersions ?? []).map((item) => item.name),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = keyword ? haystack.includes(keyword) : true;
      const matchesFilter =
        filterKey === 'all'
          ? true
          : filterKey === 'save-result'
            ? workflow.currentStepId === 'save-result'
            : workflow.currentStepId !== 'save-result';

      return matchesSearch && matchesFilter;
    });
  }, [filterKey, searchValue, workflows]);

  const selectedWorkflow = useMemo(
    () =>
      visibleWorkflows.find((item) => item.id === selectedWorkflowId) ??
      visibleWorkflows[0] ??
      workflows[0] ??
      null,
    [selectedWorkflowId, visibleWorkflows, workflows],
  );

  useEffect(() => {
    if (selectedWorkflow) {
      setSelectedWorkflowId(selectedWorkflow.id);
    }
  }, [selectedWorkflow?.id]);

  if (workflows.length === 0) {
    return (
      <EmptyState
        title="还没有沉淀下来的工作流"
        description="先完成一次真实任务，再把可复用的方法结构保存到这里。"
      />
    );
  }

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">我的工作流</h2>
        <p className="library-page__description">
          每条记录都保留了上次保存时所在的步骤、上下文和已生成版本，你可以从这里直接恢复并继续编辑。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">流程总览</h3>
              <span className="library-group__pill">继续编辑</span>
            </div>
            <p className="library-group__description">
              这里沉淀的是一次次真实任务执行后的流程记录，而不是单次聊天历史。
            </p>
          </div>

          <div className="results-overview-grid">
            <Card className="results-overview-card">
              <span className="results-overview-card__label">已保存流程</span>
              <strong className="results-overview-card__value">{stats.total}</strong>
              <p className="results-overview-card__note">
                每条都可恢复到上次停留的步骤继续处理。
              </p>
            </Card>

            <Card className="results-overview-card">
              <span className="results-overview-card__label">已生成版本</span>
              <strong className="results-overview-card__value">
                {stats.totalVersions}
              </strong>
              <p className="results-overview-card__note">
                包含汇报版、同步版、PPT 大纲版等扩写结果。
              </p>
            </Card>

            <Card className="results-overview-card">
              <span className="results-overview-card__label">已走完整链路</span>
              <strong className="results-overview-card__value">
                {stats.completedCount}
              </strong>
              <p className="results-overview-card__note">
                这些记录已经完成保存，可继续回填优化。
              </p>
            </Card>
          </div>

          <div className="library-group__toolbar">
            <div className="library-group__toolbar-copy">
              <strong>{visibleWorkflows.length} 条流程记录</strong>
              <span>支持搜索任务名称、项目名、停留步骤与来源。</span>
            </div>

            <div className="results-filter-tabs">
              <button
                type="button"
                className={`template-filters__tab ${filterKey === 'all' ? 'is-active' : ''}`}
                onClick={() => setFilterKey('all')}
              >
                全部
              </button>
              <button
                type="button"
                className={`template-filters__tab ${filterKey === 'save-result' ? 'is-active' : ''}`}
                onClick={() => setFilterKey('save-result')}
              >
                已完成保存
              </button>
              <button
                type="button"
                className={`template-filters__tab ${filterKey === 'in-progress' ? 'is-active' : ''}`}
                onClick={() => setFilterKey('in-progress')}
              >
                处理中
              </button>
            </div>
          </div>

          <div className="template-filters">
            <div className="template-filters__tabs">
              <Tag>恢复上下文</Tag>
              <Tag>继续优化</Tag>
              <Tag>延续版本</Tag>
            </div>

            <label className="template-filters__search">
              <span>搜索流程</span>
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="搜索任务名、项目名、停留步骤或来源"
              />
            </label>
          </div>

          {visibleWorkflows.length === 0 ? (
            <Card className="template-empty-state">
              <h4 className="template-empty-state__title">没有符合条件的流程记录</h4>
              <p className="template-empty-state__description">
                可以切换筛选或清空搜索词后重新查看。
              </p>
            </Card>
          ) : (
            <div className="results-library-layout">
              <div className="results-library-layout__list">
                {visibleWorkflows.map((workflow) => {
                  const isSelected = selectedWorkflow?.id === workflow.id;

                  return (
                    <Card
                      key={workflow.id}
                      className={`workflow-record workflow-record--selected-${isSelected ? 'yes' : 'no'} ${isSelected ? 'workflow-record--selected' : ''}`}
                    >
                      <button
                        type="button"
                        className="workflow-record__surface"
                        onClick={() => setSelectedWorkflowId(workflow.id)}
                      >
                        <div className="workflow-record__main">
                          <div>
                            <h3 className="workflow-record__title">{workflow.taskName}</h3>
                            <p className="workflow-record__summary">{workflow.summary}</p>
                            <p className="workflow-record__hint">
                              上次停留：{workflow.currentStepLabel} · {workflow.sourceLabel}
                            </p>
                          </div>

                          <div className="workflow-record__meta">
                            <span>{workflow.savedAtLabel}</span>
                            <span>{workflow.generatedVersions.length} 个版本输出</span>
                          </div>
                        </div>

                        <div className="workflow-record__tags">
                          <Tag>{workflow.currentStepLabel}</Tag>
                          {(workflow.generatedVersions ?? []).slice(0, 3).map((version) => (
                            <Tag key={version.id}>{version.name}</Tag>
                          ))}
                        </div>
                      </button>

                      <div className="workflow-record__actions">
                        <Button onClick={() => onOpenWorkflow?.(workflow)}>
                          继续编辑
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <aside className="results-library-layout__detail">
                {selectedWorkflow && (
                  <Card className="workflow-detail-card">
                    <div className="workflow-detail-card__header">
                      <div>
                        <span className="workflow-detail-card__eyebrow">
                          Workflow Resume
                        </span>
                        <h3 className="workflow-detail-card__title">
                          {selectedWorkflow.taskName}
                        </h3>
                      </div>
                      <Tag>{selectedWorkflow.currentStepLabel}</Tag>
                    </div>

                    <p className="workflow-detail-card__description">
                      这条流程记录保留了当前任务的上下文、扩写版本和上次停留位置，可以直接恢复继续推进。
                    </p>

                    <div className="workflow-detail-card__section">
                      <span className="workflow-detail-card__label">恢复信息</span>
                      <div className="workflow-detail-card__meta">
                        <span>项目名称：{selectedWorkflow.contextValues?.projectName}</span>
                        <span>停留步骤：{selectedWorkflow.currentStepLabel}</span>
                        <span>保存时间：{selectedWorkflow.savedAtLabel}</span>
                        <span>来源：{selectedWorkflow.sourceLabel}</span>
                      </div>
                    </div>

                    <div className="workflow-detail-card__section">
                      <span className="workflow-detail-card__label">流程摘要</span>
                      <div className="workflow-detail-card__panel">
                        <p>{selectedWorkflow.summary}</p>
                      </div>
                    </div>

                    <div className="workflow-detail-card__section">
                      <span className="workflow-detail-card__label">当前上下文</span>
                      <div className="workflow-detail-card__context">
                        <p>
                          <strong>任务目标：</strong>
                          {selectedWorkflow.contextValues?.taskGoal}
                        </p>
                        <p>
                          <strong>数据结果：</strong>
                          {selectedWorkflow.contextValues?.dataResults}
                        </p>
                        <p>
                          <strong>下一步计划：</strong>
                          {selectedWorkflow.contextValues?.nextPlan}
                        </p>
                      </div>
                    </div>

                    <div className="workflow-detail-card__section">
                      <span className="workflow-detail-card__label">已沉淀版本</span>
                      <div className="result-version-list">
                        {(selectedWorkflow.generatedVersions ?? []).map((version) => (
                          <div key={version.id} className="result-version-item">
                            <strong>{version.name}</strong>
                            <span>{version.scene}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="workflow-detail-card__actions">
                      <Button onClick={() => onOpenWorkflow?.(selectedWorkflow)}>
                        从这里继续编辑
                      </Button>
                    </div>
                  </Card>
                )}
              </aside>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default MyWorkflows;
