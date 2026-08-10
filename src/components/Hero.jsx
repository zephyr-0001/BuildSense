export default function Hero({ navigateTo }) {
  return (
    <section id="page-home" className="page-section active">
      <div className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Build Your Dream Home With Confidence.</h1>
            <p>Transparent pricing, premium quality, and zero hidden costs. Use our intelligent estimator to get an instant quote for your construction project today.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigateTo('estimator')}>Get an Estimate</button>
              <button className="btn btn-outline" onClick={() => navigateTo('packages')}>View Packages</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
