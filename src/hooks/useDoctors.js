import { useEffect, useState } from "react";
import {
  createDoctor,
  deleteDoctor,
  getDoctor,
  getDoctorByName,
  getDoctors,
  updateDoctor,
} from "../api/doctorApi";

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 get all
  const fetchDoctors = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getDoctors();
      console.log("Fetched doctors:", data);
      setDoctors(data.payload || data); // Handle both { payload: [...] } and [...] formats
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  // 🔹 get by id
  const fetchDoctor = async (id) => {
    setLoading(true);
    setError("");

    try {
      const data = await getDoctor(id);
      setDoctor(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  // 🔹 search by name
  const searchDoctor = async (name) => {
    setLoading(true);
    setError("");

    try {
      const data = await getDoctorByName(name);
      setDoctors(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  // 🔹 create
  const addDoctor = async (payload) => {
    const data = await createDoctor(payload);
    setDoctors((prev) => [...prev, data]);
    return data;
  };

  // 🔹 update
  const editDoctor = async (id, payload) => {
    const updated = await updateDoctor(id, payload);
    setDoctors((prev) => prev.map((d) => (d.id === id ? updated : d)));
    return updated;
  };

  // 🔹 delete
  const removeDoctor = async (id) => {
    await deleteDoctor(id);
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return {
    doctors,
    doctor,
    loading,
    error,

    fetchDoctors,
    fetchDoctor,
    searchDoctor,
    addDoctor,
    editDoctor,
    removeDoctor,
  };
};
