
import {
  HeartHandshake,
  Search,
  Users,
  Sprout,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Discover Opportunities",
    description:
      "Find meaningful community events and discover opportunities to contribute to causes that matter.",
  },
  {
    icon: Users,
    title: "Connect with People",
    description:
      "Meet like-minded people, work together, and build stronger connections through community activities.",
  },
  {
    icon: Sprout,
    title: "Create Positive Impact",
    description:
      "Turn small actions into meaningful contributions and help create a better community for everyone.",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-white py-16 transition-colors duration-300 dark:bg-[#14182B] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#6477E8]/20 bg-[#E9EAFE] px-4 py-2 text-sm font-medium text-[#4F5FC4] dark:border-[#6477E8]/30 dark:bg-[#292E50] dark:text-[#AAB1FF]">
            <HeartHandshake size={16} />
            About GoodGather
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#252B42] dark:text-white sm:text-4xl lg:text-5xl">
            Building Stronger Communities,
            <span className="mt-2 block text-[#6477E8] dark:text-[#AAB1FF]">
              Together.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#737B91] dark:text-[#AAB1C8] sm:text-lg sm:leading-8">
            We believe meaningful change starts when people come together.
            GoodGather makes it easier to discover social development
            events, connect with others, and take action for a better future.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-[#E5E8F0] bg-[#F7F8FC] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6477E8]/40 hover:bg-white hover:shadow-xl hover:shadow-[#6477E8]/10 dark:border-[#343B59] dark:bg-[#1D2340] dark:hover:border-[#6477E8]/60 dark:hover:bg-[#252B49] sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9EAFE] text-[#6477E8] transition-colors group-hover:bg-[#6477E8] group-hover:text-white dark:bg-[#292E50] dark:text-[#AAB1FF] dark:group-hover:bg-[#6477E8] dark:group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#252B42] dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#737B91] dark:text-[#AAB1C8] sm:text-base">
                  {feature.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-[#6477E8] dark:text-[#AAB1FF]">
                  0{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
