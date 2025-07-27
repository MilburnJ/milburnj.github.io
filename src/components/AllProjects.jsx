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
  className="relative h-screen flex flex-col bg-gray-800 text-white px-8"
>
  {/* Header pushed down */}
  <h2 className="mt-24 text-3xl font-bold text-center mb-6">
    All Projects
  </h2>

  {/* Search box */}
  <div className="max-w-xl mx-auto mb-8">
    <input
      type="text"
      placeholder="Search by name or tool…"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
    />
  </div>

  {/* Projects grid with internal scroll */}
  <div className="flex-1 overflow-y-auto">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
            className="w-full h-32 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-gray-300 text-sm">{description}</p>
            {tools && tools.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {tools.map((tool) => (
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

  {/* Scroll down to Blog */}
  <div className="flex justify-center pb-8">
    <ScrollIndicator target="#blog" />
  </div>
</section>
  );
}
