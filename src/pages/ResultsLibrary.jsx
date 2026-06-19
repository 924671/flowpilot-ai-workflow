import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import Tag from '../components/common/Tag';
import Button from '../components/common/Button';

function ResultsLibrary({ results, onContinueResult, onCreateTemplate }) {
  const [searchValue, setSearchValue] = useState('');
  const [filterKey, setFilterKey] = useState('all');
  const [selectedResultId, setSelectedResultId] = useState(results[0]?.id ?? '');

  const stats = useMemo(() => {
    const totalVersions = results.reduce(
      (count, item) => count + (item.generatedVersions?.length ?? 0),
      0,
    );
    const riskCount = results.filter((item) =>
      item.qualitySummary?.includes('需关注') ||
      item.qualitySummary?.includes('风险'),
    ).length;

    return {
      total: results.length,
      totalVersions,
      riskCount,
    };
  }, [results]);

  const visibleResults = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return results.filter((result) => {
      const haystack = [
        result.title,
        result.taskName,
        result.audience,
        result.summary,
        result.nextPlan,
        result.qualitySummary,
        result.sourceLabel,
        ...(result.generatedVersions ?? []).map((item) => item.name),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = keyword ? haystack.includes(keyword) : true;
      const matchesFilter =
        filterKey === 'all'
          ? true
          : filterKey === 'risk'
            ? result.qualitySummary?.includes('需关注') ||
              result.qualitySummary?.includes('风险')
            : (result.generatedVersions?.length ?? 0) >= 2;

      return matchesSearch && matchesFilter;
    });
  }, [filterKey, results, searchValue]);

  const selectedResult = useMemo(
    () =>
      visibleResults.find((item) => item.id === selectedResultId) ??
      visibleResults[0] ??
      results[0] ??
      null,
    [results, selectedResultId, visibleResults],
  );

  useEffect(() => {
    if (selectedResult) {
      setSelectedResultId(selectedResult.id);
    }
  }, [selectedResult?.id]);

  if (results.length === 0) {
    return (
      <EmptyState
        title="还没有保存的结果"
        description="完成一次工作流后，结果版本、质检结论和后续动作会沉淀到这里。"
      />
    );
  }

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">结果库</h2>
        <p className="library-page__description">
          每条结果都保留了上下文、版本输出与质检结论。你可以从这里继续生成新版本，也可以反向沉淀为模板入口。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">结果总览</h3>
              <span className="library-group__pill">本地持久化</span>
            </div>
            <p className="library-group__description">
              这里展示已经沉淀下来的任务结果，可直接回填到工作流继续优化。
            </p>
          </div>

          <div className="results-overview-grid">
            <Card className="results-overview-card">
              <span className="results-overview-card__label">已保存结果</span>
              <strong className="results-overview-card__value">{stats.total}</strong>
              <p className="results-overview-card__note">
                覆盖真实任务结果、版本产出与后续建议。
              </p>
            </Card>

            <Card className="results-overview-card">
              <span className="results-overview-card__label">已生成版本</span>
              <strong className="results-overview-card__value">
                {stats.totalVersions}
              </strong>
              <p className="results-overview-card__note">
                支持继续扩写为汇报版、同步版或摘要版。
              </p>
            </Card>

            <Card className="results-overview-card">
              <span className="results-overview-card__label">待继续优化</span>
              <strong className="results-overview-card__value">
                {stats.riskCount}
              </strong>
              <p className="results-overview-card__note">
                这些结果还提示了需补充的信息或存在风险的部分。
              </p>
            </Card>
          </div>

          <div className="library-group__toolbar">
            <div className="library-group__toolbar-copy">
              <strong>{visibleResults.length} 条结果记录</strong>
              <span>支持搜索任务名、汇报对象、来源和版本名称。</span>
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
                className={`template-filters__tab ${filterKey === 'multi-version' ? 'is-active' : ''}`}
                onClick={() => setFilterKey('multi-version')}
              >
                多版本
              </button>
              <button
                type="button"
                className={`template-filters__tab ${filterKey === 'risk' ? 'is-active' : ''}`}
                onClick={() => setFilterKey('risk')}
              >
                需关注
              </button>
            </div>
          </div>

          <div className="template-filters">
            <div className="template-filters__tabs">
              <Tag>继续编辑</Tag>
              <Tag>生成新版本</Tag>
              <Tag>沉淀模板</Tag>
            </div>

            <label className="template-filters__search">
              <span>搜索结果</span>
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="搜索任务名称、汇报对象、版本名称或来源"
              />
            </label>
          </div>

          {visibleResults.length === 0 ? (
            <Card className="template-empty-state">
              <h4 className="template-empty-state__title">没有符合当前筛选的结果</h4>
              <p className="template-empty-state__description">
                可以切换筛选标签，或清空搜索词后重新查看。
              </p>
            </Card>
          ) : (
            <div className="results-library-layout">
              <div className="results-library-layout__list">
                {visibleResults.map((result) => {
                  const versionCount = result.generatedVersions?.length ?? 0;
                  const isSelected = selectedResult?.id === result.id;

                  return (
                    <Card
                      key={result.id}
                      className={`result-record ${isSelected ? 'result-record--selected' : ''}`}
                    >
                      <button
                        type="button"
                        className="result-record__surface"
                        onClick={() => setSelectedResultId(result.id)}
                      >
                        <div className="result-record__header">
                          <div>
                            <h3 className="result-record__title">{result.title}</h3>
                            <p className="result-record__subtitle">
                              {result.taskName} · {result.audience}
                            </p>
                          </div>
                          <span className="result-record__time">{result.savedAtLabel}</span>
                        </div>

                        <p className="result-record__summary">{result.summary}</p>
                        <p className="result-record__quality">{result.qualitySummary}</p>
                        <p className="result-record__hint">
                          恢复位置：{result.currentStepLabel} · 来源：{result.sourceLabel}
                        </p>

                        <div className="result-record__meta">
                          <span>版本数量：{versionCount}</span>
                          <span>下一步：{result.nextPlan}</span>
                        </div>

                        <div className="result-record__tags">
                          {(result.generatedVersions ?? []).map((version) => (
                            <Tag key={version.id}>{version.name}</Tag>
                          ))}
                        </div>
                      </button>

                      <div className="result-record__actions result-record__actions--split">
                        <Button onClick={() => onContinueResult?.(result)}>
                          基于结果生成新版本
                        </Button>
                        <Button variant="ghost" onClick={() => onCreateTemplate?.(result)}>
                          沉淀为模板入口
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <aside className="results-library-layout__detail">
                {selectedResult && (
                  <Card className="result-detail-card">
                    <div className="result-detail-card__header">
                      <div>
                        <span className="result-detail-card__eyebrow">Selected Result</span>
                        <h3 className="result-detail-card__title">{selectedResult.title}</h3>
                      </div>
                      <Tag>{selectedResult.taskName}</Tag>
                    </div>

                    <p className="result-detail-card__description">
                      这条记录保留了任务上下文、当前输出和可继续扩展的版本入口，适合直接回填恢复。
                    </p>

                    <div className="result-detail-card__section">
                      <span className="result-detail-card__label">关键信息</span>
                      <div className="result-detail-card__meta">
                        <span>汇报对象：{selectedResult.audience}</span>
                        <span>保存时间：{selectedResult.savedAtLabel}</span>
                        <span>恢复步骤：{selectedResult.currentStepLabel}</span>
                        <span>来源：{selectedResult.sourceLabel}</span>
                      </div>
                    </div>

                    <div className="result-detail-card__section">
                      <span className="result-detail-card__label">结果摘要</span>
                      <div className="result-detail-card__panel">
                        <p>{selectedResult.summary}</p>
                        <p>{selectedResult.qualitySummary}</p>
                      </div>
                    </div>

                    <div className="result-detail-card__section">
                      <span className="result-detail-card__label">下一步计划</span>
                      <div className="result-detail-card__panel">
                        <p>{selectedResult.nextPlan}</p>
                      </div>
                    </div>

                    <div className="result-detail-card__section">
                      <span className="result-detail-card__label">可继续复用的版本</span>
                      <div className="result-version-list">
                        {(selectedResult.generatedVersions ?? []).map((version) => (
                          <div key={version.id} className="result-version-item">
                            <strong>{version.name}</strong>
                            <span>{version.scene}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="result-detail-card__section">
                      <span className="result-detail-card__label">已保存上下文</span>
                      <div className="result-detail-card__context">
                        <p>
                          <strong>项目名称：</strong>
                          {selectedResult.contextValues?.projectName}
                        </p>
                        <p>
                          <strong>项目目标：</strong>
                          {selectedResult.contextValues?.taskGoal}
                        </p>
                        <p>
                          <strong>数据结果：</strong>
                          {selectedResult.contextValues?.dataResults}
                        </p>
                      </div>
                    </div>

                    <div className="result-detail-card__actions">
                      <Button onClick={() => onContinueResult?.(selectedResult)}>
                        继续编辑这个结果
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => onCreateTemplate?.(selectedResult)}
                      >
                        生成模板入口
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

export default ResultsLibrary;
