import { useState, useEffect } from 'react';
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
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo" onClick={() => navigateTo('home')} style={{ cursor: 'pointer', fontSize: '1.85rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}><path d="M2 20h20"/><path d="M5 20v-8"/><path d="M10 20v-8"/><path d="M15 20v-8"/><path d="M19 20V8l-7-5-7 5v12"/></svg>
            Build<span style={{ color: 'var(--color-accent)' }}>Sense</span>
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a onClick={() => navigateTo('home')} className={currentPage === 'home' ? 'active' : ''} style={{ cursor: 'pointer' }}>Home</a>
            <a onClick={() => navigateTo('packages')} className={currentPage === 'packages' ? 'active' : ''} style={{ cursor: 'pointer' }}>Packages</a>
            <a onClick={() => navigateTo('estimator')} className={currentPage === 'estimator' ? 'active' : ''} style={{ cursor: 'pointer' }}>Build Estimator</a>
            <button 
              onClick={toggleTheme} 
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)'
              }}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
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
              <div className="logo mb-2" style={{ color: 'white', fontSize: '1.85rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}><path d="M2 20h20"/><path d="M5 20v-8"/><path d="M10 20v-8"/><path d="M15 20v-8"/><path d="M19 20V8l-7-5-7 5v12"/></svg>
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
