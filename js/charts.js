function renderCharts(kelasData) {

  if (!Array.isArray(kelasData)) {
    console.error("kelasData bukan array");
    return;
  }

  cachedKelasData = kelasData;

  const kelasInf = kelasData.filter(k => k.totalInformatika > 0);
  const kelasNonInf = kelasData.filter(k => k.totalInformatika === 0);

  /* ================= PIE INFORMATIKA ================= */

  pieInfChart?.destroy();

  pieInfChart = new Chart(pieInf, {
    type: "pie",
    data: {
      labels: kelasInf.map(k => k.kelas),
      datasets: [{
        data: kelasInf.map(k => k.totalInformatika)
      }]
    },
    options: {
      responsive: true
    }
  });

  /* ================= PIE NON INFORMATIKA ================= */

  pieNonInfChart?.destroy();

  pieNonInfChart = new Chart(pieNonInf, {
    type: "pie",
    data: {
      labels: kelasNonInf.map(k => k.kelas),
      datasets: [{
        data: kelasNonInf.map(k => k.total)
      }]
    },
    options: {
      responsive: true
    }
  });

  /* ================= BAR CHART ================= */

  renderBarChart();
}

function renderBarChart() {

  if (!cachedKelasData.length) return;

  const kelasInf = cachedKelasData.filter(k => k.totalInformatika > 0);

  const dataset = buildSubmissionDataset(kelasInf, currentMode);

  const labels = dataset.map(d => d.kelas);
  const sudah = dataset.map(d => d.sudah);
  const belum = dataset.map(d => d.belum);

  barChart?.destroy();

  barChart = new Chart(barKelas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Sudah Kumpul",
          data: sudah,
          backgroundColor: "rgba(34,197,94,0.85)",
          borderWidth: 0,
          barThickness: 12,
          stack: "total"
        },
        {
          label: "Belum Kumpul",
          data: belum,
          backgroundColor: "rgba(239,68,68,0.85)",
          borderWidth: 0,
          barThickness: 12,
          stack: "total"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          stacked: true,
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw} siswa`;
            }
          }
        },
        legend: {
          position: "top"
        }
      }
    }
  });
}