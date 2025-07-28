// src/components/AllProjects.jsx
'use client';

import { useState } from 'react';
import ScrollIndicator from './ScrollIndicator';
import projects from '../data/projects.json';

export default function AllProjects() {
  const [query, setQuery] = useState('');
  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    (p.tools && p.tools.some(tool => tool.toLowerCase().includes(query.toLowerCase())))
  );

  return (
    <section
      id="all-projects"
      className="relative h-screen flex flex-col bg-gray-800 text-white px-4 sm:px-8 snap-start"
    >
      {/* Header/search - fixed at top */}
      <div className="flex-shrink-0">
        <h2 className="mt-16 sm:mt-20 text-3xl font-bold text-center mb-2">
          All Projects
        </h2>

        <p className="block sm:hidden text-center text-sm opacity-70 mb-3">
          Swipe ↓ to view all projects
        </p>

        <div className="max-w-xl mx-auto mb-4">
          <input
            type="text"
            placeholder="Search by name or tool…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Content area: flex column, scrollable */}
      <div className="flex flex-1 flex-col px-2 pb-4 min-h-0">
        {/* Mobile: horizontal swipe gallery */}
        <div className="block sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory">
          {filtered.map(({ title, description, image, url, tools }) => (
            <a
              key={title}
              href={url}
              target="_blank"
              rel="noopener"
              className="snap-start flex-shrink-0 flex flex-col h-full w-[75%] bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={image}
                alt={title}
                className="flex-none w-full h-28 object-cover"
              />
              <div className="p-2 flex flex-col flex-grow gap-1">
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-gray-300 text-sm mb-2">{description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tools && tools.map(tool => (
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

        {/* Desktop: vertical scrollable grid */}
        <div className="hidden sm:flex sm:flex-1 sm:flex-col sm:overflow-y-auto min-h-0">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-7xl mx-auto">
            {filtered.map(({ title, description, image, url, tools }) => (
              <a
                key={title}
                href={url}
                target="_blank"
                rel="noopener"
                className="block bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-20 sm:h-24 md:h-28 object-cover"
                />
                <div className="p-2 sm:p-3 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-gray-300 text-xs">{description}</p>
                  {tools && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {tools.map(tool => (
                        <span
                          key={tool}
                          className="bg-gray-600 text-xs px-2 py-1 rounded-full text-gray-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll‑down arrow */}
      <div className="flex-shrink-0 flex justify-center pb-8">
        <ScrollIndicator target="#blog" />
      </div>
    </section>
  );
}
