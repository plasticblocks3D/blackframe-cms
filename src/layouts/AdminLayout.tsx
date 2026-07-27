import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function AdminLayout() {
  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}