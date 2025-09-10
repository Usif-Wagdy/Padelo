// src/pages/Privacy.jsx
import { Link } from "react-router-dom";

const EffectiveDate = "September 10, 2025"; // update as needed

export default function Privacy() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Effective date:</span> {EffectiveDate}
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            This Privacy Policy explains how <strong>Padelo</strong> (“we”,
            “our”, or “us”) collects, uses, shares, and protects your
            information when you use our website and services. By using Padelo,
            you agree to the practices described here.
          </p>
          <div className="mt-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-700 dark:text-gray-200">
            <p className="font-medium">Heads-up (not legal advice):</p>
            <p className="mt-1">
              This page is a professional template and starting point. Your
              final policy should be reviewed by counsel. Padelo’s governing law
              is Egypt.
            </p>
          </div>
        </div>

        {/* Summary */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            At a glance
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>
              • We collect account, booking, and limited payment metadata to
              operate Padelo.
            </li>
            <li>
              • Payments are processed by trusted third-party processors; we
              don’t store full card numbers.
            </li>
            <li>
              • We use cookies for authentication, preferences, and analytics.
            </li>
            <li>
              • We share booking details with the venue you choose, and with
              service providers under contract.
            </li>
            <li>
              • You can request access, correction, deletion, or objection as
              permitted by law.
            </li>
          </ul>
        </section>

        {/* What we collect */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Information we collect
          </h2>
          <div className="mt-3 grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                You provide to us
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  • Account: name, email, phone (optional), password (hashed).
                </li>
                <li>
                  • Bookings: venue, date/time, participants, preferences.
                </li>
                <li>
                  • Owner onboarding: venue details, schedules, pricing,
                  policies.
                </li>
                <li>• Support messages and feedback.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Collected automatically
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  • Device & usage: IP, device identifiers, browser, pages
                  viewed, referrers.
                </li>
                <li>
                  • Cookies & similar tech for auth, preferences, analytics.
                </li>
                <li>• Location (if enabled) to surface nearby courts.</li>
                <li>
                  • Payment metadata from processors (e.g., status, last 4
                  digits, transaction ID).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How we use it */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            How we use your information
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>
              • Provide and improve Padelo, including bookings, payments, and
              support.
            </li>
            <li>• Authenticate accounts and secure the platform.</li>
            <li>
              • Send confirmations, reminders, updates, and service notices.
            </li>
            <li>• Personalize content and recommendations.</li>
            <li>
              • Prevent fraud, enforce our Terms, and comply with legal
              obligations.
            </li>
            <li>• Analyze usage to improve performance and features.</li>
          </ul>
        </section>

        {/* Legal bases */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Legal bases
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            We process personal data when necessary to perform a contract (e.g.,
            your booking), with your consent (e.g., certain marketing), to
            comply with legal obligations, and for our legitimate interests
            (e.g., security, service improvement). Where Egypt’s applicable data
            protection law requires consent, we will request it.
          </p>
        </section>

        {/* Sharing */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            How we share information
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>
              • <span className="font-medium">Venues:</span> Relevant booking
              details to deliver your court time.
            </li>
            <li>
              • <span className="font-medium">Service providers:</span> Hosting,
              analytics, communications, and payments under contract.
            </li>
            <li>
              • <span className="font-medium">Legal & safety:</span> To comply
              with law or protect rights, safety, and property.
            </li>
            <li>
              • <span className="font-medium">Business transfers:</span> In
              connection with mergers, acquisitions, or asset sales.
            </li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Cookies & tracking
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            We use cookies and similar technologies for sign-in, preferences,
            analytics, and (where applicable) marketing. You can control cookies
            in your browser settings. Some features may not function without
            essential cookies.
          </p>
        </section>

        {/* Retention & Security */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Data retention & security
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            We keep data as long as necessary to provide services, resolve
            disputes, enforce agreements, and meet legal requirements. We
            implement administrative, technical, and physical safeguards;
            however, no system is 100% secure. Use strong, unique passwords and
            keep your credentials confidential.
          </p>
        </section>

        {/* Transfers */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            International transfers
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            If we transfer data internationally, we use appropriate safeguards
            required by applicable law (e.g., contractual protections) to
            protect your information.
          </p>
        </section>

        {/* Your rights */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Your choices & rights
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>
              • Access, correct, delete, or obtain a copy of your data, subject
              to legal limits.
            </li>
            <li>• Object to or restrict processing where permitted by law.</li>
            <li>• Withdraw consent where processing is based on consent.</li>
            <li>
              • Manage cookies via your browser and in-app settings (where
              available).
            </li>
          </ul>
          <p className="mt-3 text-gray-700 dark:text-gray-200">
            To make a request, contact{" "}
            <a
              className="text-[#009c85] hover:underline"
              href="mailto:padeloteamcs@gmail.com"
            >
              padeloteamcs@gmail.com
            </a>
            . We may ask you to verify your identity.
          </p>
        </section>

        {/* Children */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Children’s privacy
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            Padelo is not directed to children under the age required by local
            law. We do not knowingly collect personal data from children without
            appropriate consent where required.
          </p>
        </section>

        {/* Changes & Contact */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Changes & contact
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            We may update this Policy from time to time. Material changes will
            be communicated via the site or email. Continued use of Padelo after
            updates means you accept the revised Policy.
          </p>
          <div className="mt-3 text-gray-700 dark:text-gray-200">
            <div>
              Questions or requests? Email{" "}
              <a
                className="text-[#009c85] hover:underline"
                href="mailto:padeloteamcs@gmail.com"
              >
                padeloteamcs@gmail.com
              </a>
              .
            </div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Governing law: Egypt.
            </div>
          </div>
        </section>

        {/* Footer links */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:underline">
            Terms of Service
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
