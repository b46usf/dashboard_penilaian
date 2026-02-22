function renderStat(data) {
  document.getElementById("total").innerText = data.total;
  document.getElementById("sudah").innerText = data.sudah;
  document.getElementById("belum").innerText = data.belum;
}

function renderTable(siswa) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = siswa.map(s => `
    <tr class="border-b hover:bg-gray-50">
      <td class="p-2">${s.nis}</td>
      <td class="p-2">${s.nama}</td>
      <td class="p-2">${s.kelas}</td>
      <td class="p-2 text-center">
        <span class="px-2 py-1 rounded text-xs font-semibold
          ${s.individu === "Sudah"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}">
          ${s.individu.toUpperCase()}
        </span>
      </td>
    </tr>
  `).join("");
}