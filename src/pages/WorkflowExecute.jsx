import React, { useMemo, useState } from 'react';
import ContextBuilder from '../components/workflow/ContextBuilder';
import PromptPreview from '../components/workflow/PromptPreview';
import OutputCheck from '../components/workflow/OutputCheck';
import VersionCards from '../components/workflow/VersionCards';
import WorkflowSteps from '../components/workflow/WorkflowSteps';
import { getTemplateSourceBadge } from '../data/templateEntries';
import {
  buildAiOutputDraft,
  buildGeneratedVersion,
  buildOutputChecks,
  buildPromptSections,
  getVersionCatalog,
  workflowStepItems,
} from '../data/workflows';

function WorkflowExecute({
  task,
  session,
  activeTemplate,
  onSessionChange,
  onSaveWorkflow,
  onCreateTemplate,
  onShowSaveSuccess,
  onNavigate,
}) {
  const [saveMessage, setSaveMessage] = useState('');

  const currentStepIndex = workflowStepItems.findIndex(
    (step) => step.id === session.currentStepId,
  );

  const promptSections = useMemo(
    () => buildPromptSections(task, session.contextValues),
    [task, session.contextValues],
  );
  const aiDraftSections = useMemo(
    () => buildAiOutputDraft(task, session.contextValues),
    [task, session.contextValues],
  );
  const outputChecks = useMemo(
    () => buildOutputChecks(task, session.contextValues),
    [task, session.contextValues],
  );
  const versionCatalog = useMemo(() => getVersionCatalog(), []);

  const sidebarContent = useMemo(() => {
    switch (session.currentStepId) {
      case 'context-builder':
        return {
          title: 'Context Expression',
          blocks: [
            { heading: '当前 Skill', items: ['Context Expression'] },
            { heading: '建议补充', items: ['数据结果', '汇报对象', '限制条件'] },
            {
              heading: '注意',
              items: ['先补齐背景和输入材料，再开始生成 Prompt。'],
            },
          ],
        };
      case 'prompt-preview':
        return {
          title: 'Prompt Structure',
          blocks: [
            { heading: '当前 Skill', items: ['Prompt Structure'] },
            {
              heading: '提示',
              items: ['Prompt 应包含角色、任务、背景、输出格式和评价标准。'],
            },
          ],
        };
      case 'ai-output':
        return {
          title: '下一步建议',
          blocks: [
            {
              heading: '操作建议',
              items: ['先进入 Output Check，不要直接复制当前结果。'],
            },
          ],
        };
      case 'output-check':
        return {
          title: 'Output Check',
          blocks: [
            { heading: '当前 Skill', items: ['Output Check'] },
            {
              heading: '常见问题',
              items: ['数据支撑不足', '结论模糊', '下一步不明确'],
            },
          ],
        };
      case 'version-optimization':
        return {
          title: 'Version Optimization',
          blocks: [
            {
              heading: '优化方向',
              items: ['面向领导的汇报版', '面向团队的同步版', '面向展示的 PPT 大纲版'],
            },
          ],
        };
      default:
        return {
          title: 'Skill Records',
          blocks: [
            {
              heading: '记录方式',
              items: [
                '使用了 Context Expression：补充了目标、对象和限制条件',
                '使用了 Output Check：发现输出缺少数据支撑',
                '使用了 Version Optimization：生成了领导汇报版和团队同步版',
              ],
            },
          ],
        };
    }
  }, [session.currentStepId]);

  const handleFieldChange = (fieldKey, value) => {
    setSaveMessage('');
    onSessionChange((prevSession) => ({
      ...prevSession,
      isSaved: false,
      savedAtLabel: '',
      contextValues: {
        ...prevSession.contextValues,
        [fieldKey]: value,
      },
    }));
  };

  const handleStepChange = (stepId) => {
    onSessionChange((prevSession) => ({
      ...prevSession,
      currentStepId: stepId,
    }));
  };

  const handleGenerateVersion = (versionId) => {
    setSaveMessage('');
    onSessionChange((prevSession) => {
      const generatedVersion = buildGeneratedVersion(
        task,
        prevSession.contextValues,
        versionId,
      );

      if (!generatedVersion) {
        return prevSession;
      }

      const nextVersions = prevSession.generatedVersions.some(
        (item) => item.id === versionId,
      )
        ? prevSession.generatedVersions.map((item) =>
            item.id === versionId ? generatedVersion : item,
          )
        : [...prevSession.generatedVersions, generatedVersion];

      return {
        ...prevSession,
        isSaved: false,
        savedAtLabel: '',
        generatedVersions: nextVersions,
      };
    });
  };

  const handleSaveAll = () => {
    const bundle = onSaveWorkflow?.();

    if (!bundle) {
      return;
    }

    setSaveMessage(
      `已在 ${bundle.savedAtLabel} 保存到 Results Library、My Workflows 和 Skill Records。`,
    );
    onShowSaveSuccess?.(bundle);
  };

  const handleCreateTemplate = (mode) => {
    const result = onCreateTemplate?.(mode);

    if (!result) {
      return;
    }

    setSaveMessage(
      result.mode === 'updated'
        ? `已更新当前模板：${result.template.title}。`
        : `已沉淀为新模板：${result.template.title}。`,
    );
  };

  const renderMainPanel = () => {
    switch (session.currentStepId) {
      case 'context-builder':
        return (
          <ContextBuilder
            task={task}
            contextValues={session.contextValues}
            onFieldChange={handleFieldChange}
          />
        );
      case 'prompt-preview':
        return <PromptPreview task={task} promptSections={promptSections} />;
      case 'ai-output':
        return (
          <section className="execute-panel">
            <div className="execute-panel__header">
              <span className="execute-panel__eyebrow">AI Output</span>
              <h3 className="execute-panel__title">{task.name} 初稿</h3>
            </div>
            <div className="execute-draft">
              {aiDraftSections.map((section) => (
                <div key={section.id} className="execute-draft__section">
                  <h4 className="execute-draft__heading">{section.title}</h4>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case 'output-check':
        return <OutputCheck checkItems={outputChecks} />;
      case 'version-optimization':
        return (
          <VersionCards
            versions={versionCatalog}
            generatedVersions={session.generatedVersions}
            onGenerateVersion={handleGenerateVersion}
          />
        );
      default:
        return (
          <section className="execute-panel">
            <div className="execute-panel__header">
              <span className="execute-panel__eyebrow">Save Result</span>
              <h3 className="execute-panel__title">保存和记录</h3>
            </div>

            {activeTemplate && (
              <div className="template-session-card">
                <div className="template-session-card__header">
                  <span className="template-session-card__badge">
                    {getTemplateSourceBadge(activeTemplate)}
                  </span>
                  <h4 className="template-session-card__title">当前会话来自模板回填</h4>
                </div>
                <p className="template-session-card__description">
                  你现在使用的是“{activeTemplate.title}”，来源于
                  {activeTemplate.sourceLabel}。可以直接更新当前模板，也可以另存为一个新模板入口。
                </p>
                <div className="template-session-card__meta">
                  <span>最近使用：{activeTemplate.lastUsedAtLabel || '刚刚回填'}</span>
                  <span>使用次数：{activeTemplate.usageCount || 0}</span>
                </div>
              </div>
            )}

            <div className="save-result-grid">
              <article className="save-card">
                <h4 className="save-card__title">保存到 Results Library</h4>
                <p className="save-card__description">
                  保存当前输出结果、质检摘要和已生成版本，便于后续对比和复用。
                </p>
              </article>

              <article className="save-card">
                <h4 className="save-card__title">保存到 My Workflows</h4>
                <p className="save-card__description">
                  将本次上下文、Prompt 结构和版本结果沉淀为可继续使用的工作流。
                </p>
              </article>

              <article className="save-card save-card--records">
                <h4 className="save-card__title">记录到 Skill Records</h4>
                <ul className="save-card__list">
                  <li>使用了 Context Expression：补充了目标、对象和限制条件</li>
                  <li>
                    使用了 Output Check：
                    {outputChecks
                      .filter((item) => item.status !== '充分')
                      .map((item) => item.label)
                      .join('、') || '确认结果已经具备较好的提交基础'}
                  </li>
                  <li>
                    使用了 Version Optimization：
                    {session.generatedVersions.length > 0
                      ? `生成了${session.generatedVersions.map((item) => item.name).join('、')}`
                      : '当前还没有额外版本'}
                  </li>
                </ul>
              </article>
            </div>

            <div className="save-actions">
              <Button className="workflow-modal__button workflow-modal__button--primary" onClick={handleSaveAll}>
                保存本次结果
              </Button>
              <Button
                variant="ghost"
                className="workflow-modal__button workflow-modal__button--ghost"
                onClick={() => handleCreateTemplate(activeTemplate ? 'auto' : 'new')}
              >
                {activeTemplate ? '更新当前模板' : '保存为模板入口'}
              </Button>
              {activeTemplate && (
                <Button
                  variant="ghost"
                  className="workflow-modal__button workflow-modal__button--ghost"
                  onClick={() => handleCreateTemplate('new')}
                >
                  另存为新模板
                </Button>
              )}
              <Button
                variant="ghost"
                className="workflow-modal__button workflow-modal__button--ghost"
                onClick={() => onNavigate?.('results-library')}
              >
                查看 Results Library
              </Button>
              <Button
                variant="ghost"
                className="workflow-modal__button workflow-modal__button--ghost"
                onClick={() => onNavigate?.('skill-records')}
              >
                查看 Skill Records
              </Button>
            </div>

            {saveMessage && <p className="save-feedback">{saveMessage}</p>}
          </section>
        );
    }
  };

  return (
    <section className="workflow-execute-page">
      <div className="workflow-execute-page__notice">
        <span className="workflow-execute-page__notice-label">当前来源</span>
        <div className="workflow-execute-page__notice-copy">
          <p className="workflow-execute-page__notice-text">{session.sourceLabel}</p>
          <p className="workflow-execute-page__notice-subtext">
            你现在看到的是已回填的上下文和步骤位置，可以直接继续编辑；保存后的内容也会保留在当前浏览器中。
          </p>
        </div>
      </div>

      {activeTemplate && (
        <div className="workflow-execute-page__template-notice">
          <span className="workflow-execute-page__template-notice-badge">模板回填</span>
          <p className="workflow-execute-page__template-notice-text">
            当前会话来自“{activeTemplate.title}”，来源于 {activeTemplate.sourceLabel}，
            你可以继续修改并覆盖更新，也可以另存为新模板。
          </p>
        </div>
      )}

      <div className="workflow-execute-layout">
        <aside className="workflow-execute-layout__sidebar">
          <div className="execute-sidebar-card">
            <div className="execute-sidebar-card__header">
              <span className="execute-sidebar-card__eyebrow">{task.name}</span>
              <h2 className="execute-sidebar-card__title">工作流步骤</h2>
            </div>
            <WorkflowSteps
              steps={workflowStepItems}
              currentStepId={session.currentStepId}
              onStepChange={handleStepChange}
              completedStepIndex={currentStepIndex - 1}
              variant="navigation"
            />
          </div>
        </aside>

        <div className="workflow-execute-layout__main">{renderMainPanel()}</div>

        <aside className="workflow-execute-layout__assist">
          <div className="execute-assist-card">
            <h3 className="execute-assist-card__title">{sidebarContent.title}</h3>
            <div className="execute-assist-card__content">
              {sidebarContent.blocks.map((block) => (
                <section key={block.heading} className="execute-assist-card__section">
                  <h4 className="execute-assist-card__heading">{block.heading}</h4>
                  <ul className="execute-assist-card__list">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default WorkflowExecute;
