// src/components/AllProjects.jsx
'use client';

import { useState } from 'react';
import ScrollIndicator from './ScrollIndicator';
import projects from '../data/projects.json';

export default function AllProjects() {
  const [query, setQuery] = useState('');
  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    (p.tools && p.tools.some(tool =>
      tool.toLowerCase().includes(query.toLowerCase())
    ))
  );

  return (
    <section
      id="all-projects"
      className="relative h-screen flex flex-col bg-gray-800 text-white px-4 sm:px-8 snap-start"
    >
      <div className="h-full flex flex-col justify-between">
        {/* Header with reduced top margin */}
        <h2 className="mt-16 sm:mt-20 text-3xl font-bold text-center mb-2">
          All Projects
        </h2>

        {/* Mobile‑only hint */}
        <p className="block sm:hidden text-center text-sm opacity-70 mb-3">
          Swipe &rarr; to view all projects
        </p>

        {/* Search box with smaller padding/margin */}
        <div className="max-w-xl mx-auto mb-4">
          <input
            type="text"
            placeholder="Search by name or tool…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Swipeable list: cards all same height, slightly smaller on mobile */}
        <div className="flex-1 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-2 pb-2">
          {filtered.map(({ title, description, image, url, tools }) => (
            <a
              key={title}
              href={url}
              target="_blank"
              rel="noopener"
              className="snap-start flex-shrink-0 flex flex-col h-full w-[75%] sm:w-[60%] lg:w-[45%] xl:w-[30%] bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              {/* Even shorter image on mobile */}
              <img
                src={image}
                alt={title}
                className="flex-none w-full h-28 sm:h-40 object-cover"
              />
              {/* Tighter padding and flex-grow for equal heights */}
              <div className="p-2 sm:p-4 flex flex-col flex-grow gap-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-1">
                  {title}
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tools && tools.map((tool) => (
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

        {/* Scroll down to Blog */}
        <div className="flex justify-center pb-8">
          <ScrollIndicator target="#blog" />
        </div>
      </div>
    </section>
  );
}
