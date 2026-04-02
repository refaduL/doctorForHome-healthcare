import api, { handleApiError } from "./axios";


// get all
export const getAppointments = async () => {
  try {
    const res = await api.get("/appointments");
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getAppointmentsByPatientId = async (id) => {
  try {
    const res = await api.get(`/appointments/patient/${id}`);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const addAppointment = async (data) => {
  try {
    const res = await api.post("/appointments/create", data);
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};