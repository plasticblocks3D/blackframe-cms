import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import Pages from "../pages/admin/Pages";
import Media from "../pages/admin/Media";
import Theme from "../pages/admin/Theme";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<Pages />} />
          <Route path="media" element={<Media />} />
          <Route path="theme" element={<Theme />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}