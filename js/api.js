const API = {
  BASE_URL: "https://script.google.com/macros/s/AKfycbxsh8UwiieBizD6hhOJW_5GSZ4pYkU5OaSi6pfus63RxVlZzitCXpaZUAR5kDcgQoGn/exec",
  KEY: "DASHBOARD_XI_2026_SECRET",

  async getDashboard() {
    const url = `${this.BASE_URL}?mode=dashboard&key=${encodeURIComponent(this.KEY)}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store", // ⬅️ hindari cached redirect
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.error || "API error");
    }

    return json.data;
  }
};