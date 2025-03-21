"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Filter,
  Settings,
  BookOpen,
  File,
  Eye,
  BarChart2,
  Monitor,
  UserPlus,
  UserCog,
  UserCheck,
  Database,
  FolderOpen,
} from "lucide-react";

export default function Sidebar() {
  // State to track open/close for each dropdown
  const [openDashboards, setOpenDashboards] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <aside className="min-h-screen w-64 text-[#043927] flex flex-col" style={{ backgroundColor: "#abc1b9" }}>
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 p-4">
        {/* Real SVG Logo with lighter colors */}
        <svg
          width="35"
          height="27"
          viewBox="0 0 35 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.8381 26.4039C23.5995 26.4039 25.8848 24.1469 25.381 21.4318C25.0607 19.7056 24.5735 18.0132 23.9247 16.381C22.6614 13.2034 20.8098 10.3161 18.4757 7.88405C16.1415 5.45199 13.3704 3.52278 10.3207 2.20656C8.81485 1.55668 7.25566 1.06252 5.66555 0.728743C2.96303 0.161458 0.701172 2.45147 0.701172 5.21289V21.4039C0.701172 24.1653 2.93975 26.4039 5.70117 26.4039H20.8381Z"
            fill="#128054"
          />
          <g style={{ mixBlendMode: "multiply" }}>
            <path
              d="M14.4021 26.4039C11.6407 26.4039 9.3554 24.1469 9.85924 21.4318C10.1796 19.7056 10.6667 18.0132 11.3156 16.381C12.5788 13.2034 14.4304 10.3161 16.7646 7.88405C19.0987 5.45199 21.8698 3.52278 24.9196 2.20656C26.4254 1.55668 27.9846 1.06252 29.5747 0.728743C32.2772 0.161458 34.5391 2.45147 34.5391 5.21289V21.4039C34.5391 24.1653 32.3005 26.4039 29.5391 26.4039H14.4021Z"
              fill="#7FD1FF"
            />
          </g>
        </svg>
        <span className="text-xl font-bold text-[#128054]">ACS</span>
      </div>

      {/* Extra spacing between logo and nav */}
      <div className="mb-2" />

      {/* Navigation */}
      <nav className="px-2 flex-1 overflow-auto">
        {/* Dashboards Section */}
        <div className="mb-2">
          <button
            onClick={() => setOpenDashboards(!openDashboards)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-[#D1EADC] transition-colors"
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              <span className="font-semibold">Dashboards</span>
            </div>
            {openDashboards ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {/* Submenu */}
          {openDashboards && (
            <div className="ml-9 mt-1 flex flex-col gap-1">
              <button className="flex items-center gap-2 text-left px-2 py-1 rounded hover:bg-[#D1EADC]">
                <Eye size={16} />
                <span>Overview</span>
              </button>
              <button className="flex items-center gap-2 text-left px-2 py-1 rounded hover:bg-[#D1EADC]">
                <BarChart2 size={16} />
                <span>LCP Dashboard</span>
              </button>
              <button className="flex items-center gap-2 text-left px-2 py-1 rounded hover:bg-[#D1EADC]">
                <Monitor size={16} />
                <span>LGW Dashboard</span>
              </button>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="mb-2">
          <button
            onClick={() => setOpenFilters(!openFilters)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-[#D1EADC] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter size={18} />
              <span className="font-semibold">Filters</span>
            </div>
            {openFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {/* Submenu */}
          {openFilters && (
            <div className="ml-9 mt-1 flex flex-col gap-1">
              <button className="flex items-center gap-2 text-left px-2 py-1 rounded hover:bg-[#D1EADC]">
                <UserPlus size={16} />
                <span>New Leads</span>
              </button>
              <button className="flex items-center gap-2 text-left px-2 py-1 rounded hover:bg-[#D1EADC]">
                <UserCog size={16} />
                <span>Leads in pipeline</span>
              </button>
              <button className="flex items-center gap-2 text-left px-2 py-1 rounded hover:bg-[#D1EADC]">
                <UserCheck size={16} />
                <span>Converted Leads</span>
              </button>
            </div>
          )}
        </div>

        {/* Docs (single link) */}
        <div className="mb-2">
          <button className="flex items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-[#D1EADC] transition-colors">
            <BookOpen size={18} />
            <span className="font-semibold">Docs</span>
          </button>
        </div>

        {/* Configurations (single link) */}
        <div className="mb-2">
          <button className="flex items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-[#D1EADC] transition-colors">
            <Settings size={18} />
            <span className="font-semibold">Configurations</span>
          </button>
        </div>

        {/* Additional Example Link */}
        <div className="mb-2">
          <button className="flex items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-[#D1EADC] transition-colors">
            <Database size={18} />
            <span className="font-semibold">Database</span>
          </button>
        </div>
      </nav>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-[#C4DFC9] flex items-center gap-2">
        <FolderOpen size={20} />
        <span className="font-medium">Mr. Avinash</span>
      </div>
    </aside>
  );
}
