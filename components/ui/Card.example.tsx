import Card from "./Card";

/**
 * Card Component Examples
 * 
 * Demonstrates various use cases of the Card component
 */

export default function CardExamples() {
  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Card Component Examples
          </h2>
        </div>

        {/* Basic Card */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Basic Card
          </h3>
          <div className="max-w-md">
            <Card
              title="Basic Card"
              description="This is a basic card with just a title and description. It demonstrates the minimal usage of the Card component."
            />
          </div>
        </div>

        {/* Card with Icon */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Card with Icon
          </h3>
          <div className="max-w-md">
            <Card
              icon="/icons/exhibition.svg"
              title="Card with Icon"
              description="This card includes an icon displayed at the top. The icon can be a string path or a React component."
            />
          </div>
        </div>

        {/* Card with Features */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Card with Features List
          </h3>
          <div className="max-w-md">
            <Card
              title="Card with Features"
              description="This card includes a list of features displayed with checkmark icons."
              features={[
                "Feature one with detailed description",
                "Feature two highlighting key benefits",
                "Feature three showing capabilities",
                "Feature four demonstrating value",
              ]}
            />
          </div>
        </div>

        {/* Complete Card */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Complete Card (Icon + Features)
          </h3>
          <div className="max-w-md">
            <Card
              icon="/icons/wedding.svg"
              title="Exhibitions & Conferences"
              description="From trade shows to product launches and corporate conferences, we deliver impactful experiences that engage your audience and elevate your brand."
              features={[
                "Trade shows and exhibitions",
                "Product launches",
                "Corporate conferences",
                "B2B networking events",
              ]}
            />
          </div>
        </div>

        {/* Grid of Cards */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Card Grid Layout
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              icon="/icons/exhibition.svg"
              title="Exhibitions"
              description="Professional exhibition management for trade shows and corporate events."
              features={[
                "Trade shows",
                "Product launches",
                "Corporate events",
              ]}
            />
            <Card
              icon="/icons/wedding.svg"
              title="Weddings"
              description="Luxury wedding planning and execution services tailored to your vision."
              features={[
                "Luxury weddings",
                "Cultural ceremonies",
                "Intimate gatherings",
              ]}
            />
            <Card
              icon="/icons/management.svg"
              title="Event Management"
              description="End-to-end event management from concept to execution."
              features={[
                "Full-service planning",
                "Vendor coordination",
                "On-day execution",
              ]}
            />
          </div>
        </div>

        {/* Card without Hover Effect */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Card without Hover Effect
          </h3>
          <div className="max-w-md">
            <Card
              variant="default"
              title="Static Card"
              description="This card uses the 'default' variant which doesn't have hover effects. Useful for non-interactive content."
            />
          </div>
        </div>

        {/* Card with React Icon */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Card with React Icon Component
          </h3>
          <div className="max-w-md">
            <Card
              icon={
                <svg
                  className="w-6 h-6 text-primary-purple"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              }
              title="Custom Icon Component"
              description="This card demonstrates using a React component as the icon instead of an image path."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
