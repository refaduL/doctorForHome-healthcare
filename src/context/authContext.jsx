/**
 * context/AuthContext.jsx
 *
 * Provides authentication state to the entire app via React context.
 *
 * What it stores:
 *   user   { id, name, role, email, ... } | null
 *   loading  true while /me is in flight on first mount
 *
 * What it exposes via useAuth():
 *   user, loading
 *   login(credentials)  → calls loginApi, updates user, returns { error }
 *   register(fields)    → calls registerApi, updates user, returns { error }
 *   logout()            → calls logoutApi, clears user, redirects to /
 *
 * AuthProvider should wrap <App> (or at least all routes) in main.jsx.
 *
 * Usage:
 *   const { user, login, logout, loading } = useAuth();
 */

import { useNavigate } from "react-router-dom";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getMeApi, loginApi, logoutApi, registerApi } from "../api/authApi";
 
//  Context 

export const AuthContext = createContext(null);

//  Provider 

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);   // true on mount until /me resolves
  const navigate = useNavigate();

  //  Restore session on page load / refresh 
  useEffect(() => {
    let cancelled = false;
    const restore = async () => {
      const { data } = await getMeApi();
      if (!cancelled) {
        setUser(data ?? null);
        setLoading(false);
      }
    };
    restore();
    return () => { cancelled = true; };
  }, []);

  //  Login 
  //
  const login = useCallback(async (credentials, from = "/") => {
    const { data, error } = await loginApi(credentials);
    if (error) return { error };
    setUser(data.user);

    // Redirect: to 'from' or to the correct dashboard based on role
    if (from && from !== "/login") {
      navigate(from, { replace: true });
    } else {
      const redirects = {
        patient: "/patient/dashboard",
        doctor:  "/doctor/dashboard",
        admin:   "/admin/dashboard",
      };
      navigate(redirects[data.user.role] ?? "/");
    }
    return { error: null };
  }, [navigate]);

  //  Register (patients only) ─
  const register = useCallback(async (fields) => {
    console.log("users info: ", fields);
    const { data, error } = await registerApi(fields);
    if (error) return { error };
    setUser(data.user);
    navigate("/patient/dashboard");
    return { error: null };
  }, [navigate]);

  //  Logout 
  //
  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
    navigate("/");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//  Hook 
//

