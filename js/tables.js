let table;

function renderTable(tableResponse) {

  if (!tableResponse || !Array.isArray(tableResponse.data)) {
    console.error("Table data tidak valid");
    return;
  }

  table?.destroy();

  table = $("#tableSiswa").DataTable({
    data: tableResponse.data,
    pageLength: 10,
    columns: [
      { data: "nis", title: "NIS" },
      { data: "nama", title: "Nama" },
      { data: "kelas", title: "Kelas" },
      { data: "individu", title: "Individu" },
      { data: "kelompok", title: "Kelompok" }
    ]
  });

}