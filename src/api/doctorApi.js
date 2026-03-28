import api, { handleApiError } from "./axios";

export const getDoctors = async () => {
  try {
    const res = await api.get("/doctors");
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getDoctor = async (id) => {
  try {
    const res = await api.get(`/doctors/${id}`);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getDoctorByName = async (name) => {
  try {
    const res = await api.get(`/doctors/name/${name}`);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const createDoctor = async (data) => {
  try {
    const res = await api.post("/doctors", data);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const updateDoctor = async (id, data) => {
  try {
    const res = await api.put(`/doctors/${id}`, data);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const deleteDoctor = async (id) => {
  try {
    const res = await api.delete(`/doctors/${id}`);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};