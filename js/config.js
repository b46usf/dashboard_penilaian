/**
 * ========================================
 * CONFIG - Centralized Constants & Config
 * Gen-Z Inspired Theme Colors
 * ========================================
 */

const CONFIG = {
  // API Configuration
  API_URL: "https://script.google.com/macros/s/AKfycbz--KXVT14udPAiAHSDJlKXdfWD196WBfI-GOl6M4mXHcI5I7yPDvRka27dILi4GM2T/exec",
  ORIGIN_KEY: "VERCEL_FRONTEND_2026",
  
  // Refresh Intervals (ms)
  REFRESH_INTERVAL: 15000,
  SKELETON_DELAY: 2500,
  
  // Animation Durations (ms)
  ANIMATION: {
    CHART_DURATION: 600,
    COUNT_UP_DURATION: 1000,
    STAGGER_DELAY: 200,
    SKELETON: 2500
  },
  
  // UI Configuration
  UI: {
    TABLE_PAGE_LENGTH: 10,
    TABLE_SEARCH_DELAY: 400,
    TOUCH_FRIENDLY_MIN: 44
  },
  
  // Chart Colors - Light Mode (Vibrant Gen-Z)
  CHART_COLORS_LIGHT: {
    hijau: 'rgba(16, 185, 129, 0.9)',
    merah: 'rgba(239, 68, 68, 0.8)',
    hijauBorder: 'rgba(5, 150, 105, 1)',
    merahBorder: 'rgba(220, 38, 38, 1)',
    gridY: "rgba(139, 92, 246, 0.1)",
    gridX: "rgba(139, 92, 246, 0.05)",
    text: "#4b5563",
    textLight: "#9ca3af"
  },
  
  // Chart Colors - Dark Mode (Neon & Vibrant)
  CHART_COLORS_DARK: {
    hijau: 'rgba(52, 211, 153, 0.95)',
    merah: 'rgba(248, 113, 113, 0.9)',
    hijauBorder: 'rgba(34, 197, 94, 1)',
    merahBorder: 'rgba(239, 68, 68, 1)',
    gridY: "rgba(139, 92, 246, 0.2)",
    gridX: "rgba(139, 92, 246, 0.1)",
    text: "#e2e8f0",
    textLight: "#94a3b8"
  },
  
  // Pie Chart Colors - Light Mode (Vibrant Rainbow)
  PIE_COLORS_LIGHT: [
    'rgba(139, 92, 246, 0.95)',   // Violet
    'rgba(236, 72, 153, 0.95)',  // Pink
    'rgba(6, 182, 212, 0.95)',   // Cyan
    'rgba(245, 158, 11, 0.95)',   // Amber
    'rgba(34, 197, 94, 0.95)',   // Emerald
    'rgba(99, 102, 241, 0.95)',  // Indigo
    'rgba(249, 115, 22, 0.95)',  // Orange
    'rgba(20, 184, 166, 0.95)',  // Teal
  ],
  
  // Pie Chart Colors - Dark Mode (Neon Glow)
  PIE_COLORS_DARK: [
    'rgba(167, 139, 250, 1)',    // Light Violet
    'rgba(244, 114, 182, 1)',    // Light Pink
    'rgba(34, 211, 238, 1)',     // Neon Cyan
    'rgba(251, 191, 36, 1)',     // Neon Amber
    'rgba(52, 211, 153, 1)',     // Neon Green
    'rgba(129, 140, 248, 1)',    // Light Indigo
    'rgba(251, 146, 60, 1)',     // Neon Orange
    'rgba(45, 212, 191, 1)',     // Neon Teal
  ]
};

/**
 * Get current chart colors based on theme
 */
function getChartColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? CONFIG.CHART_COLORS_DARK : CONFIG.CHART_COLORS_LIGHT;
}

/**
 * Get pie chart colors based on theme
 */
function getPieChartColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? CONFIG.PIE_COLORS_DARK : CONFIG.PIE_COLORS_LIGHT;
}

/**
 * Format number to Indonesian locale
 */
const formatNumber = n => n.toLocaleString("id-ID");

/**
 * Debounce utility
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
