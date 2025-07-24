import React from "react";
import { Users, BarChart2, Settings } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    { type: "login", user: "Habiba", time: "10 min ago" },
    { type: "newItem", item: "Dashboard Widget", time: "1 hour ago" },
    { type: "settingsUpdate", time: "2 hours ago" },
  ];

  const renderMessage = (activity) => {
    switch (activity.type) {
      case "login":
        return `${activity.user} logged in.`;
      case "newItem":
        return `New item "${activity.item}" added.`;
      case "settingsUpdate":
        return `Settings have been updated.`;
      default:
        return "";
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Recent Activity</h3>
        <a
          href="#"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View All
        </a>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <ul className="space-y-4">
          {activities.map((activity, i) => (
            <li
              key={i}
              className="flex items-center border-b dark:border-gray-700 pb-2 last:border-b-0 last:pb-0"
            >
              <div
                className={`p-2 rounded-full ${
                  activity.type === "login"
                    ? "bg-green-100 dark:bg-green-700"
                    : activity.type === "newItem"
                    ? "bg-blue-100 dark:bg-blue-700"
                    : "bg-yellow-100 dark:bg-yellow-700"
                }`}
              >
                {activity.type === "login" && (
                  <Users
                    size={18}
                    className="text-green-600 dark:text-green-300"
                  />
                )}
                {activity.type === "newItem" && (
                  <BarChart2
                    size={18}
                    className="text-blue-600 dark:text-blue-300"
                  />
                )}
                {activity.type === "settingsUpdate" && (
                  <Settings
                    size={18}
                    className="text-yellow-600 dark:text-yellow-300"
                  />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{renderMessage(activity)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
