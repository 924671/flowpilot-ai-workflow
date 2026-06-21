import React from 'react';
import Button from '../common/Button';

function SaveResult({
  outputChecks = [],
  generatedVersions = [],
  saveMessage = '',
  activeTemplate = null,
  onSaveAll,
  onCreateTemplate,
  onNavigate,
}) {
  const safeChecks = Array.isArray(outputChecks) ? outputChecks : [];
  const safeVersions = Array.isArray(generatedVersions) ? generatedVersions : [];

  const riskLabels = safeChecks
    .filter((item) => item?.status && item.status !== '充分')
    .map((item) => item.label)
    .filter(Boolean);

  const versionNames = safeVersions
    .map((item) => item?.name)
    .filter(Boolean);

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Save Result</span>
        <h3 className="execute-panel__title">保存结果</h3>
      </div>

      <p className="execute-panel__description">
        将本次工作流结果保存到成果库、我的工作流，并记录本次使用过的方法。
      </p>

      <div className="save-result-grid">
        <article className="save-card">
          <h4 className="save-card__title">保存到 Results Library</h4>
          <p className="save-card__description">
            保存最终报告和多版本输出，方便后续查看与复用。
          </p>
          <Button variant="ghost" onClick={onSaveAll}>
            保存到成果库
          </Button>
        </article>

        <article className="save-card">
          <h4 className="save-card__title">保存为 My Workflow</h4>
          <p className="save-card__description">
            保留当前上下文、Prompt、质检记录和版本配置，方便继续编辑。
          </p>
          <Button variant="ghost" onClick={onSaveAll}>
            保存为工作流
          </Button>
        </article>

        <article className="save-card">
          <h4 className="save-card__title">记录到 Skill Records</h4>
          <p className="save-card__description">
            沉淀本次使用过的方法，形成可复用的 AI 工作经验。
          </p>
          <Button variant="ghost" onClick={onSaveAll}>
            记录方法
          </Button>
        </article>
      </div>

      {activeTemplate ? (
        <div className="template-session-card">
          <div className="template-session-card__header">
            <span className="template-session-card__badge">Template Linked</span>
            <h4 className="template-session-card__title">当前结果关联了模板入口</h4>
          </div>
          <p className="template-session-card__description">
            当前流程基于“{activeTemplate.title}”继续编辑。你可以覆盖更新现有模板，也可以另存为新的模板入口。
          </p>
        </div>
      ) : null}

      <article className="save-card save-card--records">
        <h4 className="save-card__title">本次沉淀的方法记录</h4>
        {versionNames.length > 0 ? (
          <p className="save-card__description">已生成版本：{versionNames.join(' / ')}</p>
        ) : (
          <p className="save-card__description">当前还没有生成额外版本，仍然可以先保存主结果。</p>
        )}

        <ul className="save-card__list">
          <li>使用了 Context Expression：补充了目标、对象和限制条件</li>
          <li>
            使用了 Output Check：
            {riskLabels.length > 0
              ? `发现结果在 ${riskLabels.join('、')} 上仍需补充`
              : '确认结果已经具备较好的提交基础'}
          </li>
          <li>
            使用了 Version Optimization：
            {versionNames.length > 0
              ? `生成了 ${versionNames.join('、')}`
              : '当前还没有生成额外版本'}
          </li>
        </ul>
      </article>

      <div className="save-actions">
        <Button onClick={onSaveAll}>保存本次结果</Button>
        <Button
          variant="ghost"
          onClick={() => onCreateTemplate?.(activeTemplate ? 'auto' : 'new')}
        >
          {activeTemplate ? '更新当前模板' : '保存为模板'}
        </Button>
        {activeTemplate ? (
          <Button variant="ghost" onClick={() => onCreateTemplate?.('new')}>
            另存为新模板
          </Button>
        ) : null}
        <Button variant="ghost" onClick={() => onNavigate?.('results-library')}>
          查看 Results Library
        </Button>
        <Button variant="ghost" onClick={() => onNavigate?.('skill-records')}>
          查看 Skill Records
        </Button>
      </div>

      {saveMessage ? <p className="save-feedback">{saveMessage}</p> : null}
    </section>
  );
}

export default SaveResult;
