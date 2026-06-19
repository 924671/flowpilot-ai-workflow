import React from 'react';
import Card from '../components/common/Card';
import Tag from '../components/common/Tag';
import Button from '../components/common/Button';

function Membership() {
  return (
    <section className="library-page">
      <div className="library-page__header">
        <h2 className="library-page__title">Membership</h2>
        <p className="library-page__description">
          按照不同使用强度与协作场景，展示 FlowPilot 的能力覆盖范围，帮助用户理解从个人使用到团队沉淀的适配方式。
        </p>
      </div>

      <div className="library-list">
        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">方案总览</h3>
              <span className="library-group__pill">静态展示页</span>
            </div>
            <p className="library-group__description">
              这里展示的是不同方案的能力范围，不涉及等级成长、积分奖励或游戏化机制。
            </p>
          </div>

          <div className="results-overview-grid">
            <Card className="results-overview-card">
              <span className="results-overview-card__label">适合个人</span>
              <strong className="results-overview-card__value">高频任务</strong>
              <p className="results-overview-card__note">
                从真实工作任务进入，逐步沉淀自己的上下文结构、Prompt 写法和结果版本。
              </p>
            </Card>

            <Card className="results-overview-card">
              <span className="results-overview-card__label">适合团队</span>
              <strong className="results-overview-card__value">方法统一</strong>
              <p className="results-overview-card__note">
                统一模板入口、质检标准和结果输出口径，减少重复试错。
              </p>
            </Card>

            <Card className="results-overview-card">
              <span className="results-overview-card__label">核心价值</span>
              <strong className="results-overview-card__value">复用沉淀</strong>
              <p className="results-overview-card__note">
                让一次性的 AI 使用过程，变成可以继续编辑、恢复回填和反向建模的工作资产。
              </p>
            </Card>
          </div>
        </section>

        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">方案对比</h3>
              <span className="library-group__pill">按场景选择</span>
            </div>
            <p className="library-group__description">
              当前版本先用静态方案卡说明产品覆盖范围，方便在原型阶段验证信息结构与购买心智。
            </p>
          </div>

          <div className="library-grid">
            <Card className="membership-card">
              <div className="task-card__title-row">
                <h3 className="membership-card__title">Starter</h3>
                <Tag>个人起步</Tag>
              </div>
              <p className="membership-card__description">
                适合刚开始用 AI 处理真实工作的用户，重点覆盖任务入口、Context Builder、Prompt 预览和基础保存。
              </p>
              <div className="task-card__meta">
                <span className="task-card__meta-label">包含能力</span>
                <p className="task-card__meta-text">
                  六个任务入口、结构化 Prompt、基础结果保存、Skill 使用记录。
                </p>
              </div>
              <div className="task-card__tags">
                <Tag>Workbench</Tag>
                <Tag>Prompt Preview</Tag>
                <Tag>Skill Records</Tag>
              </div>
              <div className="task-card__actions">
                <Button variant="ghost">查看方案</Button>
              </div>
            </Card>

            <Card className="membership-card">
              <div className="task-card__title-row">
                <h3 className="membership-card__title">Professional</h3>
                <Tag>当前推荐</Tag>
              </div>
              <p className="membership-card__description">
                适合需要持续保存 workflow、result 和模板入口的个人高频用户，强调继续编辑、版本扩写和方法沉淀。
              </p>
              <div className="task-card__meta">
                <span className="task-card__meta-label">包含能力</span>
                <p className="task-card__meta-text">
                  本地持久化、回填恢复、结果扩写、多版本输出、模板管理与反向创建任务入口。
                </p>
              </div>
              <div className="task-card__tags">
                <Tag>My Workflows</Tag>
                <Tag>Results Library</Tag>
                <Tag>Template Entry</Tag>
              </div>
              <div className="task-card__actions">
                <Button>当前推荐</Button>
              </div>
            </Card>

            <Card className="membership-card">
              <div className="task-card__title-row">
                <h3 className="membership-card__title">Team</h3>
                <Tag>协作沉淀</Tag>
              </div>
              <p className="membership-card__description">
                适合希望统一方法口径、共享模板结构和沉淀复用建议的小团队场景。
              </p>
              <div className="task-card__meta">
                <span className="task-card__meta-label">包含能力</span>
                <p className="task-card__meta-text">
                  团队模板入口、统一输出结构、常见问题复盘视图和可复用建议库。
                </p>
              </div>
              <div className="task-card__tags">
                <Tag>Template Manager</Tag>
                <Tag>Reusable Suggestions</Tag>
                <Tag>Skill Review</Tag>
              </div>
              <div className="task-card__actions">
                <Button variant="ghost">查看方案</Button>
              </div>
            </Card>

            <Card className="membership-card">
              <div className="task-card__title-row">
                <h3 className="membership-card__title">Enterprise Preview</h3>
                <Tag>预留能力</Tag>
              </div>
              <p className="membership-card__description">
                预留给更复杂的组织级场景，用于后续扩展审批链路、部门模板库和更细分的任务结构。
              </p>
              <div className="task-card__meta">
                <span className="task-card__meta-label">当前阶段说明</span>
                <p className="task-card__meta-text">
                  这一版只保留信息架构占位，不接入账号体系、后台服务或真实权限控制。
                </p>
              </div>
              <div className="task-card__tags">
                <Tag>Prototype Scope</Tag>
                <Tag>Future Expansion</Tag>
              </div>
              <div className="task-card__actions">
                <Button variant="ghost">了解边界</Button>
              </div>
            </Card>
          </div>
        </section>

        <section className="library-group">
          <div className="library-group__header">
            <div className="library-group__title-row">
              <h3 className="library-group__title">能力覆盖</h3>
              <span className="library-group__pill">对应产品流程</span>
            </div>
            <p className="library-group__description">
              所有方案都围绕同一条工作链路展开，只是在保存深度、模板能力和协作场景上有所区别。
            </p>
          </div>

          <div className="library-grid">
            <Card className="membership-card">
              <h3 className="membership-card__title">任务入口与上下文构建</h3>
              <p className="membership-card__description">
                从项目复盘、周报、方案、纪要、竞品和 PPT 大纲切入，再补全目标、对象、背景和限制条件。
              </p>
            </Card>

            <Card className="membership-card">
              <h3 className="membership-card__title">结构化 Prompt 与输出质检</h3>
              <p className="membership-card__description">
                用固定结构组织 Prompt，并在输出后检查具体度、数据支撑、对象匹配和下一步计划。
              </p>
            </Card>

            <Card className="membership-card">
              <h3 className="membership-card__title">多版本优化与结果沉淀</h3>
              <p className="membership-card__description">
                将一份结果扩写成领导汇报版、团队同步版、PPT 大纲版或邮件通知版，并保存到结果库。
              </p>
            </Card>

            <Card className="membership-card">
              <h3 className="membership-card__title">Skill Records 与模板回流</h3>
              <p className="membership-card__description">
                把验证过的方法记录下来，再反向沉淀成下次可直接进入 Workbench 的模板入口。
              </p>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Membership;
