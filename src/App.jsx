import { useState } from 'react';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Estimator from './components/Estimator';
import { BuildSenseConfig } from './data/config';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}><path d="M2 20h20"/><path d="M5 20v-8"/><path d="M10 20v-8"/><path d="M15 20v-8"/><path d="M19 20V8l-7-5-7 5v12"/></svg>
            Build<span>Sense</span>
          </div>
          <div className="nav-links">
            <a onClick={() => navigateTo('home')} className={currentPage === 'home' ? 'active' : ''} style={{ cursor: 'pointer' }}>Home</a>
            <a onClick={() => navigateTo('packages')} className={currentPage === 'packages' ? 'active' : ''} style={{ cursor: 'pointer' }}>Packages</a>
            <a onClick={() => navigateTo('estimator')} className={currentPage === 'estimator' ? 'active' : ''} style={{ cursor: 'pointer' }}>Estimate</a>
          </div>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <Hero navigateTo={navigateTo} />}
        {currentPage === 'packages' && <Packages navigateTo={navigateTo} config={BuildSenseConfig} />}
        {currentPage === 'estimator' && <Estimator config={BuildSenseConfig} />}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <div className="logo mb-2" style={{ color: 'white' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}><path d="M2 20h20"/><path d="M5 20v-8"/><path d="M10 20v-8"/><path d="M15 20v-8"/><path d="M19 20V8l-7-5-7 5v12"/></svg>
                Build<span style={{ color: 'var(--color-accent)' }}>Sense</span>
              </div>
              <p>Building your dreams with quality, transparency, and trust.</p>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <p>✉️ buildwithsense@gmail.com</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <p><a onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Home</a></p>
              <p><a onClick={() => navigateTo('packages')} style={{ cursor: 'pointer' }}>Packages</a></p>
              <p><a onClick={() => navigateTo('estimator')} style={{ cursor: 'pointer' }}>Get an Estimate</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; 2026 BuildSense. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
