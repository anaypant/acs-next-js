"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bell,
  ChevronDown,
  LineChart,
  Menu,
  Search,
  Settings,
  Zap,
  Phone,
  Briefcase,
  Package,
  MoreHorizontal,
  Grid,
  ArrowUp,
  User,
  LayoutGrid,
} from "lucide-react"

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState("March 2022")
  const [activeTab, setActiveTab] = useState("App")
  const [darkMode, setDarkMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [refreshDataEnabled, setRefreshDataEnabled] = useState(false)
  const currentYear = new Date().getFullYear()

  // State for collapsible sections
  const [sectionsOpen, setSectionsOpen] = useState({
    keyWidgets: true,
    dataVisualization: true,
    navigation: true,
    functionalities: true,
  })

  // State for notification badges
  const [notifications, setNotifications] = useState({
    newLeads: true,
    followUps: false,
    recentUpdates: false,
  })

  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  const toggleNotificationsEnabled = () => {
    setNotificationsEnabled((prev) => !prev)
  }

  const toggleRefreshDataEnabled = () => {
    setRefreshDataEnabled((prev) => !prev)
  }

  const months = [
    "January 2022",
    "February 2022",
    "March 2022",
    "April 2022",
    "May 2022",
    "June 2022",
    "July 2022",
    "August 2022",
    "September 2022",
    "October 2022",
    "November 2022",
    "December 2022",
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check on initial load

    return () => window.removeEventListener("resize", handleResize)
  }, [sidebarOpen])

  // Animation for charts
  useEffect(() => {
    const animateCharts = () => {
      // Line chart animation
      const lineChartPaths = document.querySelectorAll(".line-chart-path")
      lineChartPaths.forEach((path) => {
        const pathElement = path as SVGPathElement
        const length = pathElement.getTotalLength()
        pathElement.style.strokeDasharray = `${length}`
        pathElement.style.strokeDashoffset = `${length}`
        pathElement.style.animation = "dash 1.5s ease-in-out forwards"
      })

      // Pie chart animation
      const pieChartPaths = document.querySelectorAll(".pie-chart-path")
      pieChartPaths.forEach((path, i) => {
        const pathElement = path as SVGPathElement
        pathElement.style.opacity = "0"
        pathElement.style.animation = `fadeIn 0.5s ease-in-out ${i * 0.2}s forwards`
      })

      // Bar chart animation
      const barElements = document.querySelectorAll(".bar-chart-bar")
      barElements.forEach((bar, i) => {
        const barElement = bar as HTMLElement
        barElement.style.animation = `growBar 1s ease-out ${i * 0.1}s forwards`
      })
    }

    // Run animation after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      animateCharts()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`flex min-h-screen w-full overflow-hidden ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 flex flex-col bg-[#1e4d36] dark:bg-[#0e2a1c] transition-all duration-300 overflow-y-auto ${
          sidebarOpen ? "w-[180px]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-2 font-semibold text-white">
            <span className="text-xl">ACS</span>
            <span className="text-xl">DASHBOARD</span>
          </div>
        </div>
        <div className="flex flex-col px-2 py-2 h-[calc(100vh-3.5rem-4rem)]">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-[#2a5a42]/50 pl-8 text-white placeholder:text-white/50 border-[#2a5a42] rounded-md h-9 focus:outline-none"
            />
          </div>
          <div className="space-y-1 overflow-y-auto flex-grow">
            <div
              className="flex items-center justify-between py-2 text-white cursor-pointer hover:bg-[#2a5a42]/50 rounded-md px-2 transition-colors"
              onClick={() => toggleSection("keyWidgets")}
            >
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span className="text-sm font-medium">Key Widgets</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${sectionsOpen.keyWidgets ? "rotate-180" : ""}`}
              />
            </div>
            {sectionsOpen.keyWidgets && (
              <div className="pl-7 space-y-1 animate-in slide-in-from-top-5 duration-300">
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Sales Dashboard</span>
                </div>
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Analytics Overview</span>
                </div>
              </div>
            )}
            <div
              className="flex items-center justify-between py-2 text-white cursor-pointer hover:bg-[#2a5a42]/50 rounded-md px-2 transition-colors"
              onClick={() => toggleSection("dataVisualization")}
            >
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                <span className="text-sm font-medium">Data Visualization</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  sectionsOpen.dataVisualization ? "rotate-180" : ""
                }`}
              />
            </div>
            {sectionsOpen.dataVisualization && (
              <div className="pl-7 space-y-1 animate-in slide-in-from-top-5 duration-300">
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Sales Analytics</span>
                </div>
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Revenue Analytics</span>
                </div>
              </div>
            )}
            <div
              className="flex items-center justify-between py-2 text-white cursor-pointer hover:bg-[#2a5a42]/50 rounded-md px-2 transition-colors"
              onClick={() => toggleSection("navigation")}
            >
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                <span className="text-sm font-medium">Navigation</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${sectionsOpen.navigation ? "rotate-180" : ""}`}
              />
            </div>
            {sectionsOpen.navigation && (
              <div className="pl-7 space-y-1 animate-in slide-in-from-top-5 duration-300">
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Expert Value Analysis</span>
                </div>
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Lead Conversion Product</span>
                </div>
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Lead Generation Workflow</span>
                </div>
              </div>
            )}
            <div
              className="flex items-center justify-between py-2 text-white cursor-pointer hover:bg-[#2a5a42]/50 rounded-md px-2 transition-colors"
              onClick={() => toggleSection("functionalities")}
            >
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span className="text-sm font-medium">Functionalities</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  sectionsOpen.functionalities ? "rotate-180" : ""
                }`}
              />
            </div>
            {sectionsOpen.functionalities && (
              <div className="pl-7 space-y-1 animate-in slide-in-from-top-5 duration-300">
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Google Ads Integration</span>
                </div>
                <div className="flex items-center py-1 text-white/70 hover:text-white cursor-pointer">
                  <span className="text-xs">• Customizable Settings</span>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-1 mt-auto">
            <div className="flex items-center justify-between py-2 text-white">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span className="text-sm font-medium">Settings</span>
              </div>
            </div>
            <div className="pl-7 space-y-2">
              <div className="flex items-center justify-between py-1 text-white/70">
                <span className="text-xs">Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-4 w-8 items-center rounded-full ${darkMode ? "bg-white/70" : "bg-white/30"}`}
                >
                  <span
                    className={`absolute h-3 w-3 rounded-full bg-white transform transition-transform ${
                      darkMode ? "translate-x-4" : "translate-x-1"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex items-center justify-between py-1 text-white/70">
                <span className="text-xs">Notifications</span>
                <button
                  onClick={toggleNotificationsEnabled}
                  className={`relative inline-flex h-4 w-8 items-center rounded-full ${notificationsEnabled ? "bg-white/70" : "bg-white/30"}`}
                >
                  <span
                    className={`absolute h-3 w-3 rounded-full bg-white transform transition-transform ${
                      notificationsEnabled ? "translate-x-4" : "translate-x-1"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex items-center justify-between py-1 text-white/70">
                <span className="text-xs">Refresh Data</span>
                <button
                  onClick={toggleRefreshDataEnabled}
                  className={`relative inline-flex h-4 w-8 items-center rounded-full ${refreshDataEnabled ? "bg-white/70" : "bg-white/30"}`}
                >
                  <span
                    className={`absolute h-3 w-3 rounded-full bg-white transform transition-transform ${
                      refreshDataEnabled ? "translate-x-4" : "translate-x-1"
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto p-4 border-t border-[#2a5a42]">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[#2a5a42]">
              <User className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Mr. Avinash</div>
              <div className="text-xs text-white/70">Last active 3h ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${sidebarOpen ? "ml-[180px]" : "ml-0"}`}>
        <main className={`flex-1 ${darkMode ? "bg-[#0e2a1c]" : "bg-[#f5f9f7]"} min-w-0 overflow-x-auto flex-grow`}>
          <div className="p-6 space-y-6 min-w-[320px]">
            {/* Add a button to toggle sidebar when it's closed */}
            {!sidebarOpen && (
              <button
                className="fixed top-4 left-4 z-50 bg-[#2a5a42] text-white rounded-md p-2 hover:bg-[#1e4d36]"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            {/* Top Section with Welcome and Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Welcome Section */}
              <div className="col-span-1 md:col-span-8">
                <h1
                  className={`text-4xl font-bold ${darkMode ? "text-white" : "text-[#1e4d36]"} border-b ${darkMode ? "border-white/20" : "border-[#1e4d36]/20"} pb-2`}
                >
                  Welcome back Natalia!
                </h1>
                <h2 className={`text-3xl font-medium ${darkMode ? "text-white" : "text-[#1e4d36]"} mt-2`}>
                  Check Dashboard
                </h2>
                <p className={`text-lg ${darkMode ? "text-white/80" : "text-[#1e4d36]"} mt-1`}>
                  You have earned 54% more than last month which is a great thing
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="bg-[#1e4d36] text-white px-4 py-2 rounded-md text-xl font-semibold">$63,489.50</div>
                  <div className="bg-[#1e4d36] text-white px-4 py-2 rounded-md">Year {currentYear}</div>
                </div>
              </div>

              {/* Top Right Metrics */}
              <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-6">
                {/* Total Number of Sales */}
                <div className="bg-[#1e4d36] text-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Total Number of Sales</h3>
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold mt-1">592</div>
                  <div className="h-2 w-full bg-white/20 rounded-full mt-2">
                    <div className="h-2 w-[65%] bg-white rounded-full"></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="bg-white text-[#1e4d36] text-xs px-2 py-0.5 rounded-full">65%</span>
                  </div>
                </div>

                {/* Earnings */}
                <div className={`${darkMode ? "bg-[#1e4d36]/80" : "bg-white"} rounded-lg p-4`}>
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>Earnings</h3>
                  </div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>$678,298</div>
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <ArrowUp className="h-3 w-3" />
                    <span>+9% Growth</span>
                  </div>
                  <div className="flex items-end justify-between h-[80px] mt-2">
                    {[40, 60, 50, 70, 65, 75, 70, 80, 75, 85, 90, 85].map((height, i) => (
                      <div
                        key={i}
                        className="w-[5px] bg-green-500 rounded-full bar-chart-bar"
                        style={{
                          height: `${height}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-12 gap-6">
              {/* Average Price & Total Turnover */}
              <div className={`col-span-12 md:col-span-8 ${darkMode ? "bg-[#1e4d36]/80" : "bg-white"} rounded-lg p-4`}>
                <div className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                      Average Price & Total Turnover
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}>Overview of Profit</p>
                  </div>
                  <div className="relative">
                    <button
                      className={`flex items-center gap-2 text-xs border ${darkMode ? "border-white/30 text-white" : "border-gray-300 text-[#1e4d36]"} rounded-md px-2 py-1`}
                    >
                      {selectedMonth}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className={`text-xs ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>New Pricing Trends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#1e4d36]"></div>
                    <span className={`text-xs ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                      Financial Performance
                    </span>
                  </div>
                </div>
                <div className="h-[200px] w-full relative">
                  <div className={`absolute left-0 top-0 text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}>
                    4k
                  </div>
                  <div
                    className={`absolute left-0 top-[33%] text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    3k
                  </div>
                  <div
                    className={`absolute left-0 top-[66%] text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    2k
                  </div>
                  <div
                    className={`absolute left-0 bottom-0 text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    1k
                  </div>
                  <div
                    className={`absolute left-0 bottom-0 text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    0
                  </div>

                  <div
                    className={`absolute bottom-0 left-[10%] text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    16/04
                  </div>
                  <div
                    className={`absolute bottom-0 left-[25%] text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    17/05
                  </div>
                  <div
                    className={`absolute bottom-0 left-[40%] text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    18/06
                  </div>
                  <div
                    className={`absolute bottom-0 left-[55%] text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    19/07
                  </div>
                  <div
                    className={`absolute bottom-0 left-[70%] text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    20/08
                  </div>
                  <div
                    className={`absolute bottom-0 left-[85%] text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    21/09
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}
                  >
                    22/10
                  </div>

                  <svg className="h-full w-full" viewBox="0 0 800 200">
                    {/* Grid lines */}
                    <line x1="0" y1="0" x2="800" y2="0" stroke={darkMode ? "#ffffff30" : "#e5e7eb"} strokeWidth="1" />
                    <line x1="0" y1="50" x2="800" y2="50" stroke={darkMode ? "#ffffff30" : "#e5e7eb"} strokeWidth="1" />
                    <line
                      x1="0"
                      y1="100"
                      x2="800"
                      y2="100"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="150"
                      x2="800"
                      y2="150"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="200"
                      x2="800"
                      y2="200"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />

                    <line x1="80" y1="0" x2="80" y2="200" stroke={darkMode ? "#ffffff30" : "#e5e7eb"} strokeWidth="1" />
                    <line
                      x1="200"
                      y1="0"
                      x2="200"
                      y2="200"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />
                    <line
                      x1="320"
                      y1="0"
                      x2="320"
                      y2="200"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />
                    <line
                      x1="440"
                      y1="0"
                      x2="440"
                      y2="200"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />
                    <line
                      x1="560"
                      y1="0"
                      x2="560"
                      y2="200"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />
                    <line
                      x1="680"
                      y1="0"
                      x2="680"
                      y2="200"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />
                    <line
                      x1="800"
                      y1="0"
                      x2="800"
                      y2="200"
                      stroke={darkMode ? "#ffffff30" : "#e5e7eb"}
                      strokeWidth="1"
                    />

                    {/* Financial Performance Line */}
                    <path
                      d="M0,150 C80,120 160,100 240,80 C320,60 400,100 480,120 C560,140 640,60 720,40 L800,60"
                      fill="none"
                      stroke="#1e4d36"
                      strokeWidth="2"
                      className="line-chart-path"
                    />

                    {/* New Pricing Trends Line */}
                    <path
                      d="M0,180 C80,160 160,140 240,160 C320,180 400,100 480,140 C560,180 640,140 720,120 L800,100"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      className="line-chart-path"
                    />
                  </svg>
                </div>
              </div>

              {/* Total Products & Customers */}
              <div className="col-span-12 md:col-span-4 bg-[#1e4d36] text-white rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 space-y-2 sm:space-y-0">
                  <h3 className="text-lg font-medium">Total Products & Customers</h3>
                  <p className="text-sm text-white/70">Inventory Track</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-r border-white/20 pr-4">
                    <div className="text-base md:text-lg font-medium">Total Products</div>
                    <div className="text-4xl font-bold">343</div>
                    <div className="text-2xl font-medium text-green-400">201</div>
                    <div className="text-lg">187</div>
                  </div>
                  <div>
                    <div className="text-base md:text-lg font-medium">Total Customers</div>
                    <div className="text-4xl font-bold">3201</div>
                    <div className="text-2xl font-medium text-green-400">2010</div>
                    <div className="text-lg">1432</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="rounded-full w-2 h-2 p-0 bg-white"></div>
                  <div className="rounded-full w-2 h-2 p-0 bg-white/50"></div>
                  <div className="rounded-full w-2 h-2 p-0 bg-white/50"></div>
                </div>
              </div>
            </div>

            {/* Lower Middle Section */}
            <div className="grid grid-cols-12 gap-6">
              {/* Recent Conversations & Lead Interactions */}
              <div className="col-span-12 md:col-span-4 bg-[#1e4d36] text-white rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 space-y-2 sm:space-y-0">
                  <h3 className="text-lg font-medium">Recent Conversations & Lead Interactions</h3>
                  <p className="text-sm text-white/70">Client Discussions Position</p>
                </div>
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <div className="text-sm">09:46</div>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm">Calls Scheduled</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">09:46</div>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm">Minutes of recent conversation</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">12:22</div>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm">New Lead Interactions</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">12:22</div>
                    <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                    <div className="text-sm">Minutes of new lead interaction</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">09:46</div>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm">Project meeting</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">09:46</div>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm">Minutes of project meeting</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">09:46</div>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm">
                      New sale recorded <span className="text-blue-400 cursor-pointer hover:underline">#ML-3467</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">09:46</div>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm">Minutes of project meeting</div>
                  </div>
                </div>
              </div>

              {/* Revenue Analytics */}
              <div className={`col-span-12 md:col-span-8 ${darkMode ? "bg-[#1e4d36]/80" : "bg-white"} rounded-lg p-4`}>
                <div className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                      Revenue Analytics
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}>
                      Revenue Trends Daily, Weekly and Monthly
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      className={`flex items-center gap-2 text-xs border ${darkMode ? "border-white/30 text-white" : "border-gray-300 text-[#1e4d36]"} rounded-md px-2 py-1`}
                    >
                      {selectedMonth}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {[
                    { name: "App", icon: <Grid className="h-5 w-5" /> },
                    { name: "Mobile", icon: <Phone className="h-5 w-5" /> },
                    { name: "SaaS", icon: <Briefcase className="h-5 w-5" /> },
                    { name: "Products", icon: <Package className="h-5 w-5" /> },
                    { name: "Others", icon: <MoreHorizontal className="h-5 w-5" /> },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className={`flex flex-col items-center justify-center p-2 h-auto gap-1 rounded-md ${
                        activeTab === item.name
                          ? "bg-[#1e4d36] text-white"
                          : darkMode
                            ? "bg-[#2a5a42]/30 text-white border border-[#2a5a42]"
                            : "bg-green-50 text-[#1e4d36] border border-green-100"
                      }`}
                      onClick={() => setActiveTab(item.name)}
                    >
                      {item.icon}
                      <span className="text-xs">{item.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between mb-6 border-b pb-2 gap-1">
                  {["Revenue Trends", "Progress", "Priority", "Budget", "Chart"].map((item, i) => (
                    <button
                      key={i}
                      className={`text-xs sm:text-sm font-medium p-1 h-auto ${darkMode ? "text-white" : "text-[#1e4d36]"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                  <div className="col-span-1 md:col-span-7">
                    <div className="space-y-6">
                      {[
                        {
                          period: "Daily",
                          company: "COMPANY NAME",
                          percentage: "73.2%",
                          level: "Low",
                          value: "$3.5k",
                          chart: (
                            <svg className="w-16 h-8" viewBox="0 0 100 30">
                              <path
                                d="M0,15 L10,10 L20,20 L30,5 L40,15 L50,10 L60,20 L70,15 L80,5 L90,10 L100,15"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2"
                              />
                            </svg>
                          ),
                        },
                        {
                          period: "Weekly",
                          company: "COMPANY NAME",
                          percentage: "56.8%",
                          level: "Medium",
                          value: "$3.5k",
                          chart: (
                            <svg className="w-16 h-8" viewBox="0 0 100 30">
                              <path
                                d="M0,20 L10,15 L20,10 L30,15 L40,5 L50,15 L60,10 L70,15 L80,20 L90,15 L100,10"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                              />
                            </svg>
                          ),
                        },
                        {
                          period: "Monthly",
                          company: "COMPANY NAME",
                          percentage: "25%",
                          level: "Very high",
                          value: "$3.5k",
                          chart: (
                            <svg className="w-16 h-8" viewBox="0 0 100 30">
                              <path
                                d="M0,15 L10,20 L20,15 L30,10 L40,15 L50,5 L60,10 L70,15 L80,20 L90,15 L100,10"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2"
                              />
                            </svg>
                          ),
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 py-2 border-b ${darkMode ? "border-[#2a5a42]" : "border-gray-100"}`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-8 w-8 ${darkMode ? "bg-[#2a5a42]" : "bg-gray-200"} rounded-md overflow-hidden relative flex-shrink-0`}
                            >
                              <LayoutGrid
                                className={`h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${darkMode ? "text-white/70" : "text-gray-500"}`}
                              />
                            </div>
                            <div>
                              <div
                                className={`text-sm font-medium truncate ${darkMode ? "text-white" : "text-[#1e4d36]"}`}
                              >
                                {item.period}
                              </div>
                              <div className={`text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"} truncate`}>
                                {item.company}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full sm:w-auto gap-2">
                            <div className={`text-sm font-medium ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                              {item.percentage}
                            </div>
                            <div className="text-sm font-medium">
                              <span
                                className={
                                  item.level === "Low"
                                    ? "text-green-500"
                                    : item.level === "Medium"
                                      ? "text-yellow-500"
                                      : "text-red-500"
                                }
                              >
                                {item.level}
                              </span>
                            </div>
                            <div className={`text-sm font-medium ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                              {item.value}
                            </div>
                            <div className="w-16">{item.chart}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-5">
                    <div className={`text-lg font-medium mb-2 ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                      Sales Analytics
                    </div>
                    <div className="relative h-[150px] w-[150px] mx-auto">
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <circle cx="50" cy="50" r="40" fill="#1e4d36" className="pie-chart-path" />
                        <path d="M50,50 L50,10 A40,40 0 0,1 85,65 Z" fill="#10b981" className="pie-chart-path" />
                      </svg>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className={`text-sm ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                        <span className="font-medium">Category 1:</span> 48.2% in lorem ipsum
                      </div>
                      <div className={`text-sm ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                        <span className="font-medium">Category 2:</span> 31.8% in lorem ipsum
                      </div>
                      <div className={`text-sm ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                        <span className="font-medium">Category 3:</span> 12% in lorem ipsum
                      </div>
                      <div className={`text-sm ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                        <span className="font-medium">Category 4:</span> 6% in lorem ipsum
                      </div>
                      <div className={`text-sm ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                        <span className="font-medium">Category 5:</span> 2% in lorem ipsum
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Bottom Row - 3 equal columns */}
              <div className="col-span-1 md:col-span-4">
                <div className="grid grid-rows-2 gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1e4d36] text-white rounded-lg p-4">
                      <div className="text-base md:text-lg font-medium">Clicks</div>
                      <div className="text-xl md:text-2xl font-bold">24.5K</div>
                      <div className="text-xs md:text-sm text-white/70">+15.5% vs last week</div>
                    </div>
                    <div className="bg-[#1e4d36] text-white rounded-lg p-4">
                      <div className="text-base md:text-lg font-medium">Impressions</div>
                      <div className="text-xl md:text-2xl font-bold">125.8K</div>
                      <div className="text-xs md:text-sm text-white/70">+18.2% vs last week</div>
                    </div>
                  </div>

                  <div className={`${darkMode ? "bg-[#2a5a42]/30" : "bg-green-100"} rounded-lg p-4`}>
                    <div className={`text-lg font-medium ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                      Campaign Distribution
                    </div>
                    <div className="h-[150px] w-full flex items-center justify-center">
                      <div className="relative h-[100px] w-[100px]">
                        <svg viewBox="0 0 100 100" className="h-full w-full">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#1e4d36"
                            strokeWidth="20"
                            strokeDasharray="75 175"
                            className="pie-chart-path"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="20"
                            strokeDasharray="25 175"
                            strokeDashoffset="-75"
                            className="pie-chart-path"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Box */}
              <div className={`col-span-12 md:col-span-4 ${darkMode ? "bg-[#1e4d36]/80" : "bg-white"} rounded-lg p-4`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 space-y-2 sm:space-y-0">
                  <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>
                    Notification Box
                  </h3>
                  <div className={`text-sm ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}>16 Apr, 2022</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2 sm:gap-0">
                  <div>
                    <div className={`text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}>Due Date</div>
                    <div className={`text-sm ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>Oct 23, 2022</div>
                  </div>
                  <div>
                    <div className={`text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}>Recent Activity</div>
                    <div className={`text-sm ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>28th October, 2024</div>
                  </div>
                  <div>
                    <div className={`text-xs ${darkMode ? "text-white/70" : "text-[#1e4d36]/70"}`}>Last Activity</div>
                    <div className={`text-sm ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>16th September, 2022</div>
                  </div>
                </div>

                <div className={`border-t border-b py-4 my-4 ${darkMode ? "border-[#2a5a42]" : "border-gray-200"}`}>
                  <div className={`text-sm mb-2 ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>Notification on</div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`cursor-pointer transition-colors px-2 py-1 rounded-md text-xs ${
                        notifications.newLeads
                          ? "bg-blue-600 text-white"
                          : darkMode
                            ? "bg-transparent text-blue-400 border border-blue-400"
                            : "bg-transparent text-blue-600 border border-blue-600"
                      }`}
                      onClick={() => toggleNotification("newLeads")}
                    >
                      New Leads
                    </span>
                    <span
                      className={`cursor-pointer transition-colors px-2 py-1 rounded-md text-xs ${
                        notifications.followUps
                          ? "bg-green-600 text-white"
                          : darkMode
                            ? "bg-transparent text-green-400 border border-green-400"
                            : "bg-transparent text-green-500 border border-green-500"
                      }`}
                      onClick={() => toggleNotification("followUps")}
                    >
                      Follow-ups
                    </span>
                    <span
                      className={`cursor-pointer transition-colors px-2 py-1 rounded-md text-xs ${
                        notifications.recentUpdates
                          ? "bg-orange-600 text-white"
                          : darkMode
                            ? "bg-transparent text-orange-400 border border-orange-400"
                            : "bg-transparent text-orange-500 border border-orange-500"
                      }`}
                      onClick={() => toggleNotification("recentUpdates")}
                    >
                      Recent Updates
                    </span>
                  </div>
                </div>

                <div>
                  <div className={`text-sm mb-2 ${darkMode ? "text-white" : "text-[#1e4d36]"}`}>Leaders</div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="relative h-8 w-8 rounded-full border-2 border-white overflow-hidden cursor-pointer hover:scale-110 transition-transform"
                      >
                        <User className="h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation & Organization */}
              <div className="col-span-12 md:col-span-4 bg-[#1e4d36] text-white rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 space-y-2 sm:space-y-0">
                  <h3 className="text-lg font-medium">Navigation & Organization</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <button className="bg-white text-[#1e4d36] px-3 py-2 text-sm rounded-md inline-block hover:bg-white/90 w-full sm:w-auto text-left">
                      Lead Conversion Product (LCP)
                    </button>
                    <div className="text-sm mt-2">
                      Lorem ipsum: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                      lorem ipsum lorem ipsum
                    </div>
                  </div>

                  <div>
                    <button className="bg-white text-[#1e4d36] px-3 py-2 text-sm rounded-md inline-block hover:bg-white/90 w-full sm:w-auto text-left">
                      Expected Value (EV) Analysis
                    </button>
                    <div className="text-sm mt-2">
                      Lorem ipsum: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                      lorem ipsum lorem ipsum
                    </div>
                  </div>

                  <div>
                    <button className="bg-white text-[#1e4d36] px-3 py-2 text-sm rounded-md inline-block hover:bg-white/90 w-full sm:w-auto text-left">
                      Lead Generation Workflow (LGW)
                    </button>
                    <div className="text-sm mt-2">
                      Lorem ipsum: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                      lorem ipsum lorem ipsum
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes growBar {
          from {
            height: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard

