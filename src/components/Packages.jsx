import PackageDetails from './PackageDetails';

export default function Packages({ navigateTo, config }) {
  return (
    <section id="page-packages" className="page-section active">
      <div className="container section">
        <div className="text-center">
          <h2 className="section-title">Our Construction Packages</h2>
          <p className="section-subtitle" style={{marginBottom: '0.5rem'}}>Choose from our curated selection of premium construction packages designed to fit your needs and budget.</p>
          <p style={{fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '3rem', fontStyle: 'italic'}}>*Please note: Interior works are not included as part of these construction packages.</p>
        </div>
        <div className="packages-grid">
          {config.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg, navigateTo }) {
  return (
    <div className="package-card">
      <div className="package-name">{pkg.name}</div>
      <div className="package-desc">{pkg.description}</div>
      <div className="package-price">₹{pkg.displayStartingRate.toLocaleString('en-IN')} <span>/ sqft (incl. GST)</span></div>
      
      <PackageDetails pkg={pkg} />
      
      <button className="btn btn-outline" onClick={() => {
        localStorage.setItem('selectedPackage', pkg.id);
        navigateTo('estimator');
      }}>Estimate with this</button>
    </div>
  );
}
