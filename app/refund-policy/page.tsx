import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Dewori Skin refund and return policy.',
}

export default function RefundPolicyPage() {
  return (
    <div className="bg-midnight min-h-screen">
      <div className="container-base py-16 md:py-24 max-w-3xl">

        <span className="text-amber text-xs font-semibold tracking-widest uppercase">
          Legal
        </span>
        <h1 className="heading-display text-4xl md:text-5xl text-glow mt-3 mb-4">
          Refund Policy
        </h1>
        <p className="text-glow/50 mb-12">Last updated: June 23, 2026</p>

        <div className="space-y-10 text-glow/70 leading-relaxed">

          <section>
            <h2 className="heading-display text-xl text-glow mb-3">No Returns</h2>
            <p>
              Due to the nature of our products — skincare items that come into direct contact
              with skin — <strong className="text-glow">we do not accept returns under any
              circumstances.</strong> All sales are final. We are unable to resell opened or
              used skincare products, and for hygiene reasons we cannot accept items back once
              they have left our fulfillment center.
            </p>
          </section>

          <section>
            <h2 className="heading-display text-xl text-glow mb-3">Refunds</h2>
            <p className="mb-4">
              We do offer refunds in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your order arrives damaged or defective.</li>
              <li>You receive the wrong item.</li>
              <li>Your package is confirmed lost in transit by the carrier.</li>
            </ul>
            <p className="mt-4">
              If any of the above applies, please contact us within <strong className="text-glow">14 days
              of your delivery date</strong> (or 14 days from the estimated delivery date if the
              package is lost). We will review your claim and, if approved, issue a full refund
              to your original payment method within 5–10 business days.
            </p>
          </section>

          <section>
            <h2 className="heading-display text-xl text-glow mb-3">How to Request a Refund</h2>
            <p className="mb-4">
              To submit a refund request, email us at{' '}
              <a
                href="mailto:mattjwerts@gmail.com"
                className="text-amber hover:text-amber-light transition-colors underline underline-offset-2"
              >
                mattjwerts@gmail.com
              </a>{' '}
              with the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your order number.</li>
              <li>A brief description of the issue.</li>
              <li>A photo of the item if it arrived damaged or incorrect.</li>
            </ul>
            <p className="mt-4">
              We respond to all refund inquiries within 2 business days.
            </p>
          </section>

          <section>
            <h2 className="heading-display text-xl text-glow mb-3">Order Cancellations</h2>
            <p>
              Orders can be cancelled <strong className="text-glow">within 12 hours of
              purchase</strong> for a full refund, as long as the order has not yet been
              processed for fulfillment. After 12 hours, the order enters our fulfillment
              pipeline and cannot be cancelled. Please email us immediately at{' '}
              <a
                href="mailto:mattjwerts@gmail.com"
                className="text-amber hover:text-amber-light transition-colors underline underline-offset-2"
              >
                mattjwerts@gmail.com
              </a>{' '}
              if you need to cancel.
            </p>
          </section>

          <section>
            <h2 className="heading-display text-xl text-glow mb-3">Shipping Times</h2>
            <p>
              Our products ship from overseas suppliers with an estimated delivery time of
              3–7 business days. Shipping delays caused by customs, weather, or carrier
              issues are outside our control and do not qualify for a refund on their own.
              If your order has not arrived within 30 business days of your order date,
              please contact us and we will open an investigation with the carrier.
            </p>
          </section>

          <section>
            <h2 className="heading-display text-xl text-glow mb-3">Contact Us</h2>
            <p>
              Questions about this policy? Reach us anytime at{' '}
              <a
                href="mailto:mattjwerts@gmail.com"
                className="text-amber hover:text-amber-light transition-colors underline underline-offset-2"
              >
                mattjwerts@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
