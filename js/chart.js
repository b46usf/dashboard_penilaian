let kelasChart;

function renderChart(kelasArr = []) {
  console.log("[CHART] kelas:", kelasArr);

  if (!Array.isArray(kelasArr) || kelasArr.length === 0) {
    console.warn("[CHART] Empty kelas data");
    return;
  }

  const labels = kelasArr.map(k => k.kelas);
  const sudah = kelasArr.map(k => k.sudah);
  const belum = kelasArr.map(k => k.total - k.sudah);

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