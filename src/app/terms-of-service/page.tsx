
export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 prose dark:prose-invert">
      <h1>Terms of Service</h1>
      <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

      <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Voxa AI website and services (the "Service") operated by Voxa AI ("us", "we", or "our").</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

      <h2>2. Accounts</h2>
      <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

      <h2>3. Intellectual Property</h2>
      <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Voxa AI and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

      <h2>4. Termination</h2>
      <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

      <h2>5. Limitation of Liability</h2>
      <p>In no event shall Voxa AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
      
      <h2>6. Governing Law</h2>
      <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is established, without regard to its conflict of law provisions.</p>

      <h2>7. Changes</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.</p>

      <h2>8. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@voxa.ai">legal@voxa.ai</a>.</p>
    </div>
  );
}