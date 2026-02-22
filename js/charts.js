function renderCharts(kelasData) {

  if (!Array.isArray(kelasData)) {
    console.error("kelasData bukan array");
    return;
  }

  /* =========================
     SPLIT KELAS
     ========================= */

  const kelasInf = kelasData.filter(k => k.totalInformatika > 0);
  const kelasNonInf = kelasData.filter(k => k.totalInformatika === 0);

  /* =========================
     PIE INFORMATIKA
     ========================= */

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
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw} siswa`;
            }
          }
        }
      }
    }
  });

  /* =========================
     PIE NON INFORMATIKA
     ========================= */

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
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw} siswa`;
            }
          }
        }
      }
    }
  });

  /* =========================
   BAR CHART → STATUS TUGAS PER KELAS (STACKED)
   ========================= */

  const labels = kelasInf.map(k => k.kelas);
  const sudah = kelasInf.map(k => k.totalInformatika);
  const belum = kelasInf.map(k => k.total - k.totalInformatika);

  barChart?.destroy();

  barChart = new Chart(barKelas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Sudah Kumpul",
          data: sudah,
          backgroundColor: "rgba(34,197,94,0.8)",   // hijau
          borderColor: "rgba(34,197,94,1)",
          borderWidth: 1,
          barThickness: 12,
          stack: "total"
        },
        {
          label: "Belum Kumpul",
          data: belum,
          backgroundColor: "rgba(239,68,68,0.8)",    // merah
          borderColor: "rgba(239,68,68,1)",
          borderWidth: 1,
          barThickness: 12,
          stack: "total"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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