// app/page.tsx
import Link from "next/link";
import {
  FireIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-base-300 text-base-content">
      {/* Hero Section */}
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(https://placeimg.com/1000/800/arch)" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to FitFlex</h1>
            <p className="mb-5">
              Your personal home workout companion. Get fit, stay healthy, and
              have fun - all from the comfort of your home!
            </p>
            <Link href="/workouts" className="btn btn-primary">
              Start Working Out
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          Why Choose FitFlex?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FireIcon className="h-12 w-12 text-primary" />
              <h3 className="card-title">Personalized Workouts</h3>
              <p>Tailored exercise plans to meet your fitness goals</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <ChartBarIcon className="h-12 w-12 text-primary" />
              <h3 className="card-title">Track Progress</h3>
              <p>Monitor your fitness journey with detailed analytics</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <UserGroupIcon className="h-12 w-12 text-primary" />
              <h3 className="card-title">Community Support</h3>
              <p>Join a community of fitness enthusiasts</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <CalendarIcon className="h-12 w-12 text-primary" />
              <h3 className="card-title">Flexible Scheduling</h3>
              <p>Work out on your own time, at your own pace</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-base-200 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Body?
          </h2>
          <p className="mb-8 text-xl">
            Join FitFlex today and start your journey to a healthier you!
          </p>
          <Link href="/signup" className="btn btn-primary btn-lg">
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>
                "FitFlex has completely changed my workout routine. I've never
                been fitter!"
              </p>
              <div className="flex items-center mt-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://placeimg.com/80/80/people" alt="User" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-bold">Jane Doe</p>
                  <p className="text-sm">Fitness Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>
                "The personalized workouts are amazing. It's like having a
                personal trainer at home!"
              </p>
              <div className="flex items-center mt-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://placeimg.com/80/80/people" alt="User" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-bold">John Smith</p>
                  <p className="text-sm">Busy Professional</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>
                "I love the community aspect. It keeps me motivated and
                accountable!"
              </p>
              <div className="flex items-center mt-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://placeimg.com/80/80/people" alt="User" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-bold">Sarah Johnson</p>
                  <p className="text-sm">Yoga Lover</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
