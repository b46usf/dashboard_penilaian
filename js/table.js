let table;

function renderTable(data) {
  const inf = data.filter(d =>
    d.individu !== "Tidak ada materi informatika"
  );

  table?.destroy();
  table = $("#tableSiswa").DataTable({
    data: inf,
    pageLength: 10,
    columns: [
      { data: "nis" },
      { data: "nama" },
      { data: "kelas" },
      { data: "individu" },
      { data: "kelompok" }
    ]
  });
}