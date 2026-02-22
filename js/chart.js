let kelasChart;

function renderChart(kelasMap) {
  const labels = Object.keys(kelasMap);
  const sudah = labels.map(k => kelasMap[k].sudah);
  const belum = labels.map(k => kelasMap[k].total - kelasMap[k].sudah);

  if (kelasChart) kelasChart.destroy();

  kelasChart = new Chart(
    document.getElementById("chartKelas"),
    {
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
    }
  );
}