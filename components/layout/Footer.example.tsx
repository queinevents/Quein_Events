import { Footer } from './Footer';

/**
 * Footer Component Examples
 * 
 * The Footer component displays company information, contact details,
 * social media links, and copyright notice at the bottom of the page.
 */

export default function FooterExamples() {
  return (
    <div className="space-y-8">
      {/* Basic Usage */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-text-primary">Basic Footer</h2>
        <Footer />
      </div>

      {/* With Custom Styling */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-text-primary">Footer with Custom Class</h2>
        <Footer className="border-t-4 border-primary-purple" />
      </div>
    </div>
  );
}
