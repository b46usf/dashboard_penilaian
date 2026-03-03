/**
 * ========================================
 * STATES - Application State Management
 * ========================================
 */

// Centralized state object
const STATE = {
  // Chart instances
  charts: {
    pieInf: null,
    pieNonInf: null,
    bar: null,
    line: null
  },
  
  // DataTable instance
  table: null,
  
  // Current filter states
  filters: {
    tingkat: "all",
    mode: 0  // 0=Individu, 1=Kelompok, 2=Total
  },
  
  // Cached data
  cachedKelasData: []
};

// Getter shortcuts
const getChartInstances = () => STATE.charts;
const getTable = () => STATE.table;
const getFilters = () => STATE.filters;
const getCachedData = () => STATE.cachedKelasData;

// Setter shortcuts with validation
const setFilters = (key, value) => {
  if (key in STATE.filters) {
    STATE.filters[key] = value;
  }
};

const setCachedData = (data) => {
  STATE.cachedKelasData = Array.isArray(data) ? data : [];
};

// ========================================
// UI INITIALIZATION
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSegmentedControl();
  // Removed initSkeletonRemoval - handled by renderStats/renderCharts
  initMobileMenu();
});

/**
 * Initialize dark mode from localStorage
 */
function initTheme() {
  const isDark = localStorage.theme === 'dark';
  if (isDark) {
    document.documentElement.classList.add('dark');
  }
  
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
}

/**
 * Toggle dark/light theme and update all charts
 */
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.theme = document.documentElement.classList.contains('dark') 
    ? 'dark' : 'light';
  
  // Update all charts with new theme
  updateAllCharts();
}

/**
 * Update all charts when theme changes
 */
function updateAllCharts() {
  // Update pie charts
  if (STATE.charts.pieInf) {
    const isDark = document.documentElement.classList.contains('dark');
    const colors = getPieChartColors();
    const borderColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)';
    const legendColor = isDark ? '#e2e8f0' : '#475569';
    
    STATE.charts.pieInf.data.datasets[0].backgroundColor = colors;
    STATE.charts.pieInf.data.datasets[0].borderColor = borderColor;
    STATE.charts.pieInf.options.plugins.legend.labels.color = legendColor;
    STATE.charts.pieInf.update();
  }
  
  if (STATE.charts.pieNonInf) {
    const isDark = document.documentElement.classList.contains('dark');
    const colors = getPieChartColors();
    const borderColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)';
    const legendColor = isDark ? '#e2e8f0' : '#475569';
    
    STATE.charts.pieNonInf.data.datasets[0].backgroundColor = colors;
    STATE.charts.pieNonInf.data.datasets[0].borderColor = borderColor;
    STATE.charts.pieNonInf.options.plugins.legend.labels.color = legendColor;
    STATE.charts.pieNonInf.update();
  }
  
  // Update bar chart
  if (STATE.charts.bar) {
    updateChartTheme();
  }
}

/**
 * Initialize segmented control indicator
 */
function initSegmentedControl() {
  const indicator = document.getElementById("indicator");
  if (indicator) {
    moveIndicator(STATE.filters.mode);
  }
  
  // Initialize button states
  updateModeButtons(STATE.filters.mode);
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// ========================================
// FILTER FUNCTIONS
// ========================================

/**
 * Set submission mode (Individu/Kelompok/Total)
 */
function setMode(modeIndex) {
  if (modeIndex < 0 || modeIndex > 2) return;
  
  STATE.filters.mode = modeIndex;
  moveIndicator(modeIndex);
  updateModeButtons(modeIndex);
  renderBarChart();
}

/**
 * Move segmented control indicator
 */
function moveIndicator(index) {
  const indicator = document.getElementById("indicator");
  if (!indicator) return;
  
  indicator.style.width = `${100 / 3}%`;
  indicator.style.transform = `translateX(${index * 100}%)`;
}

/**
 * Update mode toggle button active states
 */
function updateModeButtons(activeIndex) {
  const buttons = document.querySelectorAll('.mode-toggle-btn');
  buttons.forEach((btn, idx) => {
    if (idx === activeIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Set tingkat filter
 */
function setTingkat(value) {
  STATE.filters.tingkat = value;
  renderBarChart();
  if (STATE.table) {
    STATE.table.ajax.reload(null, true);
  }
}

// ========================================
// DATA TRANSFORMATION
// ========================================

/**
 * Build submission dataset based on mode
 */
function buildSubmissionDataset(kelasInf, mode = 0) {
  if (!Array.isArray(kelasInf)) return [];
  
  const modeMap = {
    0: 'individuSudah',
    1: 'kelompokSudah',
    2: 'totalSudah'
  };
  
  return kelasInf.map(k => {
    const dataKey = modeMap[mode] || 'individuSudah';
    const sudah = k[dataKey] || 0;
    
    return {
      kelas: k.kelas,
      sudah,
      belum: (k.totalInformatika || 0) - sudah
    };
  });
}

/**
 * Filter data by tingkat
 */
function filterByTingkat(data, tingkat) {
  if (!Array.isArray(data)) return [];
  if (tingkat === "all") return data;
  
  return data.filter(k => 
    k.kelas && k.kelas.toLowerCase().startsWith(tingkat.toLowerCase())
  );
}

/**
 * Update chart colors based on current theme
 */
function updateChartTheme() {
  const colors = getChartColors();
  const chart = STATE.charts.bar;
  const isDark = document.documentElement.classList.contains('dark');
  
  if (chart && chart.data.datasets) {
    chart.data.datasets[0].backgroundColor = colors.hijau;
    chart.data.datasets[0].borderColor = colors.hijauBorder;
    chart.data.datasets[1].backgroundColor = colors.merah;
    chart.data.datasets[1].borderColor = colors.merahBorder;
    chart.options.scales.y.grid.color = colors.gridY;
    chart.options.scales.y.ticks.color = colors.text;
    chart.options.scales.x.ticks.color = colors.text;
    chart.options.plugins.legend.labels.color = colors.text;
    chart.options.plugins.tooltip.backgroundColor = isDark ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)';
    chart.options.plugins.tooltip.titleColor = isDark ? '#f1f5f9' : '#1e293b';
    chart.options.plugins.tooltip.bodyColor = isDark ? '#cbd5e1' : '#475569';
    chart.update('none');
  }
}

// ========================================
// BACKWARD COMPATIBILITY
// ========================================

// Alias for format function
const format = formatNumber;

// Legacy variables (deprecated - use STATE instead)
let currentTingkat = "all";
let currentMode = 0;
let cachedKelasData = [];

// Expose chart instances to window for backward compatibility
Object.defineProperty(window, 'pieInfChart', {
  get: () => STATE.charts.pieInf,
  set: (val) => { STATE.charts.pieInf = val; },
  configurable: true
});

Object.defineProperty(window, 'pieNonInfChart', {
  get: () => STATE.charts.pieNonInf,
  set: (val) => { STATE.charts.pieNonInf = val; },
  configurable: true
});

Object.defineProperty(window, 'barChart', {
  get: () => STATE.charts.bar,
  set: (val) => { STATE.charts.bar = val; },
  configurable: true
});

Object.defineProperty(window, 'table', {
  get: () => STATE.table,
  set: (val) => { STATE.table = val; },
  configurable: true
});
