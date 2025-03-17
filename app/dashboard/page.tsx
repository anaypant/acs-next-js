"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "@headlessui/react";
import {
  Home,
  Search,
  BarChartBig,
  PieChart,
  LineChart,
  FileText,
  Layers,
  Settings,
  Activity,
  Bell,
  User,
} from "lucide-react";
// Dynamically import ApexCharts-based components
import dynamic from "next/dynamic";
import CountUp from "react-countup";

// Lazy-load chart components (so they only load in the browser)
const ApexLineChart = dynamic(() => import("../components/charts/ApexLineChart"), {
  ssr: false,
});
const ApexBarChart = dynamic(() => import("../components/charts/ApexBarChart"), {
  ssr: false,
});
const ApexPieChart = dynamic(() => import("../components/charts/ApexPieChart"), {
  ssr: false,
});

const COLORS = {
  background: "bg-[#DFF6E9]",
  sidebar: "bg-[#043927]",
  sidebarItem: "bg-[#0E4A3A]",
  button: "bg-[#0B6E4F] hover:bg-[#128054]",
  cardPrimary: "bg-[#B5E5C2]",
  cardSecondary: "bg-[#9CD5B3]",
  textPrimary: "text-[#0B6E4F]",
  textSecondary: "text-[#043927]",
  widgetBackground: "bg-[#074F35]",
};

/** Framer Motion variants for container & items */
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading state
    setTimeout(() => setLoading(false), 1200);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`flex h-screen w-screen overflow-hidden ${COLORS.background}`}
    >
      {/* Sidebar */}
      <aside
        className={`w-72 ${COLORS.sidebar} text-white p-6 flex flex-col justify-between`}
      >
        <div className="flex flex-col gap-6">
          {/* Dashboard Title */}
          <h2 className="text-2xl font-bold">ACS Dashboard</h2>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 pl-10 rounded-md bg-[#0E4A3A] text-white focus:outline-none"
            />
            <Search className="absolute left-3 top-3 text-white" size={18} />
          </div>

          {/* Nav Sections */}
          <nav className="flex flex-col gap-3">
            <Button
              className={`flex items-center gap-3 p-3 rounded-lg ${COLORS.widgetBackground} text-white hover:opacity-90`}
            >
              <Home size={18} />
              Dashboard
            </Button>
            <Button
              className={`flex items-center gap-3 p-3 rounded-lg ${COLORS.widgetBackground} text-white hover:opacity-90`}
            >
              <Activity size={18} />
              Key Widgets
            </Button>
            <Button
              className={`flex items-center gap-3 p-3 rounded-lg ${COLORS.widgetBackground} text-white hover:opacity-90`}
            >
              <BarChartBig size={18} />
              Visualization
            </Button>
            <Button
              className={`flex items-center gap-3 p-3 rounded-lg ${COLORS.widgetBackground} text-white hover:opacity-90`}
            >
              <Layers size={18} />
              Functionalities
            </Button>
            <Button
              className={`flex items-center gap-3 p-3 rounded-lg ${COLORS.widgetBackground} text-white hover:opacity-90`}
            >
              <Settings size={18} />
              Widget Setting
            </Button>
            <Button
              className={`flex items-center gap-3 p-3 rounded-lg ${COLORS.widgetBackground} text-white hover:opacity-90`}
            >
              <FileText size={18} />
              Campaign Setting
            </Button>
          </nav>
        </div>

        {/* Footer / Profile */}
        <div className="mt-8 flex items-center gap-3">
          <User size={24} />
          <span className="font-semibold">Mr. Avinash</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-8 flex-1">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-screen"
          >
            <span className="text-xl font-bold">Loading Dashboard...</span>
          </motion.div>
        ) : (
          <>
            {/* Header Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mb-8"
            >
              <motion.h1
                variants={itemVariants}
                className={`text-4xl font-bold ${COLORS.textPrimary}`}
              >
                Welcome back Natalia! Check Dashboard
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700 mt-2"
              >
                You have earned 54% more than last month, which is a great thing.
              </motion.p>
              <motion.div variants={itemVariants} className="flex gap-4 mt-4">
                <span className="px-4 py-2 rounded-lg bg-[#043927] text-white font-semibold">
                  $63,489.50
                </span>
                <span
                  className={`px-4 py-2 rounded-lg ${COLORS.button} text-white font-semibold`}
                >
                  Year 2024
                </span>
              </motion.div>
            </motion.div>

            {/* Top Stats Row */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <h2 className="text-lg font-semibold">
                      Total Number of Sales
                    </h2>
                    <p className="text-3xl font-bold mt-2">
                      <CountUp end={592} duration={2} />
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardSecondary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <h2 className="text-lg font-semibold">Earnings</h2>
                    <p className="text-3xl font-bold mt-2">
                      $<CountUp end={678298} duration={2} separator="," />
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <h2 className="text-lg font-semibold">Total Products</h2>
                    <p className="text-3xl font-bold mt-2">
                      <CountUp end={343} duration={2} />
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardSecondary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <h2 className="text-lg font-semibold">Total Customers</h2>
                    <p className="text-3xl font-bold mt-2">
                      <CountUp end={3201} duration={2} separator="," />
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Middle Charts / Analytics Row */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardSecondary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold">
                        Average Price &amp; Total Turnover
                      </h2>
                      <LineChart size={32} className="text-green-700" />
                    </div>
                    {/* Example chart using ApexCharts */}
                    <div className="h-48">
                      <ApexLineChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold">Revenue Analytics</h2>
                      <BarChartBig size={32} className="text-blue-700" />
                    </div>
                    {/* Another example chart using ApexCharts */}
                    <div className="h-48">
                      <ApexBarChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Another Row (Sales Analytics, Campaign Distribution) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold">Sales Analytics</h2>
                      <PieChart size={32} className="text-blue-600" />
                    </div>
                    {/* Pie chart example */}
                    <div className="h-48">
                      <ApexPieChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardSecondary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold">
                        Campaign Distribution
                      </h2>
                      <PieChart size={32} className="text-green-600" />
                    </div>
                    <div className="h-48">
                      <ApexPieChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Bottom Row (Recent Conversations, Notification Box) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <h2 className="text-lg font-semibold mb-2">
                      Recent Conversations &amp; Leads
                    </h2>
                    <p className="text-sm text-gray-700">
                      Add a table or list of recent leads, messages, or
                      conversation snippets here.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardSecondary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Bell size={20} className="text-red-600" />
                      <h2 className="text-lg font-semibold">Notification Box</h2>
                    </div>
                    <p className="text-sm text-gray-700">
                      Display recent notifications or alerts here.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
