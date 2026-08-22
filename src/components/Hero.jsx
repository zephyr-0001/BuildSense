export default function Hero({ navigateTo }) {
  return (
    <section id="page-home" className="page-section active">
      <div className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Build<span style={{ color: 'var(--color-accent)' }}>Zen</span></h1>
            <p style={{ fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Thoughtful design, mindful construction.</p>
            <p>Transparent pricing, premium quality, and zero hidden costs. Use our intelligent estimator to get an instant quote for your construction project today.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigateTo('estimator')}>Get an Estimate</button>
              <button className="btn btn-outline" onClick={() => navigateTo('packages')}>View Packages</button>
            </div>
          </div>
          
          <div className="hero-visual">
            <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-anim">
              {/* Sun/Moon */}
              <circle cx="400" cy="100" r="40" stroke="var(--color-accent)" strokeWidth="3" className="anim-path delay-1" />
              
              {/* Decorative architectural grid lines */}
              <path d="M50 100 L50 480" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="5 5" />
              <path d="M250 50 L250 480" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="5 5" />
              <path d="M450 100 L450 480" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="5 5" />
              <path d="M20 250 L480 250" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="5 5" />
              <path d="M20 100 L480 100" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="5 5" />
              
              {/* Background structure (faint) */}
              <path d="M50 450 L50 250 L250 100 L450 250 L450 450 Z" stroke="rgba(249,115,22,0.3)" strokeWidth="2" className="anim-path delay-2" />
              
              {/* Foreground structure (bold) */}
              <path d="M100 450 L100 300 L250 180 L400 300 L400 450 Z" stroke="var(--color-accent)" strokeWidth="4" className="anim-path delay-3" />
              
              {/* Roof Overhang */}
              <path d="M80 315 L250 160 L420 315" stroke="var(--color-accent)" strokeWidth="5" strokeLinecap="round" className="anim-path delay-3" />
              
              {/* Door */}
              <path d="M210 450 L210 330 L290 330 L290 450" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" className="anim-path delay-4" />
              <circle cx="275" cy="390" r="4" fill="var(--color-accent)" className="anim-fade" />
              
              {/* Windows */}
              <rect x="130" y="320" width="50" height="50" stroke="var(--color-accent)" strokeWidth="3" className="anim-path delay-5" />
              <path d="M155 320 L155 370 M130 345 L180 345" stroke="var(--color-accent)" strokeWidth="2" className="anim-path delay-5" />
              
              <rect x="320" y="320" width="50" height="50" stroke="var(--color-accent)" strokeWidth="3" className="anim-path delay-5" />
              <path d="M345 320 L345 370 M320 345 L370 345" stroke="var(--color-accent)" strokeWidth="2" className="anim-path delay-5" />
              
              {/* Base line */}
              <path d="M20 450 L480 450" stroke="var(--color-text-main)" strokeWidth="4" strokeLinecap="round" className="anim-path" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
