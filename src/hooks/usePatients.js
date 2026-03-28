import { useEffect, useState } from "react";
import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient,
} from "../api/patientApi";

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 get all
  const fetchPatients = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  // 🔹 get single
  const fetchPatient = async (id) => {
    setLoading(true);
    setError("");

    try {
      const data = await getPatient(id);
      setPatient(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  // 🔹 create
  const addPatient = async (payload) => {
    const data = await createPatient(payload);
    setPatients((prev) => [...prev, data]); // optimistic feel
    return data;
  };

  // 🔹 update
  const editPatient = async (id, payload) => {
    const updated = await updatePatient(id, payload);

    setPatients((prev) => prev.map((p) => (p.id === id ? updated : p)));

    return updated;
  };

  // 🔹 delete
  const removePatient = async (id) => {
    await deletePatient(id);

    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  // auto load
  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    patient,
    loading,
    error,

    fetchPatients,
    fetchPatient,
    addPatient,
    editPatient,
    removePatient,
  };
};
