// src/components/Hero.jsx
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import ScrollIndicator from './ScrollIndicator';

export default function Hero() {
  const [text] = useTypewriter({
    words: [
      "I build AI solutions that learn and adapt",
      "I turn raw data into actionable insights",
      "I train deep nets for real‑world impact",
      "I optimize models for speed and accuracy",
      "I architect end‑to‑end ML solutions",
      "I visualize complex data with clarity",
      "I engineer robust computer‑vision systems",
      "I craft clean, testable Python code"
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const sections = [
    { id: 'resume', label: 'Résumé' },
    { id: 'skills', label: 'Skills' },
    { id: 'featured-projects', label: 'Featured' },
    { id: 'all-projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col lg:flex-row bg-gray-900 text-white overflow-hidden snap-start"
    >
      {/* Sidebar */}
      <aside className="flex flex-col items-center justify-center w-full lg:w-1/3 p-8">
        <img
          src="/profilepic.jpg"
          alt="Jakeb Milburn"
          className="w-40 h-40 rounded-full mb-4 object-cover"
        />
        <h1 className="text-3xl font-bold mb-2">Jakeb Milburn</h1>
        <p className="mb-4 text-center">
          MS in Computer Science @ UD | AI & ML Engineer
        </p>
        <div className="space-x-4">
          <a href="https://github.com/milburnj" target="_blank" rel="noopener" className="underline hover:text-gray-300">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jakeb-milburn-23401a208/" target="_blank" rel="noopener" className="underline hover:text-gray-300">
            LinkedIn
          </a>
        </div>
      </aside>

      {/* Intro & Animated Tagline */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-5xl font-extrabold mb-4">Hi, I’m Jakeb Milburn</h2>
        <h3 className="text-2xl h-12 mb-6">
          <span>{text}</span>
          <Cursor cursorColor="#38bdf8" />
        </h3>

        <nav className="flex flex-wrap justify-center gap-4">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-4 py-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 rounded cursor-pointer transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Scroll indicator to next section */}
      <ScrollIndicator target="#resume" />
    </section>
  ); 
}