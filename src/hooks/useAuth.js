/**
 * @returns {{ user: object|null, loading: boolean, login: Function, register: Function, logout: Function }}
 */

import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};