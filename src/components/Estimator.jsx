import { useState, useEffect } from 'react';
import PackageDetails from './PackageDetails';

export default function Estimator({ config }) {
  const [activeTab, setActiveTab] = useState('quick');
  const [selectedPkgId, setSelectedPkgId] = useState('');
  const [quickArea, setQuickArea] = useState('');
  
  const [floors, setFloors] = useState([
    { id: '1', type: 'Ground Floor', length: '', width: '' }
  ]);

  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadError, setLeadError] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  useEffect(() => {
    const savedPkg = localStorage.getItem('selectedPackage');
    if (savedPkg) {
      setSelectedPkgId(savedPkg);
      localStorage.removeItem('selectedPackage'); // clear it
    }
  }, []);

  const handleAddFloor = () => {
    setFloors([...floors, { id: Date.now().toString(), type: 'Floor 1', length: '', width: '' }]);
  };

  const handleRemoveFloor = (id) => {
    setFloors(floors.filter(f => f.id !== id));
  };

  const handleUpdateFloor = (id, field, value) => {
    setFloors(floors.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  // Calculations
  const calcTotalArea = () => {
    if (activeTab === 'quick') {
      return parseFloat(quickArea) || 0;
    }
    return floors.reduce((sum, f) => sum + ((parseFloat(f.length) || 0) * (parseFloat(f.width) || 0)), 0);
  };

  const totalArea = calcTotalArea();
  const pkg = config.packages.find(p => p.id === selectedPkgId);

  let totalCost = 0;
  if (pkg && totalArea > 0) {
    const baseCost = totalArea * pkg.internalRatePerSqft;
    const feesAmount = baseCost * (config.fees.value / 100);
    const subtotal = baseCost + feesAmount;
    const gstAmount = subtotal * (config.gst.value / 100);
    totalCost = subtotal + gstAmount;
  }

  // Handle lead submission
  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadPhone.trim() && !leadEmail.trim()) {
      setLeadError(true);
      return;
    }
    setLeadError(false);
    
    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(() => setLeadSuccess(true))
    .catch(err => {
      console.error(err);
      alert('Error submitting form. Please try again.');
    });
  };

  const floorBreakdownText = activeTab === 'quick' 
    ? 'Quick Estimate Mode' 
    : floors.filter(f => (parseFloat(f.length) || 0) > 0 && (parseFloat(f.width) || 0) > 0)
            .map(f => `- ${f.type}: ${f.length}ft x ${f.width}ft = ${(parseFloat(f.length) || 0) * (parseFloat(f.width) || 0)} sqft`)
            .join('\n');

  return (
    <section id="page-estimator" className="page-section active">
      <div className="container section">
        <div className="text-center">
          <h2 className="section-title">Cost Estimator</h2>
          <p className="section-subtitle">Get an instant, transparent quote for your project based on your requirements.</p>
        </div>

        <div className="estimator-wrapper">
          <div className="estimator-tabs">
            <button className={`tab-btn ${activeTab === 'quick' ? 'active' : ''}`} onClick={() => setActiveTab('quick')}>Quick Estimate</button>
            <button className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`} onClick={() => setActiveTab('custom')}>Custom Estimate</button>
          </div>

          <div className="estimator-body">
            {/* Inputs Panel */}
            <div className="estimator-inputs">
              <div className="input-group mb-4">
                <label>Select Package</label>
                <select className="form-control" value={selectedPkgId} onChange={e => setSelectedPkgId(e.target.value)}>
                  <option value="">-- Select a Package --</option>
                  {config.packages.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {pkg && (
                  <div style={{ marginTop: '1rem', padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '0.75rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{pkg.name} Details</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{pkg.description}</p>
                    <PackageDetails pkg={pkg} />
                  </div>
                )}
              </div>

              {activeTab === 'quick' && (
                <div className="tab-content active">
                  <div className="input-group">
                    <label>Total Built-up Area (sqft)</label>
                    <input type="number" className="form-control" placeholder="e.g. 2400" min="0" value={quickArea} onChange={e => setQuickArea(e.target.value)} />
                  </div>
                </div>
              )}

              {activeTab === 'custom' && (
                <div className="tab-content active">
                  <div id="floor-builder-wrapper">
                    <label className="mb-2" style={{display: 'block', fontWeight: 500}}>Floor-wise Builder</label>
                    <div className="floor-list">
                      {floors.map(floor => (
                        <div key={floor.id} className="floor-item">
                          <div className="floor-item-header">
                            <select className="form-control" style={{width: 'auto', padding: '0.25rem 0.5rem'}} value={floor.type} onChange={e => handleUpdateFloor(floor.id, 'type', e.target.value)}>
                              <option value="Basement">Basement</option>
                              <option value="Ground Floor">Ground Floor</option>
                              <option value="Floor 1">Floor 1</option>
                              <option value="Floor 2">Floor 2</option>
                              <option value="Floor 3">Floor 3</option>
                              <option value="Terrace">Terrace</option>
                            </select>
                            <button className="btn-remove" onClick={() => handleRemoveFloor(floor.id)}>✕ Remove</button>
                          </div>
                          <div className="input-row">
                            <div className="input-group mb-0">
                              <label>Length (ft)</label>
                              <input type="number" className="form-control" min="0" placeholder="0" value={floor.length} onChange={e => handleUpdateFloor(floor.id, 'length', e.target.value)} />
                            </div>
                            <div className="input-group mb-0">
                              <label>Width (ft)</label>
                              <input type="number" className="form-control" min="0" placeholder="0" value={floor.width} onChange={e => handleUpdateFloor(floor.id, 'width', e.target.value)} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="btn-add-floor" onClick={handleAddFloor}>+ Add Floor</button>
                  </div>
                </div>
              )}
            </div>

            {/* Quote Panel */}
            <div className="quote-panel">
              <div className="quote-title">Estimated Cost</div>
              <div className="quote-amount">₹{pkg && totalArea > 0 ? Math.round(totalCost).toLocaleString('en-IN') : '0'}</div>
              <div className="quote-details">
                <div className="quote-row total-area">
                  <span>Built-up Area</span>
                  <span>{Math.round(totalArea).toLocaleString()} sqft</span>
                </div>
                <div className="quote-row">
                  <span>Package Selected</span>
                  <span>{pkg ? pkg.name : '-'}</span>
                </div>
                <div className="quote-row">
                  <span>Package Rate</span>
                  <span>{pkg ? `₹${pkg.displayStartingRate.toLocaleString('en-IN')} / sqft` : '-'}</span>
                </div>
              </div>
              <div className="quote-note">
                *Inclusive of all applicable GST.<br/>
                *Government charges like BESCOM, BWSSB, Borewell etc. will be additional and paid by the client.<br/>
                *These estimate charges are subject to final discussion, agreement etc.
              </div>

              {/* Lead Capture Form */}
              {pkg && totalArea > 0 && !leadSuccess && (
                <div className="lead-form-container">
                  <hr style={{margin: '2rem 0', border: 'none', borderTop: '1px solid var(--color-border)'}} />
                  <h4>Get a Detailed Consultation</h4>
                  <p style={{fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem'}}>Enter your details below and we will contact you to discuss this estimate.</p>
                  
                  <form onSubmit={handleLeadSubmit} action="https://api.web3forms.com/submit" method="POST">
                    <input type="hidden" name="access_key" value="6452b31a-d5ee-4cd1-bbdd-a02db74b3e97" />
                    <input type="hidden" name="Estimate_Package" value={pkg.name} />
                    <input type="hidden" name="Estimate_Area" value={`${totalArea} sqft`} />
                    <input type="hidden" name="Estimate_Total" value={`₹${Math.round(totalCost).toLocaleString('en-IN')}`} />
                    <textarea name="Floor_Breakdown" style={{display: 'none'}} value={floorBreakdownText} readOnly />
                    
                    <div className="input-group">
                      <label>Name *</label>
                      <input type="text" name="Name" className="form-control" required value={leadName} onChange={e => setLeadName(e.target.value)} />
                    </div>
                    <div className="input-row">
                      <div className="input-group">
                        <label>Phone</label>
                        <input type="tel" name="Phone" className="form-control" value={leadPhone} onChange={e => { setLeadPhone(e.target.value); setLeadError(false); }} />
                      </div>
                      <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="Email" className="form-control" value={leadEmail} onChange={e => { setLeadEmail(e.target.value); setLeadError(false); }} />
                      </div>
                    </div>
                    {leadError && (
                      <div style={{color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem'}}>
                        Please provide either a Phone number or an Email address.
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Request Consultation</button>
                  </form>
                </div>
              )}
              {leadSuccess && (
                <div style={{textAlign: 'center', color: '#10b981', fontWeight: 500, marginTop: '1.5rem'}}>
                  Thank you! We have received your request and will be in touch shortly.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
