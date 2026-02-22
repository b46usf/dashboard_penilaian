function renderCharts(data) {

  /* =========================
     FILTER DATA
     ========================= */
  const inf = data.filter(d =>
    d.individu !== "Tidak ada materi informatika"
  );

  const nonInf = data.length - inf.length;

  /* =========================
     PIE CHART INFORMATIKA
     ========================= */
  let sudah = 0;
  let belum = 0;

  inf.forEach(d => {
    let done =
      MODE === "individu" ? d.individu === "Sudah" :
      MODE === "kelompok" ? d.kelompok === "Sudah" :
      d.individu === "Sudah" || d.kelompok === "Sudah";

    done ? sudah++ : belum++;
  });

  pieInfChart?.destroy();
  pieInfChart = new Chart(pieInf, {
    type: "pie",
    data: {
      labels: ["Sudah", "Belum"],
      datasets: [{ data: [sudah, belum] }]
    }
  });

  /* =========================
     PIE CHART NON INFORMATIKA
     ========================= */
  pieNonInfChart?.destroy();
  pieNonInfChart = new Chart(pieNonInf, {
    type: "pie",
    data: {
      labels: ["Non Informatika"],
      datasets: [{ data: [nonInf] }]
    }
  });

  /* =========================
     LINE CHART → TIMELINE HARIAN
     ========================= */
  const timeline = {}; // date → kelas → count

  inf.forEach(d => {
    const dates =
      MODE === "individu" ? d.tglIndividu :
      MODE === "kelompok" ? d.tglKelompok :
      [d.tglIndividu, d.tglKelompok].join(",");

    dates.split(",").forEach(date => {
      if (!date) return;

      if (!timeline[date]) timeline[date] = {};
      if (!timeline[date][d.kelas]) timeline[date][d.kelas] = 0;

      timeline[date][d.kelas]++;
    });
  });

  const labels = Object.keys(timeline).sort();

  const kelasSet = new Set(inf.map(d => d.kelas));
  const datasets = [...kelasSet].map(kelas => ({
    label: kelas,
    data: labels.map(t => timeline[t]?.[kelas] || 0),
    tension: 0.3
  }));

  lineChart?.destroy();
  lineChart = new Chart(lineKelas, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}