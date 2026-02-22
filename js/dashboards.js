async function loadDashboard() {
  try {

    console.log("Loading dashboard summary...");

    const data = await apiFetch("dashboard");

    renderStats(data.summary);
    renderCharts(data.kelas);
    console.log("dashboard summary loaded:", data);
  } catch (e) {
    console.error("Dashboard error:", e.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  loadDashboard();
  renderTable();

  setInterval(loadDashboard, 15000);

});