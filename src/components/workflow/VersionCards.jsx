import React from 'react';

function VersionCards({ versions, generatedVersions, onGenerateVersion }) {
  const generatedIds = new Set(generatedVersions.map((item) => item.id));

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Version Optimization</span>
        <h3 className="execute-panel__title">多版本优化入口</h3>
      </div>

      <div className="version-cards-grid">
        {versions.map((version) => {
          const generatedVersion = generatedVersions.find(
            (item) => item.id === version.id,
          );
          const isGenerated = generatedIds.has(version.id);

          return (
            <article
              key={version.id}
              className={`version-card ${isGenerated ? 'is-generated' : ''}`}
            >
              <h4 className="version-card__title">{version.name}</h4>
              <p className="version-card__scene">{version.scene}</p>
              {generatedVersion && (
                <p className="version-card__preview">{generatedVersion.preview}</p>
              )}
              <button
                type="button"
                className="version-card__button"
                onClick={() => onGenerateVersion?.(version.id)}
              >
                {isGenerated ? '已生成版本' : '生成版本'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default VersionCards;
