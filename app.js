/* ======================================================================
   Dashboard Pluviométrico – Corrientes  |  app.js
   ====================================================================== */

// ─── Constants & Configuration ──────────────────────────────────────────
const LOCAL_STORAGE_KEY = 'corrientes_rain_records';

// Department and Municipality Coordinates in Corrientes
const DEPARTMENTS_DATA = {
    "Capital": {
        center: { lat: -27.4692, lng: -58.8306 },
        municipalities: {
            "Capital (Corrientes)": { lat: -27.4692, lng: -58.8306 },
            "Riachuelo": { lat: -27.5794, lng: -58.7472 }
        }
    },
    "Bella Vista": {
        center: { lat: -28.5083, lng: -59.0436 },
        municipalities: {
            "Bella Vista": { lat: -28.5083, lng: -59.0436 },
            "Tres de Abril": { lat: -28.5515, lng: -59.0031 }
        }
    },
    "Berón de Astrada": {
        center: { lat: -27.3056, lng: -57.5344 },
        municipalities: {
            "Berón de Astrada": { lat: -27.3056, lng: -57.5344 }
        }
    },
    "Concepción": {
        center: { lat: -28.3917, lng: -57.8867 },
        municipalities: {
            "Concepción": { lat: -28.3917, lng: -57.8867 },
            "Santa Rosa": { lat: -28.2631, lng: -58.1172 }
        }
    },
    "Curuzú Cuatiá": {
        center: { lat: -29.7917, lng: -58.0561 },
        municipalities: {
            "Curuzú Cuatiá": { lat: -29.7917, lng: -58.0561 },
            "Perugorría": { lat: -29.3453, lng: -58.6186 },
            "Cazadores Correntinos": { lat: -29.9806, lng: -57.7761 }
        }
    },
    "Empedrado": {
        center: { lat: -27.9014, lng: -58.8058 },
        municipalities: {
            "Empedrado": { lat: -27.9014, lng: -58.8058 },
            "El Sombrero": { lat: -27.6744, lng: -58.7831 },
            "Manuel Derqui": { lat: -27.7562, lng: -58.8041 }
        }
    },
    "Esquina": {
        center: { lat: -30.0139, lng: -59.5267 },
        municipalities: {
            "Esquina": { lat: -30.0139, lng: -59.5267 },
            "Pueblo Libertador": { lat: -30.2227, lng: -59.4344 },
            "Malvinas": { lat: -30.0833, lng: -59.1333 }
        }
    },
    "General Alvear": {
        center: { lat: -29.0950, lng: -56.5433 },
        municipalities: {
            "Alvear": { lat: -29.0950, lng: -56.5433 },
            "Estación Torrent": { lat: -28.8256, lng: -56.5139 }
        }
    },
    "General Paz": {
        center: { lat: -27.7511, lng: -57.6208 },
        municipalities: {
            "Caá Catí": { lat: -27.7511, lng: -57.6208 },
            "Itá Ibaté": { lat: -27.4265, lng: -57.3361 },
            "Lomas de Vallejos": { lat: -27.7317, lng: -57.1722 },
            "Palmar Grande": { lat: -27.8767, lng: -57.7411 }
        }
    },
    "Goya": {
        center: { lat: -29.1442, lng: -59.2635 },
        municipalities: {
            "Goya": { lat: -29.1442, lng: -59.2635 },
            "Colonia Carolina": { lat: -29.1353, lng: -59.1833 },
            "San Isidro": { lat: -29.3908, lng: -59.2433 }
        }
    },
    "Itatí": {
        center: { lat: -27.2678, lng: -58.2458 },
        municipalities: {
            "Itatí": { lat: -27.2678, lng: -58.2458 },
            "Ramada Paso": { lat: -27.3644, lng: -58.3189 }
        }
    },
    "Ituzaingó": {
        center: { lat: -27.5808, lng: -56.6853 },
        municipalities: {
            "Ituzaingó": { lat: -27.5808, lng: -56.6853 },
            "San Antonio (Isla Apipé Grande)": { lat: -27.5028, lng: -56.7328 },
            "San Carlos": { lat: -27.7478, lng: -55.8978 },
            "Colonia Liebig": { lat: -27.9150, lng: -55.8169 },
            "Villa Olivari": { lat: -27.4253, lng: -56.9944 }
        }
    },
    "Lavalle": {
        center: { lat: -28.9875, lng: -59.1025 },
        municipalities: {
            "Santa Lucía": { lat: -28.9875, lng: -59.1025 },
            "Lavalle": { lat: -29.0233, lng: -59.1833 },
            "Gobernador Martinez": { lat: -28.9100, lng: -58.9100 },
            "Cruz de los Milagros": { lat: -28.7900, lng: -58.9800 },
            "Yatay Tí Calle": { lat: -29.0433, lng: -58.9100 }
        }
    },
    "Mercedes": {
        center: { lat: -29.1842, lng: -58.0753 },
        municipalities: {
            "Mercedes": { lat: -29.1842, lng: -58.0753 },
            "Felipe Yofre": { lat: -29.1006, lng: -58.3314 },
            "Mariano I. Loza": { lat: -29.3758, lng: -58.1883 }
        }
    },
    "Monte Caseros": {
        center: { lat: -30.2526, lng: -57.6369 },
        municipalities: {
            "Monte Caseros": { lat: -30.2526, lng: -57.6369 },
            "Mocoretá": { lat: -30.6183, lng: -57.9708 },
            "Juan Pujol": { lat: -30.4300, lng: -57.8500 }
        }
    },
    "Paso de los Libres": {
        center: { lat: -29.7122, lng: -57.0869 },
        municipalities: {
            "Paso de los Libres": { lat: -29.7122, lng: -57.0869 },
            "Bonpland": { lat: -29.8169, lng: -57.4303 },
            "Parada Pucheta": { lat: -30.0436, lng: -57.7125 },
            "Tapebicuá": { lat: -29.5317, lng: -56.9422 }
        }
    },
    "Saladas": {
        center: { lat: -28.2536, lng: -58.6256 },
        municipalities: {
            "Saladas": { lat: -28.2536, lng: -58.6256 },
            "Anguá": { lat: -28.3200, lng: -58.7300 },
            "La Mansión": { lat: -28.2700, lng: -58.5500 },
            "San Lorenzo": { lat: -28.1347, lng: -58.7667 }
        }
    },
    "San Cosme": {
        center: { lat: -27.3711, lng: -58.5117 },
        municipalities: {
            "San Cosme": { lat: -27.3711, lng: -58.5117 },
            "Paso de la Patria": { lat: -27.3175, lng: -58.5747 },
            "Santa Ana de los Guácaras": { lat: -27.4644, lng: -58.7189 }
        }
    },
    "San Luis del Palmar": {
        center: { lat: -27.5069, lng: -58.5544 },
        municipalities: {
            "San Luis del Palmar": { lat: -27.5069, lng: -58.5544 },
            "Herlitzka": { lat: -27.6167, lng: -58.3333 }
        }
    },
    "San Martín": {
        center: { lat: -29.1744, lng: -56.6433 },
        municipalities: {
            "La Cruz": { lat: -29.1744, lng: -56.6433 },
            "Yapeyú": { lat: -29.4694, lng: -56.8183 },
            "Carlos Pellegrini": { lat: -28.5342, lng: -57.1717 },
            "Guaviraví": { lat: -29.3569, lng: -56.8433 }
        }
    },
    "Mburucuyá": {
        center: { lat: -28.0478, lng: -58.2283 },
        municipalities: {
            "Mburucuyá": { lat: -28.0478, lng: -58.2283 }
        }
    },
    "San Miguel": {
        center: { lat: -27.9861, lng: -57.5894 },
        municipalities: {
            "San Miguel": { lat: -27.9861, lng: -57.5894 },
            "Loreto": { lat: -27.7681, lng: -57.2731 },
            "El Caimán": { lat: -27.9622, lng: -57.4856 }
        }
    },
    "San Roque": {
        center: { lat: -28.5744, lng: -58.7089 },
        municipalities: {
            "San Roque": { lat: -28.5744, lng: -58.7089 },
            "Chavarría": { lat: -28.9567, lng: -58.5744 }
        }
    },
    "Santo Tomé": {
        center: { lat: -28.5492, lng: -56.0428 },
        municipalities: {
            "Santo Tomé": { lat: -28.5492, lng: -56.0428 },
            "Gobernador Virasoro": { lat: -28.0494, lng: -56.0219 },
            "Garruchos": { lat: -28.1819, lng: -55.6456 },
            "Garaví": { lat: -28.2567, lng: -55.8031 }
        }
    },
    "Sauce": {
        center: { lat: -30.0736, lng: -58.7731 },
        municipalities: {
            "Sauce": { lat: -30.0736, lng: -58.7731 }
        }
    }
};

// Default center of Corrientes Province
const PROVINCE_CENTER = { lat: -28.7, lng: -57.8, zoom: 7 };

// ─── Initial Mock Data (If localStorage is empty) ───────────────────────
const MOCK_DATA = [
    { id: '1', date: '2026-05-15', municipality: 'Capital (Corrientes)', rain: 35.2, lat: -27.4720, lng: -58.8250 },
    { id: '2', date: '2026-05-16', municipality: 'Goya', rain: 12.0, lat: -29.1450, lng: -59.2600 },
    { id: '3', date: '2026-05-18', municipality: 'Paso de los Libres', rain: 55.4, lat: -29.7100, lng: -57.0800 },
    { id: '4', date: '2026-05-20', municipality: 'Mercedes', rain: 8.5, lat: -29.1800, lng: -58.0700 },
    { id: '5', date: '2026-05-25', municipality: 'Ituzaingó', rain: 110.0, lat: -27.5850, lng: -56.6900 },
    { id: '6', date: '2026-05-26', municipality: 'Santo Tomé', rain: 72.3, lat: -28.5500, lng: -56.0400 },
    { id: '7', date: '2026-06-01', municipality: 'Esquina', rain: 45.0, lat: -30.0120, lng: -59.5220 },
    { id: '8', date: '2026-06-03', municipality: 'Monte Caseros', rain: 22.8, lat: -30.2500, lng: -57.6300 },
    { id: '9', date: '2026-06-05', municipality: 'Capital (Corrientes)', rain: 68.1, lat: -27.4650, lng: -58.8350 },
    { id: '10', date: '2026-06-06', municipality: 'Bella Vista', rain: 30.5, lat: -28.5100, lng: -59.0400 },
    { id: '11', date: '2026-06-08', municipality: 'Saladas', rain: 15.2, lat: -28.2500, lng: -58.6200 },
    { id: '12', date: '2026-06-09', municipality: 'San Luis del Palmar', rain: 4.0, lat: -27.5100, lng: -58.5500 }
];

// ─── State Management ───────────────────────────────────────────────────
let records = [];
let filteredRecords = [];
let formMapInstance = null;
let dashboardMapInstance = null;
let formMarker = null;
let dashboardMapLayers = [];
let charts = {};
let editingRecordId = null; // Track editing state

// ─── App Boot ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
    showLoading();
    try {
        await loadRecords();
        populateDropdowns();
        setupDateInputs();
        initFormMap();
        initDashboardMap();
        wireEvents();
        applyFilters();
    } catch (error) {
        console.error('Error durante la inicialización de la app:', error);
    }
    hideLoading();
}

// Loading screens helpers
function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('fade-out');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('fade-out');
}

// ─── Records Loading & Saving ──────────────────────────────────────────
async function loadRecords() {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
        records = JSON.parse(stored);
        // If the stored data is only the default 12 mock records, upgrade/replace it with the 2023 CSV data
        const isMock = records.length === 12 && records[0].date === '2026-05-15';
        if (isMock) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            return await loadRecords();
        }
        
        // If the stored data lacks 2024 or 2025 records (which we just added to the CSV), refresh it from the CSV
        const hasLaterYears = records.some(r => r.date.startsWith('2024') || r.date.startsWith('2025'));
        if (!hasLaterYears) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            return await loadRecords();
        }
        
        migrateRecords();
    } else {
        try {
            const response = await fetch('plantilla_registro_lluvias.csv');
            if (response.ok) {
                const csvText = await response.text();
                const parsed = parseCsvContent(csvText);
                if (parsed && parsed.length > 0) {
                    records = parsed;
                } else {
                    records = [...MOCK_DATA];
                }
            } else {
                records = [...MOCK_DATA];
            }
        } catch (e) {
            console.error("Error fetching plantilla_registro_lluvias.csv, using mock data:", e);
            records = [...MOCK_DATA];
        }
        migrateRecords();
        saveRecordsToStorage();
    }
}

function saveRecordsToStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
}

// ─── Dropdowns & Date Setup ─────────────────────────────────────────────
function populateDropdowns() {
    const formDeptSelect = document.getElementById('formDepartamento');
    const filterDeptSelect = document.getElementById('filterDepartamento');
    
    // Sort departments alphabetically
    const depts = Object.keys(DEPARTMENTS_DATA).sort();
    
    depts.forEach(dept => {
        // Form option
        const optForm = document.createElement('option');
        optForm.value = dept;
        optForm.textContent = dept;
        formDeptSelect.appendChild(optForm);
        
        // Filter option
        const optFilter = document.createElement('option');
        optFilter.value = dept;
        optFilter.textContent = dept;
        filterDeptSelect.appendChild(optFilter);
    });
    
    // Initially populate all municipalities (and enable selects)
    updateFormMunicipalities('');
    updateFilterMunicipalities('TODOS');
}

function setupDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('formDate').value = today;
    
    // Determine the date range of records
    if (records.length > 0) {
        const dates = records.map(r => new Date(r.date));
        const minDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
        const maxDate = new Date(Math.max(...dates)).toISOString().split('T')[0];
        
        document.getElementById('filterDesde').value = minDate;
        document.getElementById('filterHasta').value = maxDate;
    } else {
        // Default to current month range if empty
        const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
        document.getElementById('filterDesde').value = firstDayOfMonth;
        document.getElementById('filterHasta').value = today;
    }
}

// ─── Maps Initialization ───────────────────────────────────────────────
function initFormMap() {
    // Initialize form map (used to place the rain gauge marker)
    formMapInstance = L.map('formMap', {
        zoomControl: true,
        attributionControl: false
    }).setView([PROVINCE_CENTER.lat, PROVINCE_CENTER.lng], 6);
    
    // Add standard OpenStreetMap tiles (CSS filters in styles.css will turn it dark)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(formMapInstance);
    
    // Listen to click events on map to place/move marker
    formMapInstance.on('click', function(e) {
        setFormMarker(e.latlng.lat, e.latlng.lng);
    });
}

function initDashboardMap() {
    // Initialize dashboard map (displays bubble distribution of rain)
    dashboardMapInstance = L.map('dashboardMap', {
        zoomControl: true,
        attributionControl: false
    }).setView([PROVINCE_CENTER.lat, PROVINCE_CENTER.lng], 7);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(dashboardMapInstance);
    
    // Add Custom Legend to Map
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
            <h4>Intensidad de Lluvia</h4>
            <div class="legend-item"><span class="legend-color" style="background:#22d3ee"></span> Llovizna (&lt; 10 mm)</div>
            <div class="legend-item"><span class="legend-color" style="background:#60a5fa"></span> Moderada (10 - 50 mm)</div>
            <div class="legend-item"><span class="legend-color" style="background:#a78bfa"></span> Fuerte (50 - 100 mm)</div>
            <div class="legend-item"><span class="legend-color" style="background:#fb7185"></span> Torrencial (&gt; 100 mm)</div>
        `;
        return div;
    };
    legend.addTo(dashboardMapInstance);
}

// Update the marker on the form map
function setFormMarker(lat, lng) {
    const latFixed = lat.toFixed(6);
    const lngFixed = lng.toFixed(6);
    
    document.getElementById('formLat').value = latFixed;
    document.getElementById('formLng').value = lngFixed;
    document.getElementById('coordsDisplay').textContent = `Coordenadas: Lat ${latFixed}, Lng ${lngFixed}`;
    
    // Custom glowing cyan pulse icon
    const customPulseIcon = L.divIcon({
        className: 'custom-pulse-marker',
        html: '<div class="pulse-ring"></div><div class="pulse-dot"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });
    
    if (formMarker) {
        formMarker.setLatLng([lat, lng]);
    } else {
        formMarker = L.marker([lat, lng], { 
            draggable: true,
            icon: customPulseIcon
        }).addTo(formMapInstance);
        formMarker.on('dragend', function(e) {
            const pos = formMarker.getLatLng();
            setFormMarker(pos.lat, pos.lng);
        });
    }
}

// ─── Filtering & Redrawing ──────────────────────────────────────────────
function applyFilters() {
    const desde = document.getElementById('filterDesde').value;
    const hasta = document.getElementById('filterHasta').value;
    const departamento = document.getElementById('filterDepartamento').value;
    const municipio = document.getElementById('filterMunicipio').value;
    
    filteredRecords = records.filter(r => {
        // Date check
        if (desde && r.date < desde) return false;
        if (hasta && r.date > hasta) return false;
        // Department check
        if (departamento !== 'TODOS' && r.department !== departamento) return false;
        // Municipality check
        if (municipio !== 'TODOS' && r.municipality !== municipio) return false;
        return true;
    });
    
    // Sort chronologically
    filteredRecords.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    updateDashboardUI();
}

function updateDashboardUI() {
    updateKPIs();
    updateHeaderStats();
    drawDashboardMap();
    renderHistoryChart();
    renderMunicipalityChart();
    populateTable();
}

// ─── KPI & Header Calculations ──────────────────────────────────────────
function updateKPIs() {
    if (filteredRecords.length === 0) {
        document.getElementById('kpiAcumulada').textContent = '0.0';
        document.getElementById('kpiPromedio').textContent = '0.0';
        document.getElementById('kpiMaxima').textContent = '0.0';
        document.getElementById('kpiMaximaLoc').textContent = 'Ninguna localidad';
        document.getElementById('kpiRegistros').textContent = '0';
        return;
    }
    
    const total = filteredRecords.reduce((sum, r) => sum + r.rain, 0);
    const count = filteredRecords.length;
    const average = total / count;
    
    // Find record max
    let maxRecord = filteredRecords[0];
    filteredRecords.forEach(r => {
        if (r.rain > maxRecord.rain) {
            maxRecord = r;
        }
    });
    
    document.getElementById('kpiAcumulada').textContent = total.toFixed(1);
    document.getElementById('kpiPromedio').textContent = average.toFixed(1);
    document.getElementById('kpiMaxima').textContent = maxRecord.rain.toFixed(1);
    document.getElementById('kpiMaximaLoc').textContent = `${maxRecord.municipality} (${formatDateString(maxRecord.date)})`;
    document.getElementById('kpiRegistros').textContent = count;
}

function updateHeaderStats() {
    const totalRain = records.reduce((sum, r) => sum + r.rain, 0);
    document.getElementById('headerTotalRain').textContent = `${totalRain.toFixed(1)} mm`;
    document.getElementById('headerTotalCount').textContent = records.length;
    
    if (records.length > 0) {
        // Get the latest date
        const sorted = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
        document.getElementById('headerLastDate').textContent = formatDateString(sorted[0].date);
    } else {
        document.getElementById('headerLastDate').textContent = '–';
    }
}

// ─── Drawing Dashboard Map Bubbles ──────────────────────────────────────
function drawDashboardMap() {
    // Clear old layers
    dashboardMapLayers.forEach(layer => dashboardMapInstance.removeLayer(layer));
    dashboardMapLayers = [];
    
    filteredRecords.forEach(rec => {
        // Determine circle color & radius based on rainfall intensity
        let color = '#22d3ee'; // light cyan for drizzle
        let radius = 8000;     // meters
        
        if (rec.rain >= 100) {
            color = '#fb7185'; // rose/coral for extreme rain
            radius = 22000;
        } else if (rec.rain >= 50) {
            color = '#a78bfa'; // purple for heavy rain
            radius = 17000;
        } else if (rec.rain >= 10) {
            color = '#60a5fa'; // blue for moderate rain
            radius = 12000;
        }
        
        const circle = L.circle([rec.lat, rec.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: radius,
            weight: 2
        });
        
        const popupContent = `
            <strong>${rec.municipality}</strong> (${rec.department})<br>
            📅 Fecha: ${formatDateString(rec.date)}<br>
            🌧️ Lluvia: <strong>${rec.rain.toFixed(1)} mm</strong><br>
            📍 Lat: ${rec.lat.toFixed(4)}, Lng: ${rec.lng.toFixed(4)}<br>
            <button class="btn-danger" style="margin-top:8px; padding: 4px 8px; font-size: 0.65rem;" onclick="deleteRecord('${rec.id}')">Borrar Registro</button>
        `;
        
        circle.bindPopup(popupContent);
        circle.addTo(dashboardMapInstance);
        dashboardMapLayers.push(circle);
    });
    
    // Adjust view bounds to fit all markers if present, otherwise center province
    if (dashboardMapLayers.length > 0) {
        const group = new L.featureGroup(dashboardMapLayers);
        dashboardMapInstance.fitBounds(group.getBounds().pad(0.1));
    } else {
        dashboardMapInstance.setView([PROVINCE_CENTER.lat, PROVINCE_CENTER.lng], 7);
    }
}

// ─── Rendering Chart.js Charts ──────────────────────────────────────────
function renderHistoryChart() {
    const ctx = document.getElementById('chartRainHistory').getContext('2d');
    
    // Group rain records by date
    const dateGroups = {};
    filteredRecords.forEach(r => {
        dateGroups[r.date] = (dateGroups[r.date] || 0) + r.rain;
    });
    
    const dates = Object.keys(dateGroups).sort();
    const dataValues = dates.map(d => dateGroups[d]);
    const formattedDates = dates.map(d => formatDateStringShort(d));
    
    const chartData = {
        labels: formattedDates.length > 0 ? formattedDates : ['Sin datos'],
        datasets: [{
            label: 'Lluvia Acumulada Diaria (mm)',
            data: dataValues.length > 0 ? dataValues : [0],
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.08)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#60a5fa',
            pointHoverRadius: 7,
        }]
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.03)' },
                ticks: { color: '#94a3b8', font: { family: "'Inter'", size: 10 } }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.03)' },
                ticks: { color: '#94a3b8', font: { family: "'Inter'", size: 10 } },
                title: { display: true, text: 'Milímetros (mm)', color: '#64748b', font: { size: 11, weight: 600 } }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1a2235',
                titleColor: '#f1f5f9',
                bodyColor: '#60a5fa',
                borderColor: 'rgba(255, 255, 255, 0.06)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                bodyFont: { family: "'Inter'", weight: 'bold' }
            }
        }
    };
    
    if (charts.history) {
        charts.history.destroy();
    }
    charts.history = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}

function renderMunicipalityChart() {
    const ctx = document.getElementById('chartRainByMunicipality').getContext('2d');
    
    // Group and sum by municipality (showing department too)
    const munGroups = {};
    filteredRecords.forEach(r => {
        const label = `${r.municipality} (${r.department})`;
        munGroups[label] = (munGroups[label] || 0) + r.rain;
    });
    
    // Sort by rain descending and take top 10
    const sortedMuns = Object.entries(munGroups)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
        
    const labels = sortedMuns.map(m => m[0]);
    const dataValues = sortedMuns.map(m => m[1].toFixed(1));
    
    const chartData = {
        labels: labels.length > 0 ? labels : ['Sin datos'],
        datasets: [{
            label: 'Milímetros',
            data: dataValues.length > 0 ? dataValues : [0],
            backgroundColor: '#22d3eecc',
            borderColor: '#22d3ee',
            borderWidth: 1,
            borderRadius: 6,
            barThickness: 16
        }]
    };
    
    const chartOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.03)' },
                ticks: { color: '#94a3b8', font: { family: "'Inter'", size: 10 } }
            },
            y: {
                grid: { display: false },
                ticks: { color: '#e2e8f0', font: { family: "'Inter'", size: 11, weight: 600 } }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1a2235',
                titleColor: '#f1f5f9',
                bodyColor: '#22d3ee',
                borderColor: 'rgba(255, 255, 255, 0.06)',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
                bodyFont: { family: "'Inter'", weight: 'bold' }
            }
        }
    };
    
    if (charts.municipality) {
        charts.municipality.destroy();
    }
    charts.municipality = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
    });
}

// ─── History Table ──────────────────────────────────────────────────────
function populateTable() {
    const tbody = document.getElementById('recordsTableBody');
    const emptyMsg = document.getElementById('emptyTableMessage');
    tbody.innerHTML = '';
    
    const searchQuery = (document.getElementById('tableSearch')?.value || '').toLowerCase().trim();
    
    // Filter by search query (department or municipality or date or rain value)
    const searchedRecords = filteredRecords.filter(rec => {
        if (!searchQuery) return true;
        const deptMatch = rec.department?.toLowerCase().includes(searchQuery);
        const munMatch = rec.municipality.toLowerCase().includes(searchQuery);
        const dateMatch = formatDateString(rec.date).includes(searchQuery) || rec.date.includes(searchQuery);
        const rainMatch = rec.rain.toString().includes(searchQuery);
        return deptMatch || munMatch || dateMatch || rainMatch;
    });
    
    if (searchedRecords.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }
    emptyMsg.style.display = 'none';
    
    // Sort records descending by date for the table (latest records first)
    const tableSortedRecords = [...searchedRecords].reverse();
    
    tableSortedRecords.forEach(rec => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="date-value">${formatDateString(rec.date)}</td>
            <td style="font-weight:600;">${rec.department || 'N/A'}</td>
            <td>${rec.municipality}</td>
            <td class="rain-value">${rec.rain.toFixed(1)} mm</td>
            <td class="coord-value">${rec.lat.toFixed(5)}, ${rec.lng.toFixed(5)}</td>
            <td style="text-align: right;">
                <button class="btn-edit" onclick="editRecord('${rec.id}')">Editar</button>
                <button class="btn-danger" onclick="deleteRecord('${rec.id}')">Borrar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ─── Interactive Event Listeners ────────────────────────────────────────
function wireEvents() {
    // Dropdown change in form updates Municipality choices and centers Map
    document.getElementById('formDepartamento').addEventListener('change', function(e) {
        const val = e.target.value;
        updateFormMunicipalities(val);
        
        if (DEPARTMENTS_DATA[val]) {
            const coords = DEPARTMENTS_DATA[val].center;
            // Center the form map on the department and zoom in
            formMapInstance.setView([coords.lat, coords.lng], 10);
            // Auto place the marker there initially
            setFormMarker(coords.lat, coords.lng);
        }
    });
    
    // Dropdown change in form municipality updates Map Marker & auto-selects Department if empty
    document.getElementById('formMunicipio').addEventListener('change', function(e) {
        const munVal = e.target.value;
        let deptVal = document.getElementById('formDepartamento').value;
        
        if (!deptVal && munVal) {
            // Find department by municipality
            for (const [deptName, deptData] of Object.entries(DEPARTMENTS_DATA)) {
                if (deptData.municipalities[munVal]) {
                    document.getElementById('formDepartamento').value = deptName;
                    deptVal = deptName;
                    // Update form municipalities dropdown to show only this department's items
                    updateFormMunicipalities(deptName, munVal);
                    break;
                }
            }
        }
        
        if (deptVal && munVal && DEPARTMENTS_DATA[deptVal]?.municipalities[munVal]) {
            const coords = DEPARTMENTS_DATA[deptVal].municipalities[munVal];
            formMapInstance.setView([coords.lat, coords.lng], 12);
            setFormMarker(coords.lat, coords.lng);
        }
    });
    
    // Submit Button in Form
    document.getElementById('btnSubmit').addEventListener('click', handleFormSubmit);
    
    // Cancel Edit Button
    document.getElementById('btnCancelEdit').addEventListener('click', cancelEdit);
    
    // Filters Event Listeners
    document.getElementById('filterDepartamento').addEventListener('change', function(e) {
        updateFilterMunicipalities(e.target.value);
        applyFilters();
    });
    document.getElementById('filterMunicipio').addEventListener('change', function(e) {
        const munVal = e.target.value;
        let deptVal = document.getElementById('filterDepartamento').value;
        
        if (munVal !== 'TODOS' && deptVal === 'TODOS') {
            // Find department for selected municipality
            for (const [deptName, deptData] of Object.entries(DEPARTMENTS_DATA)) {
                if (deptData.municipalities[munVal]) {
                    document.getElementById('filterDepartamento').value = deptName;
                    updateFilterMunicipalities(deptName, munVal);
                    break;
                }
            }
        }
        applyFilters();
    });
    document.getElementById('filterDesde').addEventListener('change', applyFilters);
    document.getElementById('filterHasta').addEventListener('change', applyFilters);
    document.getElementById('btnResetFilters').addEventListener('click', resetFilters);
    
    // Search Box Table Filter
    document.getElementById('tableSearch').addEventListener('input', populateTable);
    
    // Data Import / Export Listeners
    document.getElementById('btnExportJson').addEventListener('click', exportToJson);
    document.getElementById('btnExportCsv').addEventListener('click', exportToCsv);
    document.getElementById('btnImportData').addEventListener('click', triggerImport);
    document.getElementById('fileImport').addEventListener('change', handleFileImport);
    document.getElementById('btnSyncGoogleSheets').addEventListener('click', syncGoogleSheets);
}

// ─── Form Submission Handling ───────────────────────────────────────────
function handleFormSubmit(e) {
    e.preventDefault();
    
    const departamento = document.getElementById('formDepartamento').value;
    const municipio = document.getElementById('formMunicipio').value;
    const rainVal = parseFloat(document.getElementById('formRain').value);
    const dateVal = document.getElementById('formDate').value;
    const latVal = parseFloat(document.getElementById('formLat').value);
    const lngVal = parseFloat(document.getElementById('formLng').value);
    
    // Validations
    if (!departamento) {
        showFloatingNotification('Por favor, selecciona un departamento.', 'warning');
        return;
    }
    if (!municipio) {
        showFloatingNotification('Por favor, selecciona un municipio.', 'warning');
        return;
    }
    if (isNaN(rainVal) || rainVal < 0) {
        showFloatingNotification('Ingresa una cantidad de lluvia válida.', 'warning');
        return;
    }
    if (!dateVal) {
        showFloatingNotification('Selecciona una fecha.', 'warning');
        return;
    }
    if (isNaN(latVal) || isNaN(lngVal)) {
        showFloatingNotification('Haz clic en el mapa del formulario para marcar el lugar.', 'warning');
        return;
    }
    
    if (editingRecordId) {
        // We are in edit mode
        const index = records.findIndex(r => r.id === editingRecordId);
        if (index !== -1) {
            records[index] = {
                ...records[index],
                date: dateVal,
                department: departamento,
                municipality: municipio,
                rain: rainVal,
                lat: latVal,
                lng: lngVal
            };
            saveRecordsToStorage();
            showFloatingNotification('Registro actualizado con éxito.', 'success');
        }
        
        // Reset editing state
        editingRecordId = null;
        document.getElementById('formTitle').textContent = 'Nuevo Registro de Lluvia';
        document.getElementById('formDesc').textContent = 'Carga de datos pluviométricos de la toma';
        document.getElementById('btnSubmit').textContent = 'Registrar Lluvia';
        document.getElementById('btnCancelEdit').style.display = 'none';
    } else {
        // Create new record
        const newRecord = {
            id: Date.now().toString(),
            date: dateVal,
            department: departamento,
            municipality: municipio,
            rain: rainVal,
            lat: latVal,
            lng: lngVal
        };
        
        // Push & save
        records.push(newRecord);
        saveRecordsToStorage();
        showFloatingNotification('Medición registrada con éxito.', 'success');
    }
    
    // Reset form fields but keep the date for speed entry
    document.getElementById('formRain').value = '';
    
    // Clear the form marker
    if (formMarker) {
        formMapInstance.removeLayer(formMarker);
        formMarker = null;
    }
    document.getElementById('formLat').value = '';
    document.getElementById('formLng').value = '';
    document.getElementById('coordsDisplay').textContent = 'Coordenadas: No seleccionadas';
    
    // Reset selections and restore all municipalities
    document.getElementById('formDepartamento').value = '';
    updateFormMunicipalities('');
    
    formMapInstance.setView([PROVINCE_CENTER.lat, PROVINCE_CENTER.lng], 6);
    
    // Update filters bounds and apply
    setupDateInputs();
    applyFilters();
}

// ─── Delete Record Handler ──────────────────────────────────────────────
window.deleteRecord = async function(id) {
    const confirmDelete = await showCustomConfirm({
        title: 'Eliminar Registro',
        bodyHtml: '<p>¿Estás seguro de que deseas eliminar este registro pluviométrico?</p><p style="color: var(--accent-rose); font-size: 0.8rem; margin-top: 8px;">Esta acción no se puede deshacer.</p>',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
    });
    
    if (confirmDelete) {
        records = records.filter(r => r.id !== id);
        saveRecordsToStorage();
        showFloatingNotification('Registro eliminado.', 'success');
        applyFilters();
    }
};


// ─── Reset Filters ──────────────────────────────────────────────────────
function resetFilters() {
    setupDateInputs();
    document.getElementById('filterDepartamento').value = 'TODOS';
    updateFilterMunicipalities('TODOS');
    applyFilters();
    showFloatingNotification('Filtros restablecidos.', 'info');
}

// ─── Formatting Helpers ─────────────────────────────────────────────────
function formatDateString(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
}

function formatDateStringShort(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    return `${parts[2]}/${parts[1]}`; // DD/MM
}

// ─── Floating Toast Notification ────────────────────────────────────────
function showFloatingNotification(message, type = 'info') {
    // Check if container exists
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.zIndex = '99999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.fontFamily = "'Inter', sans-serif";
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '600';
    toast.style.color = '#0a0f1a';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
    toast.style.transform = 'translateY(10px)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s ease';
    
    // Choose colors based on notification type
    if (type === 'success') {
        toast.style.background = 'linear-gradient(135deg, #34d399 0%, #22d3ee 100%)';
        toast.innerText = '✅ ' + message;
    } else if (type === 'warning') {
        toast.style.background = 'linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)';
        toast.innerText = '⚠️ ' + message;
    } else {
        toast.style.background = 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)';
        toast.innerText = 'ℹ️ ' + message;
    }
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Remove after 3.5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(-10px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3500);
}

// ─── Record Editing Functions ───────────────────────────────────────────
window.editRecord = function(id) {
    const rec = records.find(r => r.id === id);
    if (!rec) return;
    
    editingRecordId = id;
    
    // Fill the form fields
    document.getElementById('formDepartamento').value = rec.department || '';
    updateFormMunicipalities(rec.department, rec.municipality);
    
    document.getElementById('formRain').value = rec.rain;
    document.getElementById('formDate').value = rec.date;
    
    // Center and zoom map on the record coords
    formMapInstance.setView([rec.lat, rec.lng], 13);
    setFormMarker(rec.lat, rec.lng);
    
    // Update form headers & action buttons
    document.getElementById('formTitle').textContent = 'Editar Registro de Lluvia';
    document.getElementById('formDesc').textContent = 'Modifica los datos de la toma seleccionada';
    document.getElementById('btnSubmit').textContent = 'Guardar Cambios';
    document.getElementById('btnCancelEdit').style.display = 'block';
    
    // Scroll form into view smoothly
    document.getElementById('rainForm').scrollIntoView({ behavior: 'smooth' });
    
    showFloatingNotification('Modo edición activado. Modifique los campos del formulario.', 'info');
};

function cancelEdit() {
    editingRecordId = null;
    
    // Clear fields
    document.getElementById('formRain').value = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('formDate').value = today;
    document.getElementById('formDepartamento').value = '';
    
    // Reset municipalities to show all options
    updateFormMunicipalities('');
    
    // Clear marker and reset map
    if (formMarker) {
        formMapInstance.removeLayer(formMarker);
        formMarker = null;
    }
    document.getElementById('formLat').value = '';
    document.getElementById('formLng').value = '';
    document.getElementById('coordsDisplay').textContent = 'Coordenadas: No seleccionadas';
    formMapInstance.setView([PROVINCE_CENTER.lat, PROVINCE_CENTER.lng], 6);
    
    // Reset headers & buttons
    document.getElementById('formTitle').textContent = 'Nuevo Registro de Lluvia';
    document.getElementById('formDesc').textContent = 'Carga de datos pluviométricos de la toma';
    document.getElementById('btnSubmit').textContent = 'Registrar Lluvia';
    document.getElementById('btnCancelEdit').style.display = 'none';
    
    showFloatingNotification('Edición cancelada.', 'info');
}

// ─── Import & Export Utilities ──────────────────────────────────────────
function exportToJson() {
    if (records.length === 0) {
        showFloatingNotification('No hay datos para exportar.', 'warning');
        return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `lluvias_corrientes_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showFloatingNotification('Datos exportados en formato JSON.', 'success');
}

function exportToCsv() {
    if (records.length === 0) {
        showFloatingNotification('No hay datos para exportar.', 'warning');
        return;
    }
    const headers = ['id', 'date', 'department', 'municipality', 'rain', 'lat', 'lng'];
    const rows = records.map(r => [
        r.id,
        r.date,
        `"${(r.department || '').replace(/"/g, '""')}"`,
        `"${r.municipality.replace(/"/g, '""')}"`,
        r.rain,
        r.lat,
        r.lng
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        
    const encodedUri = encodeURI(csvContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodedUri);
    downloadAnchor.setAttribute("download", `lluvias_corrientes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showFloatingNotification('Datos exportados en formato CSV.', 'success');
}

function triggerImport() {
    document.getElementById('fileImport').click();
}

function handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async function(evt) {
        const contents = evt.target.result;
        let importedRecords = [];
        
        try {
            if (file.name.endsWith('.json')) {
                importedRecords = JSON.parse(contents);
            } else if (file.name.endsWith('.csv')) {
                importedRecords = parseCsvContent(contents);
            } else {
                throw new Error('Formato de archivo no soportado. Use .json o .csv');
            }
            
            if (!Array.isArray(importedRecords) || importedRecords.length === 0) {
                throw new Error('El archivo no contiene registros válidos.');
            }
            
            // Validate and convert imported fields
            const validRecords = importedRecords.filter(r => {
                return r.date && r.municipality && !isNaN(parseFloat(r.rain)) && !isNaN(parseFloat(r.lat)) && !isNaN(parseFloat(r.lng));
            }).map(r => {
                // If department is missing, we migrate it based on the dictionary
                let dept = r.department || r.departamento;
                if (!dept) {
                    for (const [deptName, deptData] of Object.entries(DEPARTMENTS_DATA)) {
                        if (deptData.municipalities[r.municipality.trim()]) {
                            dept = deptName;
                            break;
                        }
                    }
                }
                return {
                    id: r.id ? r.id.toString() : Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    date: r.date.trim(),
                    department: (dept || 'Capital').trim(),
                    municipality: r.municipality.trim(),
                    rain: Math.max(0, parseFloat(r.rain)),
                    lat: parseFloat(r.lat),
                    lng: parseFloat(r.lng)
                };
            });
            
            if (validRecords.length === 0) {
                throw new Error('Ninguno de los registros del archivo es válido.');
            }
            
            // Ask user for action (merge vs replace)
            const action = await showImportConfirmModal(validRecords.length);
            
            if (action === 'cancel') {
                document.getElementById('fileImport').value = '';
                return;
            }
            
            if (action === 'merge') {
                let added = 0;
                validRecords.forEach(importRec => {
                    const duplicate = records.some(r => r.id === importRec.id || 
                        (r.date === importRec.date && r.municipality === importRec.municipality && Math.abs(r.rain - importRec.rain) < 0.01));
                    if (!duplicate) {
                        records.push(importRec);
                        added++;
                    }
                });
                showFloatingNotification(`Combinación exitosa: ${added} registros añadidos.`, 'success');
            } else if (action === 'replace') {
                records = validRecords;
                showFloatingNotification(`Reemplazo exitoso: ${validRecords.length} registros cargados.`, 'success');
            }
            
            saveRecordsToStorage();
            setupDateInputs();
            applyFilters();
            
        } catch (err) {
            showFloatingNotification(`Error al importar: ${err.message}`, 'warning');
            console.error(err);
        }
        
        // Reset file input
        document.getElementById('fileImport').value = '';
    };
    reader.readAsText(file);
}


function parseCsvContent(csvText) {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
    
    const colIdx = {
        id: headers.findIndex(h => h === 'id'),
        date: headers.findIndex(h => h === 'date' || h === 'fecha'),
        department: headers.findIndex(h => h === 'department' || h === 'departamento'),
        municipality: headers.findIndex(h => h === 'municipality' || h === 'municipio'),
        rain: headers.findIndex(h => h === 'rain' || h === 'lluvia'),
        lat: headers.findIndex(h => h === 'lat' || h === 'latitud'),
        lng: headers.findIndex(h => h === 'lng' || h === 'longitud' || h === 'long')
    };
    
    const results = [];
    for (let i = 1; i < lines.length; i++) {
        const row = parseCsvRow(lines[i]);
        if (row.length < 5) continue;
        
        const idVal = colIdx.id !== -1 ? row[colIdx.id] : undefined;
        const dateVal = colIdx.date !== -1 ? row[colIdx.date] : row[1];
        const deptVal = colIdx.department !== -1 ? row[colIdx.department] : undefined;
        const munVal = colIdx.municipality !== -1 ? row[colIdx.municipality] : row[2];
        const rainVal = colIdx.rain !== -1 ? row[colIdx.rain] : row[3];
        const latVal = colIdx.lat !== -1 ? row[colIdx.lat] : row[4];
        const lngVal = colIdx.lng !== -1 ? row[colIdx.lng] : row[5];
        
        if (dateVal && munVal && rainVal) {
            results.push({
                id: idVal,
                date: dateVal.trim(),
                department: deptVal ? deptVal.trim() : undefined,
                municipality: munVal.trim(),
                rain: parseFloat(rainVal),
                lat: parseFloat(latVal),
                lng: parseFloat(lngVal)
            });
        }
    }
    return results;
}

function parseCsvRow(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

// ─── Location Cascading Dropdowns & Migration Helpers ───────────────────
function migrateRecords() {
    let migrated = false;
    records.forEach(r => {
        if (!r.department) {
            for (const [deptName, deptData] of Object.entries(DEPARTMENTS_DATA)) {
                if (deptData.municipalities[r.municipality]) {
                    r.department = deptName;
                    migrated = true;
                    break;
                }
            }
            if (!r.department) {
                r.department = "Capital";
                migrated = true;
            }
        }
    });
    if (migrated) {
        saveRecordsToStorage();
    }
}

function updateFormMunicipalities(selectedDept, selectedMunVal = '') {
    const formMunSelect = document.getElementById('formMunicipio');
    formMunSelect.innerHTML = '<option value="" disabled selected>Seleccione un municipio</option>';
    formMunSelect.disabled = false;
    
    let muns = [];
    if (selectedDept && DEPARTMENTS_DATA[selectedDept]) {
        muns = Object.keys(DEPARTMENTS_DATA[selectedDept].municipalities);
    } else {
        // Collect all municipalities across all departments
        for (const deptData of Object.values(DEPARTMENTS_DATA)) {
            for (const munName of Object.keys(deptData.municipalities)) {
                if (!muns.includes(munName)) {
                    muns.push(munName);
                }
            }
        }
    }
    
    muns.sort().forEach(mun => {
        const opt = document.createElement('option');
        opt.value = mun;
        opt.textContent = mun;
        if (mun === selectedMunVal) {
            opt.selected = true;
        }
        formMunSelect.appendChild(opt);
    });
}

function updateFilterMunicipalities(selectedDept, selectedMunVal = 'TODOS') {
    const filterMunSelect = document.getElementById('filterMunicipio');
    filterMunSelect.innerHTML = '<option value="TODOS">Todos los Municipios</option>';
    filterMunSelect.disabled = false;
    
    let muns = [];
    if (selectedDept && selectedDept !== 'TODOS' && DEPARTMENTS_DATA[selectedDept]) {
        muns = Object.keys(DEPARTMENTS_DATA[selectedDept].municipalities);
    } else {
        // Collect all municipalities across all departments
        for (const deptData of Object.values(DEPARTMENTS_DATA)) {
            for (const munName of Object.keys(deptData.municipalities)) {
                if (!muns.includes(munName)) {
                    muns.push(munName);
                }
            }
        }
    }
    
    muns.sort().forEach(mun => {
        const opt = document.createElement('option');
        opt.value = mun;
        opt.textContent = mun;
        if (mun === selectedMunVal) {
            opt.selected = true;
        }
        filterMunSelect.appendChild(opt);
    });
}

// ─── Google Sheets Sync ────────────────────────────────────────────────
const GOOGLE_SHEETS_URL_KEY = 'corrientes_rain_google_sheets_url';

function cleanGoogleSheetsUrl(url) {
    url = url.trim();
    
    // 1. Check if it's already a published CSV or export CSV link
    if (url.includes('/pub?output=csv') || url.includes('/export?format=csv')) {
        return url;
    }
    
    // 2. Handle published HTML link: https://docs.google.com/spreadsheets/d/e/PUB_ID/pubhtml...
    const pubHtmlRegex = /https:\/\/docs\.google\.com\/spreadsheets\/d\/e\/([a-zA-Z0-9-_]+)\/pubhtml/;
    const pubHtmlMatch = url.match(pubHtmlRegex);
    if (pubHtmlMatch) {
        return `https://docs.google.com/spreadsheets/d/e/${pubHtmlMatch[1]}/pub?output=csv`;
    }
    
    // 3. Handle standard sharing/edit link: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit...
    const editRegex = /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const editMatch = url.match(editRegex);
    if (editMatch) {
        return `https://docs.google.com/spreadsheets/d/${editMatch[1]}/export?format=csv`;
    }
    
    return url;
}

async function syncGoogleSheets() {
    let savedUrl = localStorage.getItem(GOOGLE_SHEETS_URL_KEY);
    
    if (!savedUrl) {
        const result = await showCustomPrompt({
            title: 'Sincronizar Google Sheets',
            bodyHtml: `
                <p>Ingresa el enlace de tu planilla de Google Sheets. Puedes copiar:</p>
                <ol>
                    <li>El enlace de compartir: <code>https://docs.google.com/spreadsheets/d/.../edit?usp=sharing</code> (asegúrate de que esté configurado como <strong>"Cualquier persona con el enlace puede ver"</strong>).</li>
                    <li>O el enlace publicado: <strong>Archivo -> Compartir -> Publicar en la web</strong> (elige formato <strong>Valores separados por comas (.csv)</strong>).</li>
                </ol>
            `,
            placeholder: 'Pega tu enlace de Google Sheets aquí...',
            confirmText: 'Vincular y Sincronizar',
            cancelText: 'Cancelar'
        });
        
        if (result.action !== 'confirm' || !result.value) return;
        
        const cleaned = cleanGoogleSheetsUrl(result.value);
        if (!cleaned.startsWith('http')) {
            showFloatingNotification('URL no válida. Debe comenzar con http/https.', 'warning');
            return;
        }
        localStorage.setItem(GOOGLE_SHEETS_URL_KEY, cleaned);
        savedUrl = cleaned;
    } else {
        const option = await showCustomPrompt({
            title: 'Sincronización de Google Sheets',
            bodyHtml: `
                <p>La sincronización está activa con la siguiente URL vinculada:</p>
                <p style="word-break: break-all; font-family: monospace; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 6px; font-size: 0.8rem;">${savedUrl}</p>
                <p style="margin-top: 10px;">¿Qué deseas hacer?</p>
            `,
            placeholder: 'Pegue un nuevo enlace si desea cambiarlo...',
            defaultValue: savedUrl,
            confirmText: 'Actualizar Enlace',
            cancelText: 'Sincronizar Ahora',
            showDelete: true,
            deleteText: 'Desvincular Planilla'
        });
        
        if (option.action === 'delete') {
            localStorage.removeItem(GOOGLE_SHEETS_URL_KEY);
            showFloatingNotification('Google Sheets desvinculado.', 'info');
            return;
        } else if (option.action === 'confirm' && option.value) {
            const cleaned = cleanGoogleSheetsUrl(option.value);
            if (!cleaned.startsWith('http')) {
                showFloatingNotification('URL no válida. Debe comenzar con http/https.', 'warning');
                return;
            }
            localStorage.setItem(GOOGLE_SHEETS_URL_KEY, cleaned);
            savedUrl = cleaned;
            showFloatingNotification('Enlace de Google Sheets actualizado.', 'success');
        } else if (option.action === 'cancel') {
            // "Cancelar" means just Sync Now with the existing URL
        } else {
            return; // Exit
        }
    }
    
    showLoading();
    try {
        const res = await fetch(savedUrl);
        if (!res.ok) throw new Error('No se pudo descargar el archivo. Verifica que la planilla esté compartida correctamente ("Cualquier persona con el enlace puede ver").');
        const csvText = await res.text();
        
        const importedRecords = parseCsvContent(csvText);
        if (!Array.isArray(importedRecords) || importedRecords.length === 0) {
            throw new Error('El archivo no contiene registros de lluvias válidos.');
        }
        
        const validRecords = importedRecords.filter(r => {
            return r.date && r.municipality && !isNaN(parseFloat(r.rain)) && !isNaN(parseFloat(r.lat)) && !isNaN(parseFloat(r.lng));
        }).map(r => {
            let dept = r.department;
            if (!dept) {
                for (const [deptName, deptData] of Object.entries(DEPARTMENTS_DATA)) {
                    if (deptData.municipalities[r.municipality.trim()]) {
                        dept = deptName;
                        break;
                    }
                }
            }
            return {
                id: r.id ? r.id.toString() : Date.now().toString() + Math.random().toString(36).substr(2, 5),
                date: r.date.trim(),
                department: (dept || 'Capital').trim(),
                municipality: r.municipality.trim(),
                rain: Math.max(0, parseFloat(r.rain)),
                lat: parseFloat(r.lat),
                lng: parseFloat(r.lng)
            };
        });
        
        if (validRecords.length === 0) {
            throw new Error('Ninguno de los registros importados de Google Sheets es válido.');
        }
        
        const action = await showImportConfirmModal(validRecords.length);
        
        if (action === 'cancel') {
            hideLoading();
            return;
        }
        
        if (action === 'merge') {
            let added = 0;
            validRecords.forEach(importRec => {
                const duplicate = records.some(r => r.id === importRec.id || 
                    (r.date === importRec.date && r.municipality === importRec.municipality && Math.abs(r.rain - importRec.rain) < 0.01));
                if (!duplicate) {
                    records.push(importRec);
                    added++;
                }
            });
            showFloatingNotification(`Sincronización completada: ${added} nuevos registros añadidos.`, 'success');
        } else if (action === 'replace') {
            records = validRecords;
            showFloatingNotification(`Sincronización completada: Datos locales reemplazados con los ${validRecords.length} registros de Google Sheets.`, 'success');
        }
        
        saveRecordsToStorage();
        setupDateInputs();
        applyFilters();
        
    } catch (err) {
        showFloatingNotification(`Error al sincronizar: ${err.message}`, 'warning');
        console.error(err);
    }
    hideLoading();
}

// ─── Custom Modal Dialog Helpers ─────────────────────────────────────────
function showCustomPrompt({ title, bodyHtml, placeholder = '', defaultValue = '', confirmText = 'Aceptar', cancelText = 'Cancelar', showDelete = false, deleteText = 'Desvincular' }) {
    return new Promise((resolve) => {
        const modal = document.getElementById('customModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const modalFooter = document.getElementById('modalFooter');
        
        modalTitle.textContent = title;
        
        modalBody.innerHTML = `
            ${bodyHtml}
            <input type="text" id="modalInputValue" class="modal-input" placeholder="${placeholder}" value="${defaultValue}">
        `;
        
        modalFooter.innerHTML = '';
        
        if (showDelete) {
            const btnDelete = document.createElement('button');
            btnDelete.className = 'btn-secondary';
            btnDelete.style.marginRight = 'auto'; // push to the left
            btnDelete.style.padding = '10px 16px';
            btnDelete.style.color = 'var(--accent-rose)';
            btnDelete.style.borderColor = 'rgba(251, 113, 133, 0.2)';
            btnDelete.style.background = 'rgba(251, 113, 133, 0.05)';
            btnDelete.textContent = deleteText;
            btnDelete.addEventListener('click', () => {
                modal.style.display = 'none';
                resolve({ action: 'delete' });
            });
            modalFooter.appendChild(btnDelete);
        }
        
        const btnCancel = document.createElement('button');
        btnCancel.className = 'btn-secondary';
        btnCancel.style.padding = '10px 16px';
        btnCancel.textContent = cancelText;
        btnCancel.addEventListener('click', () => {
            modal.style.display = 'none';
            resolve({ action: 'cancel' });
        });
        modalFooter.appendChild(btnCancel);
        
        const btnConfirm = document.createElement('button');
        btnConfirm.className = 'btn-primary';
        btnConfirm.style.padding = '10px 16px';
        btnConfirm.style.marginTop = '0';
        btnConfirm.textContent = confirmText;
        btnConfirm.addEventListener('click', () => {
            const val = document.getElementById('modalInputValue').value;
            modal.style.display = 'none';
            resolve({ action: 'confirm', value: val });
        });
        modalFooter.appendChild(btnConfirm);
        
        const closeBtn = document.getElementById('modalCloseBtn');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            resolve({ action: 'cancel' });
        };
        
        modal.style.display = 'flex';
        document.getElementById('modalInputValue').focus();
    });
}

function showCustomConfirm({ title, bodyHtml, confirmText = 'Aceptar', cancelText = 'Cancelar' }) {
    return new Promise((resolve) => {
        const modal = document.getElementById('customModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const modalFooter = document.getElementById('modalFooter');
        
        modalTitle.textContent = title;
        modalBody.innerHTML = bodyHtml;
        
        modalFooter.innerHTML = '';
        
        const btnCancel = document.createElement('button');
        btnCancel.className = 'btn-secondary';
        btnCancel.style.padding = '10px 16px';
        btnCancel.textContent = cancelText;
        btnCancel.addEventListener('click', () => {
            modal.style.display = 'none';
            resolve(false);
        });
        modalFooter.appendChild(btnCancel);
        
        const btnConfirm = document.createElement('button');
        btnConfirm.className = 'btn-primary';
        btnConfirm.style.padding = '10px 16px';
        btnConfirm.style.marginTop = '0';
        btnConfirm.textContent = confirmText;
        btnConfirm.addEventListener('click', () => {
            modal.style.display = 'none';
            resolve(true);
        });
        modalFooter.appendChild(btnConfirm);
        
        const closeBtn = document.getElementById('modalCloseBtn');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            resolve(false);
        };
        
        modal.style.display = 'flex';
    });
}

function showImportConfirmModal(count) {
    return new Promise((resolve) => {
        const modal = document.getElementById('customModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const modalFooter = document.getElementById('modalFooter');
        
        modalTitle.textContent = 'Importar Datos';
        modalBody.innerHTML = `
            <p style="font-size: 1rem; margin-bottom: 12px;">Se encontraron <strong style="color: var(--accent-green); font-size: 1.1rem;">${count}</strong> registros válidos.</p>
            <p>Elige cómo deseas integrar los datos en tu dashboard local:</p>
            <ul style="margin-left: 20px; margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
                <li><strong>Combinar Datos:</strong> Añade las mediciones que no existan localmente (evitando duplicar fecha/municipio/lluvia).</li>
                <li><strong>Reemplazar Todo:</strong> Elimina todos tus registros locales actuales y los sustituye por los del archivo importado.</li>
            </ul>
        `;
        
        modalFooter.innerHTML = '';
        
        const btnCancel = document.createElement('button');
        btnCancel.className = 'btn-secondary';
        btnCancel.style.padding = '10px 16px';
        btnCancel.textContent = 'Cancelar';
        btnCancel.addEventListener('click', () => {
            modal.style.display = 'none';
            resolve('cancel');
        });
        modalFooter.appendChild(btnCancel);
        
        const btnReplace = document.createElement('button');
        btnReplace.className = 'btn-secondary';
        btnReplace.style.padding = '10px 16px';
        btnReplace.style.background = 'rgba(251, 113, 133, 0.08)';
        btnReplace.style.borderColor = 'rgba(251, 113, 133, 0.2)';
        btnReplace.style.color = 'var(--accent-rose)';
        btnReplace.textContent = 'Reemplazar Todo';
        btnReplace.addEventListener('click', () => {
            modal.style.display = 'none';
            resolve('replace');
        });
        modalFooter.appendChild(btnReplace);
        
        const btnMerge = document.createElement('button');
        btnMerge.className = 'btn-primary';
        btnMerge.style.padding = '10px 16px';
        btnMerge.style.marginTop = '0';
        btnMerge.textContent = 'Combinar Datos';
        btnMerge.addEventListener('click', () => {
            modal.style.display = 'none';
            resolve('merge');
        });
        modalFooter.appendChild(btnMerge);
        
        const closeBtn = document.getElementById('modalCloseBtn');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            resolve('cancel');
        };
        
        modal.style.display = 'flex';
    });
}

