import { useState } from 'react';

export default function PackageDetails({ pkg }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ul className="package-features">
        {pkg.features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <div className="accordion-wrapper" style={{ marginBottom: '1rem' }}>
        <button className={`accordion-toggle ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
          View Full Details 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div className={`accordion-content ${expanded ? 'expanded' : ''}`}>
          {pkg.detailedSections && Object.entries(pkg.detailedSections).map(([key, items]) => {
            const sectionName = key.replace(/([A-Z])/g, ' $1').trim();
            return (
              <div key={key}>
                <div className="accordion-section-title" style={{textTransform: 'capitalize'}}>{sectionName}</div>
                <ul style={{marginBottom: '1rem', paddingLeft: 0}}>
                  {items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
