import React, { useMemo, useState } from 'react';
import Button from '../common/Button';

const quickActions = [
  { key: 'draft', label: '生成汇报初稿' },
  { key: 'data', label: '检查数据支撑' },
  { key: 'next', label: '补全下一步计划' },
  { key: 'leader', label: '改成领导汇报口吻' },
  { key: 'ppt', label: '转成 PPT 大纲' },
];

function showValue(value) {
  return value && String(value).trim() ? value : '待补充';
}

function AIWorkSession({
  taskName,
  contextData,
  promptData,
  messages = [],
  sessionOutput,
  onSendMessage,
  onQuickAction,
  onGoToOutput,
}) {
  const [draft, setDraft] = useState('');
  const [lastAction, setLastAction] = useState('');

  const contextItems = useMemo(
    () => [
      { label: '当前任务', value: taskName },
      { label: '项目名称', value: contextData.projectName },
      { label: '项目目标', value: contextData.taskGoal },
      { label: '数据结果', value: contextData.dataResults },
      { label: '原始素材', value: contextData.rawMaterials || contextData.executionActions },
      { label: '汇报对象', value: contextData.reportAudience },
      { label: '待处理问题', value: contextData.issues },
    ],
    [contextData, taskName],
  );

  const contextStatus = useMemo(() => {
    if (contextData.projectName && contextData.dataResults && contextData.reportAudience) {
      return '上下文完整度：基础信息已建立，数据结果与汇报对象已明确。';
    }

    if (!contextData.dataResults) {
      return '上下文完整度：基础信息已建立，数据结果待补充。';
    }

    if (!contextData.reportAudience) {
      return '上下文完整度：基础信息已建立，汇报对象待确认。';
    }

    return '上下文完整度：基础信息已建立，仍建议继续补充关键字段。';
  }, [contextData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextMessage = draft.trim();

    if (!nextMessage) {
      return;
    }

    onSendMessage?.(nextMessage);
    setLastAction('已发送补充要求，AI 已基于当前上下文生成新的协作回复。');
    setDraft('');
  };

  const handleQuickAction = (action) => {
    onQuickAction?.(action.key, action.label);
    setLastAction(`已执行快捷动作：${action.label}。`);
  };

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">AI 协作工作区</span>
        <h3 className="execute-panel__title">任务内 AI 协作工作区</h3>
      </div>

      <p className="execute-panel__description">
        在当前任务上下文中与 AI 协作，补充信息、生成初稿并优化表达。
      </p>

      <div className="ai-session-layout">
        <aside className="ai-session-sidecard">
          <div className="ai-session-sidecard__header">
            <h4 className="ai-session-sidecard__title">当前上下文</h4>
          </div>

          <div className="ai-session-context-list">
            {contextItems.map((item) => (
              <div key={item.label} className="ai-session-context-item">
                <span className="ai-session-context-item__label">{item.label}</span>
                <p className="ai-session-context-item__value">{showValue(item.value)}</p>
              </div>
            ))}
          </div>

          <div className="ai-session-status-card">
            <h5 className="ai-session-status-card__title">Prompt 状态</h5>
            <p className="ai-session-sidecard__status">
              {promptData?.sections?.length ? '结构化 Prompt 已生成，可用于协作。' : 'Prompt 待生成。'}
            </p>
          </div>

          <p className="ai-session-sidecard__status">{contextStatus}</p>
        </aside>

        <div className="ai-session-thread-panel">
          {lastAction || sessionOutput ? (
            <div className="ai-session-progress-card">
              <span className="ai-session-progress-card__label">当前状态</span>
              <h4 className="ai-session-progress-card__title">
                {sessionOutput ? 'AI 已完成一次协作整理' : '正在等待协作输入'}
              </h4>
              <p className="ai-session-progress-card__text">
                {lastAction || '发送消息或点击快捷动作后，这里会显示本次协作状态。'}
              </p>
            </div>
          ) : null}

          <div className="ai-session-thread">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`ai-session-message ai-session-message--${message.role}`}
              >
                <div className="ai-session-message__meta">
                  <span>{message.role === 'ai' ? 'AI' : '你'}</span>
                </div>
                <p className="ai-session-message__content">{message.content}</p>
              </article>
            ))}
          </div>

          <form className="ai-session-input-row" onSubmit={handleSubmit}>
            <textarea
              className="ai-session-input"
              value={draft}
              rows={3}
              placeholder="继续告诉 AI 你的补充要求，例如：帮我改成领导汇报口吻，或检查数据是否充分。"
              onChange={(event) => setDraft(event.target.value)}
            />
            <div className="ai-session-input-row__actions">
              <Button type="submit">发送</Button>
            </div>
          </form>
        </div>

        <aside className="ai-session-sidecard">
          <div className="ai-session-sidecard__header">
            <h4 className="ai-session-sidecard__title">快捷动作</h4>
          </div>

          <div className="ai-session-quick-actions">
            {quickActions.map((action) => (
              <button
                key={action.key}
                type="button"
                className="ai-session-quick-action"
                onClick={() => handleQuickAction(action)}
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className={`ai-session-status-card ${sessionOutput ? 'is-ready' : ''}`}>
            <h5 className="ai-session-status-card__title">当前生成状态</h5>
            <ul className="ai-session-status-card__list">
              {(sessionOutput?.statusItems ?? [
                '已读取上下文',
                '等待生成初稿建议',
                '数据支撑待检查',
                '完成协作后可进入 AI 输出',
              ]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {sessionOutput ? (
            <div className="ai-session-sidecard__footer">
              <Button onClick={onGoToOutput}>进入 AI 输出</Button>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

export default AIWorkSession;
