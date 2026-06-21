import React, { useMemo, useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Tag from '../components/common/Tag';
import EmptyState from '../components/common/EmptyState';

const resultFilters = ['全部结果', '报告', '方案', '纪要', '分析', 'PPT'];

function ResultsLibrary({
  results,
  onContinueResult,
  onCreateTemplate,
  onOpenResultDetail,
}) {
  const [activeFilter, setActiveFilter] = useState('全部结果');
  const [searchValue, setSearchValue] = useState('');

  const visibleResults = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return results.filter((result) => {
      const matchesFilter =
        activeFilter === '全部结果' ? true : result.resultType === activeFilter;
      const haystack = [
        result.title,
        result.taskName,
        result.resultType,
        result.versionLabel,
        result.qualitySummary,
      ]
        .join(' ')
        .toLowerCase();
      const matchesSearch = keyword ? haystack.includes(keyword) : true;

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, results, searchValue]);

  if (!results.length) {
    return (
      <EmptyState
        title="还没有保存的结果"
        description="完成一次工作流后，这里会沉淀报告、方案、纪要和多版本输出。"
      />
    );
  }

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">成果库</h2>
        <p className="library-page__description">
          保存已完成的报告、方案、纪要和多版本输出。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">结果列表</h3>
              <span className="library-group__pill">{visibleResults.length} 条结果</span>
            </div>
            <p className="library-group__description">
              优先展示结果用途、版本类型、质检结论和后续可复用方向，方便快速回看。
            </p>
          </div>

          <div className="flowpilot-toolbar flowpilot-toolbar--inline">
            <div className="flowpilot-filter-row">
              {resultFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`flowpilot-filter-chip ${
                    activeFilter === filter ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <label className="flowpilot-search">
              <span>搜索结果</span>
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="搜索结果名称、任务类型或版本"
              />
            </label>
          </div>

          <div className="flowpilot-page-grid flowpilot-page-grid--results">
            {visibleResults.map((result) => (
              <Card
                key={result.id}
                className="flowpilot-result-card flowpilot-result-card--refined"
              >
                <div className="flowpilot-card-kicker">
                  <span className="flowpilot-card-kicker__label">{result.resultType}</span>
                  <span className="flowpilot-card-kicker__time">{result.savedAtLabel}</span>
                </div>

                <div className="flowpilot-card-heading">
                  <div>
                    <h3 className="flowpilot-result-card__title">{result.title}</h3>
                    <p className="flowpilot-result-card__subtitle">
                      来源工作流：{result.taskName}
                    </p>
                  </div>
                </div>

                <div className="flowpilot-result-card__tags">
                  <Tag>{result.versionLabel}</Tag>
                  {(result.generatedVersions ?? []).slice(0, 2).map((version) => (
                    <Tag key={version.id}>{version.name}</Tag>
                  ))}
                </div>

                <p className="flowpilot-result-card__summary">{result.summary}</p>

                <div className="flowpilot-result-card__meta">
                  <div>
                    <span>质检备注</span>
                    <p>{result.qualitySummary}</p>
                  </div>
                  <div>
                    <span>适用对象</span>
                    <p>{result.audience}</p>
                  </div>
                  <div>
                    <span>下一步</span>
                    <p>{result.nextPlan}</p>
                  </div>
                </div>

                <div className="flowpilot-card-actions">
                  <Button variant="ghost" onClick={() => onOpenResultDetail?.(result.id)}>
                    查看详情
                  </Button>
                  <Button variant="ghost" onClick={() => onCreateTemplate?.(result)}>
                    复用为模板
                  </Button>
                  <Button onClick={() => onContinueResult?.(result)}>生成新版本</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default ResultsLibrary;
