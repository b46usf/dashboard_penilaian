async function loadDashboard() {
  console.log("[DASHBOARD] Loading...");

  try {
    const data = await API.getDashboard();
    console.log("[DASHBOARD] Data:", data);

    renderStat(data);
    renderTable(data.siswa);
    renderChart(data.kelas);

  } catch (e) {
    console.error("[DASHBOARD ERROR]", e);
  }
}