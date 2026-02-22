function renderTable() {

  table?.destroy();

  table = $("#tableSiswa").DataTable({
    serverSide: true,
    processing: true,
    searching: true,
    lengthMenu: [10, 25, 50, 100],
    pageLength: 10,

    ajax: async function (dtParams, callback) {
      try {
        console.log("Loading table summary...");
        const response = await apiFetch("dashboard", {
          draw: dtParams.draw,
          start: dtParams.start,
          length: dtParams.length,
          search: dtParams.search
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