import { CounterAnimation } from './CounterAnimation';

/**
 * Example usage of CounterAnimation component
 * 
 * This file demonstrates various use cases for the CounterAnimation component
 * including different configurations for statistics, metrics, and counters.
 */

export function CounterAnimationExamples() {
  return (
    <div className="space-y-12 p-8">
      {/* Example 1: Basic counter with suffix */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Counter with Suffix</h2>
        <div className="text-6xl font-bold text-purple-600">
          <CounterAnimation targetValue={2000} suffix="+" />
        </div>
        <p className="text-gray-600 mt-2">Events Completed</p>
      </section>

      {/* Example 2: Counter with prefix (currency) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Counter with Prefix</h2>
        <div className="text-6xl font-bold text-green-600">
          <CounterAnimation targetValue={500} prefix="$" suffix="K" />
        </div>
        <p className="text-gray-600 mt-2">Revenue Generated</p>
      </section>

      {/* Example 3: Counter with decimals */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Counter with Decimals</h2>
        <div className="text-6xl font-bold text-blue-600">
          <CounterAnimation targetValue={4.8} decimals={1} suffix="/5" />
        </div>
        <p className="text-gray-600 mt-2">Average Rating</p>
      </section>

      {/* Example 4: Fast animation */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Fast Animation (1.5s)</h2>
        <div className="text-6xl font-bold text-orange-600">
          <CounterAnimation targetValue={150} duration={1500} suffix="+" />
        </div>
        <p className="text-gray-600 mt-2">Team Members</p>
      </section>

      {/* Example 5: Slow animation */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Slow Animation (3s)</h2>
        <div className="text-6xl font-bold text-red-600">
          <CounterAnimation targetValue={15} duration={3000} suffix=" Years" />
        </div>
        <p className="text-gray-600 mt-2">Years of Experience</p>
      </section>

      {/* Example 6: Different easing functions */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Different Easing Functions</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-4xl font-bold text-purple-600">
              <CounterAnimation targetValue={100} easing="linear" />
            </div>
            <p className="text-gray-600 mt-2">Linear Easing</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600">
              <CounterAnimation targetValue={100} easing="easeOut" />
            </div>
            <p className="text-gray-600 mt-2">Ease Out</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600">
              <CounterAnimation targetValue={100} easing="easeInOut" />
            </div>
            <p className="text-gray-600 mt-2">Ease In Out</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600">
              <CounterAnimation targetValue={100} easing="easeOutExpo" />
            </div>
            <p className="text-gray-600 mt-2">Ease Out Expo (Default)</p>
          </div>
        </div>
      </section>

      {/* Example 7: Statistics Section Use Case */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Statistics Section Example</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-900 p-8 rounded-lg">
          <div className="text-center">
            <div className="text-6xl font-bold text-purple-400 mb-2">
              <CounterAnimation targetValue={15} suffix="+" duration={2000} />
            </div>
            <p className="text-gray-300">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-400 mb-2">
              <CounterAnimation targetValue={2000} suffix="+" duration={2500} />
            </div>
            <p className="text-gray-300">Events Completed</p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-gold-400 mb-2">
              <CounterAnimation targetValue={200} suffix="+" duration={2000} />
            </div>
            <p className="text-gray-300">Happy Clients</p>
          </div>
        </div>
      </section>

      {/* Example 8: Percentage counter */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Percentage Counter</h2>
        <div className="text-6xl font-bold text-green-600">
          <CounterAnimation targetValue={98} suffix="%" />
        </div>
        <p className="text-gray-600 mt-2">Client Satisfaction Rate</p>
      </section>

      {/* Example 9: Large numbers */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Large Numbers</h2>
        <div className="text-6xl font-bold text-indigo-600">
          <CounterAnimation targetValue={1000000} suffix="+" />
        </div>
        <p className="text-gray-600 mt-2">Total Attendees</p>
      </section>

      {/* Example 10: Custom styling */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Styling</h2>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-lg text-center">
          <CounterAnimation
            targetValue={500}
            suffix="+"
            className="text-7xl font-black text-white drop-shadow-lg"
          />
          <p className="text-white mt-4 text-xl">Successful Projects</p>
        </div>
      </section>
    </div>
  );
}

// Usage in a page or component:
// import { CounterAnimationExamples } from '@/components/animations/CounterAnimation.example';
// 
// export default function ExamplesPage() {
//   return <CounterAnimationExamples />;
// }
