import { useEffect, useState } from "react";
import { addAppointment, getAppointments, getAppointmentsByPatientId } from "../api/appointmentApi";
import { useAuth } from "./useAuth";

export const useAppointment = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [appointment, setAppointment] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 get all
  const fetchAppointments = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  // 🔹 get single patients appointments
  const fetchPatientAppointment = async (patientId) => {
    setLoading(true);
    setError("");

    try {
      const data = await getAppointmentsByPatientId(patientId);
      setPatientAppointments(data.payload);
      return data;
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  // 🔹 create
  const createAppointment = async (payload) => {
    const data = await addAppointment(payload);
    setAppointments((prev) => [...prev, data]); // optimistic feel
    return data;
  };

  // auto load
  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    fetchPatientAppointment(user.id);
  }, [user]);

  useEffect(() => {
    console.log("Patient: ", user.name, patientAppointments);
  }, [patientAppointments, user]);

  return {
    appointments,
    patientAppointments,
    appointment,
    loading,
    error,

    createAppointment,
  };
};
