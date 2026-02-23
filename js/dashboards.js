async function loadSummary() {
  try {

    console.log("Loading summary...");

    const data = await apiFetch("dashboard_summary");

    renderStats(data.summary);
    renderCharts(data.kelas);

    console.log("Summary loaded:", data);

  } catch (e) {
    console.error("Summary error:", e.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  loadSummary();   // summary load
  renderTable();   // table init sekali

  // refresh summary saja tiap 15 detik
  setInterval(loadSummary, 15000);

});