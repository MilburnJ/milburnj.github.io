// src/components/FeaturedProjects.jsx
'use client';

import projects from '../data/projects.json';
import ScrollIndicator from './ScrollIndicator';

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="featured-projects"
      className="relative h-screen bg-gray-900 text-white px-4 sm:px-8 snap-start"
    >
      <div className="h-full flex flex-col justify-between">
        {/* Title */}
        <h2 className="mt-16 sm:mt-20 text-3xl font-bold text-center mb-2">
          Featured Projects
        </h2>

        {/* Mobile‑only hint */}
        <p className="block sm:hidden text-center text-sm opacity-70 mb-3">
          Swipe → to view all featured projects
        </p>

        {/* Swipe container */}
        <div className="flex-1 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory justify-start sm:justify-center items-start px-2 sm:px-0 pb-4">
          {featured.map(({ title, description, image, url, tools }) => (
            <a
              key={title}
              href={url}
              target="_blank"
              rel="noopener"
              className="snap-start flex-shrink-0 flex flex-col h-full w-[75%] sm:w-[45%] lg:w-[30%] bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              {/* Fixed image height */}
              <img
                src={image}
                alt={title}
                className="flex-none w-full h-32 sm:h-48 object-cover"
              />
              {/* Content */}
              <div className="p-2 sm:p-4 flex flex-col flex-grow gap-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-1">
                  {title}
                </h3>
                <p className="text-sm mb-2">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-gray-600 text-xs px-2 py-1 rounded-full text-gray-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Scroll arrow */}
        <div className="flex justify-center pb-8">
          <ScrollIndicator target="#all-projects" />
        </div>
      </div>
    </section>
  );
}