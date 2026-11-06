import React from 'react';
import PolicyLayout from '@/components/PolicyLayout';

export const metadata = {
  title: 'Terms of Use | SUNCITY PALLETS LIQUIDATION STORE LLC',
  description: 'Terms and conditions governing the purchase of wholesale liquidation merchandise.',
};

export default function TermsOfUsePage() {
  return (
    <PolicyLayout
      title="Terms of Use"
      subtitle="Terms & Conditions of Commercial Use for SUNCITY PALLETS LIQUIDATION STORE LLC."
    >
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <p>
          Welcome to <strong>SUNCITY PALLETS LIQUIDATION STORE LLC</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). SUNCITY PALLETS LIQUIDATION STORE LLC is a Limited Liability Company incorporated in the United States with registry number 0806021894. Our principal commercial facility is situated at 328 Thomas Pl, Everman, TX 76140, USA.
        </p>

        <p>
          These Terms of Use govern your access to and use of our wholesale ecommerce platform, including any pallet purchases, truckload contracts, or freight dispatch services offered through the website.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          1. Eligibility and Accounts
        </h3>
        <p>
          This Website is intended solely for businesses, wholesale buyers, independent resellers, and individuals who are at least 18 years of age. By creating an order or checking out, you represent that you meet these eligibility requirements. You are responsible for maintaining the confidentiality of your account credentials and order details.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          2. Wholesale Nature of Merchandise
        </h3>
        <p>
          All buyers acknowledge that goods sold through SUNCITY PALLETS LIQUIDATION STORE LLC constitute liquidation merchandise, including customer returns, shelf pulls, excess inventory, and closeout overstock derived from major retail distributors. While manifests provide accurate itemized projections, liquidation goods are sold in wholesale lots subject to customary industry tolerances.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          3. Freight & Receiving Responsibilities
        </h3>
        <p>
          Wholesale pallets are heavy industrial freight (typically 300 to 1,200 lbs per pallet). Buyers must ensure their destination facility has adequate receiving capability:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
          <li><strong>Commercial Docks:</strong> Destination must accommodate standard 53-foot semi-truck trailers with dock or forklift.</li>
          <li><strong>Residential / Liftgate:</strong> If no dock is present, Liftgate service must be selected at checkout so the carrier dispatches a truck with hydraulic ground-lowering equipment.</li>
          <li><strong>Storage & Redelivery:</strong> Any carrier redelivery fees resulting from buyer unavailability or incorrect addresses are the responsibility of the purchaser.</li>
        </ul>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          4. Registered Trademark Protection
        </h3>
        <p>
          SUNCITY PALLETS LIQUIDATION is a federally registered service mark (Reg. No. 0,806,021,894 / RN # 6717534) on the Principal Register of the United States Patent and Trademark Office (USPTO), covering Class 35 (Freight liquidation of goods of others, and retail store services featuring secondary products). All trademarks, logos, and digital manifest formats belong strictly to the Company and its licensors.
        </p>

        <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
          5. Governing Law & Jurisdiction
        </h3>
        <p>
          These Terms are governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be instituted exclusively in the state or federal courts situated in Tarrant County, Texas.
        </p>
      </div>
    </PolicyLayout>
  );
}
