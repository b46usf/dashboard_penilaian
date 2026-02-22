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
        data: kelasInf.map(() => 1) // tiap kelas 1 slice
      }]
    },
    options: {
      responsive: true
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
        data: kelasNonInf.map(() => 1)
      }]
    },
    options: {
      responsive: true
    }
  });

}