import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/common/Card';
import Tag from '../components/common/Tag';
import Button from '../components/common/Button';
import {
  buildTemplateExportPayload,
  getTemplateSourceBadge,
} from '../data/templateEntries';

function TemplateCompareCard({ template, slotLabel, onRemove }) {
  if (!template) {
    return (
      <div className="template-compare-card template-compare-card--empty">
        <strong>{slotLabel}</strong>
        <p>从左侧模板列表中加入一个模板后，这里会显示对比内容。</p>
      </div>
    );
  }

  return (
    <div className="template-compare-card">
      <div className="template-compare-card__top">
        <div>
          <strong>{slotLabel}</strong>
          <h4>{template.title}</h4>
        </div>
        <button type="button" className="template-compare-card__remove" onClick={onRemove}>
          移除
        </button>
      </div>

      <p className="template-compare-card__description">{template.description}</p>

      <div className="template-compare-card__meta">
        <span>来源：{template.sourceLabel}</span>
        <span>项目：{template.contextValues.projectName}</span>
        <span>版本数：{template.generatedVersions.length}</span>
      </div>
    </div>
  );
}

function TaskLibrary({
  tasks,
  templates,
  onOpenWorkflow,
  onOpenTemplate,
  onDeleteTemplate,
  onRenameTemplate,
  onToggleTemplatePinned,
  onUpdateTemplateTags,
  onRollbackTemplate,
  onImportTemplate,
  onBatchDeleteTemplates,
  onBatchPinTemplates,
  onResetLocalData,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [templateTab, setTemplateTab] = useState('all');
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id ?? '');
  const [compareIds, setCompareIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [renameDraft, setRenameDraft] = useState('');
  const [tagDraft, setTagDraft] = useState('');
  const [importDraft, setImportDraft] = useState('');

  const templateStats = useMemo(
    () => ({
      all: templates.length,
      recent: templates.filter((item) => item.lastUsedAtLabel).length,
      frequent: templates.filter((item) => (item.usageCount ?? 0) >= 2).length,
      pinned: templates.filter((item) => item.isPinned).length,
    }),
    [templates],
  );

  const visibleTemplates = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesTab =
        templateTab === 'all'
          ? true
          : templateTab === 'recent'
            ? Boolean(template.lastUsedAtLabel)
            : templateTab === 'pinned'
              ? Boolean(template.isPinned)
              : (template.usageCount ?? 0) >= 2;

      const haystack = [
        template.title,
        template.taskName,
        template.description,
        template.contextValues.projectName,
        template.sourceLabel,
        ...(template.tags ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = keyword ? haystack.includes(keyword) : true;

      return matchesTab && matchesSearch;
    });
  }, [searchValue, templateTab, templates]);

  const selectedTemplate = useMemo(
    () =>
      templates.find((item) => item.id === selectedTemplateId) ??
      visibleTemplates[0] ??
      templates[0] ??
      null,
    [selectedTemplateId, templates, visibleTemplates],
  );

  const compareTemplates = useMemo(
    () => compareIds.map((id) => templates.find((item) => item.id === id) ?? null),
    [compareIds, templates],
  );

  useEffect(() => {
    if (selectedTemplate) {
      setRenameDraft(selectedTemplate.title);
    }
  }, [selectedTemplate?.id]);

  const handleSelectTemplate = (template) => {
    setSelectedTemplateId(template.id);
    setRenameDraft(template.title);
  };

  const handleToggleCompare = (templateId) => {
    setCompareIds((prevIds) => {
      if (prevIds.includes(templateId)) {
        return prevIds.filter((id) => id !== templateId);
      }

      if (prevIds.length >= 2) {
        return [prevIds[1], templateId];
      }

      return [...prevIds, templateId];
    });
  };

  const handleToggleBatchSelection = (templateId) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(templateId)
        ? prevIds.filter((id) => id !== templateId)
        : [...prevIds, templateId],
    );
  };

  const handleSelectAllVisible = () => {
    const visibleIds = visibleTemplates.map((item) => item.id);

    setSelectedIds((prevIds) =>
      visibleIds.every((id) => prevIds.includes(id))
        ? prevIds.filter((id) => !visibleIds.includes(id))
        : Array.from(new Set([...prevIds, ...visibleIds])),
    );
  };

  const handleExportTemplate = async (template) => {
    const payload = buildTemplateExportPayload(template);
    const content = JSON.stringify(payload, null, 2);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(content);
      }
    } catch (error) {
      console.warn('Failed to copy template export payload.', error);
    }

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${template.taskId || 'template'}-${template.id}.json`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const handleBatchExport = async () => {
    const payload = templates
      .filter((template) => selectedIds.includes(template.id))
      .map((template) => buildTemplateExportPayload(template));

    const content = JSON.stringify(payload, null, 2);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(content);
      }
    } catch (error) {
      console.warn('Failed to copy batch export payload.', error);
    }

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'flowpilot-template-batch.json';
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const handleImportDraft = () => {
    if (!importDraft.trim()) {
      return;
    }

    try {
      const parsed = JSON.parse(importDraft);

      if (Array.isArray(parsed)) {
        parsed.forEach((item) => onImportTemplate?.(item));
      } else {
        onImportTemplate?.(parsed);
      }

      setImportDraft('');
    } catch (error) {
      console.warn('Failed to import template JSON.', error);
    }
  };

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">任务清单</h2>
        <p className="library-page__description">
          这里既有从零开始的高频任务入口，也有已经沉淀下来的模板入口。模板支持搜索、分类查看、置顶、重命名、对比、回滚、导出和导入。
        </p>
      </div>

      <div className="library-list">
        {templates.length > 0 && (
          <section className="library-group">
            <div className="library-group__header">
              <div className="library-group__title-row">
                <h3 className="library-group__title">模板管理</h3>
                <span className="library-group__pill">本地持久化</span>
              </div>
              <p className="library-group__description">
                这些模板会保存在当前浏览器中，刷新页面后仍可继续使用。
              </p>
            </div>

            <div className="library-group__toolbar">
              <div className="library-group__toolbar-copy">
                <strong>{templates.length} 个模板入口</strong>
                <span>来源包括 Skill Records、Results Library 和当前 Workflow。</span>
              </div>
              <Button variant="ghost" onClick={() => onResetLocalData?.()}>
                重置本地演示数据
              </Button>
            </div>

            <div className="template-filters">
              <div className="template-filters__tabs">
                <button
                  type="button"
                  className={`template-filters__tab ${templateTab === 'all' ? 'is-active' : ''}`}
                  onClick={() => setTemplateTab('all')}
                >
                  全部模板
                  <span>{templateStats.all}</span>
                </button>
                <button
                  type="button"
                  className={`template-filters__tab ${templateTab === 'recent' ? 'is-active' : ''}`}
                  onClick={() => setTemplateTab('recent')}
                >
                  最近使用
                  <span>{templateStats.recent}</span>
                </button>
                <button
                  type="button"
                  className={`template-filters__tab ${templateTab === 'frequent' ? 'is-active' : ''}`}
                  onClick={() => setTemplateTab('frequent')}
                >
                  常用模板
                  <span>{templateStats.frequent}</span>
                </button>
                <button
                  type="button"
                  className={`template-filters__tab ${templateTab === 'pinned' ? 'is-active' : ''}`}
                  onClick={() => setTemplateTab('pinned')}
                >
                  置顶模板
                  <span>{templateStats.pinned}</span>
                </button>
              </div>

              <label className="template-filters__search">
                <span>搜索模板</span>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="搜索任务名、项目名、来源或标签"
                />
              </label>
            </div>

            <div className="template-batch-toolbar">
              <div className="template-batch-toolbar__left">
                <button
                  type="button"
                  className="template-batch-toolbar__link"
                  onClick={handleSelectAllVisible}
                >
                  {visibleTemplates.every((item) => selectedIds.includes(item.id))
                    ? '取消全选当前结果'
                    : '全选当前结果'}
                </button>
                <span className="template-batch-toolbar__count">
                  已选 {selectedIds.length} 个模板
                </span>
              </div>

              <div className="template-batch-toolbar__actions">
                <Button
                  variant="ghost"
                  onClick={() => onBatchPinTemplates?.(selectedIds)}
                  disabled={selectedIds.length === 0}
                >
                  批量切换置顶
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleBatchExport}
                  disabled={selectedIds.length === 0}
                >
                  批量导出
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onBatchDeleteTemplates?.(selectedIds);
                    setSelectedIds([]);
                  }}
                  disabled={selectedIds.length === 0}
                >
                  批量删除
                </Button>
              </div>
            </div>

            <div className="template-import-card">
              <div className="template-import-card__copy">
                <strong>导入模板 JSON</strong>
                <span>可粘贴单个模板对象，或批量模板数组。</span>
              </div>
              <textarea
                value={importDraft}
                onChange={(event) => setImportDraft(event.target.value)}
                placeholder='粘贴模板 JSON，例如 [{"title":"项目复盘模板", "...":"..."}]'
              />
              <div className="template-import-card__actions">
                <Button variant="ghost" onClick={handleImportDraft}>
                  导入模板
                </Button>
              </div>
            </div>

            {visibleTemplates.length === 0 ? (
              <Card className="template-empty-state">
                <h4 className="template-empty-state__title">当前筛选下没有模板</h4>
                <p className="template-empty-state__description">
                  可以切换分类，或者清空搜索关键词后再查看。
                </p>
              </Card>
            ) : (
              <div className="template-manager-layout">
                <div className="template-manager-layout__list">
                  {visibleTemplates.map((template) => {
                    const isSelected = selectedTemplate?.id === template.id;
                    const isCompared = compareIds.includes(template.id);
                    const isBatchSelected = selectedIds.includes(template.id);

                    return (
                      <Card
                        key={template.id}
                        className={`task-card task-card--template ${isSelected ? 'task-card--selected' : ''}`}
                      >
                        <div className="task-card__header">
                          <div className="task-card__select-row">
                            <label className="task-card__checkbox">
                              <input
                                type="checkbox"
                                checked={isBatchSelected}
                                onChange={() => handleToggleBatchSelection(template.id)}
                              />
                              <span>批量选择</span>
                            </label>
                          </div>

                          <div className="task-card__title-row">
                            <h3 className="task-card__title">{template.title}</h3>
                            {template.isPinned && <Tag>Pinned</Tag>}
                          </div>
                          <p className="task-card__subtitle">创建于 {template.createdAtLabel}</p>
                        </div>

                        <p className="task-card__description">{template.description}</p>

                        <div className="task-card__stats">
                          <span className="task-card__stat">来源：{template.sourceLabel}</span>
                          <span className="task-card__stat">
                            最近使用：{template.lastUsedAtLabel || '暂未使用'}
                          </span>
                          <span className="task-card__stat">
                            使用次数：{template.usageCount || 0}
                          </span>
                        </div>

                        <div className="task-card__tags">
                          <Tag>{getTemplateSourceBadge(template)}</Tag>
                          {template.tags?.slice(0, 3).map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>

                        <div className="task-card__actions task-card__actions--split">
                          <Button onClick={() => onOpenTemplate?.(template)}>使用模板</Button>
                          <Button variant="ghost" onClick={() => handleSelectTemplate(template)}>
                            查看详情
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleToggleCompare(template.id)}
                          >
                            {isCompared ? '移出对比' : '加入对比'}
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <aside className="template-manager-layout__detail">
                  {selectedTemplate ? (
                    <Card className="template-detail-card">
                      <div className="template-detail-card__header">
                        <div>
                          <span className="template-detail-card__eyebrow">
                            {getTemplateSourceBadge(selectedTemplate)}
                          </span>
                          <h3 className="template-detail-card__title">
                            {selectedTemplate.title}
                          </h3>
                        </div>
                        <button
                          type="button"
                          className="template-detail-card__pin"
                          onClick={() => onToggleTemplatePinned?.(selectedTemplate.id)}
                        >
                          {selectedTemplate.isPinned ? '取消置顶' : '置顶模板'}
                        </button>
                      </div>

                      <p className="template-detail-card__description">
                        {selectedTemplate.description}
                      </p>

                      <div className="template-detail-card__section">
                        <label className="template-detail-card__label">模板名称</label>
                        <div className="template-detail-card__rename">
                          <input
                            type="text"
                            value={renameDraft || selectedTemplate.title}
                            onChange={(event) => setRenameDraft(event.target.value)}
                          />
                          <Button
                            variant="ghost"
                            onClick={() =>
                              onRenameTemplate?.(
                                selectedTemplate.id,
                                renameDraft || selectedTemplate.title,
                              )
                            }
                          >
                            保存名称
                          </Button>
                        </div>
                      </div>

                      <div className="template-detail-card__section">
                        <label className="template-detail-card__label">标签体系</label>
                        <div className="template-detail-card__tag-editor">
                          <div className="template-detail-card__tag-list">
                            {selectedTemplate.tags?.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                className="template-detail-card__tag-chip"
                                onClick={() =>
                                  onUpdateTemplateTags?.(
                                    selectedTemplate.id,
                                    selectedTemplate.tags.filter((item) => item !== tag),
                                  )
                                }
                              >
                                {tag} ×
                              </button>
                            ))}
                          </div>
                          <div className="template-detail-card__tag-input">
                            <input
                              type="text"
                              value={tagDraft}
                              onChange={(event) => setTagDraft(event.target.value)}
                              placeholder="添加新标签"
                            />
                            <Button
                              variant="ghost"
                              onClick={() => {
                                const nextTag = tagDraft.trim();

                                if (!nextTag) {
                                  return;
                                }

                                onUpdateTemplateTags?.(selectedTemplate.id, [
                                  ...(selectedTemplate.tags ?? []),
                                  nextTag,
                                ]);
                                setTagDraft('');
                              }}
                            >
                              添加标签
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="template-detail-card__section">
                        <label className="template-detail-card__label">核心信息</label>
                        <div className="template-detail-card__meta">
                          <span>来源：{selectedTemplate.sourceLabel}</span>
                          <span>任务：{selectedTemplate.taskName}</span>
                          <span>项目：{selectedTemplate.contextValues.projectName}</span>
                          <span>版本数：{selectedTemplate.generatedVersions.length}</span>
                          <span>最近更新：{selectedTemplate.updatedAtLabel}</span>
                        </div>
                      </div>

                      <div className="template-detail-card__section">
                        <label className="template-detail-card__label">上下文预览</label>
                        <div className="template-detail-card__preview">
                          <p>
                            <strong>背景：</strong>
                            {selectedTemplate.contextValues.projectBackground}
                          </p>
                          <p>
                            <strong>目标：</strong>
                            {selectedTemplate.contextValues.taskGoal}
                          </p>
                          <p>
                            <strong>汇报对象：</strong>
                            {selectedTemplate.contextValues.reportAudience}
                          </p>
                        </div>
                      </div>

                      <div className="template-detail-card__section">
                        <label className="template-detail-card__label">版本历史</label>
                        <div className="template-history-list">
                          {(selectedTemplate.versionHistory ?? []).map((historyEntry) => (
                            <div key={historyEntry.id} className="template-history-item">
                              <div className="template-history-item__copy">
                                <strong>{historyEntry.action}</strong>
                                <span>{historyEntry.savedAtLabel}</span>
                              </div>
                              <Button
                                variant="ghost"
                                onClick={() =>
                                  onRollbackTemplate?.(selectedTemplate.id, historyEntry.id)
                                }
                              >
                                回滚到此版本
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="template-detail-card__actions">
                        <Button onClick={() => onOpenTemplate?.(selectedTemplate)}>
                          使用这个模板
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleExportTemplate(selectedTemplate)}
                        >
                          导出 JSON
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => onDeleteTemplate?.(selectedTemplate.id)}
                        >
                          删除模板
                        </Button>
                      </div>
                    </Card>
                  ) : (
                    <Card className="template-empty-state">
                      <h4 className="template-empty-state__title">请选择一个模板</h4>
                      <p className="template-empty-state__description">
                        选中模板后，这里会显示名称编辑、标签、预览、历史和导出操作。
                      </p>
                    </Card>
                  )}

                  <Card className="template-compare-panel">
                    <div className="template-compare-panel__header">
                      <h3 className="template-compare-panel__title">模板对比</h3>
                      <p className="template-compare-panel__description">
                        最多可同时对比两个模板的来源、项目和生成版本。
                      </p>
                    </div>

                    <div className="template-compare-panel__grid">
                      <TemplateCompareCard
                        slotLabel="对比 A"
                        template={compareTemplates[0]}
                        onRemove={() =>
                          setCompareIds((prevIds) => prevIds.filter((_, index) => index !== 0))
                        }
                      />
                      <TemplateCompareCard
                        slotLabel="对比 B"
                        template={compareTemplates[1]}
                        onRemove={() =>
                          setCompareIds((prevIds) => prevIds.filter((_, index) => index !== 1))
                        }
                      />
                    </div>
                  </Card>
                </aside>
              </div>
            )}
          </section>
        )}

        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">高频任务入口</h3>
              <span className="library-group__pill library-group__pill--soft">从零开始</span>
            </div>
            <p className="library-group__description">
              从最常见的真实工作任务开始，再逐步补全上下文和输出结构。
            </p>
          </div>

          <div className="library-grid">
            {tasks.map((task) => (
              <Card key={task.id} className="task-card">
                <div className="task-card__header">
                  <h3 className="task-card__title">{task.name}</h3>
                  <p className="task-card__subtitle">{task.subtitle}</p>
                </div>

                <p className="task-card__description">{task.description}</p>

                <div className="task-card__tags">
                  {task.skillTags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <div className="task-card__actions">
                  <Button onClick={() => onOpenWorkflow?.(task.id)}>进入工作流</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default TaskLibrary;
