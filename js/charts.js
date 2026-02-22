function renderCharts(kelasData) {

  if (!Array.isArray(kelasData)) {
    console.error("kelasData bukan array");
    return;
  }

  /* =========================
     HITUNG KELAS INF vs NON INF
     ========================= */

  const kelasInf = kelasData.filter(k => k.totalInformatika > 0).length;
  const kelasNonInf = kelasData.length - kelasInf;

  /* =========================
     PIE CHART DISTRIBUSI KELAS
     ========================= */

  pieInfChart?.destroy();

  pieInfChart = new Chart(pieInf, {
    type: "pie",
    data: {
      labels: ["Kelas Informatika", "Kelas Non Informatika"],
      datasets: [{
        data: [kelasInf, kelasNonInf]
      }]
    },
    options: {
      responsive: true
    }
  });

}