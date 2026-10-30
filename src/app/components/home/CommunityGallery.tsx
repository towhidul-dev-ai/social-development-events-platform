
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85",
    alt: "Volunteers working together in a community",
    title: "Community Volunteering",
    category: "Volunteering",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
    alt: "Green trees in a natural environment",
    title: "A Greener Future",
    category: "Environment",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85",
    alt: "Volunteers helping with food donations",
    title: "Sharing Kindness",
    category: "Donation",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=85",
    alt: "People participating in a community activity",
    title: "Together We Grow",
    category: "Community",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85",
    alt: "Friends spending time together outdoors",
    title: "Building Connections",
    category: "Connection",
    className: "",
  },
];

export default function CommunityGallery() {
  return (
    <section className="bg-[#F7F8FC] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#6477E8]/20 bg-[#E9EAFE] px-4 py-2 text-sm font-medium text-[#4F5FC4]">
            <Images size={16} />
            Our Community Gallery
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#252B42] sm:text-4xl lg:text-5xl">
            Moments That
            <span className="block text-[#6477E8]">
              Make a Difference
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#737B91] sm:text-lg sm:leading-8">
            Explore moments of kindness, teamwork, and positive change
            created by people working together in their communities.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[220px] lg:mt-16 lg:gap-5">

          {galleryImages.map((item) => (
            <div
              key={item.title}
              className={`group relative min-h-[240px] overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm sm:min-h-[260px] md:min-h-0 ${item.className}`}
            >
              {/* Gallery Image */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171B30]/80 via-[#171B30]/10 to-transparent" />

              {/* Image Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {item.category}
                </span>

                <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}

        </div>

        {/* Explore Button */}
        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition-all hover:-translate-y-0.5 hover:bg-[#5367D5]"
          >
            Explore Community Events
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
