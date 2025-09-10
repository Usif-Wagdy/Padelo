// src/pages/Support.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// --- Mock FAQ data (edit freely) ---
const FAQS = [
  // Players
  {
    id: "p1",
    audience: "players",
    category: "Bookings",
    q: "How do I make a booking?",
    a: "Search for a venue, choose a time slot, and complete checkout. You’ll get an instant confirmation and a receipt in your account.",
  },
  {
    id: "p2",
    audience: "players",
    category: "Cancellations",
    q: "Can I cancel or reschedule my booking?",
    a: "It depends on the venue policy shown at checkout. If eligible, open your booking and use the Cancel or Reschedule action.",
  },
  {
    id: "p3",
    audience: "players",
    category: "Payments",
    q: "How are payments processed?",
    a: "Payments are handled securely by our payment partner. We don’t store full card details—only limited metadata needed for receipts.",
  },
  // Owners
  {
    id: "o1",
    audience: "owners",
    category: "Owner Onboarding",
    q: "How do I list my courts on Padelo?",
    a: "Apply via the Owner signup. After verification, you can set schedules, pricing, and policies. Your courts will appear in search.",
  },
  {
    id: "o2",
    audience: "owners",
    category: "Payouts",
    q: "How do payouts work?",
    a: "Payouts are sent through our payment partner to your bank account based on your configured payout schedule.",
  },
  {
    id: "o3",
    audience: "owners",
    category: "Policies",
    q: "Can I set my own cancellation policy?",
    a: "Yes. You can customize cancellation windows and fees in your dashboard. Changes take effect immediately.",
  },
  // General
  {
    id: "g1",
    audience: "general",
    category: "Account",
    q: "How do I delete my account?",
    a: "Go to Account → Settings → Delete Account. You can also email privacy@padeloteamcs@gmail.com for assistance where required by law.",
  },
  {
    id: "g2",
    audience: "general",
    category: "Weather",
    q: "What happens if it rains?",
    a: "Venues will communicate options according to their posted policy (refund, credit, or reschedule). You’ll get an update via email/app.",
  },
];

const AUDIENCE = [
  { key: "all", label: "All" },
  { key: "players", label: "Players" },
  { key: "owners", label: "Owners" },
];

const CATEGORIES = [
  "All",
  "Bookings",
  "Cancellations",
  "Payments",
  "Owner Onboarding",
  "Payouts",
  "Policies",
  "Account",
  "Weather",
];

export default function Support() {
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState("all");
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((item) => {
      const audienceOk = audience === "all" ? true : item.audience === audience;
      const categoryOk = category === "All" ? true : item.category === category;
      const text = (item.q + " " + item.a).toLowerCase();
      const queryOk = q ? text.includes(q) : true;
      return audienceOk && categoryOk && queryOk;
    });
  }, [query, audience, category]);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Support
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Find quick answers or contact us. We’re here to help players and
            venue owners.
          </p>

          {/* Search */}
          <div className="mt-4">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <div className="relative">
              <input
                id="faq-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keywords: booking, refunds, payouts…"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-10 py-2 outline-none focus:ring-2 focus:ring-[#009c85]"
              />
              {/* Search icon */}
              <span className="pointer-events-none absolute left-3 top-2.5 inline-block h-5 w-5 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" d="M21 21l-4.35-4.35" />
                  <circle strokeWidth="2" cx="11" cy="11" r="7" />
                </svg>
              </span>
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-100 dark:bg-gray-900">
              {AUDIENCE.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setAudience(a.key)}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    audience === a.key
                      ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${
                    category === c
                      ? "bg-[#009c85] text-white border-[#009c85]"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </h2>
          </div>

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filtered.length === 0 ? (
              <li className="p-6 text-sm text-gray-600 dark:text-gray-300">
                No results. Try different keywords or contact support.
              </li>
            ) : (
              filtered.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full text-left p-6 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                      aria-expanded={isOpen}
                      aria-controls={`answer-${item.id}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {item.audience} • {item.category}
                          </div>
                          <h3 className="mt-1 font-medium text-gray-900 dark:text-gray-100">
                            {item.q}
                          </h3>
                        </div>
                        <span
                          className={`mt-1 inline-block transform transition ${
                            isOpen ? "rotate-180" : "rotate-0"
                          } text-gray-500 dark:text-gray-400`}
                          aria-hidden="true"
                        >
                          ▼
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        id={`answer-${item.id}`}
                        className="px-6 pb-6 -mt-3 text-gray-700 dark:text-gray-200"
                      >
                        <p>{item.a}</p>
                      </div>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {/* Contact / CTA Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Still need help?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Our team is available{" "}
            <span className="font-medium">Mon–Fri, 9:00–18:00 (Egypt)</span>.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="mailto:padeloteamcs@gmail.com?subject=Padelo%20Support%20Request"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-[#009c85] hover:bg-[#007e6d] transition"
            >
              Email us
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <span className="mx-2">·</span>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
