const API = {
  BASE_URL: "https://script.google.com/macros/s/AKfycbwhAlOxkjjGppBh41COEECdWoVs0dWQHa7g92gHwvk/dev",
  KEY: "DASHBOARD_XI_2026_SECRET",

  async getDashboard() {
    const url = `${this.BASE_URL}?mode=dashboard&key=${this.KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  }
};