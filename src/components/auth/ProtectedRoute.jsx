/**
 * components/auth/ProtectedRoute.jsx
 *
 * Wraps dashboard routes to enforce authentication and optional role check.
 * Shows a full-screen spinner while the session is being restored on mount.
 *
 * Props:
 *   allowedRoles  {string[]}  Optional. If provided, only those roles can pass.
 *                             e.g. allowedRoles={["patient"]}
 *
 * Behaviour:
 *   loading          → full-screen spinner (waiting for /me)
 *   no user          → redirect to /auth
 *   wrong role       → redirect to / (home, not auth — user IS logged in)
 *   correct          → renders <Outlet />
 *
 * Usage in App.jsx:
 *   <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
 *     <Route path="/patient/dashboard" element={<PatientDashboard />} />
 *   </Route>
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still waiting for session restore — show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Not logged in → send to /auth, preserving the attempted URL
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Logged in but wrong role → send home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;