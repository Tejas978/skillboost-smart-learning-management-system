import React from "react";
import { BookOpen, Lock, DollarSign, Headphones, Users } from "lucide-react";

function Logos() {
  const features = [
    {
      icon: BookOpen,
      text: "20k+ Online Courses",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Lock,
      text: "Lifetime Access",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: DollarSign,
      text: "Value for Money",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Headphones,
      text: "24/7 Expert Support",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      text: "Strong Community",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <section
      className="
        w-full
        px-4 sm:px-6 lg:px-8
        py-10 sm:py-12 lg:py-8
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-6">
          <h2 className="text-5xl lg:text-6xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Everything you need to learn effectively, grow confidently, and succeed faster.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  group relative rounded-3xl p-8
                  bg-white
                  border border-gray-100
                  shadow-lg shadow-gray-200/50
                  transition-all duration-500 ease-out
                  hover:-translate-y-2
                  hover:shadow-2xl hover:shadow-gray-300/50
                  hover:border-gray-200
                  cursor-pointer
                  overflow-hidden
                "
              >
                {/* Animated gradient background */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-br ${feature.color}
                    opacity-0 group-hover:opacity-[0.08]
                    transition-all duration-500
                    scale-150 group-hover:scale-100
                  `}
                />

                {/* Decorative circle */}
                <div
                  className={`
                    absolute -top-12 -right-12 w-32 h-32 rounded-full
                    bg-gradient-to-br ${feature.color}
                    opacity-0 group-hover:opacity-10
                    transition-all duration-700
                    blur-2xl
                  `}
                />

                <div className="relative flex flex-col items-center text-center gap-5">
                  {/* Icon */}
                  <div className="relative">
                    <div
                      className={`
                        w-16 h-16 rounded-2xl
                        bg-gradient-to-br ${feature.color}
                        flex items-center justify-center
                        shadow-lg
                        transition-all duration-500
                        group-hover:scale-110
                        group-hover:rotate-6
                        group-hover:shadow-xl
                      `}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Glow ring */}
                    <div
                      className={`
                        absolute inset-0 rounded-2xl
                        bg-gradient-to-br ${feature.color}
                        opacity-0 group-hover:opacity-20
                        scale-100 group-hover:scale-125
                        transition-all duration-700
                        blur-md
                      `}
                    />
                  </div>

                  {/* Text */}
                  <span className="text-sm font-semibold text-gray-800 tracking-wide">
                    {feature.text}
                  </span>

                  {/* Bottom accent */}
                  <div
                    className={`
                      w-0 group-hover:w-12 h-1 rounded-full
                      bg-gradient-to-r ${feature.color}
                      transition-all duration-500
                      mx-auto
                    `}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Logos;
