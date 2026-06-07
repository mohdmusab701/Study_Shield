import React from 'react';

const Footer = () => (
  <footer className="border-t border-primary-900/10 bg-white/80 backdrop-blur-sm">
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
      <p>© 2026 StudyShield. Stay focused, study smarter.</p>
      <div className="flex flex-wrap items-center gap-4">
        <a href="mailto:hello@studyshield.app" className="hover:text-primary-700 transition-colors">
          hello@studyshield.app
        </a>
        <a href="/" className="hover:text-primary-700 transition-colors">Home</a>
        <a href="/dashboard" className="hover:text-primary-700 transition-colors">Dashboard</a>
      </div>
    </div>
  </footer>
);

export default Footer;
