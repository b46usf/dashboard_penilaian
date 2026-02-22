function renderStat(data) {
  console.log("[STAT]", data);
  total.innerText = data.total ?? 0;
  sudah.innerText = data.sudah ?? 0;
  belum.innerText = data.belum ?? 0;
}

function renderTable(siswa = []) {
  console.log("[TABLE] rows:", siswa.length);

  if (!Array.isArray(siswa)) {
    console.warn("[TABLE] Invalid siswa data");
    return;
  }

  tableBody.innerHTML = siswa.map(s => {
    const status = s.individu || "Belum";
    const isSudah = status === "Sudah";

    return `
      <tr class="border-b hover:bg-gray-50">
        <td class="p-2">${s.nis ?? "-"}</td>
        <td class="p-2">${s.nama ?? "-"}</td>
        <td class="p-2">${s.kelas ?? "-"}</td>
        <td class="p-2 text-center">
          <span class="px-2 py-1 rounded text-xs font-semibold
            ${isSudah ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}">
            ${status.toUpperCase()}
          </span>
        </td>
      </tr>
    `;
  }).join("");
}