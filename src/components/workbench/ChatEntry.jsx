import React from 'react';

function ChatEntry({ activeTask }) {
  const isActive = Boolean(activeTask);
  const prompt = isActive
    ? `\u6b63\u5728\u8fdb\u5165 ${activeTask.name} \u5de5\u4f5c\u6d41...`
    : '\u9009\u62e9\u6216\u526a\u65ad\u4e00\u4e2a\u4efb\u52a1\u6c14\u7403\uff1a\u590d\u76d8\u3001\u5468\u62a5\u3001\u65b9\u6848\u3001\u7eaa\u8981\u3001\u7ade\u54c1\u5206\u6790\u3001PPT \u5927\u7eb2\u2026\u2026';

  return (
    <div className={`chat-entry ${isActive ? 'is-active' : ''}`}>
      <div className="chat-entry__anchor" aria-hidden="true" />
      <div className="chat-entry__content">
        <span className="chat-entry__eyebrow">AI Work Entry</span>
        <p className="chat-entry__prompt">{prompt}</p>
      </div>
    </div>
  );
}

export default ChatEntry;
