'use client';

import React, { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@headlessui/react";
import { Card, CardContent } from "../components/ui/Card";
import Sidebar from '../components/LeftNavbar';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './../styles.css'; // Adjust the path as necessary
import NorthEastIcon from '@mui/icons-material/NorthEast';
import FeaturesBody from './../page-body';
import dynamic from "next/dynamic";
import CountUp from "react-countup";

// Lazy-load chart components
const ApexLineChart = dynamic(() => import("../components/charts/ApexLineChart"), {
  ssr: false,
});
const ApexBarChart = dynamic(() => import("../components/charts/ApexBarChart"), {
  ssr: false,
});
const ApexPieChart = dynamic(() => import("../components/charts/ApexPieChart"), {
  ssr: false,
});

// Color constants
const COLORS = {
  background: "bg-[#fafffe]",
  sidebar: "bg-[#043927]",
  sidebarItem: "bg-[#0E4A3A]",
  button: "bg-[#0B6E4F] hover:bg-[#128054]",
  cardPrimary: "bg-[#B5E5C2]",
  cardSecondary: "bg-[#9CD5B3]",
  textPrimary: "text-[#0B6E4F]",
  textSecondary: "text-[#043927]",
  widgetBackground: "bg-[#074F35]",
};

// Framer Motion variants
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
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`flex h-screen w-screen overflow-hidden ${COLORS.background}`}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="p-8 flex-1 overflow-y-auto">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <span className="text-xl font-bold">Loading Dashboard...</span>
          </motion.div>
        ) : (
          <>
            {/* WELCOME + STATS */}
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

            {/* TOP ROW: 4 WIDGETS */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {/* Total Number of Sales */}
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

              {/* Earnings */}
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

              {/* Total Products */}
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

              {/* Total Customers */}
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

            {/* ROW: AVERAGE PRICE + REVENUE ANALYTICS */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              {/* Average Price & Total Turnover */}
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
                    <div className="h-48">
                      <ApexLineChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Revenue Analytics */}
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold">Revenue Analytics</h2>
                      <BarChartBig size={32} className="text-blue-700" />
                    </div>
                    <div className="h-48">
                      <ApexBarChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* ROW: RECENT CONVERSATIONS + SALES ANALYTICS + CAMPAIGN DISTRIBUTION */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {/* Recent Conversations & Leads */}
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <CardContent>
                    <h2 className="text-lg font-semibold mb-2">
                      Recent Conversations &amp; Leads
                    </h2>
                    <p className="text-sm text-gray-700">
                      Display a list of recent leads or messages here.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sales Analytics */}
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardSecondary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold">Sales Analytics</h2>
                      <PieChart size={32} className="text-blue-600" />
                    </div>
                    <div className="h-48">
                      <ApexPieChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Campaign Distribution */}
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full`}
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

            {/* ROW: NAVIGATION & ORGANIZATION + LEAD GENERATION WORKFLOW + NOTIFICATION BOX */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {/* Navigation & Organization */}
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardSecondary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <CardContent>
                    <h2 className="text-lg font-semibold mb-2">
                      Navigation &amp; Organization
                    </h2>
                    <p className="text-sm text-gray-700">
                      Provide quick links or an overview of your site structure
                      here.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Lead Generation Workflow */}
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardPrimary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <CardContent>
                    <h2 className="text-lg font-semibold mb-2">
                      Lead Generation Workflow
                    </h2>
                    <p className="text-sm text-gray-700">
                      Outline or track your lead-gen funnel steps here.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notification Box */}
              <motion.div variants={itemVariants}>
                <Card
                  className={`p-6 ${COLORS.cardSecondary} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Bell size={20} className="text-red-600" />
                      <h2 className="text-lg font-semibold">Notification Box</h2>
                    </div>
                    <p className="text-sm text-gray-700">
                      Display recent alerts or system messages here.
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