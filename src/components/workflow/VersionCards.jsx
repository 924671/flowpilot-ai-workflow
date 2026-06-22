import React from 'react';

function VersionCards({
  versions,
  generatedVersions,
  selectedVersionId,
  onGenerateVersion,
  onSelectVersion,
  onGoToSave,
}) {
  const safeGeneratedVersions = Array.isArray(generatedVersions) ? generatedVersions : [];
  const generatedIds = new Set(safeGeneratedVersions.map((item) => item.id));
  const hasGeneratedVersion = safeGeneratedVersions.length > 0;

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Version Optimization</span>
        <h3 className="execute-panel__title">多版本优化入口</h3>
      </div>

      <p className="execute-panel__description">
        基于 AI Output 和 Output Check，为不同沟通场景生成可预览、可保存的版本。
      </p>

      <div className="version-cards-grid">
        {versions.map((version) => {
          const generatedVersion = safeGeneratedVersions.find((item) => item.id === version.id);
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
                {isGenerated ? <span className="version-card__status">已生成</span> : null}
              </div>

              {generatedVersion ? (
                <p className="version-card__preview">{generatedVersion.preview}</p>
              ) : null}

              <button
                type="button"
                className="version-card__button"
                onClick={() =>
                  isGenerated ? onSelectVersion?.(version.id) : onGenerateVersion?.(version.id)
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
