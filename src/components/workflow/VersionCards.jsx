import React from 'react';

function VersionCards({
  versions,
  generatedVersions,
  selectedVersionId,
  onGenerateVersion,
  onSelectVersion,
  onGoToSave,
}) {
  const generatedIds = new Set(generatedVersions.map((item) => item.id));
  const hasGeneratedVersion = generatedVersions.length > 0;

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Version Optimization</span>
        <h3 className="execute-panel__title">多版本优化入口</h3>
      </div>

      <p className="execute-panel__description">
        为同一份结果生成不同沟通场景下的版本，先预览当前版本，再决定是否进入保存步骤。
      </p>

      <div className="version-cards-grid">
        {versions.map((version) => {
          const generatedVersion = generatedVersions.find((item) => item.id === version.id);
          const isGenerated = generatedIds.has(version.id);
          const isSelected = selectedVersionId === version.id;

          return (
            <article
              key={version.id}
              className={`version-card ${isGenerated ? 'is-generated' : ''} ${isSelected ? 'is-selected' : ''}`}
            >
              <div className="version-card__top">
                <div>
                  <h4 className="version-card__title">{version.name}</h4>
                  <p className="version-card__scene">{version.scene}</p>
                </div>
                {isGenerated && <span className="version-card__status">已生成</span>}
              </div>

              {generatedVersion && (
                <p className="version-card__preview">{generatedVersion.preview}</p>
              )}

              <button
                type="button"
                className="version-card__button"
                onClick={() =>
                  isGenerated
                    ? onSelectVersion?.(version.id)
                    : onGenerateVersion?.(version.id)
                }
              >
                {isGenerated ? '查看版本' : '生成版本'}
              </button>
            </article>
          );
        })}
      </div>

      <div className="version-cards__footer">
        {hasGeneratedVersion ? (
          <button
            type="button"
            className="button button--primary version-cards__save-button"
            onClick={onGoToSave}
          >
            进入 Save Result
          </button>
        ) : (
          <span className="version-cards__hint">请先生成至少一个版本</span>
        )}
      </div>
    </section>
  );
}

export default VersionCards;
