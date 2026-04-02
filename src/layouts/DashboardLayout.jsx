/**
 * DashboardLayout.jsx
 * layouts/DashboardLayout.jsx
 *
 * Shared shell for all dashboard routes. 
 * No Navbar or Footer — just the <Outlet />.
 *
 * Each dashboard page owns its own sidebar/topbar because
 * each role has different nav items.
 *
 * Add shared dashboard concerns here (auth guard, session timeout banner, global notification panel, user context provider) 
 * rather than duplicating them across every dashboard page.
 */

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* <UserProvider>
        <Outlet />
      </UserProvider> */}
      <Outlet />
    </div>
  );
}
