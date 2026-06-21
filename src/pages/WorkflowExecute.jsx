import React, { useEffect, useMemo, useState } from 'react';
import EmptyState from '../components/common/EmptyState';
import ContextBuilder from '../components/workflow/ContextBuilder';
import PromptPreview from '../components/workflow/PromptPreview';
import OutputCheck from '../components/workflow/OutputCheck';
import SaveResult from '../components/workflow/SaveResult';
import VersionCards from '../components/workflow/VersionCards';
import WorkflowSteps from '../components/workflow/WorkflowSteps';
import {
  buildAiOutputDraft,
  buildGeneratedVersion,
  buildOutputChecks,
  buildPromptSections,
  getVersionCatalog,
  normalizeStepId,
  workflowStepItems,
} from '../data/workflows';

const versionPreviewMeta = {
  'leader-report': {
    title: '领导汇报版',
    summary:
      '本版本围绕项目目标、执行结果、关键问题和下一步计划进行整理，适合作为管理层同步材料。',
    suggestions: ['补充关键数据', '明确风险优先级', '提炼下一步动作'],
  },
  'team-sync': {
    title: '团队同步版',
    summary:
      '本版本突出当前进展、责任分工、待办事项和风险点，适合团队例会和执行同步。',
    suggestions: ['明确责任人', '补齐待办节点', '同步阻塞事项'],
  },
  'ppt-outline': {
    title: 'PPT 大纲版',
    summary:
      '本版本整理为背景、目标、过程、结果、问题、下一步六页结构，便于继续扩展成汇报页面。',
    suggestions: ['确认页数节奏', '提炼每页结论', '补充图表位置'],
  },
  'summary-300': {
    title: '300 字摘要版',
    summary:
      '本版本压缩为简洁摘要，保留关键结果和下一步计划，适合快速同步和确认。',
    suggestions: ['压缩非核心描述', '保留关键数字', '突出下一步计划'],
  },
  'formal-report': {
    title: '正式报告版',
    summary:
      '本版本使用更完整、更正式的报告表达结构，适合归档、提交或正式评审。',
    suggestions: ['统一章节标题', '完善证据支撑', '检查正式措辞'],
  },
  'email-notice': {
    title: '邮件通知版',
    summary:
      '本版本转换为邮件格式，包含主题、正文、重点事项和后续安排，适合会后同步和正式分发。',
    suggestions: ['补齐邮件主题', '精简正文段落', '明确后续安排'],
  },
};

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
  const generatedVersions = Array.isArray(session.generatedVersions)
    ? session.generatedVersions
    : [];
  const [saveMessage, setSaveMessage] = useState('');
  const activeStep = normalizeStepId(session.currentStepId);
  const [selectedVersionId, setSelectedVersionId] = useState(
    generatedVersions[0]?.id ?? '',
  );

  const currentStepIndex = workflowStepItems.findIndex((step) => step.id === activeStep);

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

  useEffect(() => {
    if (!generatedVersions.length) {
      setSelectedVersionId('');
      return;
    }

    if (!generatedVersions.some((item) => item.id === selectedVersionId)) {
      setSelectedVersionId(generatedVersions[0].id);
    }
  }, [generatedVersions, selectedVersionId]);

  const selectedVersion = useMemo(() => {
    if (!generatedVersions.length) {
      return null;
    }

    return generatedVersions.find((item) => item.id === selectedVersionId) ?? generatedVersions[0];
  }, [generatedVersions, selectedVersionId]);

  const versionPreview = useMemo(() => {
    if (!selectedVersion) {
      return null;
    }

    const baseVersion = versionCatalog.find((item) => item.id === selectedVersion.id);
    const meta = versionPreviewMeta[selectedVersion.id];

    if (!baseVersion || !meta) {
      return null;
    }

    return {
      name: meta.title,
      scene: baseVersion.scene,
      summary: meta.summary,
      generatedSummary: selectedVersion.preview,
      suggestions: meta.suggestions,
    };
  }, [selectedVersion, versionCatalog]);

  const sidebarContent = useMemo(() => {
    switch (activeStep) {
      case 'context':
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
      case 'prompt':
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
      case 'output':
        return {
          title: '下一步建议',
          blocks: [
            {
              heading: '操作建议',
              items: ['先进入 Output Check，不要直接复制当前结果。'],
            },
          ],
        };
      case 'check':
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
      case 'version':
        if (versionPreview) {
          return {
            title: '当前版本预览',
            blocks: [
              { heading: `版本名称：${versionPreview.name}`, items: [] },
              { heading: `适用场景：${versionPreview.scene}`, items: [] },
              { heading: '内容摘要', items: [versionPreview.summary, versionPreview.generatedSummary] },
              { heading: '建议', items: versionPreview.suggestions },
            ],
          };
        }

        return {
          title: '当前版本预览',
          blocks: [
            {
              heading: '预览提示',
              items: ['先点击某个版本的“生成版本”，右侧会显示对应预览内容。'],
            },
          ],
        };
      case 'save':
        return {
          title: 'Save Result',
          blocks: [
            {
              heading: '保存建议',
              items: [
                '保存前建议检查版本名称',
                '结果保存后可在 Results Library 中复用',
                '方法记录会同步进入 Skill Records',
              ],
            },
          ],
        };
      default:
        return {
          title: 'Step Notice',
          blocks: [
            {
              heading: '当前步骤',
              items: ['当前步骤暂未配置，请返回上一步。'],
            },
          ],
        };
    }
  }, [activeStep, versionPreview]);

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
    setSaveMessage('');
    onSessionChange((prevSession) => ({
      ...prevSession,
      currentStepId: normalizeStepId(stepId),
    }));
  };

  const handleGenerateVersion = (versionId) => {
    setSaveMessage('');
    setSelectedVersionId(versionId);

    onSessionChange((prevSession) => {
      const previousVersions = Array.isArray(prevSession.generatedVersions)
        ? prevSession.generatedVersions
        : [];
      const generatedVersion = buildGeneratedVersion(
        task,
        prevSession.contextValues,
        versionId,
      );

      if (!generatedVersion) {
        return prevSession;
      }

      const nextVersions = previousVersions.some((item) => item.id === versionId)
        ? previousVersions.map((item) =>
            item.id === versionId ? generatedVersion : item,
          )
        : [...previousVersions, generatedVersion];

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

  const handleGoToSave = () => {
    onSessionChange((prevSession) => ({
      ...prevSession,
      currentStepId: normalizeStepId('save'),
    }));
  };

  const renderMainPanel = () => {
    switch (activeStep) {
      case 'context':
        return (
          <ContextBuilder
            task={task}
            contextValues={session.contextValues}
            onFieldChange={handleFieldChange}
          />
        );
      case 'prompt':
        return <PromptPreview task={task} promptSections={promptSections} />;
      case 'output':
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
      case 'check':
        return <OutputCheck checkItems={outputChecks} />;
      case 'version':
        return (
          <VersionCards
            versions={versionCatalog}
            generatedVersions={generatedVersions}
            selectedVersionId={selectedVersion?.id ?? ''}
            onGenerateVersion={handleGenerateVersion}
            onSelectVersion={setSelectedVersionId}
            onGoToSave={handleGoToSave}
          />
        );
      case 'save':
        return (
          <SaveResult
            outputChecks={outputChecks}
            generatedVersions={generatedVersions}
            saveMessage={saveMessage}
            activeTemplate={activeTemplate}
            onSaveAll={handleSaveAll}
            onCreateTemplate={handleCreateTemplate}
            onNavigate={onNavigate}
          />
        );
      default:
        return (
          <EmptyState
            compact
            title="当前步骤暂未配置"
            description="请返回上一步，或重新选择工作流步骤。"
          />
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
              currentStepId={activeStep}
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
                  {block.items.length > 0 ? (
                    <ul className="execute-assist-card__list">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
              {activeStep === 'version' && versionPreview && (
                <div className="execute-assist-card__actions">
                  <button
                    type="button"
                    className="button button--ghost"
                    onClick={() => setSelectedVersionId(versionPreview ? selectedVersion.id : '')}
                  >
                    继续优化
                  </button>
                  <button
                    type="button"
                    className="button button--primary"
                    onClick={handleGoToSave}
                  >
                    进入 Save Result
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default WorkflowExecute;
