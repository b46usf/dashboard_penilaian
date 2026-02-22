function renderStats(data) {
  const total = data.length;
  const inf = data.filter(d => d.individu !== "Tidak ada materi informatika").length;
  const nonInf = total - inf;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statInf").textContent = inf;
  document.getElementById("statNonInf").textContent = nonInf;
}