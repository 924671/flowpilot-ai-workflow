import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import Tag from '../components/common/Tag';

function MethodArchive({ records, sections, onCreateTemplate }) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState(records[0]?.id ?? '');

  const stats = useMemo(() => {
    const totalUsageItems = records.reduce((count, item) => count + (item.records?.length ?? 0), 0);

    return {
      total: records.length,
      totalUsageItems,
      commonIssues: sections.commonIssues.length,
    };
  }, [records, sections.commonIssues.length]);

  const visibleRecords = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return records.filter((record) => {
      const haystack = [
        record.taskName,
        record.savedAtLabel,
        record.issue,
        record.suggestion,
        record.sourceLabel,
        ...(record.records ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return keyword ? haystack.includes(keyword) : true;
    });
  }, [records, searchValue]);

  const selectedRecord = useMemo(
    () => visibleRecords.find((item) => item.id === selectedRecordId) ?? visibleRecords[0] ?? records[0] ?? null,
    [records, selectedRecordId, visibleRecords],
  );

  useEffect(() => {
    if (selectedRecord) {
      setSelectedRecordId(selectedRecord.id);
    }
  }, [selectedRecord?.id]);

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">方法记录</h2>
        <p className="library-page__description">
          这里记录的不是等级，而是你在真实任务里验证过的方法使用轨迹，并且可以反向创建模板入口。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">方法总览</h3>
              <span className="library-group__pill">真实任务记录</span>
            </div>
            <p className="library-group__description">
              Skill 在这里作为方法复盘系统存在，用来记录真实任务中的使用痕迹、问题和可复用建议。
            </p>
          </div>

          <div className="results-overview-grid">
            <Card className="results-overview-card">
              <span className="results-overview-card__label">已记录任务</span>
              <strong className="results-overview-card__value">{stats.total}</strong>
              <p className="results-overview-card__note">每条记录都对应一次真实 workflow 的保存结果。</p>
            </Card>

            <Card className="results-overview-card">
              <span className="results-overview-card__label">方法使用条目</span>
              <strong className="results-overview-card__value">{stats.totalUsageItems}</strong>
              <p className="results-overview-card__note">包含上下文表达、输出质检和版本优化等具体使用动作。</p>
            </Card>

            <Card className="results-overview-card">
              <span className="results-overview-card__label">常见问题样本</span>
              <strong className="results-overview-card__value">{stats.commonIssues}</strong>
              <p className="results-overview-card__note">这些问题会在复盘时提醒你下次先处理风险项。</p>
            </Card>
          </div>

          <div className="library-group__toolbar">
            <div className="library-group__toolbar-copy">
              <strong>{visibleRecords.length} 条 Skill 记录</strong>
              <span>支持搜索任务名、使用记录、问题和建议。</span>
            </div>

            <div className="results-filter-tabs">
              <Tag>方法总览</Tag>
              <Tag>最近使用</Tag>
              <Tag>可复用建议</Tag>
            </div>
          </div>

          <div className="template-filters">
            <div className="template-filters__tabs">
              {sections.commonSkills.map((skill) => (
                <Tag key={skill.title}>{skill.title}</Tag>
              ))}
            </div>

            <label className="template-filters__search">
              <span>搜索记录</span>
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="搜索任务名、Skill 使用记录、问题或建议"
              />
            </label>
          </div>

          {records.length === 0 ? (
            <EmptyState
              title="还没有最近使用记录"
              description="完成并保存一次工作流后，这里会出现真实任务中的 Skill 使用记录。"
            />
          ) : visibleRecords.length === 0 ? (
            <Card className="template-empty-state">
              <h4 className="template-empty-state__title">没有符合搜索条件的 Skill 记录</h4>
              <p className="template-empty-state__description">可以清空搜索词后重新查看全部记录。</p>
            </Card>
          ) : (
            <div className="results-library-layout">
              <div className="results-library-layout__list">
                {visibleRecords.map((record) => {
                  const isSelected = selectedRecord?.id === record.id;

                  return (
                    <Card
                      key={record.id}
                      className={`skill-record-card ${isSelected ? 'skill-record-card--selected' : ''}`}
                    >
                      <button
                        type="button"
                        className="skill-record-card__surface"
                        onClick={() => setSelectedRecordId(record.id)}
                      >
                        <div className="skill-record-card__header">
                          <div>
                            <h3 className="skill-record-card__title">{record.taskName}</h3>
                            <p className="skill-record-card__subtitle">{record.savedAtLabel} ? {record.sourceLabel}</p>
                          </div>
                        </div>

                        <ul className="skill-record-card__list">
                          {(record.records ?? []).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>

                        <div className="skill-record-card__meta">
                          <span>常见问题：{record.issue}</span>
                          <span>可复用建议：{record.suggestion}</span>
                        </div>
                      </button>

                      <div className="skill-record-card__actions">
                        <Button onClick={() => onCreateTemplate?.(record)}>创建模板入口</Button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <aside className="results-library-layout__detail">
                {selectedRecord && (
                  <Card className="skill-detail-card">
                    <div className="skill-detail-card__header">
                      <div>
                        <span className="skill-detail-card__eyebrow">方法复盘</span>
                        <h3 className="skill-detail-card__title">{selectedRecord.taskName}</h3>
                      </div>
                      <Tag>{selectedRecord.savedAtLabel}</Tag>
                    </div>

                    <p className="skill-detail-card__description">这里复盘的是这次真实任务中哪些方法真正发挥了作用，以及哪些问题下次应该提前规避。</p>

                    <div className="skill-detail-card__section">
                      <span className="skill-detail-card__label">最近使用</span>
                      <ul className="skill-detail-card__bullet-list">
                        {(selectedRecord.records ?? []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="skill-detail-card__section">
                      <span className="skill-detail-card__label">常见 Skill</span>
                      <div className="skill-detail-card__skill-grid">
                        {sections.commonSkills.map((skill) => (
                          <div key={skill.title} className="skill-detail-card__skill-item">
                            <strong>{skill.title}</strong>
                            <span>{skill.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="skill-detail-card__section">
                      <span className="skill-detail-card__label">常见问题</span>
                      <div className="skill-detail-card__panel">
                        <p>{selectedRecord.issue}</p>
                        <ul className="skill-detail-card__bullet-list">
                          {sections.commonIssues.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="skill-detail-card__section">
                      <span className="skill-detail-card__label">可复用建议</span>
                      <div className="skill-detail-card__panel">
                        <p>{selectedRecord.suggestion}</p>
                        <ul className="skill-detail-card__bullet-list">
                          {sections.reusableSuggestions.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="skill-detail-card__section">
                      <span className="skill-detail-card__label">模板回流说明</span>
                      <div className="skill-detail-card__context">
                        <p>
                          <strong>项目名称：</strong>
                          {selectedRecord.contextValues?.projectName}
                        </p>
                        <p>
                          <strong>上次停留步骤：</strong>
                          {selectedRecord.contextValues?.lastStepLabel}
                        </p>
                        <p>
                          <strong>存储时间：</strong>
                          {selectedRecord.savedAtLabel}
                        </p>
                      </div>
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

export default MethodArchive;
