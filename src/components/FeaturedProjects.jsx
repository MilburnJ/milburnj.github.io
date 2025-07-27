// src/components/FeaturedProjects.jsx
import projects from '../data/projects.json';
import ScrollIndicator from './ScrollIndicator';

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="featured-projects"
      className="relative h-screen bg-gray-900 text-white px-8"
    >
      <div className="h-full flex flex-col justify-between">
        {/* Title at the top */}
        <h2 className="mt-24 text-3xl font-bold text-center">
          Featured Projects
        </h2>

        {/* Grid of projects (does not stretch) */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto content-start">
{featured.map(({ title, description, image, url, tools }) => (
  <a
    key={title}
    href={url}
    target="_blank"
    rel="noopener"
    className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-3">{description}</p>
      {tools && tools.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-200"
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

        {/* Scroll indicator at the very bottom */}
        <div className="flex justify-center pb-8">
          <ScrollIndicator target="#all-projects" />
        </div>
      </div>
    </section>
  );
}
