async function loadDashboard() {
  try {
    const data = await apiFetch("siswa");

    renderStats(data);
    renderCharts(data);
    renderTable(data);

  } catch (e) {
    console.error("Dashboard error:", e.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  function setMode(mode) {
    MODE = mode;
    loadDashboard(); // 🔥 rerender semua
  }
  setInterval(loadDashboard, 15000);
});