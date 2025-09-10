// src/pages/Terms.jsx
import { Link } from "react-router-dom";

const EffectiveDate = "September 10, 2025"; // update as needed

export default function Terms() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Effective date:</span> {EffectiveDate}
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            These Terms of Service (“Terms”) govern your access to and use of{" "}
            <strong>Padelo</strong> (the “Service”). By using the Service, you
            agree to these Terms.
          </p>
          <div className="mt-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-700 dark:text-gray-200">
            <p className="font-medium">Note (not legal advice):</p>
            <p className="mt-1">
              This page is a professional template and starting point. Customize
              with your counsel. Governing law: Egypt.
            </p>
          </div>
        </div>

        {/* 1. Accounts */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            1. Accounts & Eligibility
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>
              • You must be the legal age of majority in your jurisdiction to
              use Padelo.
            </li>
            <li>
              • Provide accurate information and keep your credentials secure.
            </li>
            <li>• You are responsible for all activity under your account.</li>
          </ul>
        </section>

        {/* 2. Bookings & Payments */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            2. Bookings & Payments
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>
              • When you book a court, you enter a direct service relationship
              with the venue/owner.
            </li>
            <li>
              • Padelo facilitates discovery, reservation, and payment as a
              platform/agent.
            </li>
            <li>
              • Prices, taxes, and fees are shown before checkout. You authorize
              our payment partner to charge your method.
            </li>
            <li>
              • A booking is confirmed when you receive an in-app or email
              confirmation.
            </li>
          </ul>
        </section>

        {/* 3. Cancellations & Changes */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            3. Cancellations, Changes & Refunds
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>
              • Cancellation/rescheduling windows and fees are set by each venue
              and displayed at checkout.
            </li>
            <li>
              • Some bookings may be non-refundable. Weather or venue changes
              will be communicated promptly.
            </li>
            <li>
              • Refunds/credits follow the posted venue policy and applicable
              law.
            </li>
          </ul>
        </section>

        {/* 4. Responsibilities */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            4. Responsibilities
          </h2>
          <div className="mt-3 grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Players
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  • Arrive on time and follow venue rules and safety
                  instructions.
                </li>
                <li>
                  • Use equipment responsibly and respect staff and other
                  players.
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Owners
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  • Maintain accurate schedules, pricing, and availability.
                </li>
                <li>
                  • Honor confirmed bookings and provide safe, maintained
                  facilities.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Reviews & Content */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            5. Reviews & User Content
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            You may submit ratings, reviews, photos, or other content that
            reflects your genuine experience. You agree not to post unlawful,
            harassing, or infringing content. You grant Padelo a non-exclusive,
            worldwide, royalty-free license to use, host, reproduce, and display
            such content for operating and promoting the Service.
          </p>
        </section>

        {/* 6. Prohibited Activities */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            6. Prohibited Activities
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>• Fraud, payment abuse, or deceptive conduct.</li>
            <li>
              • Scraping, reverse engineering, or interfering with the Service.
            </li>
            <li>
              • Violating venue rules or others’ rights, including IP and
              privacy.
            </li>
          </ul>
        </section>

        {/* 7. Ownership & License */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            7. Ownership & License
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            Padelo, including software, logos, and content, is owned by Padelo
            or its licensors and protected by intellectual property laws.
            Subject to these Terms, we grant you a limited, non-exclusive,
            non-transferable license to use the Service for its intended
            purpose.
          </p>
        </section>

        {/* 8. Third-Party Services */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            8. Third-Party Services
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            The Service may link to or integrate with third-party services
            (e.g., payments, maps). We do not control and are not responsible
            for their content or practices.
          </p>
        </section>

        {/* 9. Disclaimers & Limitation */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            9. Disclaimers & Limitation of Liability
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <li>
              • The Service is provided “AS IS” and “AS AVAILABLE” to the
              fullest extent permitted by law.
            </li>
            <li>
              • Padelo is not liable for indirect, incidental, special, or
              consequential damages, or lost profits.
            </li>
            <li>
              • To the extent permitted by law, Padelo’s aggregate liability
              shall not exceed the amount you paid to Padelo in the last 12
              months, or $100, whichever is greater.
            </li>
          </ul>
        </section>

        {/* 10. Indemnification */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            10. Indemnification
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            You agree to indemnify and hold harmless Padelo and its affiliates
            from claims, damages, liabilities, and expenses arising out of your
            misuse of the Service, violation of these Terms, or infringement of
            rights.
          </p>
        </section>

        {/* 11. Termination */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            11. Suspension & Termination
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            We may suspend or terminate access for violations of these Terms,
            suspected fraud, or to protect users. You may stop using the Service
            at any time. Some obligations survive termination (e.g., payment
            obligations, licenses to reviews).
          </p>
        </section>

        {/* 12. Governing Law & Disputes */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            12. Governing Law & Dispute Resolution
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            These Terms are governed by the laws of <strong>Egypt</strong>,
            without regard to conflict of laws principles. Disputes shall be
            resolved in the competent courts of Egypt, unless mandatory consumer
            protection laws provide otherwise.
          </p>
        </section>

        {/* 13. Changes */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            13. Changes to These Terms
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            We may modify these Terms from time to time. Material changes will
            be communicated via the site or email. Your continued use after
            updates constitutes acceptance of the revised Terms.
          </p>
        </section>

        {/* 14. Contact */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            14. Contact
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            Questions about these Terms? Email{" "}
            <a
              className="text-[#009c85] hover:underline"
              href="mailto:padeloteamcs@gmail.com"
            >
              padeloteamcs@gmail.com
            </a>
            .
          </p>
        </section>

        {/* Footer links */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <span className="mx-2">·</span>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
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
