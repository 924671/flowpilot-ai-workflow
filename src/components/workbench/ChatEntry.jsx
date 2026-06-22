import React, { forwardRef } from 'react';

const ChatEntry = forwardRef(function ChatEntry({ activeTask, activationTrigger }, ref) {
  const isActive = Boolean(activeTask);
  const prompt = isActive
    ? activationTrigger === 'balloon'
      ? `已戳破 ${activeTask.name} 气球，正在进入工作流...`
      : `已剪断 ${activeTask.name} 任务线，正在进入工作流...`
    : '选择或剪断一个任务气球：复盘、周报、方案、纪要、竞品分析、PPT 大纲……';

  return (
    <div className={`chat-entry ${isActive ? 'is-active' : ''}`}>
      <div ref={ref} className="chat-entry__anchor" aria-hidden="true" />
      <div className="chat-entry__content">
        <span className="chat-entry__eyebrow">AI Work Entry</span>
        <p className="chat-entry__prompt">{prompt}</p>
      </div>
    </div>
  );
});

export default ChatEntry;
