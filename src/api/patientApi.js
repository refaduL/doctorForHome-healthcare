import api, { handleApiError } from "./api";

// get all
export const getPatients = async () => {
  try {
    const res = await api.get("/patients");
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// get by id
export const getPatient = async (id) => {
  try {
    const res = await api.get(`/patients/${id}`);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// create
export const createPatient = async (data) => {
  try {
    const res = await api.post("/patients", data);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// update
export const updatePatient = async (id, data) => {
  try {
    const res = await api.put(`/patients/${id}`, data);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

// delete
export const deletePatient = async (id) => {
  try {
    const res = await api.delete(`/patients/${id}`);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};