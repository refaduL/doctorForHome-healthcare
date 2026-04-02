import api, { handleApiError } from "./axios";

// Helper to handle responses consistently without repetition
const handleResponse = async (apiCall) => {
  try {
    const res = await apiCall;
    return { data: res.data, error: null };
  } catch (err) {
    console.error("login error: ", err);
    return { data: null, error: handleApiError(err) };
  }
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

/**
 * @param {{ email: string, password: string, role: "patient"|"doctor"|"admin" }} credentials
 * @returns {Promise<{ data: { message, user } | null, error: string | null }>}
 */
export const loginApi = async ({ email, password, role }) => {
  return handleResponse(api.post("/auth/login", { email, password, role }));
};

// ─── POST /api/auth/register ──────────────────────────────────────────────────

/**
 * Patients only.
 * @param {{ patient_name, email, password, mobile, gender, age, city? }} fields
 * @returns {Promise<{ data: { message, user } | null, error: string | null }>}
 */
export const registerApi = async (fields) => {
  return handleResponse(api.post("/auth/register", fields));
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

/**
 * Returns the full profile of the currently authenticated user.
 * Relies on the HttpOnly cookie being sent automatically.
 * @returns {Promise<{ data: object | null, error: string | null }>}
 */
export const getMeApi = async () => {
  return handleResponse(api.get("/auth/me", { withCredentials: true }));
};

// ─── POST /api/auth/logout ────────────────────────────────────────────────────

/**
 * Clears the auth cookie on the server.
 * @returns {Promise<{ data: { message } | null, error: string | null }>}
 */
export const logoutApi = async () => {
  return handleResponse(api.post("/auth/logout"));
};