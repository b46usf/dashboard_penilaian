function renderTable() {

  const tingkatTable = $("#filterTingkatTable").val();

  table?.destroy();

  table = $("#tableSiswa").DataTable({
    serverSide: true,
    processing: true,
    searching: true,
    responsive: true,
    deferRender: true,
    searchDelay: 400, // 🔥 bikin lebih ringan
    lengthMenu: [10, 25, 50, 100],
    pageLength: 10,
    order: [[2, "asc"]],

    ajax: async function (dtParams, callback) {

      try {

        const response = await apiFetch("dashboard_table", {
          draw: dtParams.draw,
          start: dtParams.start,
          length: dtParams.length,
          search: dtParams.search.value,
          tingkat: tingkatTable
        });

        callback({
          draw: response.draw,
          recordsTotal: response.recordsTotal,
          recordsFiltered: response.recordsFiltered,
          data: response.data
        });

      } catch (error) {
        console.error("Table load error:", error);
      }
    },

    columns: [
      { data: "nis", title: "NIS" },
      { data: "nama", title: "Nama" },
      { data: "kelas", title: "Kelas" },
      { data: "individu", title: "Individu" },
      { data: "kelompok", title: "Kelompok" }
    ]
  });
}