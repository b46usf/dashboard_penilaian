const API_URL = "https://script.google.com/macros/s/AKfycbxsh8UwiieBizD6hhOJW_5GSZ4pYkU5OaSi6pfus63RxVlZzitCXpaZUAR5kDcgQoGn/exec";
const API_KEY = "DASHBOARD_XI_2026_SECRET";

async function apiFetch(mode, params = {}) {
  const q = new URLSearchParams({
    key: API_KEY,
    mode,
    ...params
  });

  const res = await fetch(`${API_URL}?${q}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}