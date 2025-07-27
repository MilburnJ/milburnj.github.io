// src/app/page.js
'use client';

import Hero from '../components/Hero';
import ResumeSection from '../components/ResumeSection';
import Skills from '../components/Skills';
import FeaturedProjects from '../components/FeaturedProjects';
import AllProjects from '../components/AllProjects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ResumeSection />
      <Skills />
      <FeaturedProjects />
      <AllProjects />
      <Blog />
      <Contact />
    </main>
  );
}
