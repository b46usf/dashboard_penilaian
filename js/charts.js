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

  let kelasInf = cachedKelasData.filter(k => k.totalInformatika > 0);

  kelasInf = filterByTingkat(kelasInf, currentTingkat);

  const dataset = buildSubmissionDataset(kelasInf, currentMode);

  const labels = dataset.map(d => d.kelas);
  const sudah = dataset.map(d => d.sudah);
  const belum = dataset.map(d => d.belum);

  if (!barChart) {
    barChart = new Chart(barKelas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Sudah Kumpul",
            data: sudah,
            backgroundColor: "rgba(34,197,94,0.9)",
            stack: "total"
          },
          {
            label: "Belum Kumpul",
            data: belum,
            backgroundColor: "rgba(239,68,68,0.9)",
            stack: "total"
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          duration: 600,
          easing: 'easeOutQuart'
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true }
        }
      },
      plugins: [percentagePlugin]
    });
  } else {
    // 🔥 UPDATE DATA ONLY (SMOOTH TRANSITION)
    barChart.data.labels = labels;
    barChart.data.datasets[0].data = sudah;
    barChart.data.datasets[1].data = belum;
    barChart.update();
  }
}

const percentagePlugin = {
  id: 'percentagePlugin',
  afterDatasetsDraw(chart) {

    const { ctx } = chart;

    chart.data.datasets.forEach((dataset, datasetIndex) => {

      const meta = chart.getDatasetMeta(datasetIndex);

      meta.data.forEach((bar, index) => {

        const value = dataset.data[index];
        const total =
          chart.data.datasets[0].data[index] +
          chart.data.datasets[1].data[index];

        if (!total || datasetIndex !== 0) return;

        const percent = Math.round((value / total) * 100);

        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(percent + "%", bar.x, bar.y);
        ctx.restore();

      });
    });
  }
};