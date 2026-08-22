import PackageDetails from './PackageDetails';
import FormattedPackageName from './FormattedPackageName';

export default function Packages({ navigateTo, config }) {
  return (
    <section id="page-packages" className="page-section active">
      <div className="container section">
        <div className="text-center" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div className="packages-visual" style={{marginBottom: '1rem'}}>
            <svg viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-anim" style={{height: '220px', maxWidth: '100%'}}>
              {/* Abstract grid background */}
              <path d="M50 50 L50 250 M150 50 L150 250 M250 50 L250 250 M350 50 L350 250 M450 50 L450 250" stroke="rgba(249,115,22,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M50 50 L450 50 M50 150 L450 150 M50 250 L450 250" stroke="rgba(249,115,22,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Ground */}
              <path d="M20 250 L480 250" stroke="var(--color-text-main)" strokeWidth="4" strokeLinecap="round" className="anim-path" />
              
              {/* Construction Blocks (Packages) */}
              {/* Block 1 (Base) */}
              <rect x="180" y="210" width="140" height="40" rx="4" stroke="var(--color-text-main)" strokeWidth="4" className="anim-path delay-1" />
              <path d="M190 230 L310 230" stroke="rgba(249,115,22,0.4)" strokeWidth="2" strokeDasharray="5 5" className="anim-path delay-2" />
              
              {/* Block 2 (Middle) */}
              <rect x="200" y="170" width="100" height="40" rx="4" stroke="var(--color-accent)" strokeWidth="4" className="anim-path delay-3" />
              
              {/* Block 3 (Top being placed) */}
              <rect x="220" y="90" width="60" height="40" rx="4" stroke="var(--color-accent)" strokeWidth="4" className="anim-path delay-4" />
              {/* Stars around premium top block */}
              <path d="M 250 60 L 250 70 M 245 65 L 255 65" stroke="var(--color-accent)" strokeWidth="2" className="anim-fade delay-5" />
              <circle cx="220" cy="70" r="3" fill="var(--color-accent)" className="anim-fade delay-3" />
              <circle cx="280" cy="75" r="4" fill="var(--color-accent)" className="anim-fade delay-4" />
              
              {/* Crane */}
              {/* Crane Base & Tower */}
              <path d="M80 250 L120 250 L100 220 Z" stroke="var(--color-text-main)" strokeWidth="3" className="anim-path delay-1" />
              <path d="M100 220 L100 50" stroke="var(--color-text-main)" strokeWidth="4" className="anim-path delay-2" />
              {/* Crane Arm */}
              <path d="M70 70 L100 50 L280 50" stroke="var(--color-text-main)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="anim-path delay-3" />
              {/* Crane cables */}
              <path d="M100 70 L250 70" stroke="var(--color-text-main)" strokeWidth="1" strokeDasharray="3 3" className="anim-path delay-4" />
              <path d="M250 50 L250 90" stroke="var(--color-text-main)" strokeWidth="2" className="anim-path delay-4" />
              {/* Hook */}
              <path d="M245 90 L255 90 M250 90 L250 95 C250 100, 240 100, 240 95" stroke="var(--color-text-main)" strokeWidth="2" fill="none" className="anim-path delay-5" />
            </svg>
          </div>
          <h2 className="section-title">Our Construction Packages</h2>
          <p className="section-subtitle" style={{marginBottom: '0.5rem'}}>Choose from our curated selection of premium construction packages designed to fit your needs and budget.</p>
          <p style={{fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '3rem', fontStyle: 'italic'}}>*Please note: Interior works are not included as part of these construction packages.</p>
        </div>
        <div className="packages-grid">
          {config.packages.map((pkg, idx) => (
            <PackageCard key={pkg.id} pkg={pkg} index={idx} navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg, index, navigateTo }) {
  return (
    <div className="package-card">
      <div className="package-name">
        <FormattedPackageName name={pkg.name} index={index} />
      </div>
      <div className="package-desc">{pkg.description}</div>
      <div className="package-price">₹{pkg.displayStartingRate.toLocaleString('en-IN')} <span>/ sqft (excl. GST)</span></div>
      
      <PackageDetails pkg={pkg} />
      
      <button className="btn btn-outline" onClick={() => {
        localStorage.setItem('selectedPackage', pkg.id);
        navigateTo('estimator');
      }}>Estimate with {pkg.name}</button>
    </div>
  );
}
