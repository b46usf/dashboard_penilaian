const API_URL = "https://script.google.com/macros/s/AKfycbxsh8UwiieBizD6hhOJW_5GSZ4pYkU5OaSi6pfus63RxVlZzitCXpaZUAR5kDcgQoGn/exec";
const SCRIPT_ID = "AKfycbxsh8UwiieBizD6hhOJW_5GSZ4pYkU5OaSi6pfus63RxVlZzitCXpaZUAR5kDcgQoGn";
const JWT_SECRET = "SUPER_SECRET_INTERNAL_2026_BABESUGAB";

function generateJWT() {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const payload = {
    sid: SCRIPT_ID,
    ts: Date.now()
  };

  const headerB64 = btoa(JSON.stringify(header));
  const payloadB64 = btoa(JSON.stringify(payload));

  const data = headerB64 + "." + payloadB64;

  const signature = CryptoJS.HmacSHA256(data, JWT_SECRET)
    .toString(CryptoJS.enc.Hex);

  return data + "." + signature;
}

async function apiFetch(mode, params = {}) {
  const token = generateJWT();

  const q = new URLSearchParams({
    token,
    mode,
    ...params
  });

  const res = await fetch(`${API_URL}?${q}`);
  const json = await res.json();

  if (!json.success) throw new Error(json.error);
  return json.data;
}