import Link from "next/link";
import {
  FaFire,
  FaChartBar,
  FaUsers,
  FaCalendarAlt,
  FaDumbbell,
  FaHeartbeat,
  FaUserCircle,
} from "react-icons/fa";

export default function HeroSection() {
  const cardData = [
    {
      icon: <FaFire className="h-12 w-12" />,
      title: "Personalized Workouts",
      description: "Tailored exercise plans to meet your fitness goals",
    },

    {
      icon: <FaHeartbeat className="h-12 w-12" />, // Example icon for the new card
      title: "Cardio Workouts",
      description: "Improve endurance with cardio exercises",
    },
    {
      icon: <FaDumbbell className="h-12 w-12" />, // Example icon for the new card
      title: "Strength Training",
      description: "Build muscle with customized strength workouts",
    },
  ];
  const testimonials = [
    {
      text: "HomeFit has completely changed my workout routine. I've never been fitter!",
      name: "Jane Doe",
      role: "Fitness Enthusiast",
    },
    {
      text: "The personalized workouts are amazing. It's like having a personal trainer at home!",
      name: "John Smith",
      role: "Busy Professional",
    },
    {
      text: "I love the community aspect. It keeps me motivated and accountable!",
      name: "Sarah Johnson",
      role: "Yoga Lover",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-300 bg-opacity-85 text-base-content">
      {/* Hero Section */}
      <div className="hero min-h-screen relative">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 bottom-0 right-0 left-0 w-full h-full object-cover opacity-80"
        >
          <source src="/videos/vid-1.mp4" type="video/mp4" />
        </video>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md md:max-w-screen-xl">
            <h1 className="text-5xl md:text-8xl font-ProtestGuerrilla text-white drop-shadow-2xl">
              Welcome to HomeFit
            </h1>
            <p className="mb-5 text-lg md:text-xl font-semibold md:w-4/6 mx-auto drop-shadow-xl font-Dosis text-white">
              Your personal home workout companion is here to guide you on your
              fitness journey, offering a variety of exercises tailored to your
              goals. Stay motivated, and achieve your health objectives with
              fun, effective workouts—all from the comfort of your own home!
            </p>
            <Link
              href="/workouts"
              className="btn btn-outline hover:bg-gray-800  text-xl text-white font-Dosis"
            >
              Start Working Out
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 border-t-[1px] border-gray-800 ">
        <h2 className="text-4xl md:text-5xl text-slate-800 tracking-wide font-Acme font-bold text-center py-5">
          Why Choose HomeFit?
        </h2>
        <hr className="border-gray-700 w-2/4 mx-auto opacity-30 py-1 mb-10" />

        <div className="flex flex-col container mx-auto md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 md:px-10">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="card-body bg-gray-800 rounded-xl items-center text-center text-white font-Dosis"
            >
              {card.icon}
              <h3 className="card-title md:text-lg">{card.title}</h3>
              <p className="md:text-base">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-base-200 py-20 bg-bgOne bg-fixed bg-top  bg-cover border-t-[1px] border-b-[1px] border-gray-800 ">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-5xl p-2 md:pt-1 text-slate-100 mx-auto w-10/12 md:w-8/12 rounded-t-2xl bg-black tracking-wide font-Acme font-bold text-center mt-3">
            Ready to Transform Your Body?
          </h2>
          <p className="mb-5 bg-black pb-1 rounded-b-2xl text-sm md:text-xl font-semibold w-5/6 md:w-4/6 mx-auto drop-shadow-2xl font-Dosis text-white">
            Join HomeFit today and start your journey to a healthier you!
          </p>
          <Link
            href="/auth/register"
            className="btn btn-outline btn-sm hover:bg-gray-800 text-xl text-white font-Dosis"
          >
            {" "}
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <h2 className="text-4xl md:text-5xl text-slate-800 tracking-wide font-Acme font-bold text-center  py-5">
          What Our Users Say
        </h2>
        <hr className="border-gray-700 w-2/4 mx-auto opacity-30 py-1 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p className="text-sm font-bold">{testimonial.text}</p>
                <div className="flex items-center mt-4">
                  <div className="avatar">
                    <FaUserCircle className="text-6xl text-gray-500 rounded-full shadow-gray-700 shadow-2xl sha" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xl mb-2 font-bold font-Acme text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
