import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>BlackFrame</h2>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/pages">Pages</NavLink>
        <NavLink to="/media">Media</NavLink>
        <NavLink to="/theme">Theme</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}