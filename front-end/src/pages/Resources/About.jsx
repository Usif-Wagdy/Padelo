// src/pages/About.jsx
import { Link } from "react-router-dom";

const features = [
  {
    title: "Real-time availability",
    desc: "See open slots instantly and book in a few taps.",
  },
  {
    title: "Secure payments",
    desc: "Trusted payment partners. Digital receipts for every booking.",
  },
  {
    title: "Flexible policies",
    desc: "Venue-controlled cancellations and rescheduling windows.",
  },
  {
    title: "Ratings & reviews",
    desc: "Community feedback to help you choose the best court.",
  },
  {
    title: "Owner dashboard",
    desc: "Schedules, pricing, policies, and payouts in one place.",
  },
  {
    title: "Analytics",
    desc: "Insights on utilization, revenue, and demand patterns.",
  },
];

const steps = [
  {
    step: "1",
    title: "Discover",
    desc: "Search courts by location, date, and time.",
  },
  {
    step: "2",
    title: "Book",
    desc: "Pick a slot, pay securely, and get instant confirmation.",
  },
  {
    step: "3",
    title: "Play",
    desc: "Follow venue check-in instructions and enjoy your match.",
  },
  {
    step: "4",
    title: "Review",
    desc: "Rate your experience to help other players and venues.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="w-full max-w-5xl space-y-6">
        {/* Hero / Intro */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            About <span className="text-[#009c85]">Padelo</span>
          </h1>
          <p className="mt-3 text-gray-700 dark:text-gray-200">
            Padelo is a padel court discovery and reservation platform that
            connects players with quality venues and helps court owners grow
            their business. We make booking seamless, transparent, and
            secure—for spontaneous matches and planned leagues alike.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-[#009c85] hover:bg-[#007e6d] transition"
            >
              Explore courts
            </Link>
            <Link
              to="/owners/apply"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              List your court
            </Link>
          </div>
        </div>

        {/* For Players / For Owners */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              For Players
            </h2>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
              <li>• Search, compare, and book courts in real time</li>
              <li>• Secure checkout and instant confirmation</li>
              <li>• Manage bookings, invite friends, and get reminders</li>
              <li>• Ratings & reviews to guide your choices</li>
            </ul>
            <div className="mt-4">
              <Link
                to="/support"
                className="text-sm text-[#009c85] hover:underline"
              >
                Need help? Visit Support →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              For Court Owners
            </h2>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
              <li>• List courts with schedules, pricing, and policies</li>
              <li>• Accept online payments and manage cancellations</li>
              <li>• Access analytics on utilization and revenue</li>
              <li>• Build trust with verified profiles and reviews</li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              <Link
                to="/owners/apply"
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-white bg-[#009c85] hover:bg-[#007e6d] transition"
              >
                Become a partner
              </Link>
              <a
                href="mailto:padeloteamcs@gmail.com?subject=Padelo%20Owner%20Partnership"
                className="text-sm text-[#009c85] hover:underline"
              >
                Contact sales
              </a>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Key features
          </h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {f.title}
                </div>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            How Padelo works
          </h2>
          <ol className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <li
                key={s.step}
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="text-[#009c85] font-semibold">{s.step}</div>
                <div className="mt-1 font-medium text-gray-900 dark:text-gray-100">
                  {s.title}
                </div>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Trust & Safety */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Trust & safety
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>• Verified venue partners and transparent policies</li>
            <li>• Secure payments via trusted processors</li>
            <li>• Account protection and fraud monitoring</li>
            <li>
              • Responsive support:{" "}
              <a
                className="text-[#009c85] hover:underline"
                href="mailto:padeloteamcs@gmail.com"
              >
                padeloteamcs@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Footer links */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:underline">
            Terms of Service (Governing Law: Egypt)
          </Link>
          <span className="mx-2">·</span>
          <Link to="/support" className="hover:underline">
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
