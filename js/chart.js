let kelasChart;

function renderChart(kelasMap = {}) {
  console.log("[CHART] kelas:", kelasMap);

  const labels = Object.keys(kelasMap);
  if (labels.length === 0) {
    console.warn("[CHART] No data");
    return;
  }

  const sudah = labels.map(k => kelasMap[k].sudah || 0);
  const belum = labels.map(k => (kelasMap[k].total || 0) - (kelasMap[k].sudah || 0));

  if (kelasChart) kelasChart.destroy();

  kelasChart = new Chart(chartKelas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Sudah", data: sudah },
        { label: "Belum", data: belum }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true } }
    }
  });
}