import React, { useMemo, useState } from 'react';
import Card from '../components/common/Card';
import Tag from '../components/common/Tag';
import Button from '../components/common/Button';

const categories = ['全部', '汇报总结', '运营方案', '信息整理', '分析研究'];

function TaskLibrary({ tasks, templates, onOpenWorkflow, onOpenTemplate, onOpenTaskDetail }) {
  const [activeCategory, setActiveCategory] = useState('全部');

  const visibleTasks = useMemo(() => {
    if (activeCategory === '全部') {
      return tasks;
    }

    return tasks.filter((task) => task.category === activeCategory);
  }, [activeCategory, tasks]);

  const latestTemplates = useMemo(() => templates.slice(0, 3), [templates]);

  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">任务库</h2>
        <p className="library-page__description">
          从真实工作场景中选择一个任务，进入对应 AI 工作流。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">高频任务入口</h3>
              <span className="library-group__pill">6 个工作流任务</span>
            </div>
            <p className="library-group__description">
              这些入口覆盖复盘、汇报、运营、纪要、分析和演示结构，适合作为 AI
              工作流的起点。
            </p>
          </div>

          <div className="flowpilot-filter-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`flowpilot-filter-chip ${activeCategory === category ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flowpilot-page-grid flowpilot-page-grid--tasks">
            {visibleTasks.map((task) => (
              <Card key={task.id} className="flowpilot-task-card">
                <div className="flowpilot-task-card__top">
                  <div>
                    <h3 className="flowpilot-task-card__title">{task.name}</h3>
                    <p className="flowpilot-task-card__subtitle">{task.subtitle}</p>
                  </div>
                  <span className="flowpilot-task-card__category">{task.category}</span>
                </div>

                <p className="flowpilot-task-card__body">{task.description}</p>

                <div className="flowpilot-task-card__meta">
                  <span>适用场景</span>
                  <p>{task.scene}</p>
                </div>

                <div className="flowpilot-task-card__tags">
                  {task.skillTags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <div className="flowpilot-task-card__flow">
                  <span>预计流程</span>
                  <strong>{task.expectedFlow}</strong>
                </div>

                <div className="flowpilot-task-card__actions">
                  <Button variant="ghost" onClick={() => onOpenTaskDetail?.(task.id)}>
                    查看详情
                  </Button>
                  <Button onClick={() => onOpenWorkflow?.(task.id)}>开始工作流</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {latestTemplates.length > 0 && (
          <section className="library-group">
            <div className="library-group__header">
              <div className="library-group__title-row">
                <h3 className="library-group__title">最近沉淀的模板入口</h3>
                <span className="library-group__pill library-group__pill--soft">
                  本地保留
                </span>
              </div>
              <p className="library-group__description">
                这些模板来自最近保存的流程、结果或 Skill Records，可以直接回填进入执行页。
              </p>
            </div>

            <div className="flowpilot-page-grid flowpilot-page-grid--templates">
              {latestTemplates.map((template) => (
                <Card key={template.id} className="flowpilot-template-card">
                  <div className="flowpilot-template-card__copy">
                    <h3 className="flowpilot-template-card__title">{template.title}</h3>
                    <p className="flowpilot-template-card__description">
                      {template.description}
                    </p>
                    <div className="flowpilot-template-card__tags">
                      {(template.tags ?? []).slice(0, 3).map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>

                  <div className="flowpilot-template-card__actions">
                    <Button variant="ghost" onClick={() => onOpenTemplate?.(template)}>
                      使用模板
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default TaskLibrary;
