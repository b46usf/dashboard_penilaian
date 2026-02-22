async function loadDashboard() {
  try {
    const data = await API.getDashboard();

    renderStat(data);
    renderTable(data.siswa);
    renderChart(data.kelas);

  } catch (e) {
    console.error("Dashboard error:", e.message);
  }
}