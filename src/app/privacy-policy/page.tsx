
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
      
      <p>Voxa AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect personal information that you voluntarily provide to us, such as your name, email address, and contact details when you sign up for an account, contact us, or use our services.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, operate, and maintain our services.</li>
        <li>Improve, personalize, and expand our services.</li>
        <li>Understand and analyze how you use our services.</li>
        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the service, and for marketing and promotional purposes.</li>
        <li>Process your transactions.</li>
      </ul>

      <h2>3. Information Sharing and Disclosure</h2>
      <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

      <h2>4. Data Security</h2>
      <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

      <h2>5. Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

      <h2>6. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@voxa.ai">privacy@voxa.ai</a>.</p>
    </div>
  );
}