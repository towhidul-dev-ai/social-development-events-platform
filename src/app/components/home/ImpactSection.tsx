
import Link from "next/link";
import {
  HeartHandshake,
  Leaf,
  HandHeart,
  Users,
  ArrowRight,
} from "lucide-react";

const impactAreas = [
  {
    icon: Leaf,
    title: "Protect Our Environment",
    description:
      "Take part in tree plantation, neighborhood cleaning, and other environmental activities.",
  },
  {
    icon: HandHeart,
    title: "Support Those in Need",
    description:
      "Join donation drives and community support initiatives that help people in need.",
  },
  {
    icon: Users,
    title: "Build Stronger Communities",
    description:
      "Connect with volunteers, share ideas, and work together to create positive social change.",
  },
];

export default function ImpactSection() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#6477E8]/20 bg-[#E9EAFE] px-4 py-2 text-sm font-medium text-[#4F5FC4]">
            <HeartHandshake size={16} />
            Make Your Impact
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#252B42] sm:text-4xl lg:text-5xl">
            Together We Can
            <span className="block text-[#6477E8]">
              Create Real Change
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#737B91] sm:text-lg sm:leading-8">
            Every small contribution matters. Discover opportunities to
            support meaningful causes and make a difference in your community.
          </p>
        </div>

        {/* Impact Content */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-14">

          {/* Left Image */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-[#E9EAFE] blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-[#E5E8F0] bg-[#F7F8FC] p-2 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=85"
                alt="Community volunteers working together"
                className="h-[280px] w-full rounded-2xl object-cover sm:h-[380px] lg:h-[460px]"
              />
            </div>

            <div className="absolute -bottom-5 right-3 flex items-center gap-3 rounded-2xl border border-[#E5E8F0] bg-white p-3 shadow-lg sm:bottom-6 sm:-right-5 sm:p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EAFE] text-[#6477E8]">
                <HeartHandshake size={23} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#252B42]">
                  Stronger Together
                </p>
                <p className="text-xs text-[#737B91]">
                  Every contribution matters
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="pt-4 lg:pt-0">
            <h3 className="text-2xl font-bold leading-snug text-[#252B42] sm:text-3xl">
              Be the Reason
              <span className="text-[#6477E8]"> Someone Smiles.</span>
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#737B91] sm:text-base">
              Positive change begins with people who care. Whether you
              volunteer your time, support a local initiative, or help
              organize an event, your participation can inspire others.
            </p>

            {/* Impact Areas */}
            <div className="mt-8 space-y-6">
              {impactAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div key={area.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E9EAFE] text-[#6477E8]">
                      <Icon size={23} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#252B42]">
                        {area.title}
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-[#737B91]">
                        {area.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="/events"
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition-all hover:-translate-y-0.5 hover:bg-[#5367D5]"
            >
              Start Making an Impact
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
