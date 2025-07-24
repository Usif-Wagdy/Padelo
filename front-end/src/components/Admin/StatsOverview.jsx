import React from "react";

export default function StatsOverview() {
  const stats = [
    { title: "Users Online", value: "1,234", change: "+5%", type: "positive" },
    {
      title: "Sales Today",
      value: "$5,678",
      change: "+2.1%",
      type: "positive",
    },
    { title: "Pending Tasks", value: "12", change: "-3", type: "negative" },
  ];

  return (
    <section className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Statistics Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </h4>
            <p className="text-3xl font-bold my-2">{stat.value}</p>
            <p
              className={`text-sm ${
                stat.type === "positive" ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
