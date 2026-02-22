async function loadDashboard() {
  console.log("[DASHBOARD] Loading...");

  try {
    const data = await API.getDashboard();
    console.log("[DASHBOARD] Data:", data);

    // ✅ ambil summary dengan benar
    renderStat(data.summary);

    // ⚠️ API belum kirim siswa → aman
    renderTable(data.siswa || []);

    // ✅ kirim array kelas
    renderChart(data.kelas);

  } catch (e) {
    console.error("[DASHBOARD ERROR]", e);
  }
}