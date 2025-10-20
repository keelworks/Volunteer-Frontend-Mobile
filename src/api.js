// File: src/api.js
// FINAL VERSION — includes home_country + LinkedIn + Website + proxy-safe setup

/*******************************
 * Backend base URL (CRA-friendly)
 *******************************/
const ENV_HOST =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_BACKEND_ORIGIN) ||
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_BACKEND_ORIGIN) ||
  "";

// Empty string => same-origin (use CRA proxy)
const API_HOST = ENV_HOST.trim();
export const API_BASE_URL = `${API_HOST}/api/v1/apply`;

/*******************************
 * Helpers
 *******************************/
const MAX_RETRIES = 2;
const BACKOFF_BASE_MS = 600;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchJSON = async (url, options = {}) => {
  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const resp = await fetch(url, options);
      const raw = await resp.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        data = raw;
      }
      if (!resp.ok) {
        const msg =
          (data && typeof data === "object" && (data.error || data.message)) ||
          `Request failed: ${resp.status}`;
        throw new Error(msg);
      }
      return data;
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES) {
        const jitter = Math.random() * BACKOFF_BASE_MS;
        await sleep((2 ** attempt) * BACKOFF_BASE_MS + jitter);
      }
    }
  }
  throw lastError;
};

const readToken = () => {
  const ls =
    (typeof window !== "undefined" &&
      window.localStorage &&
      localStorage.getItem("kw_token")) || "";
  const env =
    (typeof process !== "undefined" &&
      process.env &&
      (process.env.REACT_APP_API_TOKEN || process.env.REACT_APP_BEARER_TOKEN)) ||
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      (import.meta.env.VITE_API_TOKEN || import.meta.env.VITE_BEARER_TOKEN)) ||
    "";
  return ls || env || "";
};

const authHeader = () => {
  const token = readToken();
  const bearer = token?.startsWith("Bearer ") ? token : token ? `Bearer ${token}` : "";
  return bearer ? { Authorization: bearer } : {};
};

const UPLOAD_FIELD_NAME =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_UPLOAD_FIELD_NAME) ||
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_UPLOAD_FIELD_NAME) ||
  "documents";

const normalizeUrl = (u) => {
  if (!u) return "";
  const s = String(u).trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

/*******************************
 * API: reference data
 *******************************/
export const getCountries = () =>
  fetchJSON(`${API_BASE_URL}/countries`, {
    headers: { accept: "application/json", ...authHeader() },
  });

export const getStates = (countryCode) =>
  fetchJSON(`${API_BASE_URL}/states/${encodeURIComponent(countryCode)}`, {
    headers: { accept: "application/json", ...authHeader() },
  });

export const getCities = (stateId) =>
  fetchJSON(`${API_BASE_URL}/cities/${encodeURIComponent(stateId)}`, {
    headers: { accept: "application/json", ...authHeader() },
  });

/*******************************
 * Upload Document
 *******************************/
export const uploadDocument = async (file) => {
  if (!file) return null;

  const tokenHeader = authHeader();
  if (!tokenHeader.Authorization) {
    console.warn("[api] No JWT token found; skipping document upload.");
    return null;
  }

  const form = new FormData();
  form.append(UPLOAD_FIELD_NAME, file, file.name);

  const resp = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: { ...tokenHeader },
    body: form,
    cache: "no-store",
  });

  const raw = await resp.text();
  let data;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = raw;
  }

  if (resp.status === 401 || resp.status === 403) {
    console.warn("[api] Upload unauthorized; continuing without resume_url.", data);
    return null;
  }

  if (!resp.ok) {
    const msg =
      (data && typeof data === "object" && (data.error || data.message)) ||
      `Upload failed: ${resp.status}`;
    throw new Error(msg);
  }

  const url =
    (Array.isArray(data?.data) && data.data[0]?.url) ||
    data?.data?.url ||
    data?.url ||
    (Array.isArray(data) && data[0]?.url) ||
    null;

  return url;
};

/*******************************
 * Submit Volunteer Form
 *******************************/
export const submitVolunteerForm = async (formPayload) => {
  // Upload resume (optional)
  let resumeUrl = formPayload?.resume_url || null;
  const candidateFile = formPayload?.resume instanceof File ? formPayload.resume : null;

  if (!resumeUrl && candidateFile) {
    try {
      resumeUrl = await uploadDocument(candidateFile);
    } catch (e) {
      console.error("[api] Resume upload error:", e?.message || e);
    }
  }

  // Build backend-expected payload
  const payload = {
    first_name: formPayload.first_name || "",
    last_name: formPayload.last_name || "",
    birth_date: formPayload.birth_date || "",

    personal_email: formPayload.personal_email || formPayload.email || "",

    phone: formPayload.phone ?? formPayload.phone_number ?? "",
    phonetype: formPayload.phonetype || "Mobile",
    gender: formPayload.gender || "",

    linkedin_url: normalizeUrl(formPayload.linkedin_url || formPayload.linkedin || ""),
    website: normalizeUrl(formPayload.website || ""),

    opt_support: formPayload.opt_support ?? "No",
    desired_start_date: formPayload.desired_start_date || "",
    hours_commitment:
      typeof formPayload.hours_commitment === "number"
        ? formPayload.hours_commitment
        : formPayload.hours_commitment
        ? Number(formPayload.hours_commitment)
        : 0,

    why_kworks: formPayload.why_kworks || "",
    visa_status: formPayload.visa_status || "",

    // ✅ Required numeric home_country
    home_country:
      typeof formPayload.home_country === "number"
        ? formPayload.home_country
        : formPayload.home_country
        ? Number(formPayload.home_country)
        : 0,

    country_code_phone:
      formPayload.country_code_phone ||
      formPayload.country_code ||
      formPayload.country_code_phone_prefix ||
      "+1",

    application_status: formPayload.application_status || "Pending",

    ...(resumeUrl ? { resume_url: resumeUrl } : {}),
  };

  if (formPayload.middle_name) payload.middle_name = formPayload.middle_name;

  console.log("[api] Submitting payload to /employees:", payload);

  const resp = await fetch(`${API_BASE_URL}/employees`, {
    method: "POST",
    headers: { "content-type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });

  const raw = await resp.text();
  let data;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = raw;
  }

  if (!resp.ok) {
    const details =
      (data && typeof data === "object" && (data.error || data.message)) ||
      (typeof data === "string" ? data : "") ||
      `HTTP ${resp.status}`;
    throw new Error(details);
  }

  return data;
};
