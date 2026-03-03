/**
 * ========================================
 * CHARTS - Chart Rendering Utilities
 * ========================================
 */

// Chart color palette - will be dynamically updated based on theme
const CHART_PALETTE = {
  pie: null // Will be set from getPieChartColors()
};

/**
 * Show skeleton loaders for charts
 */
function showChartSkeletons() {
  // Show pie chart skeletons by ID
  const pieInfSkeleton = document.getElementById('skeleton-pieInf');
  const pieNonInfSkeleton = document.getElementById('skeleton-pieNonInf');
  
  if (pieInfSkeleton) pieInfSkeleton.style.display = 'flex';
  if (pieNonInfSkeleton) pieNonInfSkeleton.style.display = 'flex';
  
  // Hide canvas elements while skeleton is shown
  const canvasPieInf = document.getElementById('pieInf');
  const canvasPieNonInf = document.getElementById('pieNonInf');
  const canvasBarKelas = document.getElementById('barKelas');
  
  if (canvasPieInf) canvasPieInf.style.display = 'none';
  if (canvasPieNonInf) canvasPieNonInf.style.display = 'none';
  if (canvasBarKelas) canvasBarKelas.style.display = 'none';
  
  // Show bar chart skeleton
  const barSkeleton = document.getElementById('skeleton-barKelas');
  if (barSkeleton) barSkeleton.style.display = 'flex';
}

/**
 * Hide skeleton loaders for charts
 * Uses same delay as stats (CONFIG.ANIMATION.SKELETON = 2500ms) for consistent UX
 */
function hideChartSkeletons() {
  // Hide pie chart skeletons
  const pieInfSkeleton = document.getElementById('skeleton-pieInf');
  const pieNonInfSkeleton = document.getElementById('skeleton-pieNonInf');
  
  if (pieInfSkeleton) pieInfSkeleton.style.display = 'none';
  if (pieNonInfSkeleton) pieNonInfSkeleton.style.display = 'none';
  
  // Show canvas elements after skeleton is hidden
  const canvasPieInf = document.getElementById('pieInf');
  const canvasPieNonInf = document.getElementById('pieNonInf');
  const canvasBarKelas = document.getElementById('barKelas');
  
  if (canvasPieInf) canvasPieInf.style.display = 'block';
  if (canvasPieNonInf) canvasPieNonInf.style.display = 'block';
  if (canvasBarKelas) canvasBarKelas.style.display = 'block';
  
  // Hide bar chart skeleton
  const barSkeleton = document.getElementById('skeleton-barKelas');
  if (barSkeleton) barSkeleton.style.display = 'none';
}

/**
 * Update chart palette based on theme
 */
function updateChartPalette() {
  CHART_PALETTE.pie = getPieChartColors();
}

/**
 * Render all charts
 * Called AFTER data is successfully fetched
 */
function renderCharts(kelasData) {
  if (!Array.isArray(kelasData)) {
    console.error("kelasData bukan array");
    hideChartSkeletons();
    return;
  }

  // Store data
  STATE.cachedKelasData = kelasData;
  
  // Update palette for current theme
  updateChartPalette();

  const kelasInf = kelasData.filter(k => k.totalInformatika > 0);
  const kelasNonInf = kelasData.filter(k => k.totalInformatika === 0);

  // Render charts first (without showing them)
  renderPieCharts(kelasInf, kelasNonInf);
  renderBarChart();
  
  // Hide skeletons after same delay as stats (2500ms) for consistent UX
  setTimeout(() => {
    hideChartSkeletons();
  }, CONFIG.ANIMATION.SKELETON);
}

/**
 * Render both Pie Charts with improved legend
 */
function renderPieCharts(kelasInf, kelasNonInf) {
  const isDark = document.documentElement.classList.contains('dark');
  const borderColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)';
  const legendColor = isDark ? '#e2e8f0' : '#475569';

  // Shared pie options with improved legend - positioned on the right for more space
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: legendColor,
          // Shorter labels to prevent cutting
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function(label, i) {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? Math.round((value / total) * 100) + '%' : '';
                // Shorter label format
                const shortLabel = label.replace(' - ', '-');
                return {
                  text: shortLabel + ' (' + percentage + ')',
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) + '%' : '';
            return context.label + ': ' + value + ' (' + percentage + ')';
          }
        }
      }
    }
  };

  // Render Pie Informatika
  const canvasInf = document.getElementById("pieInf");
  if (canvasInf) {
    if (STATE.charts.pieInf) {
      STATE.charts.pieInf.destroy();
    }
    
    STATE.charts.pieInf = new Chart(canvasInf, {
      type: "pie",
      data: {
        labels: kelasInf.map(k => k.kelas),
        datasets: [{
          data: kelasInf.map(k => k.totalInformatika),
          backgroundColor: CHART_PALETTE.pie,
          borderWidth: 2,
          borderColor: borderColor
        }]
      },
      options: pieOptions
    });
  }

  // Render Pie Non-Informatika
  const canvasNonInf = document.getElementById("pieNonInf");
  if (canvasNonInf) {
    if (STATE.charts.pieNonInf) {
      STATE.charts.pieNonInf.destroy();
    }
    
    STATE.charts.pieNonInf = new Chart(canvasNonInf, {
      type: "pie",
      data: {
        labels: kelasNonInf.map(k => k.kelas),
        datasets: [{
          data: kelasNonInf.map(k => k.total),
          backgroundColor: CHART_PALETTE.pie,
          borderWidth: 2,
          borderColor: borderColor
        }]
      },
      options: pieOptions
    });
  }
}

/**
 * Render Bar Chart
 */
function renderBarChart() {
  if (!STATE.cachedKelasData.length) return;

  const canvas = document.getElementById("barKelas");
  if (!canvas) return;

  let kelasInf = STATE.cachedKelasData.filter(k => k.totalInformatika > 0);
  kelasInf = filterByTingkat(kelasInf, STATE.filters.tingkat);

  const dataset = buildSubmissionDataset(kelasInf, STATE.filters.mode);

  const labels = dataset.map(d => d.kelas);
  const sudah = dataset.map(d => d.sudah);
  const belum = dataset.map(d => d.belum);

  const colors = getChartColors();

  // Create new chart if not exists
  if (!STATE.charts.bar) {
    STATE.charts.bar = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Sudah Kumpul",
            data: sudah,
            backgroundColor: colors.hijau,
            borderColor: colors.hijauBorder,
            borderWidth: 1,
            stack: "total",
            barPercentage: 0.7,
            categoryPercentage: 0.7,
          },
          {
            label: "Belum Kumpul",
            data: belum,
            backgroundColor: colors.merah,
            borderColor: colors.merahBorder,
            borderWidth: 1,
            stack: "total",
            barPercentage: 0.7,
            categoryPercentage: 0.7,
          }
        ]
      },
      options: getBarChartOptions(colors),
      plugins: [percentagePlugin]
    });
  } else {
    // Update data only for smooth transition
    STATE.charts.bar.data.labels = labels;
    STATE.charts.bar.data.datasets[0].data = sudah;
    STATE.charts.bar.data.datasets[1].data = belum;
    STATE.charts.bar.update();
  }
}

/**
 * Get bar chart options with theme support
 */
function getBarChartOptions(colors) {
  const isDark = document.documentElement.classList.contains('dark');
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: CONFIG.ANIMATION.CHART_DURATION,
      easing: 'easeOutQuart'
    },
    scales: {
      x: { 
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          color: colors.text
        },
        stacked: true,
        grid: { display: false }
      },
      y: { 
        stacked: true,
        beginAtZero: true,
        grid: { color: colors.gridY },
        ticks: {
          color: colors.text
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          boxWidth: 14,
          usePointStyle: true,
          pointStyle: 'rect',
          color: colors.text,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
        titleColor: isDark ? '#f1f5f9' : '#1e293b',
        bodyColor: isDark ? '#cbd5e1' : '#475569',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          afterBody: function(context) {
            const idx = context[0].dataIndex;
            const s = context[0].dataset.data[idx];
            const b = STATE.charts.bar.data.datasets[1].data[idx];
            const total = s + b;
            const percent = total > 0 ? Math.round((s / total) * 100) : 0;
            return `Progress: ${percent}%`;
          }
        }
      }
    }
  };
}

/**
 * Custom plugin to show percentage on bars
 */
const percentagePlugin = {
  id: 'percentagePlugin',
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const sudahDataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#ffffff' : '#1e293b';

    meta.data.forEach((bar, index) => {
      const sudah = sudahDataset.data[index];
      const total = sudah + (chart.data.datasets[1]?.data[index] || 0);

      if (!total || sudah === 0) return;

      const percent = Math.round((sudah / total) * 100);
      const x = bar.x;
      const y = bar.y + (bar.height / 2);

      ctx.save();
      ctx.fillStyle = textColor;
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(percent + "%", x, y);
      ctx.restore();
    });
  }
};
