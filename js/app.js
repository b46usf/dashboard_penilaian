/**
 * ========================================
 * APP - Main Application Entry Point
 * ========================================
 * 
 * This is the main entry point that imports and initializes all modules.
 * Uses ES6 modules for better code organization and maintainability.
 * 
 * Module dependency order:
 * 1. config.js - Base configuration and utilities
 * 2. apis.js - API client (depends on config)
 * 3. states.js - State management (depends on config)
 * 4. charts.js - Chart rendering (depends on config, states)
 * 5. stats.js - Statistics rendering (depends on config)
 * 6. tables.js - Table/Card rendering (depends on apis, states, dashboards)
 * 7. dashboards.js - Main controller (depends on all)
 */

// Import all modules in dependency order
import { CONFIG } from './config.js';
import { API, apiFetch } from './apis.js';
import { STATE, setFilters, setCachedData } from './states.js';
import { 
  showChartSkeletons, 
  hideChartSkeletons, 
  renderCharts, 
  renderBarChart 
} from './charts.js';
import { 
  clearStatSkeletons, 
  renderStats, 
  resetStatSkeletons 
} from './stats.js';
import { 
  initView, 
  renderTable, 
  STATUS_CONFIG,
  CARD_LIST_STATE 
} from './tables.js';
import { 
  Toast, 
  handleApiError,
  loadDashboard,
  loadSummary 
} from './dashboards.js';

// Re-export all key functions and objects for global access
// This maintains backward compatibility with inline scripts
window.CONFIG = CONFIG;
window.API = API;
window.apiFetch = apiFetch;
window.STATE = STATE;
window.setFilters = setFilters;
window.setCachedData = setCachedData;
window.showChartSkeletons = showChartSkeletons;
window.hideChartSkeletons = hideChartSkeletons;
window.renderCharts = renderCharts;
window.renderBarChart = renderBarChart;
window.clearStatSkeletons = clearStatSkeletons;
window.renderStats = renderStats;
window.resetStatSkeletons = resetStatSkeletons;
window.initView = initView;
window.renderTable = renderTable;
window.STATUS_CONFIG = STATUS_CONFIG;
window.CARD_LIST_STATE = CARD_LIST_STATE;
window.Toast = Toast;
window.handleApiError = handleApiError;
window.loadDashboard = loadDashboard;
window.loadSummary = loadSummary;

// ========================================
// DYNAMIC PAGE LOADING
// ========================================

/**
 * Page templates - modular HTML components
 */
const PageTemplates = {
  /**
   * Dashboard Page Template
   */
  dashboard: () => `
    <!-- ================= STAT CARDS ================= -->
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

    <!-- Card 1: Total Siswa -->
      <div class="group relative bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-indigo-400/20 dark:from-violet-500/30 dark:to-indigo-500/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="flex items-start justify-between relative z-10">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <i class="fas fa-users text-white text-xs"></i>
              </div>
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Siswa</span>
            </div>
            <div id="statTotal" class="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
              <span class="skeleton-stat h-12 w-24 rounded-xl block"></span>
            </div>
            <div class="flex items-center gap-1 mt-2 text-green-600 dark:text-green-400 text-xs font-medium">
              <i class="fas fa-arrow-trend-up"></i>
              <span>Aktif Tahun Ini</span>
            </div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
            <i class="fas fa-user-graduate text-white text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Card 2: Siswa Informatika -->
      <div class="group relative bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-500/30 dark:to-pink-500/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="flex items-start justify-between relative z-10">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <i class="fas fa-laptop-code text-white text-xs"></i>
              </div>
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Informatika</span>
            </div>
            <div id="statInf" class="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
              <span class="skeleton-stat h-12 w-24 rounded-xl block"></span>
            </div>
            <div class="flex items-center gap-1 mt-2 text-purple-600 dark:text-purple-400 text-xs font-medium">
              <i class="fas fa-check-circle"></i>
              <span>Jurusan Teknik</span>
            </div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
            <i class="fas fa-code text-white text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Card 3: Non Informatika -->
      <div class="group relative bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-500/30 dark:to-teal-500/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="flex items-start justify-between relative z-10">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <i class="fas fa-user text-white text-xs"></i>
              </div>
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Non Informatika</span>
            </div>
            <div id="statNonInf" class="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
              <span class="skeleton-stat h-12 w-24 rounded-xl block"></span>
            </div>
            <div class="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <i class="fas fa-building-columns"></i>
              <span>Jurusan Lain</span>
            </div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
            <i class="fas fa-users-viewfinder text-white text-2xl"></i>
          </div>
        </div>
      </div>

    </section>

    <!-- ================= CHARTS ================= -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

      <!-- Pie Informatika -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg dark:shadow-violet-500/20">
            <i class="fas fa-chart-pie text-white"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-800 dark:text-white">Distribusi Informatika</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Rasio siswa per tingkat kelas</p>
          </div>
        </div>
        <div class="pie-chart-container h-[380px] sm:h-[420px]">
          <div id="skeleton-pieInf" class="chart-skeleton skeleton-pie">
            <div class="skeleton-circle"></div>
          </div>
          <canvas id="pieInf" style="display: none;"></canvas>
        </div>
      </div>

      <!-- Pie Non Informatika -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg dark:shadow-emerald-500/20">
            <i class="fas fa-chart-simple text-white"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-800 dark:text-white">Distribusi Non Informatika</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Rasio siswa non-Informatika</p>
          </div>
        </div>
        <div class="pie-chart-container h-[380px] sm:h-[420px]">
          <div id="skeleton-pieNonInf" class="chart-skeleton skeleton-pie">
            <div class="skeleton-circle"></div>
          </div>
          <canvas id="pieNonInf" style="display: none;"></canvas>
        </div>
      </div>

      <!-- Bar Chart -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl transition-all duration-300 lg:col-span-2">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg dark:shadow-pink-500/20">
              <i class="fas fa-chart-column text-white"></i>
            </div>
            <div>
              <h3 class="font-bold text-slate-800 dark:text-white">Progres Tugas per Kelas</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Status pengumpulan tugas</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <!-- Filter Tingkat -->
            <select id="filterTingkat" onchange="setTingkat(this.value)" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 border-0 text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-purple-500">
              <option value="all">Semua Tingkat</option>
              <option value="x - ">Kelas X</option>
              <option value="xi - ">Kelas XI</option>
              <option value="xii - ">Kelas XII</option>
            </select>

            <!-- Mode Toggle -->
            <div class="relative bg-slate-100 dark:bg-slate-700 rounded-full p-1 flex">
              <div id="indicator" class="segment-indicator"></div>
              <button type="button" class="mode-toggle-btn active px-4 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200" onclick="setMode(0)">
                <i class="fas fa-user mr-1"></i>Individu
              </button>
              <button type="button" class="mode-toggle-btn px-4 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200" onclick="setMode(1)">
                <i class="fas fa-users mr-1"></i>Kelompok
              </button>
              <button type="button" class="mode-toggle-btn px-4 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200" onclick="setMode(2)">
                <i class="fas fa-layer-group mr-1"></i>Total
              </button>
            </div>
          </div>
        </div>

        <!-- Bar Chart Container -->
        <div class="bar-chart-container h-72 sm:h-80 lg:h-96">
          <div id="skeleton-barKelas" class="chart-skeleton skeleton-bar">
            <div class="skeleton-bars">
              <div class="skeleton-bar-item"></div>
              <div class="skeleton-bar-item"></div>
              <div class="skeleton-bar-item"></div>
              <div class="skeleton-bar-item"></div>
              <div class="skeleton-bar-item"></div>
            </div>
          </div>
          <canvas id="barKelas" style="display: none;"></canvas>
        </div>
      </div>

    </section>

    <!-- ================= TABLE SECTION ================= -->
    <section class="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-2xl transition-all duration-300">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg dark:shadow-amber-500/20">
            <i class="fas fa-table-list text-white"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-800 dark:text-white">Detail Tugas Siswa</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Data lengkap pengumpulan tugas</p>
          </div>
        </div>

        <select id="filterTingkatTable" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 border-0 text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500">
          <option value="all">Semua Tingkat</option>
          <option value="x">Kelas X</option>
          <option value="xi">Kelas XI</option>
          <option value="xii">Kelas XII</option>
        </select>
      </div>

      <!-- Table View -->
      <!-- Desktop/Tablet View: Table -->
      <div class="table-view hidden md:block overflow-x-auto">
        <!-- Table Skeleton -->
        <div id="tableSiswaSkeleton" class="table-skeleton">
          <!-- Header -->
          <div class="skeleton-row header">
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
          </div>
          <!-- Rows -->
          <div class="skeleton-row">
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
          </div>
          <div class="skeleton-row">
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
          </div>
          <div class="skeleton-row">
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
          </div>
          <div class="skeleton-row">
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
          </div>
        </div>
        <!-- Actual Table -->
        <table id="tableSiswa" class="w-full text-sm" style="display: none;"></table>
      </div>

      <!-- Mobile View: Card List -->
      <div id="cardListView" class="card-list-view md:hidden">
        <!-- Search Input (Mobile) -->
        <div class="mb-4">
          <div class="relative">
            <input 
              type="text" 
              id="mobileSearchInput" 
              placeholder="Cari nama atau NIS..." 
              class="w-full px-4 py-3 pl-11 rounded-xl bg-slate-100 dark:bg-slate-700 border-0 text-sm font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
            />
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              <i class="fas fa-search"></i>
            </div>
            <button 
              id="clearMobileSearch" 
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hidden"
            >
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
        </div>
        
        <!-- Card List Container -->
        <div class="card-list-container"></div>
        
        <!-- Loading Indicator -->
        <div class="card-list-loader hidden flex items-center justify-center py-8">
          <div class="loading-spinner"></div>
        </div>
        
        <!-- End Message -->
        <div class="card-list-end hidden flex items-center justify-center py-4 text-sm text-slate-500 dark:text-slate-400">
          <i class="fas fa-check-circle mr-2"></i>
          <span>Semua data telah dimuat</span>
        </div>
      </div>
    </section>
  `
};

/**
 * Router - Handle dynamic page loading
 */
const Router = {
  /**
   * Get current page from data-page attribute
   */
  getPage() {
    const app = document.getElementById('app');
    return app?.dataset.page || 'dashboard';
  },

  /**
   * Load page content dynamically
   */
  async loadPage(pageName) {
    const appContent = document.getElementById('app-content');
    if (!appContent) return;

    // Get template
    const template = PageTemplates[pageName];
    
    if (template) {
      // Load template
      appContent.innerHTML = template();
      
      // Initialize page-specific functionality
      await this.initPage(pageName);
    } else {
      // Fallback to dashboard
      appContent.innerHTML = PageTemplates.dashboard();
      await this.initPage('dashboard');
    }
  },

  /**
   * Initialize page-specific functionality
   */
  async initPage(pageName) {
    switch (pageName) {
      case 'dashboard':
        // Initialize dashboard
        if (typeof loadDashboard === 'function') {
          loadDashboard();
        }
        break;
      default:
        console.warn(`No initialization for page: ${pageName}`);
    }
  },

  /**
   * Navigate to a new page
   */
  navigate(pageName) {
    const app = document.getElementById('app');
    if (app) {
      app.dataset.page = pageName;
      this.loadPage(pageName);
    }
  }
};

// Make Router available globally
window.Router = Router;

// ========================================
// APPLICATION INITIALIZATION
// ========================================

console.log('Dashboard Penilaian - Modular JavaScript Initialized');
console.log('API URL:', CONFIG.API_URL);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Load initial page
  const currentPage = Router.getPage();
  await Router.loadPage(currentPage);
});

