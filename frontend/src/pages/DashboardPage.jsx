import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { user, logout, fetchUser, forgotPassword } = useAuthStore();
  const navigate = useNavigate();
  // Set the default tab to the new Dashboard overview
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const handleDelete = () => {
    navigate("/delete-account");
  };

  const handleUpdatePassword = () => {
    forgotPassword(user.email);
    toast.success("Password Reset Link Sent!");
  };

  // Profile is now strictly at the end
  const sidebarItems = [
    "Dashboard",
    "Find Opportunities",
    "My History",
    "Enrolled Events",
    "Volunteer Guide",
    "Rewards",
    "Profile",
  ];

  // Dummy data for the new dashboard cards
  const upcomingEvents = [
    { id: 1, title: "Community Beach Cleanup", date: "Mar 15, 2026", location: "Sunnyvale Coast" },
    { id: 2, title: "Downtown Food Drive", date: "Mar 22, 2026", location: "City Center Plaza" },
  ];

  const recentActivity = [
    { id: 1, action: "Earned 50 points", detail: "Completed Park Restoration Project", date: "2 days ago" },
    { id: 2, action: "Registered for event", detail: "Community Beach Cleanup", date: "1 week ago" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-green-400">Welcome back, {user?.name || 'Volunteer'}!</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Rewards Summary Card */}
              <motion.div 
                className="col-span-1 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-yellow-500/30 shadow-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full z-0"></div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2 relative z-10">My Rewards</h3>
                <div className="mt-4 relative z-10">
                  <p className="text-gray-400 text-sm">Current Points</p>
                  <p className="text-4xl font-bold text-white mb-2">1,250</p>
                  <p className="text-sm text-green-400 font-medium">Gold Tier Member</p>
                </div>
              </motion.div>

              {/* Upcoming Events Card */}
              <motion.div 
                className="col-span-1 lg:col-span-2 p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 shadow-lg"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-green-400">Upcoming Events</h3>
                  <button onClick={() => setActiveTab("Enrolled Events")} className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors">View All</button>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex justify-between items-center p-3 bg-gray-900/50 rounded-md border border-gray-700/50 hover:border-green-500/30 transition-colors">
                      <div>
                        <h4 className="text-white font-medium">{event.title}</h4>
                        <p className="text-xs text-gray-400">{event.location}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm bg-green-500/20 text-green-300 px-3 py-1 rounded-full">{event.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity Card */}
            <motion.div 
              className="p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-green-400 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-700/50 last:border-0 last:pb-0">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.detail}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case "Find Opportunities":
        return (
          <motion.div key="find" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <h2 className="text-3xl font-bold mb-6 text-green-400">Find Opportunities</h2>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <p className="text-gray-300">Search filters and map interface will go here.</p>
            </div>
          </motion.div>
        );

      case "Volunteer Guide":
        return (
          <motion.div key="guide" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <h2 className="text-3xl font-bold mb-6 text-green-400">Volunteer Guide</h2>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <p className="text-gray-300">Onboarding materials, safety guidelines, and FAQs will go here.</p>
            </div>
          </motion.div>
        );

      // (Previous empty states for History, Rewards, Enrolled Events)
      case "My History":
        return (
          <motion.div key="history" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <h2 className="text-3xl font-bold mb-6 text-green-400">My History</h2>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <p className="text-gray-300">Your past volunteer events will appear here.</p>
            </div>
          </motion.div>
        );

      case "Rewards":
        return (
          <motion.div key="rewards-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <h2 className="text-3xl font-bold mb-6 text-green-400">Rewards Store</h2>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <p className="text-gray-300">Detailed breakdown of points and redeemable items will go here.</p>
            </div>
          </motion.div>
        );

      case "Enrolled Events":
        return (
          <motion.div key="events" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <h2 className="text-3xl font-bold mb-6 text-green-400">Enrolled Events</h2>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <p className="text-gray-300">You haven't enrolled in any new events yet.</p>
            </div>
          </motion.div>
        );

      case "Profile":
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
              User Profile
            </h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col w-full lg:w-2/3 space-y-4">
                <motion.div
                  className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl font-semibold text-green-400 mb-3">Profile Information</h3>
                  <p className="text-gray-300">Name: {user?.name}</p>
                  <p className="text-gray-300">Email: {user?.email}</p>
                </motion.div>

                <motion.div
                  className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-semibold text-green-400 mb-3">Payment Information</h3>
                  <p className="text-gray-300">No Card Added!</p>
                </motion.div>

                <motion.div
                  className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold text-green-400 mb-3">Account Activity</h3>
                  <p className="text-gray-300">
                    <span className="font-bold">Joined: </span>
                    {user?.createdAt && new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-bold">Last Login: </span>
                    {user?.lastLogin ? formatDate(user.lastLogin) : "N/A"}
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 w-full lg:w-1/3 flex flex-col items-center justify-start"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-center text-green-400 mb-6">Profile Avatar</h3>
                <img
                  src={user?.profile ? user.profile : "https://ui-avatars.com/api/?name=" + user?.name}
                  alt="Profile Picture"
                  className="rounded-full w-48 h-48 object-cover mb-4 border-4 border-green-500 transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleEdit} className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Update Info
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleUpdatePassword} className="w-full py-3 px-4 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Update Password
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDelete} className="w-full py-3 px-4 bg-red-700 text-white font-bold rounded-lg shadow-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Delete Account
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} className="w-full py-3 px-4 bg-rose-800 text-white font-bold rounded-lg shadow-lg hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Logout
              </motion.button>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shadow-2xl z-10"
      >
        <div className="p-6 flex-1 flex flex-col">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text mb-8">
            Volunteer Hub
          </h1>
          <nav className="space-y-2 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${
                  activeTab === item
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 border border-green-500/30"
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                } ${item === "Profile" ? "mt-auto block border-t border-gray-800 pt-4 rounded-none bg-transparent hover:bg-transparent" : ""}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 h-full">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardPage;