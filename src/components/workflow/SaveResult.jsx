import React from 'react';
import Button from '../common/Button';

function showValue(value) {
  return value && String(value).trim() ? value : '待补充';
}

function SaveResult({
  workflowState,
  outputChecks = [],
  generatedVersions = [],
  saveMessage = '',
  activeTemplate = null,
  onSaveAll,
  onCreateTemplate,
  onNavigate,
}) {
  const contextData = workflowState?.contextData ?? {};
  const aiOutput = workflowState?.aiOutput ?? {};
  const usedSkills = workflowState?.usedSkills ?? [];
  const versionNames = generatedVersions.map((item) => item.name).filter(Boolean);
  const riskLabels = outputChecks
    .filter((item) => item.status !== '充分')
    .map((item) => item.label)
    .filter(Boolean);

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">保存结果</span>
        <h3 className="execute-panel__title">保存结果</h3>
      </div>

      <p className="execute-panel__description">
        将本次工作流结果保存到成果库、我的流程，并记录本次使用过的方法。
      </p>

      <div className="save-summary-grid">
        <article className="save-summary-card">
          <h4 className="save-summary-card__title">当前任务</h4>
          <p>{showValue(workflowState?.taskName)}</p>
        </article>
        <article className="save-summary-card">
          <h4 className="save-summary-card__title">原始上下文</h4>
          <p>{showValue(contextData.projectBackground || contextData.taskGoal)}</p>
        </article>
        <article className="save-summary-card">
          <h4 className="save-summary-card__title">原始数据</h4>
          <p>{showValue(contextData.dataResults)}</p>
        </article>
        <article className="save-summary-card">
          <h4 className="save-summary-card__title">处理后摘要</h4>
          <p>{showValue(aiOutput.summary)}</p>
        </article>
      </div>

      <div className="save-result-grid">
        <article className="save-card">
          <h4 className="save-card__title">保存到成果库</h4>
          <p className="save-card__description">
            保存最终报告和多版本输出，方便后续查看与复用。
          </p>
          <Button variant="ghost" onClick={onSaveAll}>
            保存到成果库
          </Button>
        </article>

        <article className="save-card">
          <h4 className="save-card__title">保存为我的流程</h4>
          <p className="save-card__description">
            保留当前上下文、Prompt、质检记录和版本配置，方便继续编辑。
          </p>
          <Button variant="ghost" onClick={onSaveAll}>
            保存为流程
          </Button>
        </article>

        <article className="save-card">
          <h4 className="save-card__title">记录到方法记录</h4>
          <p className="save-card__description">
            沉淀本次使用过的方法，形成可复用的 AI 工作经验。
          </p>
          <Button variant="ghost" onClick={onSaveAll}>
            记录方法
          </Button>
        </article>
      </div>

      <article className="save-card save-card--records">
        <h4 className="save-card__title">本次沉淀的方法记录</h4>

        {versionNames.length > 0 ? (
          <p className="save-card__description">已生成版本：{versionNames.join(' / ')}</p>
        ) : (
          <p className="save-card__description">
            当前还没有生成额外版本，仍然可以先保存主要结果。
          </p>
        )}

        <div className="save-record-columns">
          <div>
            <h5 className="save-record-columns__title">输出质检备注</h5>
            <ul className="save-card__list">
              {outputChecks.map((item) => (
                <li key={item.label}>
                  {item.label}：{item.status}，{item.note}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="save-record-columns__title">本次使用过的方法</h5>
            <ul className="save-card__list">
              {usedSkills.map((item) => (
                <li key={item.name}>{item.record}</li>
              ))}
            </ul>
          </div>
        </div>

        {riskLabels.length > 0 ? (
          <p className="save-card__description">
            保存后仍建议继续补充：{riskLabels.join('、')}。
          </p>
        ) : null}
      </article>

      {activeTemplate ? (
        <div className="template-session-card">
          <div className="template-session-card__header">
            <span className="template-session-card__badge">已关联模板</span>
            <h4 className="template-session-card__title">当前结果关联了模板入口</h4>
          </div>
          <p className="template-session-card__description">
            当前流程基于“{activeTemplate.title}”继续编辑。你可以覆盖更新现有模板，也可以另存为新的模板入口。
          </p>
        </div>
      ) : null}

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
          查看成果库
        </Button>
        <Button variant="ghost" onClick={() => onNavigate?.('skill-records')}>
          查看方法记录
        </Button>
      </div>

      {saveMessage ? (
        <div className="save-feedback">
          <p>{saveMessage}</p>
          <Button variant="ghost" onClick={() => onNavigate?.('results-library')}>
            查看成果库
          </Button>
        </div>
      ) : null}
    </section>
  );
}

export default SaveResult;
