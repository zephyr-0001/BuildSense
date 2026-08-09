// BuildSense Core Logic

// State
let currentTab = 'quick';
let floors = [];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initPackages();
    initEstimator();
});

// Navigation (SPA logic)
function navigateTo(pageId) {
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
    
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');
    
    const navLink = document.getElementById(`nav-${pageId}`);
    if (navLink) navLink.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Packages Rendering
function initPackages() {
    const container = document.getElementById('packages-container');
    const select = document.getElementById('est-package-select');
    
    if (!container || !select) return;

    container.innerHTML = '';
    select.innerHTML = '<option value="">-- Select a Package --</option>';

    if (!window.BuildSenseConfig || !window.BuildSenseConfig.packages) {
        console.error("BuildSenseConfig not loaded properly.");
        return;
    }

    window.BuildSenseConfig.packages.forEach(pkg => {
        // Format detailed sections
        let detailedHtml = '';
        if (pkg.detailedSections) {
            for (const [key, items] of Object.entries(pkg.detailedSections)) {
                // Convert camelCase key to normal text
                const sectionName = key.replace(/([A-Z])/g, ' $1').trim();
                detailedHtml += `
                    <div class="accordion-section-title">${sectionName}</div>
                    <ul>
                        ${items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                `;
            }
        }

        // Render Card
        const card = document.createElement('div');
        card.className = 'package-card';
        card.innerHTML = `
            <div class="package-name">${pkg.name}</div>
            <div class="package-desc">${pkg.description}</div>
            <div class="package-price">₹${pkg.displayStartingRate.toLocaleString('en-IN')} <span>/ sqft (incl. GST)</span></div>
            <ul class="package-features">
                ${pkg.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="accordion-wrapper">
                <button class="accordion-toggle" onclick="toggleAccordion('acc-${pkg.id}', this)">
                    View Full Details 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div id="acc-${pkg.id}" class="accordion-content">
                    ${detailedHtml}
                </div>
            </div>
            <button class="btn btn-outline" onclick="estimateWithPackage('${pkg.id}')">Estimate with this</button>
        `;
        container.appendChild(card);

        // Populate Select
        const option = document.createElement('option');
        option.value = pkg.id;
        option.textContent = pkg.name;
        select.appendChild(option);
    });
}

function estimateWithPackage(pkgId) {
    const select = document.getElementById('est-package-select');
    if (select) {
        select.value = pkgId;
    }
    navigateTo('estimator');
    calculateEstimate();
}

function toggleAccordion(id, btnElement) {
    const content = document.getElementById(id);
    if (content) {
        content.classList.toggle('expanded');
        btnElement.classList.toggle('expanded');
    }
}

// Estimator Logic
function switchEstimatorTab(tabId) {
    currentTab = tabId;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    const tabContent = document.getElementById(`tab-${tabId}`);
    if (tabContent) tabContent.classList.add('active');
    
    calculateEstimate();
}

// Floor Builder
function initEstimator() {
    // Add default floor
    addFloorRow('Ground Floor');
}

function addFloorRow(defaultType = 'Floor 1') {
    const id = Date.now().toString();
    floors.push({ id, type: defaultType, length: 0, width: 0 });
    renderFloors();
}

function removeFloor(id) {
    floors = floors.filter(f => f.id !== id);
    renderFloors();
    calculateEstimate();
}

function updateFloor(id, field, value) {
    const floor = floors.find(f => f.id === id);
    if (floor) {
        floor[field] = value;
        calculateEstimate();
    }
}

function renderFloors() {
    const container = document.getElementById('floors-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    floors.forEach(floor => {
        const item = document.createElement('div');
        item.className = 'floor-item';
        item.innerHTML = `
            <div class="floor-item-header">
                <select class="form-control" style="width: auto; padding: 0.25rem 0.5rem;" onchange="updateFloor('${floor.id}', 'type', this.value)">
                    <option value="Basement" ${floor.type==='Basement'?'selected':''}>Basement</option>
                    <option value="Ground Floor" ${floor.type==='Ground Floor'?'selected':''}>Ground Floor</option>
                    <option value="Floor 1" ${floor.type==='Floor 1'?'selected':''}>Floor 1</option>
                    <option value="Floor 2" ${floor.type==='Floor 2'?'selected':''}>Floor 2</option>
                    <option value="Floor 3" ${floor.type==='Floor 3'?'selected':''}>Floor 3</option>
                    <option value="Terrace" ${floor.type==='Terrace'?'selected':''}>Terrace</option>
                </select>
                <button class="btn-remove" onclick="removeFloor('${floor.id}')">✕ Remove</button>
            </div>
            <div class="input-row">
                <div class="input-group mb-0">
                    <label>Length (ft)</label>
                    <input type="number" class="form-control" min="0" placeholder="0" value="${floor.length || ''}" oninput="updateFloor('${floor.id}', 'length', parseFloat(this.value) || 0)">
                </div>
                <div class="input-group mb-0">
                    <label>Width (ft)</label>
                    <input type="number" class="form-control" min="0" placeholder="0" value="${floor.width || ''}" oninput="updateFloor('${floor.id}', 'width', parseFloat(this.value) || 0)">
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

// Calculation core
function calculateEstimate() {
    let area = 0;
    
    if (currentTab === 'quick') {
        area = parseFloat(document.getElementById('quick-area')?.value) || 0;
    } else {
        area = floors.reduce((sum, f) => sum + ((f.length || 0) * (f.width || 0)), 0);
    }
    
    const select = document.getElementById('est-package-select');
    const pkgId = select ? select.value : '';
    const pkg = (window.BuildSenseConfig && window.BuildSenseConfig.packages) 
                ? window.BuildSenseConfig.packages.find(p => p.id === pkgId)
                : null;
    
    // UI Updates
    const quoteArea = document.getElementById('quote-area');
    const quotePackageName = document.getElementById('quote-package-name');
    const quotePackageRate = document.getElementById('quote-package-rate');
    const quoteTotal = document.getElementById('quote-total');
    
    if (quoteArea) quoteArea.innerText = `${Math.round(area).toLocaleString()} sqft`;
    if (quotePackageName) quotePackageName.innerText = pkg ? pkg.name : '-';
    if (quotePackageRate) quotePackageRate.innerText = pkg ? `₹${pkg.displayStartingRate.toLocaleString('en-IN')} / sqft` : '-';
    
    if (!pkg || area <= 0) {
        if (quoteTotal) quoteTotal.innerText = '₹0';
        return;
    }
    
    const config = window.BuildSenseConfig;
    const baseCost = area * pkg.internalRatePerSqft;
    const feesAmount = baseCost * (config.fees.value / 100);
    const subtotal = baseCost + feesAmount;
    const gstAmount = subtotal * (config.gst.value / 100);
    const totalCost = subtotal + gstAmount;
    
    // Format to INR
    if (quoteTotal) {
        quoteTotal.innerText = '₹' + Math.round(totalCost).toLocaleString('en-IN');
    }
    
    // Sync Hidden Fields for Lead Capture Form
    const formContainer = document.getElementById('lead-form-container');
    if (area > 0 && pkg) {
        if (formContainer) formContainer.style.display = 'block';
        const hiddenPkg = document.getElementById('hidden-pkg');
        const hiddenArea = document.getElementById('hidden-area');
        const hiddenTotal = document.getElementById('hidden-total');
        const hiddenBreakdown = document.getElementById('hidden-breakdown');
        
        if (hiddenPkg) hiddenPkg.value = pkg.name;
        if (hiddenArea) hiddenArea.value = area + ' sqft';
        if (hiddenTotal) hiddenTotal.value = '₹' + Math.round(totalCost).toLocaleString('en-IN');
        
        if (hiddenBreakdown) {
            if (currentTab === 'quick') {
                hiddenBreakdown.value = 'Quick Estimate Mode';
            } else {
                hiddenBreakdown.value = floors
                    .filter(f => (f.length || 0) > 0 && (f.width || 0) > 0)
                    .map(f => `- ${f.type}: ${f.length}ft x ${f.width}ft = ${f.length * f.width} sqft`)
                    .join('\n');
            }
        }
    } else {
        if (formContainer) formContainer.style.display = 'none';
    }
}

// Lead Form Validation & Submission
function clearLeadError() {
    const errorEl = document.getElementById('lead-error');
    if (errorEl) errorEl.style.display = 'none';
}

function handleLeadSubmit(e) {
    e.preventDefault();
    
    const phone = document.getElementById('lead-phone')?.value.trim();
    const email = document.getElementById('lead-email')?.value.trim();
    const errorEl = document.getElementById('lead-error');
    
    if (!phone && !email) {
        if (errorEl) errorEl.style.display = 'block';
        return false;
    }
    
    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        document.getElementById('lead-form').style.display = 'none';
        document.getElementById('lead-success').style.display = 'block';
    })
    .catch(error => {
        console.error('Error submitting form', error);
        alert('There was an error submitting your request. Please try again.');
    });
}
