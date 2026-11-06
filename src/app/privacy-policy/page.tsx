import React from 'react';
import PolicyLayout from '@/components/PolicyLayout';

export const metadata = {
  title: 'Privacy Policy | SUNCITY PALLETS LIQUIDATION STORE LLC',
  description: 'Privacy Policy for Suncity Pallets Liquidation Store LLC.',
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="SUNCITY PALLETS LIQUIDATION STORE LLC — Transparency in Data Protection & Commercial Operations."
    >
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-xs">
          <p>
            <strong>Legal Entity:</strong> SUNCITY PALLETS LIQUIDATION STORE LLC<br />
            <strong>Entity Registry No:</strong> 0806021894 | Incorporated in the United States<br />
            <strong>Commercial Facility:</strong> 328 Thomas Pl, Everman, TX 76140, USA<br />
            <strong>Official Website:</strong> https://www.suncitypalletsliquidation.com
          </p>
        </div>

        <p>
          At <strong>SUNCITY PALLETS LIQUIDATION STORE LLC</strong>, one of our main priorities is the privacy of our visitors and wholesale partners. This Privacy Policy document contains types of information that is collected and recorded by SUNCITY PALLETS LIQUIDATION STORE LLC and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our legal and customer support department.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          1. Consent
        </h3>
        <p>
          By using our Website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          2. Information We Collect
        </h3>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400">
          <li><strong>Wholesale Account & Order Information:</strong> Contact details including full name, business or DBA name, email address, commercial telephone number, destination shipping address, and delivery capability details.</li>
          <li><strong>Freight & Delivery Information:</strong> Loading dock availability, forklift access, and carrier liftgate scheduling requirements.</li>
          <li><strong>Direct Communications:</strong> When you contact us via email, phone, or WhatsApp, we may receive additional information such as message contents and attachments.</li>
        </ul>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          3. How We Use Your Information
        </h3>
        <p>
          We use the collected information in various ways, including to:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400">
          <li>Provide, operate, and maintain our wholesale liquidation storefront.</li>
          <li>Process pallet purchases, freight bookings, Bill of Lading (BOL) generation, and warehouse loading schedules.</li>
          <li>Communicate with you for customer support, order updates, and logistics delivery notifications.</li>
          <li>Send new truckload arrival alerts and seasonal liquidation drops.</li>
          <li>Prevent fraudulent transactions and protect wholesale buyers.</li>
        </ul>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          4. Security of Data
        </h3>
        <p>
          We employ industry-standard encryption protocols (including 256-bit SSL technology) across our checkout and serverless infrastructure (Cloudflare D1 edge database). Payment data is handled through compliant processing gateways to safeguard your sensitive business information.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          5. Contact Information
        </h3>
        <p>
          For any questions regarding our privacy practices or data handling:
        </p>
        <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs space-y-1 font-mono">
          <div>SUNCITY PALLETS LIQUIDATION STORE LLC</div>
          <div>328 Thomas Pl, Everman, TX 76140, USA</div>
          <div>Email: info@suncitypalletsliquidation.com</div>
          <div>WhatsApp / Phone: +1 (817) 330-9020</div>
        </div>
      </div>
    </PolicyLayout>
  );
}
