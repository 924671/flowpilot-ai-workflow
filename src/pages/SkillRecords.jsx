import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Tag from '../components/common/Tag';

function SkillRecords({ records, sections, onCreateTemplate }) {
  const recentUsage = records.flatMap((record) =>
    (record.records ?? []).map((item, index) => ({
      id: `${record.id}-${index}`,
      label: item,
      taskName: record.taskName,
      savedAtLabel: record.savedAtLabel,
    })),
  );

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">方法记录</h2>
        <p className="library-page__description">
          这里记录的是你在真实任务中用过的方法，而不是等级或积分。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">常用方法</h3>
              <span className="library-group__pill">方法记录系统</span>
            </div>
            <p className="library-group__description">
              方法只作为标签、执行提示和复盘记录存在，用来帮助你把一次任务沉淀成下次可复用的方法。
            </p>
          </div>

          <div className="flowpilot-page-grid flowpilot-page-grid--skills">
            {sections.commonSkills.map((skill) => (
              <Card key={skill.title} className="flowpilot-skill-card flowpilot-skill-card--refined">
                <div className="flowpilot-card-kicker">
                  <span className="flowpilot-card-kicker__label">AI Skill</span>
                  <span className="flowpilot-card-kicker__time">{skill.lastUsed}</span>
                </div>

                <div className="flowpilot-card-heading">
                  <h3 className="flowpilot-skill-card__title">{skill.title}</h3>
                  <p className="flowpilot-skill-card__description">{skill.description}</p>
                </div>

                <div className="flowpilot-skill-card__meta">
                  <div>
                    <span>常用于哪些任务</span>
                    <p>{skill.tasks}</p>
                  </div>
                </div>

                <div className="flowpilot-skill-card__suggestion">
                  <span>可复用建议</span>
                  <p>{skill.suggestion}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="flowpilot-two-column">
          <section className="library-group">
            <div className="library-group__header">
              <div className="library-group__title-row">
                <h3 className="library-group__title">最近使用</h3>
                <span className="library-group__pill library-group__pill--soft">最近 5 条</span>
              </div>
              <p className="library-group__description">
                这些记录说明最近一次任务里，哪些方法真正被使用过，以及它们带来了什么调整。
              </p>
            </div>

            <div className="flowpilot-usage-list">
              {recentUsage.slice(0, 5).map((item) => (
                <Card key={item.id} className="flowpilot-usage-card flowpilot-usage-card--timeline">
                  <p className="flowpilot-usage-card__text">{item.label}</p>
                  <div className="flowpilot-usage-card__meta">
                    <span>{item.taskName}</span>
                    <span>{item.savedAtLabel}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="library-group">
            <div className="library-group__header">
              <div className="library-group__title-row">
                <h3 className="library-group__title">常见问题</h3>
                <span className="library-group__pill library-group__pill--soft">复盘提醒</span>
              </div>
              <p className="library-group__description">
                这些问题通常不是 AI 不会写，而是输入结构、对象意识和质检环节还不完整。
              </p>
            </div>

            <div className="flowpilot-note-list">
              {sections.commonIssues.map((item) => (
                <Card key={item} className="flowpilot-note-card flowpilot-note-card--issue">
                  <p>{item}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">可复用建议</h3>
              <span className="library-group__pill library-group__pill--soft">
                反向创建模板入口
              </span>
            </div>
            <p className="library-group__description">
              这些记录说明这次任务里实际用过哪些方法，以及它们为什么值得沉淀成新入口。
            </p>
          </div>

          <div className="flowpilot-page-grid flowpilot-page-grid--records">
            {records.map((record) => (
              <Card key={record.id} className="flowpilot-record-card flowpilot-record-card--refined">
                <div className="flowpilot-card-kicker">
                  <span className="flowpilot-card-kicker__label">方法复盘</span>
                  <span className="flowpilot-card-kicker__time">{record.savedAtLabel}</span>
                </div>

                <div className="flowpilot-card-heading">
                  <div>
                    <h3 className="flowpilot-record-card__title">{record.taskName}</h3>
                    <p className="flowpilot-record-card__subtitle">{record.issue}</p>
                  </div>
                  <Tag>{record.sourceLabel}</Tag>
                </div>

                <div className="flowpilot-record-card__bullets">
                  {(record.records ?? []).map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>

                <div className="flowpilot-record-card__footer">
                  <div>
                    <span>可复用建议</span>
                    <p>{record.suggestion}</p>
                  </div>
                  <Button onClick={() => onCreateTemplate?.(record)}>创建模板入口</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default SkillRecords;
