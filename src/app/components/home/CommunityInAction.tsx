
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";

const pastEvents = [
  {
    id: 1,
    title: "Winter Clothes Drive",
    category: "COMMUNITY SUPPORT",
    location: "Chattogram, Bangladesh",
    date: "January 15, 2026",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    title: "Community Food Relief",
    category: "FOOD DISTRIBUTION",
    location: "Dhaka, Bangladesh",
    date: "February 08, 2026",
    image:
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    title: "Neighborhood Clean-up",
    category: "ENVIRONMENT",
    location: "Chattogram, Bangladesh",
    date: "March 12, 2026",
    image:
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    title: "Tree Plantation Drive",
    category: "GREEN INITIATIVE",
    location: "Sylhet, Bangladesh",
    date: "April 05, 2026",
    image:
      "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    title: "Children's Book & Bag Drive",
    category: "EDUCATION",
    location: "Dhaka, Bangladesh",
    date: "May 18, 2026",
    image:
     "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    title: "Community Volunteer Day",
    category: "VOLUNTEER ACTIVITY",
    location: "Chattogram, Bangladesh",
    date: "June 22, 2026",
    image:
      "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=85",
  },
];

export default function CommunityInAction() {
  return (
    <section className="bg-[#F7F8FC] px-4 py-16 dark:bg-[#14182B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#6477E8]">
            VISUAL STORIES
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#252B42] dark:text-white sm:text-4xl">
            Community in Action
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#737B91] dark:text-gray-400 sm:text-base">
            Moments from volunteer activities, community support, and
            initiatives that bring people together.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <article
              key={event.id}
              className="group relative h-[290px] overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#343B59] dark:bg-[#1D2340]"
            >
              {/* Background Image */}
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14182B]/95 via-[#14182B]/25 to-transparent" />

              {/* Event Information */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-flex rounded-md bg-[#6477E8] px-3 py-1 text-[10px] font-bold tracking-wide text-white">
                  {event.category}
                </span>

                <h3 className="mt-2 text-xl font-bold text-white">
                  {event.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/85">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#AAB5FF]" />
                    {event.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-[#AAB5FF]" />
                    {event.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
