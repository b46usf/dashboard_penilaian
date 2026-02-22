async function loadDashboard() {
  try {

    console.log("Loading dashboard...");

    const data = await apiFetch("dashboard");

    console.log("Dashboard data:", data);

    renderStats(data.summary);
    renderCharts(data.kelas);
    renderTable(data.kelas);

  } catch (e) {
    console.error("Dashboard error:", e.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  loadDashboard(); // load pertama kali

  setInterval(loadDashboard, 15000); // refresh tiap 15 detik

});